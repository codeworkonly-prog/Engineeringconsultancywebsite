import { useState } from 'react';
import { Link } from 'react-router';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useContent } from '../contexts/ContentContext';
import { MapPin, Calendar, ArrowRight,LayoutGrid, Table2 } from 'lucide-react';
import { PortfolioFilters as PortfolioFiltersComponent } from '../components/portfolio/PortfolioFilters';
import { PortfolioFiltersState } from '../../types/portfolio.types';

type ProjectStatus = 'upcoming' | 'ongoing' | 'completed';

export function Projects() {
  const { projects, galleryImages, portfolio, clients } = useContent();
    const [view, setView] = useState<'grid' | 'table'>('grid');
  const [filters, setFilters] = useState<PortfolioFiltersState>({
    type: 'all',
    sector: undefined,
    fiscalYear: undefined,
    client: undefined,
    search: '',
  });
  const [visibleCount, setVisibleCount] = useState(6);

  const projectItems = [
    ...projects.map((project) => ({
      id: `project-${project.id}`,
      title: project.title,
      description: project.description,
      projectType: project.projectType,
      imageUrl: project.imageUrl,
      status: project.status as ProjectStatus,
      slug: project.slug,
      location: project.location,
      completionDate: project.completionDate,
      sector: undefined as string | undefined,
      fiscalYear: undefined as string | undefined,
      clientId: undefined as string | undefined,
    })),
    ...portfolio
      .filter((item) => item.type === 'project')
      .map((item) => ({
        id: `portfolio-${item.id}`,
        title: item.title,
        description: item.shortDescription,
        projectType: item.projectType || 'Project',
        imageUrl: item.featuredImage,
        status: (item.status || 'ongoing') as ProjectStatus,
        slug: item.slug,
        location: item.location,
        completionDate: item.endDate,
        sector: item.sector,
        fiscalYear: item.fiscalYear,
        clientId: item.clientId,
      })),
  ];

  const filterValues = {
    sectors: [...new Set(projectItems.map((p) => p.sector).filter(Boolean))] as string[],
    fiscalYears: [...new Set(projectItems.map((p) => p.fiscalYear).filter(Boolean))] as string[],
  };

  const resetVisibleCount = () => setVisibleCount(6);

  const updateFilters = (updates: Partial<PortfolioFiltersState>) => {
    setFilters((current) => ({ ...current, ...updates }));
    resetVisibleCount();
  };

  const clearFilters = () => {
    setFilters({
      type: 'all',
      sector: undefined,
      fiscalYear: undefined,
      client: undefined,
      search: '',
    });
    resetVisibleCount();
  };

  const filteredProjects = projectItems.filter((project) => {
    const search = (filters.search || '').toLowerCase();
    const matchesSearch =
      !search ||
      project.title.toLowerCase().includes(search) ||
      project.description.toLowerCase().includes(search) ||
      (project.location || '').toLowerCase().includes(search);
    const matchesSector = !filters.sector || project.sector === filters.sector;
    const matchesFiscalYear = !filters.fiscalYear || project.fiscalYear === filters.fiscalYear;
    const matchesClient = !filters.client || project.clientId === filters.client;

    return matchesSearch && matchesSector && matchesFiscalYear && matchesClient;
  });

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  const hasActiveFilters =
    Boolean(filters.sector) ||
    Boolean(filters.fiscalYear) ||
    Boolean(filters.client) ||
    Boolean(filters.search);

  const isEmpty = filteredProjects.length === 0;

  const statusLabel = (status: ProjectStatus) => {
    if (status === 'upcoming') return 'Upcoming';
    if (status === 'ongoing') return 'Ongoing';
    return 'Completed';
  };

  const statusClass = (status: ProjectStatus) => {
    if (status === 'upcoming') return 'bg-blue-500 text-white';
    if (status === 'ongoing') return 'bg-green-500 text-white';
    return 'bg-gray-800 text-white';
  };

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-brand-500 to-brand-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Our Projects</h1>
          <p className="text-xl text-brand-50 max-w-3xl">
            Explore our growing portfolio of infrastructure, design-build, and contract projects delivered across Nepal.
          </p>
          <div className="mt-8">
            <p className="text-3xl font-bold">{projectItems.length}+</p>
            <p className="mt-1 text-sm text-brand-100">Projects Delivered Across Nepal</p>
          </div>
        </div>
      </section>

      {/* ── Filters ──────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PortfolioFiltersComponent
          filters={filters}
          filterValues={filterValues}
          clients={clients}
          pagination={{
            visibleCount: visibleProjects.length,
            filteredCount: filteredProjects.length,
            page: 1,
            totalPages: 1,
            itemLabel: 'projects',
          }}
          hasActiveFilters={hasActiveFilters}
          isEmpty={isEmpty}
          showTypeFilter={false}
          extraControls={
            <div className="flex items-center rounded-md border border-slate-200 overflow-hidden">
              <button
                onClick={() => setView('grid')}
                className={`p-2 transition-colors ${view === 'grid' ? 'bg-slate-900 text-white' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
                title="Grid view"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setView('table')}
                className={`p-2 transition-colors ${view === 'table' ? 'bg-slate-900 text-white' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
                title="Table view"
              >
                <Table2 className="h-4 w-4" />
              </button>
            </div>
          }
          onUpdateFilters={updateFilters}
          onClearFilters={clearFilters}
          onDownloadCsv={() => {}}
        />
      </div>

      {/* ── Project Grid ─────────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {isEmpty ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No projects found matching your criteria.</p>
              <Button variant="outline" onClick={clearFilters} className="mt-4">
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visibleProjects.map((project) => (
                  <Link key={project.id} to={`/projects/${project.slug}`}>
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full group">
                      <div className="relative overflow-hidden">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-4 right-4">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusClass(project.status)}`}>
                            {statusLabel(project.status)}
                          </span>
                        </div>
                      </div>
                      <CardContent className="pt-6">
                        <div className="mb-3">
                          <span className="px-3 py-1 bg-brand-100 text-brand-600 text-xs rounded-full font-medium">
                            {project.projectType}
                          </span>
                        </div>
                        <h3 className="font-semibold text-xl mb-2 group-hover:text-brand-600 transition-colors">
                          {project.title}
                        </h3>
                        {project.location && (
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                            <MapPin className="h-4 w-4" />
                            <span>{project.location}</span>
                          </div>
                        )}
                        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                          {project.description}
                        </p>
                        {project.completionDate && (
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                            <Calendar className="h-4 w-4" />
                            <span>Completed: {new Date(project.completionDate).toLocaleDateString()}</span>
                          </div>
                        )}
                        <div className="flex items-center text-brand-600 text-sm font-medium group-hover:gap-2 transition-all">
                          <span>View Project</span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {hasMore && (
                <div className="text-center mt-12">
                  <Button size="lg" variant="outline" onClick={() => setVisibleCount((prev) => prev + 6)}>
                    Load More Projects
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── Gallery ──────────────────────────────────────────────────────── */}
      {galleryImages.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Project Gallery</h2>
              <p className="text-gray-600">A glimpse into our work and achievements</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.slice(0, 6).map((image) => (
                <div key={image.id} className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow group">
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="font-semibold">{image.title}</h3>
                      <p className="text-xs text-gray-300">{image.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-brand-600 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Have a Project in Mind?</h2>
          <p className="text-xl mb-8 text-brand-50">
            Let's collaborate to turn your vision into reality
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary">
              Contact Us Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
