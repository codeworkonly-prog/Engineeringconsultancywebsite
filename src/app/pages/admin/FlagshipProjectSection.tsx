import { useContent } from '../../contexts/ContentContext';
import { Award, CheckCircle } from 'lucide-react';

export function FlagshipProjectSection() {
  const { projects, clients } = useContent();

  // Find the flagship project
  const flagshipProject = projects.find((p) => p.isFlagship);

  // If no flagship project is set, don't render anything
  if (!flagshipProject) {
    return null;
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-brand-50 to-brand-100 rounded-lg p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Award className="h-8 w-8 text-brand-600" />
              <h2 className="text-3xl font-bold">Flagship Project Highlight</h2>
            </div>

            <h3 className="text-2xl font-semibold mb-4 text-brand-700">
              {flagshipProject.title}
            </h3>

            <p className="text-gray-700 mb-6">
              {flagshipProject.overview || flagshipProject.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Key Features Section */}
              {flagshipProject.keyFeatures && flagshipProject.keyFeatures.filter(Boolean).length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3">Key Highlights:</h4>
                  <ul className="space-y-2">
                    {flagshipProject.keyFeatures.filter(Boolean).map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <CheckCircle className="h-5 w-5 text-brand-600 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Testimonial or Result Section */}
              <div className="bg-white rounded-lg p-6">
                  {flagshipProject.clientTestimonial ? (
                    <div>
                      <p className="text-gray-700 italic mb-3">"{flagshipProject.clientTestimonial}"</p>
                      {clients.find((c) => c.id === flagshipProject.clientId)?.name && (
                        <p className="text-sm text-gray-600 font-medium">— {clients.find((c) => c.id === flagshipProject.clientId)?.name}</p>
                      )}
                    </div>
                  ) : flagshipProject.result ? (
                    <p className="text-gray-700 italic">{flagshipProject.result}</p>
                  ) : (
                    <p className="text-gray-700 italic">
                      This project demonstrates our capability to handle complex, large-scale infrastructure
                      projects with technical precision and professional excellence.
                    </p>
                  )}
                </div>
            </div>

            {/* Optional: Project Details */}
            {(clients.find((c) => c.id === flagshipProject.clientId)?.name || flagshipProject.location || flagshipProject.area) && (
              <div className="mt-6 pt-6 border-t border-brand-200">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  {clients.find((c) => c.id === flagshipProject.clientId)?.name && (
                    <div>
                      <span className="text-gray-600">Client:</span>
                      <span className="ml-2 font-semibold text-gray-800">{clients.find((c) => c.id === flagshipProject.clientId)?.name}</span>
                    </div>
                  )}
                  {flagshipProject.location && (
                    <div>
                      <span className="text-gray-600">Location:</span>
                      <span className="ml-2 font-semibold text-gray-800">{flagshipProject.location}</span>
                    </div>
                  )}
                  {flagshipProject.area && (
                    <div>
                      <span className="text-gray-600">Area:</span>
                      <span className="ml-2 font-semibold text-gray-800">{flagshipProject.area}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
