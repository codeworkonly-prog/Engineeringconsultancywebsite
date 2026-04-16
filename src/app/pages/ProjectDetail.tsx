import { useParams, Link, useNavigate } from "react-router-dom";
import { useContent } from "../contexts/ContentContext";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Calendar, ArrowLeft, Tag, Clock } from "lucide-react";

export function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { projects } = useContent();

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-gray-600 mb-8">
            The project you're looking for doesn't exist.
          </p>
          <Link to="/projects">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header Section */}
      <section className="bg-gradient-to-r from-brand-500 to-brand-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/projects">
            <Button variant="secondary" size="sm" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
          <div className="flex flex-wrap items-center gap-4">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
              {project.category}
            </span>
            <span
              className={`px-3 py-1 backdrop-blur-sm rounded-full text-sm ${
                project.status === "ongoing"
                  ? "bg-green-500/20"
                  : "bg-gray-500/20"
              }`}
            >
              {project.status === "ongoing" ? "Ongoing" : "Completed"}
            </span>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
                <p className="text-gray-700 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Project Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-brand-600 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500 mb-1">
                            Project Duration
                          </p>
                          <p className="font-semibold">
                            {project.startDate} - {project.endDate}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <Tag className="h-5 w-5 text-brand-600 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Category</p>
                          <p className="font-semibold">{project.category}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-brand-600 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Status</p>
                          <p className="font-semibold capitalize">
                            {project.status}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Contact Us</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Interested in learning more about this project or starting a
                    similar one?
                  </p>
                  <Link to="/contact">
                    <Button className="w-full">Get in Touch</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Other Projects</h3>
                  <div className="space-y-3">
                    {projects
                      .filter(
                        (p) =>
                          p.id !== project.id &&
                          p.category === project.category,
                      )
                      .slice(0, 3)
                      .map((relatedProject) => (
                        <Link
                          key={relatedProject.id}
                          to={`/projects/${relatedProject.slug}`}
                        >
                          <div className="flex gap-3 p-2 rounded hover:bg-gray-50 transition-colors cursor-pointer">
                            <img
                              src={relatedProject.imageUrl}
                              alt={relatedProject.title}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h4 className="text-sm font-semibold line-clamp-1">
                                {relatedProject.title}
                              </h4>
                              <p className="text-xs text-gray-500">
                                {relatedProject.category}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>
                  {projects.filter(
                    (p) =>
                      p.id !== project.id && p.category === project.category,
                  ).length === 0 && (
                    <p className="text-sm text-gray-500">
                      No related projects found.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
