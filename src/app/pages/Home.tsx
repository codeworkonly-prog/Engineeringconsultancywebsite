import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { CheckCircle, Users, Award, Briefcase } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

export function Home() {
  const { projects } = useContent();
  const featuredProjects = projects.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Engineering Excellence for Your Projects
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              We provide comprehensive engineering consultancy and project management services
              to bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
              <Link to="/projects">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
                >
                  View Projects
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We combine expertise, innovation, and dedication to deliver exceptional results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-4">
                    <CheckCircle className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Quality Assurance</h3>
                  <p className="text-sm text-gray-600">
                    Rigorous quality standards on every project
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-4">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Expert Team</h3>
                  <p className="text-sm text-gray-600">
                    Experienced professionals in every discipline
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-4">
                    <Award className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Award Winning</h3>
                  <p className="text-sm text-gray-600">
                    Recognized excellence in engineering
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-4">
                    <Briefcase className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Full Service</h3>
                  <p className="text-sm text-gray-600">
                    From consultation to project completion
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
            <p className="text-gray-600">
              Take a look at some of our recent work
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="pt-6">
                  <div className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-xs rounded-full mb-3">
                    {project.category}
                  </div>
                  <h3 className="font-semibold mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-600">{project.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/projects">
              <Button variant="outline">View All Projects</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Let's work together to bring your engineering vision to life.
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