import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { useContent } from '../../contexts/ContentContext';
import { toast } from 'sonner';
import { Edit, Trash2, X } from 'lucide-react';
import { ClientForm, defaultClientForm } from './types';

export function ClientsSection() {
  const { clients, addClient, updateClient, deleteClient } = useContent();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ClientForm>(defaultClientForm);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.logoUrl || !form.website) {
      toast.error('Please fill all fields');
      return;
    }
    if (editingId) {
      updateClient(editingId, form);
      toast.success('Client updated');
      setEditingId(null);
    } else {
      addClient(form);
      toast.success('Client added');
    }
    setForm(defaultClientForm);
  };

  const handleEdit = (client: typeof clients[0]) => {
    setForm({
      name: client.name,
      logoUrl: client.logoUrl,
      website: client.website,
    });
    setEditingId(client.id);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(defaultClientForm);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? 'Edit Client' : 'Add New Client'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="client-name">Client Name</Label>
              <Input
                id="client-name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Enter client organization name"
              />
            </div>

            <div>
              <Label htmlFor="client-logo">Logo URL</Label>
              <Input
                id="client-logo"
                value={form.logoUrl}
                onChange={(e) => setForm({ ...form, logoUrl: e.target.value })}
                placeholder="https://..."
              />
            </div>

            <div>
              <Label htmlFor="client-website">Website URL</Label>
              <Input
                id="client-website"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                placeholder="https://..."
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                {editingId ? 'Update Client' : 'Add Client'}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={cancelEdit}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Clients ({clients.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {clients.map((client) => (
              <div key={client.id} className="border rounded-lg overflow-hidden">
                <div className="p-4 bg-gray-50 flex items-center justify-center h-32">
                  <img
                    src={client.logoUrl}
                    alt={client.name}
                    className="max-h-20 max-w-full object-contain"
                  />
                </div>
                <div className="p-3">
                  <p className="font-semibold text-sm mb-1">{client.name}</p>
                  <a
                    href={client.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-brand-600 hover:underline block truncate"
                  >
                    {client.website}
                  </a>
                  <div className="flex gap-2 mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleEdit(client)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        deleteClient(client.id);
                        toast.success('Client deleted');
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
