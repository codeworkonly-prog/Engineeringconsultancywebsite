import { useState } from 'react';
import { Link } from 'react-router';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Button } from '../components/ui/button';
import { useContent } from '../contexts/ContentContext';
import { Search, MapPin, Calendar, ArrowRight } from 'lucide-react';

type ProjectStatus = 'upcoming' | 'ongoing' | 'completed';

export function Projects() {
  const { projects, galleryImages, portfolio } = useContent();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | ProjectStatus>('all');
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
    })),
    ...portfolio
      .filter((item) => item.type === 'project')
      .map((item) => ({
        id: `portfolio-${item.id}`,
        title: item.title,
        description: item.shortDescription,
        projectType: item.projectType || 'Project',
        imageUrl: item.featuredImage,
        status: item.status || 'ongoing',
        slug: item.slug,
        location: item.location,
        completionDate: item.endDate,
      })),
  ];

  const locations = ['all', ...new Set(projectItems.map((p) => p.location).filter(Boolean))];
  const projectTypes = ['all', ...new Set(projectItems.map((p) => p.projectType).filter(Boolean))];

  const resetVisibleCount = () => setVisibleCount(6);

  const clearFilters = () => {
    setSearchQuery('');
    setTypeFilter('all');
    setLocationFilter('all');
    setStatusFilter('all');
    resetVisibleCount();
  };

  const filteredProjects = projectItems.filter((project) => {
    const search = searchQuery.toLowerCase();
    const matchesSearch =
      !search ||
      project.title.toLowerCase().includes(search) ||
      project.description.toLowerCase().includes(search) ||
      (project.location || '').toLowerCase().includes(search);
    const matchesType = typeFilter === 'all' || project.projectType === typeFilter;
    const matchesLocation = locationFilter === 'all' || project.location === locationFilter;
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;

    return matchesSearch && matchesType && matchesLocation && matchesStatus;
  });

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

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
      <section className="bg-gradient-to-r from-brand-500 to-brand-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-4">Our Projects</h1>
            <div className="flex items-center gap-2 mb-8">
              <button
                onClick={() => {
                  setTypeFilter('Design and Build');
                  resetVisibleCount();
                }}
                className={`text-xl transition-all ${
                  typeFilter === 'Design and Build'
                    ? 'text-white font-semibold underline underline-offset-4'
                    : 'text-brand-100 hover:text-white'
                }`}
              >
                Design & Build
              </button>
              <span className="text-xl text-brand-50">|</span>
              <button
                onClick={() => {
                  setTypeFilter('Contract');
                  resetVisibleCount();
                }}
                className={`text-xl transition-all ${
                  typeFilter === 'Contract'
                    ? 'text-white font-semibold underline underline-offset-4'
                    : 'text-brand-100 hover:text-white'
                }`}
              >
                Contract Projects
              </button>
              {typeFilter !== 'all' && (
                <>
                  <span className="text-xl text-brand-50">|</span>
                  <button
                    onClick={() => {
                      setTypeFilter('all');
                      resetVisibleCount();
                    }}
                    className="text-lg text-brand-100 hover:text-white transition-colors"
                  >
                    View All
                  </button>
                </>
              )}
            </div>

            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search projects by name, description, or location..."
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  resetVisibleCount();
                }}
                className="pl-12 h-14 text-lg bg-white text-gray-900"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-b sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-wrap gap-3 items-center">
              <span className="text-sm font-medium text-gray-700">Filter by:</span>

              <Select
                value={typeFilter}
                onValueChange={(value) => {
                  setTypeFilter(value);
                  resetVisibleCount();
                }}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {projectTypes.map((projectType) => (
                    <SelectItem key={projectType} value={projectType}>
                      {projectType === 'all' ? 'All Types' : projectType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={locationFilter}
                onValueChange={(value) => {
                  setLocationFilter(value);
                  resetVisibleCount();
                }}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations
                    .filter((location) => location !== 'all')
                    .map((location) => (
                      <SelectItem key={location} value={location as string}>
                        {location}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              <Select
                value={statusFilter}
                onValueChange={(value) => {
                  setStatusFilter(value as 'all' | ProjectStatus);
                  resetVisibleCount();
                }}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="text-sm text-gray-600">
              Showing {visibleProjects.length} of {filteredProjects.length} projects
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
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

      {galleryImages.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

      <section className="py-16 bg-brand-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
