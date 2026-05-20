import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { useContent } from '../../contexts/ContentContext';
import { toast } from 'sonner';
import { Edit, Trash2, X } from 'lucide-react';
import { TeamForm, defaultTeamForm } from './types';

export function TeamSection() {
  const { teamMembers, addTeamMember, updateTeamMember, deleteTeamMember } = useContent();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<TeamForm>(defaultTeamForm);

  const generateSlug = (name: string, existingId?: string) => {
    let baseSlug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    const slugExists = (slug: string) =>
      teamMembers.some((t) => t.slug === slug && t.id !== existingId);
    let slug = baseSlug;
    let counter = 1;
    while (slugExists(slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    return slug;
  };

  const handleNameChange = (name: string) => {
    const slug = generateSlug(name, editingId || undefined);
    setForm({ ...form, name, slug });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.position || !form.bio || !form.imageUrl) {
      toast.error('Please fill all fields');
      return;
    }
    if (editingId) {
      updateTeamMember(editingId, form);
      toast.success('Team member updated');
      setEditingId(null);
    } else {
      addTeamMember(form);
      toast.success('Team member added');
    }
    setForm(defaultTeamForm);
  };

  const handleEdit = (member: typeof teamMembers[0]) => {
    setForm({
      name: member.name,
      position: member.position,
      bio: member.bio,
      imageUrl: member.imageUrl,
      slug: member.slug,
    });
    setEditingId(member.id);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(defaultTeamForm);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? 'Edit Team Member' : 'Add New Team Member'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="team-name">Name</Label>
              <Input
                id="team-name"
                value={form.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Enter name"
              />
            </div>

            <div>
              <Label htmlFor="team-position">Position</Label>
              <Input
                id="team-position"
                value={form.position}
                onChange={(e) => setForm({ ...form, position: e.target.value })}
                placeholder="e.g., Chief Engineer"
              />
            </div>

            <div>
              <Label htmlFor="team-bio">Bio</Label>
              <Textarea
                id="team-bio"
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                placeholder="Enter team member bio"
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="team-image">Image URL</Label>
              <Input
                id="team-image"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                placeholder="https://..."
              />
            </div>

            <div>
              <Label htmlFor="team-slug">Slug (Auto-generated)</Label>
              <Input
                id="team-slug"
                value={form.slug}
                readOnly
                placeholder="Auto-generated from name"
                className="bg-gray-50"
              />
              <p className="text-xs text-gray-500 mt-1">URL: /team/{form.slug || 'member-name'}</p>
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                {editingId ? 'Update Member' : 'Add Member'}
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
          <CardTitle>All Team Members ({teamMembers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {teamMembers.map((member) => (
              <div key={member.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex gap-4">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-brand-600">{member.position}</p>
                    <p className="text-sm text-gray-600">{member.bio}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(member)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        deleteTeamMember(member.id);
                        toast.success('Team member deleted');
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
