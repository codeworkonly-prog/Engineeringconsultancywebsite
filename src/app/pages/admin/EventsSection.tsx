import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { useContent } from '../../contexts/ContentContext';
import { toast } from 'sonner';
import { Edit, Trash2, X } from 'lucide-react';
import { EventForm, defaultEventForm } from './types';

export function EventsSection() {
  const { events, addEvent, updateEvent, deleteEvent } = useContent();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<EventForm>(defaultEventForm);

  const generateSlug = (title: string, existingId?: string) => {
    let baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    const slugExists = (slug: string) =>
      events.some((e) => e.slug === slug && e.id !== existingId);
    let slug = baseSlug;
    let counter = 1;
    while (slugExists(slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    return slug;
  };

  const handleTitleChange = (title: string) => {
    const slug = generateSlug(title, editingId || undefined);
    setForm({ ...form, title, slug });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.startDate || !form.endDate || !form.duration || !form.type || !form.description) {
      toast.error('Please fill all fields');
      return;
    }
    if (new Date(form.endDate) < new Date(form.startDate)) {
      toast.error('End date must be after start date');
      return;
    }
    const filteredTopics = form.topics.filter((topic) => topic.trim() !== '');
    if (filteredTopics.length === 0) {
      toast.error('Please add at least one topic');
      return;
    }
    const eventData = { ...form, topics: filteredTopics };
    if (editingId) {
      updateEvent(editingId, eventData);
      toast.success('Event updated');
      setEditingId(null);
    } else {
      addEvent(eventData);
      toast.success('Event added');
    }
    setForm(defaultEventForm);
  };

  const handleEdit = (event: typeof events[0]) => {
    setForm({
      title: event.title || '',
      startDate: event.startDate || '',
      endDate: event.endDate || '',
      duration: event.duration || '',
      type: event.type || 'Workshop',
      description: event.description || '',
      topics: event.topics || [],
      slug: event.slug || '',
    });
    setEditingId(event.id);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(defaultEventForm);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? 'Edit Event' : 'Add New Event'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="event-name">Event Name</Label>
              <Input
                id="event-name"
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Enter event name"
              />
            </div>

            <div>
              <Label htmlFor="event-description">Description</Label>
              <Textarea
                id="event-description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Enter event description"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="event-start">Date</Label>
                <Input
                  id="event-start"
                  type="date"
                  value={form.startDate}
                  onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="event-end">End Date</Label>
                <Input
                  id="event-end"
                  type="date"
                  value={form.endDate}
                  onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="event-duration">Duration</Label>
              <Input
                id="event-duration"
                type="text"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                placeholder="e.g., 3 days, 5 days"
              />
              <p className="text-xs text-gray-500 mt-1">Enter duration like "3 days" or "2 weeks"</p>
            </div>

            <div>
              <Label htmlFor="event-type">Type</Label>
              <Select
                value={form.type}
                onValueChange={(value: 'Workshop' | 'Training' | 'Seminar') =>
                  setForm({ ...form, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Workshop">Workshop</SelectItem>
                  <SelectItem value="Training">Training</SelectItem>
                  <SelectItem value="Seminar">Seminar</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="event-topics">Topics (one per line)</Label>
              <Textarea
                id="event-topics"
                value={form.topics.join('\n')}
                onChange={(e) => setForm({ ...form, topics: e.target.value.split('\n') })}
                placeholder="Enter topics, one per line"
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="event-slug">Slug (Auto-generated)</Label>
              <Input
                id="event-slug"
                value={form.slug}
                readOnly
                placeholder="Auto-generated from title"
                className="bg-gray-50"
              />
              <p className="text-xs text-gray-500 mt-1">URL: /events/{form.slug || 'your-event-name'}</p>
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                {editingId ? 'Update Event' : 'Add Event'}
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
          <CardTitle>All Events ({events.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {events.map((event) => (
              <div key={event.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{event.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                    <p className="text-xs text-gray-500">
                      {event.startDate} - {event.endDate}
                    </p>
                    <p className="text-xs text-gray-500">Type: {event.type}</p>
                    {event.topics && event.topics.length > 0 && (
                      <p className="text-xs text-gray-500">Topics: {event.topics.join(', ')}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">Slug: {event.slug}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(event)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        deleteEvent(event.id);
                        toast.success('Event deleted');
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
