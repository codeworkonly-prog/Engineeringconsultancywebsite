import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { useContent } from '../../contexts/ContentContext';
import { toast } from 'sonner';
import { Edit, Trash2, Plus } from 'lucide-react';

export function SectorsManagement() {
  const { sectors, addSector, updateSector, deleteSector } = useContent();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');

  const reset = () => {
    setEditingId(null);
    setName('');
  };

  const handleEdit = (id: string) => {
    const s = sectors.find((x) => x.id === id);
    if (!s) return;
    setEditingId(id);
    setName(s.name || '');
  };

  const handleSave = async (e?: React.FormEvent) => {
    e?.preventDefault();

    const trimmed = name.trim();
    if (!trimmed) return toast.error('Sector name is required');

    try {
      if (editingId) {
        await updateSector(editingId, { name: trimmed });
        toast.success('Sector updated');
      } else {
        await addSector({ name: trimmed });
        toast.success('Sector added');
      }

      reset();
    } catch (err: any) {
      toast.error(err?.message || 'Save failed');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this sector?')) return;

    try {
      await deleteSector(id);
      toast.success('Sector deleted');
    } catch (err: any) {
      toast.error(err?.message || 'Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? 'Edit Sector' : 'Add Sector'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => handleSave(e)} className="space-y-4">
            <div>
              <Label>Name *</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div className="flex gap-2">
              <Button type="submit">{editingId ? 'Update Sector' : 'Add Sector'}</Button>
              {editingId && <Button variant="outline" onClick={reset}>Cancel</Button>}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sectors ({sectors.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sectors.length === 0 ? (
              <div className="rounded-lg border border-dashed p-8 text-center text-sm text-gray-500">No sectors yet.</div>
            ) : (
              sectors.map((s) => (
                <div key={s.id} className="flex items-center justify-between gap-4 rounded-lg border p-3">
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="font-semibold">{s.name}</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(s.id)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(s.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SectorsManagement;
