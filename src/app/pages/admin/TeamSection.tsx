import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Checkbox } from '../../components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from '../../components/ui/dialog';
import { useContent } from '../../contexts/ContentContext';
import { toast } from 'sonner';
import { Edit, Trash2, X, UserCheck } from 'lucide-react';
import { TeamForm, defaultTeamForm } from './types';

export function TeamSection() {
  const { teamMembers, addTeamMember, updateTeamMember, deleteTeamMember } =
    useContent();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<TeamForm>(defaultTeamForm);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // Generate unique slug
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

    setForm({
      ...form,
      name,
      slug,
    });
  };

  const currentLeadershipMember = teamMembers.find(
    (member) => member.isLeadership && member.id !== editingId
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.position || !form.bio || !form.imageUrl) {
      toast.error('Please fill all fields');
      return;
    }

    // If new leadership selected, remove leadership from others
    if (form.isLeadership) {
      teamMembers.forEach((member) => {
        if (member.isLeadership && member.id !== editingId) {
          updateTeamMember(member.id, {
            ...member,
            isLeadership: false,
          });
        }
      });
    }

    if (editingId) {
      updateTeamMember(editingId, form);
      toast.success('Team member updated successfully');
      setEditingId(null);
    } else {
      addTeamMember(form);
      toast.success('Team member added successfully');
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
      isLeadership: member.isLeadership || false,
    });

    setEditingId(member.id);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(defaultTeamForm);
  };

  const handleDelete = async () => {
    if (!deleteTargetId) return;

    try {
      await deleteTeamMember(deleteTargetId);
      toast.success('Team member deleted');
      setDeleteDialogOpen(false);
      setDeleteTargetId(null);
    } catch (error) {
      console.error(error);
      toast.error('Delete failed');
      setDeleteDialogOpen(false);
      setDeleteTargetId(null);
    }
  };

  const openDeleteDialog = (id: string) => {
    setDeleteTargetId(id);
    setDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Form Section */}
      <Card>
        <CardHeader>
          <CardTitle>
            {editingId ? 'Edit Team Member' : 'Add New Team Member'}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <Label htmlFor="team-name">Name</Label>

              <Input
                id="team-name"
                value={form.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Enter full name"
              />
            </div>

            {/* Position */}
            <div>
              <Label htmlFor="team-position">Position</Label>

              <Input
                id="team-position"
                value={form.position}
                onChange={(e) =>
                  setForm({
                    ...form,
                    position: e.target.value,
                  })
                }
                placeholder="e.g. Managing Director"
              />
            </div>

            {/* Bio */}
            <div>
              <Label htmlFor="team-bio">Bio</Label>

              <Textarea
                id="team-bio"
                value={form.bio}
                onChange={(e) =>
                  setForm({
                    ...form,
                    bio: e.target.value,
                  })
                }
                placeholder="Write short bio"
                rows={4}
              />
            </div>

            {/* Image URL */}
            <div>
              <Label htmlFor="team-image">Image URL</Label>

              <Input
                id="team-image"
                value={form.imageUrl}
                onChange={(e) =>
                  setForm({
                    ...form,
                    imageUrl: e.target.value,
                  })
                }
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Slug */}
            <div>
              <Label htmlFor="team-slug">Slug (Auto Generated)</Label>

              <Input
                id="team-slug"
                value={form.slug}
                readOnly
                className="bg-gray-50"
                placeholder="Auto-generated slug"
              />

              <p className="text-xs text-gray-500 mt-1">
                URL: /team/{form.slug || 'member-name'}
              </p>
            </div>

            {/* Leadership Selection */}
            <div className="border rounded-lg p-4 bg-brand-50 border-brand-200">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="team-leadership"
                  checked={form.isLeadership || false}
                  onCheckedChange={(checked) =>
                    setForm({
                      ...form,
                      isLeadership: checked as boolean,
                    })
                  }
                  className="border-brand-500 data-[state=checked]:bg-brand-600 data-[state=checked]:border-brand-600"
                />

                <Label
                  htmlFor="team-leadership"
                  className="cursor-pointer flex items-center gap-2"
                >
                  <UserCheck className="h-4 w-4 text-brand-600" />
                  Leadership Position (Center Highlight)
                </Label>
              </div>

              {currentLeadershipMember && (
                <div className="mt-3 text-xs text-brand-700 bg-white border border-brand-200 rounded-md p-3">
                  <p className="font-medium">
                    Current Leadership Member is {currentLeadershipMember.name} (
                    {currentLeadershipMember.position})
                  </p>

                  <p className="mt-1">
                    Selecting this option will automatically transfer the
                    leadership role to this member.
                  </p>
                </div>
              )}

              <p className="text-xs text-gray-500 mt-3">
                Only one person can hold the leadership position at a time.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                {editingId ? 'Update Member' : 'Add Member'}
              </Button>

              {editingId && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={cancelEdit}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Team List */}
      <Card>
        <CardHeader>
          <CardTitle>
            All Team Members ({teamMembers.length})
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className={`border rounded-lg p-4 transition-all duration-200 hover:bg-gray-50 ${member.isLeadership
                    ? 'border-brand-300 bg-brand-50'
                    : ''
                  }`}
              >
                <div className="flex gap-4">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover border"
                  />

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">
                        {member.name}
                      </h3>

                      {member.isLeadership && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-brand-100 text-brand-700">
                          <UserCheck className="h-3 w-3" />
                          Leadership
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-brand-600">
                      {member.position}
                    </p>

                    <p className="text-sm text-gray-600 mt-1">
                      {member.bio}
                    </p>

                    <p className="text-xs text-gray-400 mt-2">
                      /team/{member.slug}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(member)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openDeleteDialog(member.id)}
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

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Team Member</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-gray-600">
            Are you sure you want to delete this team member? This action cannot be undone.
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