import { useState } from 'react';
import { Link } from 'react-router';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useContent } from '../contexts/ContentContext';
import { MapPin, Calendar, ArrowRight, LayoutGrid, Table2, Layers, MapPinned, ShieldCheck, Handshake, Clock, Leaf } from 'lucide-react';
import { PortfolioFilters as PortfolioFiltersComponent } from '../components/portfolio/PortfolioFilters';
import { PortfolioFiltersState } from '../../types/portfolio.types';
import project1 from '../../imports/project1.jpg';
import project2 from '../../imports/project2.jpg';
import project3 from '../../imports/project3.jpg';
import project4 from '../../imports/project4.jpg';
import project5 from '../../imports/project5.jpg';
import project6 from '../../imports/project6.jpg';

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
    setFilters({ type: 'all', sector: undefined, fiscalYear: undefined, client: undefined, search: '' });
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

  const heroImages = [project1, project2, project3, project4, project5, project6];

  const whyDcp = [
    { icon: Layers, title: 'End-to-End Delivery', description: 'We handle every phase — design, procurement, supervision, and handover — so you deal with one trusted team throughout.' },
    { icon: MapPinned, title: 'Deep Local Knowledge', description: "Decades of on-the-ground experience across Nepal means we understand the terrain, regulations, and stakeholders that others don't." },
    { icon: ShieldCheck, title: 'Technical Rigor', description: 'Our engineers apply international standards to every BOQ, drawing, and quality check — no shortcuts, no compromises.' },
    { icon: Handshake, title: 'Client-First Approach', description: 'We align our success with yours. Transparent communication, realistic timelines, and accountability at every milestone.' },
    { icon: Clock, title: 'On-Time, On-Budget', description: 'Rigorous project scheduling and cost control mean our clients consistently receive what was promised, when it was promised.' },
    { icon: Leaf, title: 'Sustainable Impact', description: 'Every project we deliver is designed to serve communities for decades — environmentally sound and socially responsible.' },
  ];

  const viewToggle = (
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
  );

  return (
    <div>

      {/*  Hero  */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 text-white min-h-[580px] flex items-center">

        {/* Blueprint grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Left glow */}
        <div className="absolute -left-20 top-0 bottom-0 w-[360px] bg-cyan-500/10 blur-[100px] pointer-events-none" />

        {/* ── 6-image mosaic ── */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[70%] w-[58%] hidden lg:grid grid-cols-3 gap-2 p-2">
          {heroImages.slice(0, 6).map((src, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl shadow-lg"
            >
              <img
                src={src}
                alt={`Project ${i + 1}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-brand-900/20 transition-all duration-500 group-hover:bg-brand-900/10" />

              {/* Optional subtle gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          ))}
        </div>

        {/* Gradient bridge — text bleeds into mosaic */}
        <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-brand-900/20 via-brand-900/50 to-transparent pointer-events-none" />

        {/* ── Text content ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="max-w-lg">

            <h1 className="text-5xl lg:text-[3.75rem] font-bold leading-[1.05] tracking-tight mb-6">
              Projects Built<br />
              <span className="text-brand-200">Across Nepal</span>
            </h1>

            <p className="text-brand-200/70 text-base leading-relaxed max-w-sm">
              Infrastructure, design-build, and contract projects delivered on time
              and at scale across Nepal.
            </p>

            <div className="mt-10 flex items-stretch gap-10">
              <div className="flex items-start gap-4">
                <div className="w-px self-stretch bg-cyan-400 mt-1" />
                <div>
                  <div className="text-4xl font-bold">{projectItems.length}+</div>
                  <div className="text-brand-300/60 text-sm mt-1">Projects Delivered</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-px self-stretch bg-white/20 mt-1" />
                <div>
                  <div className="text-4xl font-bold">14+</div>
                  <div className="text-brand-300/60 text-sm mt-1">Districts Covered</div>
                </div>
              </div>
            </div>

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
            visibleCount: view === 'grid' ? visibleProjects.length : filteredProjects.length,
            filteredCount: filteredProjects.length,
            page: 1,
            totalPages: 1,
            itemLabel: 'projects',
          }}
          hasActiveFilters={hasActiveFilters}
          isEmpty={isEmpty}
          showTypeFilter={false}
          extraControls={viewToggle}
          onUpdateFilters={updateFilters}
          onClearFilters={clearFilters}
          onDownloadCsv={() => { }}
        />
      </div>

      {/* ── Project Grid / Table ─────────────────────────────────────────── */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {isEmpty ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No projects found matching your criteria.</p>
              <Button variant="outline" onClick={clearFilters} className="mt-4">Clear Filters</Button>
            </div>
          ) : view === 'grid' ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visibleProjects.map((project) => (
                  <Link key={project.id} to={`/projects/${project.slug}`}>
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full group">
                      <div className="relative overflow-hidden">
                        {project.imageUrl ? (
                          <img
                            src={project.imageUrl}
                            alt={project.title}
                            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="h-64 bg-gradient-to-br from-brand-600 via-brand-500 to-slate-800" />
                        )}
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
                        <p className="text-sm text-gray-600 line-clamp-3 mb-4">{project.description}</p>
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
          ) : (
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
              <table className="w-full">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider">S.N</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider">Project</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider">Type</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider">Status</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider">Location</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider">Completed</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProjects.map((project, index) => (
                    <tr key={project.id} className="hover:bg-cyan-50/60 transition-colors">
                      <td className="px-5 py-4 text-sm text-slate-500">{index + 1}</td>
                      <td className="px-5 py-4">
                        <div className="font-semibold text-slate-900">{project.title}</div>
                        <div className="text-xs text-slate-500 mt-0.5 line-clamp-1">{project.description}</div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold bg-blue-50 text-blue-700 ring-1 ring-blue-100">
                          {project.projectType}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass(project.status)}`}>
                          {statusLabel(project.status)}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-700">{project.location || '-'}</td>
                      <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">
                        {project.completionDate ? new Date(project.completionDate).toLocaleDateString() : '-'}
                      </td>
                      <td className="px-5 py-4">
                        <Link to={`/projects/${project.slug}`} className="flex items-center gap-1 text-sm font-medium text-brand-600 hover:gap-2 transition-all">
                          View <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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

      {/* ── Why DCP ──────────────────────────────────────────────────────── */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Work With Us?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From feasibility to handover, we bring technical precision and local expertise to every project we undertake.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyDcp.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-brand-100 p-3 rounded-full w-fit mb-4">
                  <Icon className="h-6 w-6 text-brand-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-slate-900">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA  */}
      <section className="py-16 bg-brand-600 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Have a Project in Mind?</h2>
          <p className="text-xl mb-8 text-brand-50">Let's collaborate to turn your vision into reality</p>
          <Link to="/contact">
            <Button size="lg" variant="secondary">Contact Us Today</Button>
          </Link>
        </div>
      </section>

    </div>
  );
}