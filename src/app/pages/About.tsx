import { Card, CardContent } from '../components/ui/card';
import { useContent } from '../contexts/ContentContext';
import { Target, Eye, Award } from 'lucide-react';

export function About() {
  const { teamMembers } = useContent();

  return (
    <div>
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            We are a leading engineering consultancy dedicated to delivering innovative solutions
            and exceptional project management services.
          </p>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
              <p className="text-gray-600 mb-4">
                DIKSHA CONSULTING & PROJECTS Pvt. Ltd. is a premier engineering consultancy firm with over two decades of
                experience in delivering complex engineering projects across various sectors.
                We specialize in structural, mechanical, and environmental engineering solutions.
              </p>
              <p className="text-gray-600 mb-4">
                Our multidisciplinary team brings together expertise from diverse engineering
                backgrounds, ensuring comprehensive and innovative solutions for every project.
              </p>
              <p className="text-gray-600">
                We pride ourselves on our commitment to quality, sustainability, and client
                satisfaction. Every project we undertake is approached with meticulous attention
                to detail and a dedication to excellence.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&h=600&fit=crop"
                alt="Team collaboration"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-4">
                    <Target className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-3">Our Mission</h3>
                  <p className="text-sm text-gray-600">
                    To provide innovative engineering solutions that exceed client expectations
                    and contribute to sustainable development.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-4">
                    <Eye className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-3">Our Vision</h3>
                  <p className="text-sm text-gray-600">
                    To be the most trusted engineering consultancy, known for innovation,
                    integrity, and exceptional project delivery.
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
                  <h3 className="font-semibold mb-3">Our Values</h3>
                  <p className="text-sm text-gray-600">
                    Excellence, integrity, innovation, collaboration, and commitment to
                    sustainability in everything we do.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the experienced professionals who make it all possible
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.id} className="overflow-hidden">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-blue-600 text-sm mb-3">{member.position}</p>
                  <p className="text-sm text-gray-600">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}