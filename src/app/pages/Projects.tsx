import { useState } from 'react';
import { Link } from 'react-router';
import { Card, CardContent } from '../components/ui/card';
import { useContent } from '../contexts/ContentContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Calendar } from 'lucide-react';

export function Projects() {
  const { projects, galleryImages } = useContent();
  const [activeTab, setActiveTab] = useState<'all' | 'Design and Build' | 'Contract'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'ongoing' | 'completed'>('all');

  const filteredProjects = projects
    .filter((p) => activeTab === 'all' || p.projectType === activeTab)
    .filter((p) => statusFilter === 'all' || p.status === statusFilter);

  return (
    <div>
      {/* Header Section */}
      <section className="bg-gradient-to-r from-brand-500 to-brand-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Our Projects</h1>
          <p className="text-xl text-brand-50 max-w-3xl">
            Explore our portfolio of successful engineering projects and see how we deliver excellence
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'all' | 'Design and Build' | 'Contract')} className="flex-1">
              <TabsList className="grid w-full max-w-2xl grid-cols-3">
                <TabsTrigger value="all">All Projects</TabsTrigger>
                <TabsTrigger value="Design and Build">Design and Build</TabsTrigger>
                <TabsTrigger value="Contract">Contract</TabsTrigger>
              </TabsList>
            </Tabs>

            <Select
              value={statusFilter}
              onValueChange={(value: 'all' | 'ongoing' | 'completed') => setStatusFilter(value)}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Link key={project.id} to={`/projects/${project.slug}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-56 object-cover"
                  />
                  <CardContent className="pt-6">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-brand-100 text-brand-600 text-xs rounded-full">
                        {project.projectType}
                      </span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-600 text-xs rounded-full">
                        {project.category}
                      </span>
                      <span className={`px-3 py-1 text-xs rounded-full ${
                        project.status === 'ongoing' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {project.status === 'ongoing' ? 'Ongoing' : 'Completed'}
                      </span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500 mb-3">
                      <Calendar className="h-3 w-3 mr-1" />
                      {project.startDate} - {project.endDate}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No projects found in this category.
            </div>
          )}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Project Gallery</h2>
            <p className="text-gray-600">
              A glimpse into our work and team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image) => (
              <div
                key={image.id}
                className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow group"
              >
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
    </div>
  );
}