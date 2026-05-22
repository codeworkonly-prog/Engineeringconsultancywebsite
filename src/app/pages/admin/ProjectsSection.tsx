import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { useContent } from '../../contexts/ContentContext';
import { toast } from 'sonner';
import { Edit, Trash2, X, Award } from 'lucide-react';
import { ProjectForm, defaultProjectForm } from './types';

export function ProjectsSection() {
  const { projects, addProject, updateProject, deleteProject } = useContent();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [projectStatusFilter, setProjectStatusFilter] = useState<'all' | 'ongoing' | 'completed'>('all');
  const [form, setForm] = useState<ProjectForm>(defaultProjectForm);

  const generateSlug = (title: string, existingId?: string) => {
    let baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    const slugExists = (slug: string) =>
      projects.some((p) => p.slug === slug && p.id !== existingId);
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

  const handleFlagshipToggle = (checked: boolean) => {
    setForm({ ...form, isFlagship: checked });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.category || !form.imageUrl || !form.startDate || !form.endDate) {
      toast.error('Please fill all required fields');
      return;
    }
    if (new Date(form.endDate) < new Date(form.startDate)) {
      toast.error('End date must be after start date');
      return;
    }

    // If this project is being marked as flagship, unmark all others
    if (form.isFlagship) {
      projects.forEach((p) => {
        if (p.id !== editingId && p.isFlagship) {
          updateProject(p.id, { ...p, isFlagship: false });
        }
      });
    }

    if (editingId) {
      updateProject(editingId, form);
      toast.success('Project updated');
      setEditingId(null);
    } else {
      addProject(form);
      toast.success('Project added');
    }
    setForm(defaultProjectForm);
  };

  const handleEdit = (project: typeof projects[0]) => {
    setForm({
      title: project.title || '',
      description: project.description || '',
      category: project.category || '',
      projectType: project.projectType || 'Design and Build',
      imageUrl: project.imageUrl || '',
      startDate: project.startDate || '',
      endDate: project.endDate || '',
      status: project.status || 'ongoing',
      slug: project.slug || '',
      client: project.client || '',
      location: project.location || '',
      area: project.area || '',
      completionDate: project.completionDate || '',
      servicesProvided: project.servicesProvided || [],
      overview: project.overview || '',
      galleryImages: project.galleryImages || [],
      result: project.result || '',
      keyFeatures: project.keyFeatures || [],
      beforeImage: project.beforeImage || '',
      afterImage: project.afterImage || '',
      clientTestimonial: project.clientTestimonial || '',
      clientName: project.clientName || '',
      faqs: project.faqs || [],
      isFlagship: project.isFlagship || false,
    });
    setEditingId(project.id);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(defaultProjectForm);
  };

  const flagshipProject = projects.find((p) => p.isFlagship);

  return (
    <div className="space-y-6">
      {/* Flagship Project Alert */}
      {flagshipProject && (
        <Card className="border-brand-200 bg-brand-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Award className="h-6 w-6 text-brand-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-brand-900 mb-1">Current Flagship Project</h3>
                <p className="text-sm text-brand-700">
                  <strong>{flagshipProject.title}</strong> is currently set as your flagship project and will
                  appear on the company profile page.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>{editingId ? 'Edit Project' : 'Add New Project'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Flagship Toggle */}
            <div className="border-2 border-brand-200 rounded-lg p-4 bg-brand-50">
              <div className="flex items-start gap-3">
                <Award className="h-5 w-5 text-brand-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="flagship-toggle"
                      checked={form.isFlagship}
                      onChange={(e) => handleFlagshipToggle(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                    />
                    <Label htmlFor="flagship-toggle" className="font-semibold cursor-pointer">
                      Mark as Flagship Project
                    </Label>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 ml-7">
                    The flagship project will be prominently featured on your company profile page.
                    Only one project can be flagship at a time.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="project-name">Project Name *</Label>
              <Input
                id="project-name"
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Enter project name"
                required
              />
            </div>

            <div>
              <Label htmlFor="project-description">Description *</Label>
              <Textarea
                id="project-description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Enter project description"
                rows={4}
                required
              />
            </div>

            <div>
              <Label htmlFor="project-category">Category *</Label>
              <Input
                id="project-category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="Enter project category"
                required
              />
            </div>

            <div>
              <Label htmlFor="project-type">Project Type *</Label>
              <Select
                value={form.projectType}
                onValueChange={(value: 'Design and Build' | 'Contract') =>
                  setForm({ ...form, projectType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Design and Build">Design and Build</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="project-image">Image URL *</Label>
              <Input
                id="project-image"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                placeholder="https://..."
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="project-start-date">Start Date *</Label>
                <Input
                  id="project-start-date"
                  type="date"
                  value={form.startDate}
                  onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="project-end-date">End Date *</Label>
                <Input
                  id="project-end-date"
                  type="date"
                  value={form.endDate}
                  onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="project-status">Status *</Label>
              <Select
                value={form.status}
                onValueChange={(value: 'ongoing' | 'completed') =>
                  setForm({ ...form, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="project-slug">Slug (Auto-generated)</Label>
              <Input
                id="project-slug"
                value={form.slug}
                readOnly
                placeholder="Auto-generated from title"
                className="bg-gray-50"
              />
              <p className="text-xs text-gray-500 mt-1">URL: /projects/{form.slug || 'your-project-name'}</p>
            </div>

            <div className="border-t pt-4 mt-4">
              <h3 className="font-semibold mb-4">Additional Project Details (Optional)</h3>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="project-client">Client Name</Label>
                  <Input
                    id="project-client"
                    value={form.client}
                    onChange={(e) => setForm({ ...form, client: e.target.value })}
                    placeholder="Enter client name"
                  />
                </div>
                <div>
                  <Label htmlFor="project-location">Location</Label>
                  <Input
                    id="project-location"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="e.g., Kathmandu, Nepal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="project-area">Project Area</Label>
                  <Input
                    id="project-area"
                    value={form.area}
                    onChange={(e) => setForm({ ...form, area: e.target.value })}
                    placeholder="e.g., 5,000 sq ft"
                  />
                </div>
                <div>
                  <Label htmlFor="project-completion">Completion Date</Label>
                  <Input
                    id="project-completion"
                    type="date"
                    value={form.completionDate}
                    onChange={(e) => setForm({ ...form, completionDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="mb-4">
                <Label htmlFor="project-overview">Project Overview</Label>
                <Textarea
                  id="project-overview"
                  value={form.overview}
                  onChange={(e) => setForm({ ...form, overview: e.target.value })}
                  placeholder="Detailed project overview..."
                  rows={5}
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="project-services">Services Provided (one per line)</Label>
                <Textarea
                  id="project-services"
                  value={form.servicesProvided.join('\n')}
                  onChange={(e) => setForm({ ...form, servicesProvided: e.target.value.split('\n') })}
                  placeholder="Structural Design&#10;Project Management&#10;Quality Control"
                  rows={4}
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="project-gallery">Gallery Image URLs (one per line)</Label>
                <Textarea
                  id="project-gallery"
                  value={form.galleryImages.join('\n')}
                  onChange={(e) => setForm({ ...form, galleryImages: e.target.value.split('\n') })}
                  placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                  rows={4}
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="project-result">Results & Impact</Label>
                <Textarea
                  id="project-result"
                  value={form.result}
                  onChange={(e) => setForm({ ...form, result: e.target.value })}
                  placeholder="Describe the project outcomes and impact..."
                  rows={4}
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="project-features">Key Features (one per line)</Label>
                <Textarea
                  id="project-features"
                  value={form.keyFeatures.join('\n')}
                  onChange={(e) => setForm({ ...form, keyFeatures: e.target.value.split('\n') })}
                  placeholder="Sustainable materials used&#10;Advanced structural analysis&#10;Completed ahead of schedule"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="project-before">Before Image URL</Label>
                  <Input
                    id="project-before"
                    value={form.beforeImage}
                    onChange={(e) => setForm({ ...form, beforeImage: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <Label htmlFor="project-after">After Image URL</Label>
                  <Input
                    id="project-after"
                    value={form.afterImage}
                    onChange={(e) => setForm({ ...form, afterImage: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="mb-4">
                <Label htmlFor="project-testimonial">Client Testimonial</Label>
                <Textarea
                  id="project-testimonial"
                  value={form.clientTestimonial}
                  onChange={(e) => setForm({ ...form, clientTestimonial: e.target.value })}
                  placeholder="What the client said about the project..."
                  rows={3}
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="project-client-name">Client Name (for testimonial)</Label>
                <Input
                  id="project-client-name"
                  value={form.clientName}
                  onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                  placeholder="e.g., John Doe, CEO of ABC Corp"
                />
              </div>

              <div className="mb-4">
                <Label>FAQs</Label>
                <div className="space-y-3">
                  {form.faqs.map((faq, index) => (
                    <div key={index} className="border p-3 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-medium">FAQ {index + 1}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newFaqs = form.faqs.filter((_, i) => i !== index);
                            setForm({ ...form, faqs: newFaqs });
                          }}
                        >
                          <X className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                      <Input
                        value={faq.question}
                        onChange={(e) => {
                          const newFaqs = [...form.faqs];
                          newFaqs[index].question = e.target.value;
                          setForm({ ...form, faqs: newFaqs });
                        }}
                        placeholder="Question"
                        className="mb-2"
                      />
                      <Textarea
                        value={faq.answer}
                        onChange={(e) => {
                          const newFaqs = [...form.faqs];
                          newFaqs[index].answer = e.target.value;
                          setForm({ ...form, faqs: newFaqs });
                        }}
                        placeholder="Answer"
                        rows={2}
                      />
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setForm({ ...form, faqs: [...form.faqs, { question: '', answer: '' }] })
                    }
                  >
                    + Add FAQ
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                {editingId ? 'Update Project' : 'Add Project'}
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
          <div className="flex justify-between items-center">
            <CardTitle>
              All Projects ({projects.filter((p) => projectStatusFilter === 'all' || p.status === projectStatusFilter).length})
            </CardTitle>
            <Select
              value={projectStatusFilter}
              onValueChange={(value: 'all' | 'ongoing' | 'completed') => setProjectStatusFilter(value)}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {projects
              .filter((p) => projectStatusFilter === 'all' || p.status === projectStatusFilter)
              .map((project) => (
                <div key={project.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start gap-4">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-20 h-20 rounded object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h3 className="font-semibold">{project.title}</h3>
                        {project.isFlagship && (
                          <span className="px-2 py-1 rounded text-xs bg-amber-100 text-amber-700 font-semibold flex items-center gap-1">
                            <Award className="h-3 w-3" />
                            Flagship
                          </span>
                        )}
                        <span className="px-2 py-1 rounded text-xs bg-brand-100 text-brand-600">
                          {project.category}
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            project.status === 'ongoing'
                              ? 'bg-green-100 text-green-600'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {project.status === 'ongoing' ? 'Ongoing' : 'Completed'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                      <p className="text-xs text-gray-500">
                        {project.startDate} - {project.endDate}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">Slug: {project.slug}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(project)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          deleteProject(project.id);
                          toast.success('Project deleted');
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
