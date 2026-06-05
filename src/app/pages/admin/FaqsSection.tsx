import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router';
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
import { Edit, Trash2, X, Search, ArrowRight } from 'lucide-react';

/* ─────────────────────────────────────────────
   Custom diamond-chevron SVG used as FAQ bullet
───────────────────────────────────────────── */
function FaqIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={{
        width: 22,
        height: 22,
        flexShrink: 0,
        transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
      }}
    >
      {/* Outer diamond ring */}
      <path
        d="M12 2L22 12L12 22L2 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill={isOpen ? 'currentColor' : 'none'}
        style={{ transition: 'fill 0.3s ease' }}
        opacity={isOpen ? 0.15 : 1}
      />
      {/* Inner chevron arrow */}
      <path
        d="M10 9L14 12L10 15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Animated accordion answer — stays in DOM
   Uses max-height CSS trick for SEO crawlability
───────────────────────────────────────────── */
function AccordionAnswer({
  answer,
  isOpen,
}: {
  answer: string;
  isOpen: boolean;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [answer]);

  return (
    <div
      style={{
        maxHeight: isOpen ? `${height + 32}px` : '0px',
        overflow: 'hidden',
        transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease',
        opacity: isOpen ? 1 : 0,
      }}
      aria-hidden={!isOpen}
    >
      <div
        ref={contentRef}
        style={{
          padding: '0 0 1.25rem 2.5rem',
          fontSize: '0.9375rem',
          lineHeight: 1.75,
          color: '#4B5563',
          borderLeft: '2px solid',
          borderColor: 'var(--brand-600)',
          marginLeft: '0.25rem',
          paddingLeft: '1.25rem',
        }}
      >
        {answer}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Individual FAQ accordion item
───────────────────────────────────────────── */
function FaqItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: { id: string; question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      style={{
        borderBottom: '1px solid #E5E7EB',
        transition: 'background 0.2s ease',
        background: isOpen ? 'color-mix(in srgb, var(--brand-600) 5%, transparent)' : 'transparent',
        borderRadius: isOpen ? '8px' : '0',
      }}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={onToggle}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          width: '100%',
          padding: '1.125rem 1rem 1.125rem 0.75rem',
          textAlign: 'left',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: isOpen ? 'var(--brand-600)' : '#111827',
          fontWeight: 600,
          fontSize: '1rem',
          transition: 'color 0.2s ease',
          fontFamily: 'inherit',
        }}
      >
        <FaqIcon isOpen={isOpen} />
        <span style={{ flex: 1 }}>{faq.question}</span>
      </button>
      {/* Answer always in DOM — hidden via CSS max-height for SEO */}
      <AccordionAnswer answer={faq.answer} isOpen={isOpen} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   JSON-LD FAQ Schema injection hook
───────────────────────────────────────────── */
function useFaqSchema(faqs: Array<{ question: string; answer: string }>) {
  useEffect(() => {
    if (!faqs.length) return;

    const existing = document.querySelector('#faq-schema-ld');
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.id = 'faq-schema-ld';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [faqs]);
}

/* ─────────────────────────────────────────────
   Public-facing FAQ display (used on homepage)
───────────────────────────────────────────── */
export function HomeFaqDisplay() {
  const { homeFaqs } = useContent();
  const [openId, setOpenId] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const top5 = homeFaqs.slice(0, 5);

  const filtered = query.trim()
    ? top5.filter(
        (faq) =>
          faq.question.toLowerCase().includes(query.toLowerCase()) ||
          faq.answer.toLowerCase().includes(query.toLowerCase())
      )
    : top5;

  useFaqSchema(top5);

  if (!homeFaqs.length) return null;

  return (
    <section
      style={{
        padding: '5rem 0',
        background: '#FAFAF9',
        // CSS custom property for accent color, matching brand
        '--faq-accent': 'var(--brand-600)',
      } as React.CSSProperties}
      aria-labelledby="faq-heading"
    >
      <div
        style={{
          maxWidth: '780px',
          margin: '0 auto',
          padding: '0 1.5rem',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <p
            style={{
              fontSize: '0.8125rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--brand-600)',
              marginBottom: '0.75rem',
            }}
          >
            Support
          </p>
          <h2
            id="faq-heading"
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 700,
              color: '#111827',
              margin: '0 0 0.875rem',
              lineHeight: 1.2,
            }}
          >
            Frequently Asked Questions
          </h2>
          <p style={{ color: '#6B7280', fontSize: '1.0625rem', maxWidth: '520px', margin: '0 auto' }}>
            Helpful answers about our engineering consultancy, project support, and training services.
          </p>
        </div>

        {/* Search bar */}
        <div
          style={{
            position: 'relative',
            marginBottom: '2rem',
          }}
        >
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '0.9rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9CA3AF',
              pointerEvents: 'none',
            }}
            aria-hidden
          />
          <input
            type="search"
            placeholder="Search questions…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search FAQs"
            style={{
              width: '100%',
              boxSizing: 'border-box',
              paddingLeft: '2.5rem',
              paddingRight: '1rem',
              paddingTop: '0.625rem',
              paddingBottom: '0.625rem',
              fontSize: '0.9375rem',
              border: '1.5px solid #D1D5DB',
              borderRadius: '9999px',
              background: '#fff',
              color: '#111827',
              outline: 'none',
              transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              fontFamily: 'inherit',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--brand-600)';
              e.currentTarget.style.boxShadow = '0 0 0 3px color-mix(in srgb, var(--brand-600) 10%, transparent)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#D1D5DB';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Accordion list */}
        <div
          style={{
            background: '#fff',
            borderRadius: '16px',
            border: '1.5px solid #E5E7EB',
            overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
          }}
        >
          {filtered.length === 0 ? (
            <p
              style={{
                padding: '2.5rem',
                textAlign: 'center',
                color: '#9CA3AF',
                fontSize: '0.9375rem',
              }}
            >
              No questions match your search.
            </p>
          ) : (
            filtered.map((faq) => (
              <FaqItem
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
              />
            ))
          )}
        </div>

        {/* View All FAQs CTA */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          <Link
            to="/faq"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.6875rem 1.75rem',
              borderRadius: '9999px',
              border: '1.5px solid var(--brand-600)',
              color: 'var(--brand-600)',
              fontWeight: 600,
              fontSize: '0.9375rem',
              textDecoration: 'none',
              transition: 'background 0.2s ease, color 0.2s ease',
              letterSpacing: '0.01em',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'var(--brand-600)';
              (e.currentTarget as HTMLAnchorElement).style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
              (e.currentTarget as HTMLAnchorElement).style.color = 'var(--brand-600)';
            }}
          >
            View All FAQs
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Admin CMS panel — add / edit / delete FAQs
───────────────────────────────────────────── */
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
    const existing = editingId ? homeFaqs.find((item) => item.id === editingId) : undefined;
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
