import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Button } from '../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from '../../components/ui/dialog';
import { useContent } from '../../contexts/ContentContext';
import { toast } from 'sonner';
import { Edit, Trash2, X } from 'lucide-react';

export function FaqsSection() {
  const { homeFaqs, addHomeFaq, updateHomeFaq, deleteHomeFaq } = useContent();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const reset = () => {
    setEditingId(null);
    setQuestion('');
    setAnswer('');
  };

  const handleEdit = (id: string) => {
    const faq = homeFaqs.find((item) => item.id === id);
    if (!faq) return;

    setEditingId(id);
    setQuestion(faq.question || '');
    setAnswer(faq.answer || '');
  };

  const handleSave = async (event?: React.FormEvent) => {
    event?.preventDefault();

    const trimmedQuestion = question.trim();
    const trimmedAnswer = answer.trim();

    if (!trimmedQuestion) return toast.error('Question is required');
    if (!trimmedAnswer) return toast.error('Answer is required');

    const now = new Date().toISOString();
    const existing = editingId
      ? homeFaqs.find((item) => item.id === editingId)
      : undefined;
    const payload = {
      question: trimmedQuestion,
      answer: trimmedAnswer,
      createdAt: existing?.createdAt || now,
      updatedAt: now,
    };

    try {
      if (editingId) {
        await updateHomeFaq(editingId, payload);
        toast.success('FAQ updated');
      } else {
        await addHomeFaq(payload);
        toast.success('FAQ added');
      }

      reset();
    } catch (err: any) {
      toast.error(err?.message || 'Save failed');
    }
  };

  const openDeleteDialog = (id: string) => {
    setDeleteTargetId(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteTargetId) return;

    try {
      await deleteHomeFaq(deleteTargetId);
      if (editingId === deleteTargetId) reset();
      toast.success('FAQ deleted');
    } catch (err: any) {
      toast.error(err?.message || 'Delete failed');
    } finally {
      setDeleteDialogOpen(false);
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? 'Edit FAQ' : 'Add FAQ'}</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <Label>Question *</Label>
              <Input
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="What services does Diksha Consulting and Projects provide?"
                required
              />
            </div>

            <div>
              <Label>Answer *</Label>
              <Textarea
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                rows={5}
                placeholder="Write a clear answer that helps visitors and search engines understand your services."
                required
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit">{editingId ? 'Update FAQ' : 'Add FAQ'}</Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={reset}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>FAQs ({homeFaqs.length})</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            {homeFaqs.length === 0 ? (
              <div className="rounded-lg border border-dashed p-8 text-center text-sm text-gray-500">
                No FAQs yet.
              </div>
            ) : (
              homeFaqs.map((faq) => (
                <div
                  key={faq.id}
                  className="flex flex-col gap-4 rounded-lg border p-4 md:flex-row md:items-start md:justify-between"
                >
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{faq.answer}</p>
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(faq.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => openDeleteDialog(faq.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete FAQ</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-gray-600">
            Are you sure you want to delete this FAQ? This action cannot be undone.
          </p>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default FaqsSection;
