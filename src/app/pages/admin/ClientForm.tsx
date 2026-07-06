import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { ImageUpload } from '../../components/ui/imageupload';
import { useContent } from '../../contexts/ContentContext';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { getUniqueSlug, slugPattern, slugify } from '../../../utils/slug';

export function ClientForm() {
  const { clients, addClient, updateClient } = useContent();
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const editingId = id || null;

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [website, setWebsite] = useState('');
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!editingId) {
      setName('');
      setSlug('');
      setLogoUrl('');
      setWebsite('');
      return;
    }

    const existing = clients.find((c) => c.id === editingId);
    if (existing) {
      setName(existing.name || '');
      setSlug(existing.slug || slugify(existing.name || ''));
      setLogoUrl(existing.logoUrl || '');
      setWebsite(existing.website || '');
      setNotFound(false);
    } else if (clients.length > 0) {
      setNotFound(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingId, clients.length]);

  const goBackToList = () => navigate('/admin/clients');

  const generateSlug = (value: string) =>
    getUniqueSlug(
      value,
      clients
        .filter((c) => c.id !== editingId)
        .map((c) => c.slug || slugify(c.name)),
    );

  const handleNameChange = (value: string) => {
    setName(value);
    setSlug(generateSlug(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedSlug = slug.trim();

    if (!trimmedName) return toast.error('Client name is required');
    if (!trimmedSlug) return toast.error('Client slug is required');
    if (!slugPattern.test(trimmedSlug)) {
      return toast.error('Use lowercase letters, numbers, and hyphens only for the slug');
    }

    try {
      if (editingId) {
        await updateClient(editingId, {
          name: trimmedName,
          slug: trimmedSlug,
          logoUrl: logoUrl.trim(),
          website: website.trim(),
        });
        toast.success('Client updated');
      } else {
        await addClient({
          name: trimmedName,
          slug: trimmedSlug,
          logoUrl: logoUrl.trim(),
          website: website.trim(),
        });
        toast.success('Client added');
      }
      goBackToList();
    } catch (err: any) {
      toast.error(err?.message || 'Save failed');
    }
  };

  if (editingId && notFound) {
    return (
      <Card>
        <CardContent className="space-y-4 p-8 text-center">
          <p className="text-gray-600">
            This client could not be found. It may have been deleted.
          </p>
          <Button type="button" onClick={goBackToList}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Clients
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Button type="button" variant="ghost" onClick={goBackToList} className="-ml-2">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Clients
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>{editingId ? 'Edit Client' : 'Add Client'}</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Client Details
              </h3>

              <div>
                <Label>Name *</Label>
                <Input
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Enter client organization name"
                  required
                />
              </div>

              <div>
                <Label>Slug *</Label>
                <Input
                  value={slug}
                  onChange={(e) => setSlug(slugify(e.target.value))}
                  placeholder="client-name"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  /portfolio?client={slug || 'client-name'}
                </p>
              </div>

              <div>
                <Label>Website</Label>
                <Input
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="space-y-4 border-t pt-6">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Logo
              </h3>

              <ImageUpload
                label="Client Logo"
                folder="clients"
                value={logoUrl}
                onChange={setLogoUrl}
              />

              {logoUrl && (
                <div className="flex items-center justify-center rounded-lg border bg-gray-50 p-6">
                  <img
                    src={logoUrl}
                    alt="Logo preview"
                    className="max-h-24 max-w-full object-contain"
                  />
                </div>
              )}
            </div>

            <div className="flex gap-2 border-t pt-4">
              <Button type="submit" className="flex-1">
                {editingId ? 'Update Client' : 'Add Client'}
              </Button>
              <Button type="button" variant="outline" onClick={goBackToList}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
