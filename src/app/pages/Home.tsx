import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { CheckCircle, Users, Award, Lightbulb, Star, Quote } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

export function Home() {
  const { projects, clients } = useContent();
  const featuredProjects = projects.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center text-white overflow-hidden">

        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/src/imports/engineering.png"
            alt="Engineering Consultancy"
            className="w-full h-full object-cover"
          />

          {/* Optional Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Engineering Consultancy & Project Experts in Nepal
            </h1>

            <p className="text-lg md:text-xl mb-6 text-gray-100">
              Diksha Consulting and Projects Pvt. Ltd. delivers expert engineering consultancy,
              project support, and industry-driven training solutions.
            </p>

            <p className="text-lg md:text-xl mb-8 text-gray-200">
              We help organizations and professionals achieve real-world results through practical expertise,
              efficient execution, and high-impact outcomes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/about">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  Learn More
                </Button>
              </Link>

              <Link to="/projects">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white hover:text-brand-600"
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-brand-100 p-3 rounded-full mb-4">
                    <Award className="h-8 w-8 text-brand-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Proven Track Record</h3>
                  <p className="text-sm text-gray-600">
                    100+ successful projects delivered across Nepal
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-brand-100 p-3 rounded-full mb-4">
                    <Users className="h-8 w-8 text-brand-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Multidisciplinary Expertise</h3>
                  <p className="text-sm text-gray-600">
                    All engineering and management services under one roof
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-brand-100 p-3 rounded-full mb-4">
                    <CheckCircle className="h-8 w-8 text-brand-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Quality Standards</h3>
                  <p className="text-sm text-gray-600">
                    Strong understanding of local and international standards
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-brand-100 p-3 rounded-full mb-4">
                    <Lightbulb className="h-8 w-8 text-brand-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Client Satisfaction</h3>
                  <p className="text-sm text-gray-600">
                    Commitment to quality, timeliness, and client satisfaction
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
                  <div className="inline-block px-3 py-1 bg-brand-100 text-brand-600 text-xs rounded-full mb-3">
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

      {/* Clients Section */}
      {clients.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Valued Clients</h2>
              <p className="text-gray-600">
                Trusted by leading organizations across Nepal
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center">
              {clients.map((client) => (
                <a
                  key={client.id}
                  href={client.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-6 bg-white rounded-lg hover:shadow-lg transition-shadow duration-200"
                >
                  <img
                    src={client.logoUrl}
                    alt={client.name}
                    className="max-h-16 max-w-full object-contain"
                  />
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-brand-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 text-brand-50">
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