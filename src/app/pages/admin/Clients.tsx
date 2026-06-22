import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "../../components/ui/dialog";
import { useContent } from "../../contexts/ContentContext";
import { toast } from "sonner";
import { Edit, Trash2, Plus } from "lucide-react";
import { getUniqueSlug, slugPattern, slugify } from "../../../utils/slug";
import { ImageUpload } from "../../components/ui/imageupload";

export function ClientsManagement() {
  const { clients, addClient, updateClient, deleteClient } = useContent();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [website, setWebsite] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const reset = () => {
    setEditingId(null);
    setName("");
    setSlug("");
    setLogoUrl("");
    setWebsite("");
  };

  const generateSlug = (value: string, existingId?: string) =>
    getUniqueSlug(
      value,
      clients
        .filter((client) => client.id !== existingId)
        .map((client) => client.slug || slugify(client.name)),
    );

  const handleNameChange = (value: string) => {
    setName(value);
    setSlug(generateSlug(value, editingId || undefined));
  };

  const handleEdit = (id: string) => {
    const c = clients.find((x) => x.id === id);
    if (!c) return;
    setEditingId(id);
    setName(c.name || "");
    setSlug(c.slug || slugify(c.name || ""));
    setLogoUrl(c.logoUrl || "");
    setWebsite(c.website || "");
  };

  const handleSave = async (e?: React.FormEvent) => {
    e?.preventDefault();

    const trimmed = name.trim();
    const trimmedSlug = slug.trim();
    if (!trimmed) return toast.error("Client name is required");
    if (!trimmedSlug) return toast.error("Client slug is required");
    if (!slugPattern.test(trimmedSlug)) {
      return toast.error(
        "Use lowercase letters, numbers, and hyphens only for the slug",
      );
    }

    try {
      if (editingId) {
        await updateClient(editingId, {
          name: trimmed,
          slug: trimmedSlug,
          logoUrl: logoUrl.trim(),
          website: website.trim(),
        });
        toast.success("Client updated");
      } else {
        await addClient({
          name: trimmed,
          slug: trimmedSlug,
          logoUrl: logoUrl.trim(),
          website: website.trim(),
        });
        toast.success("Client added");
      }

      reset();
    } catch (err: any) {
      toast.error(err?.message || "Save failed");
    }
  };

  const handleDelete = async () => {
    if (!deleteTargetId) return;

    try {
      await deleteClient(deleteTargetId);
      toast.success("Client deleted");
      setDeleteDialogOpen(false);
      setDeleteTargetId(null);
    } catch (err: any) {
      toast.error(err?.message || "Delete failed");
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
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "Edit Client" : "Add Client"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => handleSave(e)} className="space-y-4">
            <div>
              <Label>Name *</Label>
              <Input
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
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
            </div>

            <ImageUpload
              label="Client Logo"
              folder="clients"
              value={logoUrl}
              onChange={setLogoUrl}
            />
            {logoUrl && (
              <img
                src={logoUrl}
                alt="Preview"
                className="mt-3 h-24 w-24 object-cover border"
              />
            )}

            <div>
              <Label>Website</Label>
              <Input
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://..."
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit">
                {editingId ? "Update Client" : "Add Client"}
              </Button>
              {editingId && (
                <Button variant="outline" onClick={reset}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Clients ({clients.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {clients.length === 0 ? (
              <div className="rounded-lg border border-dashed p-8 text-center text-sm text-gray-500">
                No clients yet.
              </div>
            ) : (
              clients.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between gap-4 rounded-lg border p-3"
                >
                  <div className="flex items-center gap-4">
                    {c.logoUrl ? (
                      <img
                        src={c.logoUrl}
                        alt={c.name}
                        className="h-10 w-10 object-contain"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center text-sm text-gray-500">
                        No
                      </div>
                    )}
                    <div>
                      <div className="font-semibold">{c.name}</div>
                      <div className="text-xs text-gray-500">
                        /portfolio?client={c.slug || slugify(c.name)}
                      </div>
                      <div className="text-xs text-gray-500">{c.website}</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(c.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openDeleteDialog(c.id)}
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
            <DialogTitle>Delete Client</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-gray-600">
            Are you sure you want to delete this client? This action cannot be
            undone.
          </p>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
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

export default ClientsManagement;
