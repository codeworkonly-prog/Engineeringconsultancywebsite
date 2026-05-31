import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Checkbox } from '../../components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { useContent } from '../../contexts/ContentContext';
import { toast } from 'sonner';
import { Award, Edit, Search, Trash2, X } from 'lucide-react';
import {
  PortfolioItem,
  PortfolioStatus,
  PortfolioType,
  defaultPortfolioFormData,
} from '../../../types/portfolio.types';

type TypeFilter = PortfolioType | 'all';
type StatusFilter = PortfolioStatus | 'all';
type PortfolioFormErrors = Partial<Record<keyof PortfolioItem, string>>;

const createEmptyForm = (): PortfolioItem => ({ ...defaultPortfolioFormData });
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const formatType = (type: PortfolioType) => {
  const labels: Record<PortfolioType, string> = {
    project: 'Project',
    consulting: 'Consulting',
    training: 'Training & Event',
  };

  return labels[type];
};

const isValidFiscalYear = (value: string) => {
  const match = value.match(/^(\d{4})\/(\d{2})$/);
  if (!match) return false;

  const startYear = Number(match[1]);
  const endYear = Number(match[2]);
  const expectedEndYear = (startYear + 1) % 100;

  return endYear === expectedEndYear;
};

const isValidImagePath = (value: string) =>
  /^(https?:\/\/|data:image\/|\/|\.\/|\.\.\/).+/.test(value) ||
  /^[\w./-]+\.(?:avif|gif|jpe?g|png|svg|webp)(?:\?.*)?$/.test(value);

const getFieldError = (errors: PortfolioFormErrors, field: keyof PortfolioItem) =>
  errors[field] ? (
    <p className="mt-1 text-sm text-red-600">{errors[field]}</p>
  ) : null;

export function PortfolioSection() {
  const {
    portfolio,
    addPortfolioItem,
    updatePortfolioItem,
    deletePortfolioItem,
  } = useContent();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [form, setForm] = useState<PortfolioItem>(createEmptyForm);
  const [errors, setErrors] = useState<PortfolioFormErrors>({});
  const selectedTypeLabel = formatType(form.type).toLowerCase();

  const currentFlagshipItem = useMemo(
    () => portfolio.find((item) => item.isFlagship && item.type === form.type),
    [portfolio, form.type]
  );

  const updateForm = <K extends keyof PortfolioItem>(
    key: K,
    value: PortfolioItem[K]
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;

      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const generateSlug = (title: string, existingId?: string) => {
    const baseSlug = title
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    if (!baseSlug) return '';

    const slugExists = (slug: string) =>
      portfolio.some((item) => item.slug === slug && item.id !== existingId);

    let slug = baseSlug;
    let counter = 1;

    while (slugExists(slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    return slug;
  };

  const handleTitleChange = (title: string) => {
    setForm((current) => ({
      ...current,
      title,
      slug: generateSlug(title, editingId || undefined),
    }));
    setErrors((current) => {
      if (!current.title && !current.slug) return current;

      const next = { ...current };
      delete next.title;
      delete next.slug;
      return next;
    });
  };

  const resetForm = () => {
    setForm(createEmptyForm());
    setEditingId(null);
    setErrors({});
  };

  const getPayload = () => {
    const { id, ...payload } = form;
    const now = new Date().toISOString();
    const slug = form.slug.trim() || generateSlug(form.title, editingId || undefined);

    return {
      ...payload,
      title: form.title.trim(),
      slug,
      shortDescription: form.shortDescription.trim(),
      overview: form.overview?.trim(),
      featuredImage: form.featuredImage.trim(),
      sector: form.sector?.trim(),
      client: form.client?.trim(),
      clientLogo: form.clientLogo?.trim(),
      partnerFirms: form.partnerFirms?.trim(),
      fiscalYear: form.fiscalYear?.trim(),
      location: form.location?.trim(),
      projectType: form.projectType?.trim(),
      contractAmount: form.contractAmount?.trim(),
      serviceType: form.serviceType?.trim(),
      trainingType: form.trainingType?.trim(),
      updatedAt: now,
      createdAt: form.createdAt || now,
    };
  };

  const validateForm = () => {
    const nextErrors: PortfolioFormErrors = {};
    const title = form.title.trim();
    const slug = form.slug.trim() || generateSlug(title, editingId || undefined);
    const fiscalYear = form.fiscalYear?.trim();
    const featuredImage = form.featuredImage.trim();
    const clientLogo = form.clientLogo?.trim();

    if (!title) nextErrors.title = 'Title is required';
    if (!slug) nextErrors.slug = 'Slug is required';
    if (slug && !slugPattern.test(slug)) {
      nextErrors.slug = 'Use lowercase letters, numbers, and hyphens only';
    }
    if (
      slug &&
      portfolio.some((item) => item.slug === slug && item.id !== editingId)
    ) {
      nextErrors.slug = 'This slug is already used by another portfolio item';
    }
    if (!form.shortDescription.trim()) {
      nextErrors.shortDescription = 'Short description is required';
    }
    if (!featuredImage) {
      nextErrors.featuredImage = 'Featured image is required';
    } else if (!isValidImagePath(featuredImage)) {
      nextErrors.featuredImage = 'Enter a valid image URL or relative path';
    }
    if (clientLogo && !isValidImagePath(clientLogo)) {
      nextErrors.clientLogo = 'Enter a valid logo URL or relative path';
    }
    if (fiscalYear && !isValidFiscalYear(fiscalYear)) {
      nextErrors.fiscalYear = 'Use YYYY/YY with the next year, e.g. 2080/81';
    }
    if (form.startDate && form.endDate && form.endDate < form.startDate) {
      nextErrors.endDate = 'End date cannot be before start date';
    }

    if (form.type === 'project') {
      if (!form.projectType?.trim()) nextErrors.projectType = 'Project type is required';
      if (!form.contractAmount?.trim()) nextErrors.contractAmount = 'Contract amount is required';
    }
    if (form.type === 'consulting' && !form.serviceType?.trim()) {
      nextErrors.serviceType = 'Service type is required';
    }
    if (form.type === 'training') {
      if (!form.trainingType?.trim()) nextErrors.trainingType = 'Training type is required';
      if (!form.mode) nextErrors.mode = 'Mode is required';
    }

    return nextErrors;
  };

  const clearOtherFlagshipItems = async (
    currentSlug: string,
    currentType: PortfolioType
  ) => {
    const updates = portfolio
      .filter(
        (item) =>
          item.isFlagship &&
          item.type === currentType &&
          item.id !== editingId &&
          item.slug !== currentSlug
      )
      .map((item) => {
        const { id, ...payload } = item;

        return updatePortfolioItem(id, {
          ...payload,
          isFlagship: false,
          updatedAt: new Date().toISOString(),
        });
      });

    await Promise.all(updates);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.error('Please fix the highlighted fields');
      return;
    }

    try {
      const payload = getPayload();

      if (editingId) {
        await updatePortfolioItem(editingId, payload);
        toast.success('Portfolio item updated');
      } else {
        await addPortfolioItem(payload);
        toast.success('Portfolio item added');
      }

      if (payload.isFlagship) {
        await clearOtherFlagshipItems(payload.slug, payload.type);
      }

      resetForm();
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong while saving');
    }
  };

  const handleEdit = (item: PortfolioItem) => {
    setForm({ ...createEmptyForm(), ...item });
    setEditingId(item.id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this portfolio item?')) return;

    try {
      await deletePortfolioItem(id);
      if (editingId === id) resetForm();
      toast.success('Portfolio item deleted');
    } catch (error) {
      console.error(error);
      toast.error('Delete failed');
    }
  };

  const filteredPortfolio = useMemo(() => {
    const search = searchQuery.trim().toLowerCase();

    return portfolio.filter((item) => {
      const matchesType = typeFilter === 'all' || item.type === typeFilter;
      const matchesStatus =
        statusFilter === 'all' || item.status === statusFilter;
      const matchesSearch =
        !search ||
        [
          item.title,
          item.shortDescription,
          item.client,
          item.sector,
          item.location,
          item.fiscalYear,
        ]
          .filter(Boolean)
          .some((value) => value!.toLowerCase().includes(search));

      return matchesType && matchesStatus && matchesSearch;
    });
  }, [portfolio, typeFilter, statusFilter, searchQuery]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {editingId ? 'Edit Portfolio Item' : 'Add Portfolio Item'}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <Label>Type *</Label>
                <Select
                  value={form.type}
                  onValueChange={(value) => updateForm('type', value as PortfolioType)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="project">Project</SelectItem>
                    <SelectItem value="consulting">Consulting Services</SelectItem>
                    <SelectItem value="training">Training</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Status</Label>
                <Select
                  value={form.status || 'ongoing'}
                  onValueChange={(value) => updateForm('status', value as PortfolioStatus)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Fiscal Year</Label>
                <Input
                  value={form.fiscalYear || ''}
                  onChange={(event) => updateForm('fiscalYear', event.target.value)}
                  placeholder="2080/81"
                  aria-invalid={Boolean(errors.fiscalYear)}
                />
                {getFieldError(errors, 'fiscalYear')}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label>Title *</Label>
                <Input
                  value={form.title}
                  onChange={(event) => handleTitleChange(event.target.value)}
                  required
                  aria-invalid={Boolean(errors.title)}
                />
                {getFieldError(errors, 'title')}
              </div>

              <div>
                <Label>Slug</Label>
                <Input
                  value={form.slug}
                  onChange={(event) => updateForm('slug', event.target.value)}
                  placeholder="auto-generated-from-title"
                  aria-invalid={Boolean(errors.slug)}
                />
                {getFieldError(errors, 'slug')}
              </div>
            </div>

            <div>
              <Label>Short Description *</Label>
              <Textarea
                value={form.shortDescription}
                onChange={(event) => updateForm('shortDescription', event.target.value)}
                required
                aria-invalid={Boolean(errors.shortDescription)}
              />
              {getFieldError(errors, 'shortDescription')}
            </div>

            <div>
              <Label>Overview</Label>
              <Textarea
                value={form.overview || ''}
                onChange={(event) => updateForm('overview', event.target.value)}
                rows={5}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label>Client</Label>
                <Input
                  value={form.client || ''}
                  onChange={(event) => updateForm('client', event.target.value)}
                />
              </div>

              <div>
                <Label>Partner Firms</Label>
                <Input
                  value={form.partnerFirms || ''}
                  onChange={(event) => updateForm('partnerFirms', event.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label>Sector</Label>
                <Input
                  value={form.sector || ''}
                  onChange={(event) => updateForm('sector', event.target.value)}
                />
              </div>

              <div>
                <Label>Location</Label>
                <Input
                  value={form.location || ''}
                  onChange={(event) => updateForm('location', event.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label>Start Date</Label>
                <Input
                  type="date"
                  value={form.startDate || ''}
                  onChange={(event) => updateForm('startDate', event.target.value)}
                />
              </div>

              <div>
                <Label>End Date</Label>
                <Input
                  type="date"
                  value={form.endDate || ''}
                  onChange={(event) => updateForm('endDate', event.target.value)}
                  aria-invalid={Boolean(errors.endDate)}
                />
                {getFieldError(errors, 'endDate')}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label>Featured Image *</Label>
                <Input
                  value={form.featuredImage}
                  onChange={(event) => updateForm('featuredImage', event.target.value)}
                  placeholder="https://..."
                  required
                  aria-invalid={Boolean(errors.featuredImage)}
                />
                {getFieldError(errors, 'featuredImage')}
              </div>

              <div>
                <Label>Client Logo</Label>
                <Input
                  value={form.clientLogo || ''}
                  onChange={(event) => updateForm('clientLogo', event.target.value)}
                  placeholder="https://..."
                  aria-invalid={Boolean(errors.clientLogo)}
                />
                {getFieldError(errors, 'clientLogo')}
              </div>
            </div>

            {form.featuredImage && (
              <img
                src={form.featuredImage}
                alt={form.title || 'Portfolio preview'}
                className="h-44 w-full rounded-lg border object-cover"
              />
            )}

            {form.type === 'project' && (
              <div className="space-y-3 rounded-lg border p-4">
                <h3 className="font-semibold">Project Details</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Input
                    placeholder="Project Type"
                    value={form.projectType || ''}
                    onChange={(event) => updateForm('projectType', event.target.value)}
                    aria-invalid={Boolean(errors.projectType)}
                  />
                  <Input
                    placeholder="Contract Amount"
                    value={form.contractAmount || ''}
                    onChange={(event) => updateForm('contractAmount', event.target.value)}
                    aria-invalid={Boolean(errors.contractAmount)}
                  />
                </div>
                {getFieldError(errors, 'projectType')}
                {getFieldError(errors, 'contractAmount')}
              </div>
            )}

            {form.type === 'consulting' && (
              <div className="space-y-3 rounded-lg border p-4">
                <h3 className="font-semibold">Consulting Details</h3>
                <Input
                  placeholder="Service Type"
                  value={form.serviceType || ''}
                  onChange={(event) => updateForm('serviceType', event.target.value)}
                  aria-invalid={Boolean(errors.serviceType)}
                />
                {getFieldError(errors, 'serviceType')}
              </div>
            )}

            {form.type === 'training' && (
              <div className="space-y-3 rounded-lg border p-4">
                <h3 className="font-semibold">Training & Event Details</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Input
                    placeholder="Training Type"
                    value={form.trainingType || ''}
                    onChange={(event) => updateForm('trainingType', event.target.value)}
                    aria-invalid={Boolean(errors.trainingType)}
                  />
                  <Select
                    value={form.mode || 'physical'}
                    onValueChange={(value) =>
                      updateForm('mode', value as 'online' | 'physical' | 'hybrid')
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="physical">Physical</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {getFieldError(errors, 'trainingType')}
                {getFieldError(errors, 'mode')}
              </div>
            )}

            <label className="flex items-center gap-2 text-sm font-medium">
              <Checkbox
                checked={Boolean(form.isFlagship)}
                onCheckedChange={(checked) => updateForm('isFlagship', checked === true)}
              />
              Flagship {selectedTypeLabel}
            </label>

            {currentFlagshipItem && currentFlagshipItem.id !== editingId && form.isFlagship && (
              <p className="text-sm text-amber-700">
                Saving this will replace the current flagship {selectedTypeLabel}: {currentFlagshipItem.title}.
              </p>
            )}

            <div className="flex gap-2 border-t pt-4">
              <Button type="submit" className="flex-1">
                {editingId ? 'Update Portfolio Item' : 'Add Portfolio Item'}
              </Button>

              {editingId && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle>Portfolio ({filteredPortfolio.length})</CardTitle>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_160px_160px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  className="pl-10"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
              </div>

              <Select
                value={typeFilter}
                onValueChange={(value) => setTypeFilter(value as TypeFilter)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="project">Projects</SelectItem>
                  <SelectItem value="consulting">Consulting Services</SelectItem>
                  <SelectItem value="training">Training</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value as StatusFilter)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            {filteredPortfolio.length === 0 ? (
              <div className="rounded-lg border border-dashed p-8 text-center text-sm text-gray-500">
                No portfolio items found.
              </div>
            ) : (
              filteredPortfolio.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 rounded-lg border p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold">{item.title}</h3>
                      {item.isFlagship && (
                        <Award className="h-4 w-4 text-yellow-500" />
                      )}
                      <span className="rounded bg-gray-100 px-2 py-1 text-xs">
                        {formatType(item.type)}
                      </span>
                      {item.status && (
                        <span className="rounded bg-gray-100 px-2 py-1 text-xs">
                          {item.status}
                        </span>
                      )}
                    </div>

                    <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                      {item.shortDescription}
                    </p>

                    <p className="mt-2 text-xs text-gray-500">
                      {[item.client, item.sector, item.fiscalYear]
                        .filter(Boolean)
                        .join(' • ') || item.slug}
                    </p>
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      type="button"
                      onClick={() => handleEdit(item)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>

                    <Button
                      size="sm"
                      variant="ghost"
                      type="button"
                      onClick={() => handleDelete(item.id)}
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
    </div>
  );
}
