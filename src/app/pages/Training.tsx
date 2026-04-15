import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { BookOpen, Users, Clock, Award, CheckCircle, Calendar } from 'lucide-react';
import { Link } from 'react-router';
import { useContent } from '../contexts/ContentContext';

export function Training() {
  const { events } = useContent();

  return (
    <div>
      {/* Header Section */}
      <section className="bg-gradient-to-r from-brand-500 to-brand-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Events & Workshops</h1>
          <p className="text-xl text-brand-50 max-w-3xl">
            Professional development programs, workshops, and training sessions organized by DCP
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Train With Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our training programs are designed by industry experts to provide practical,
              real-world knowledge
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-brand-100 p-3 rounded-full mb-4">
                    <BookOpen className="h-8 w-8 text-brand-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Expert Instructors</h3>
                  <p className="text-sm text-gray-600">
                    Learn from experienced engineers with decades of industry experience
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
                  <h3 className="font-semibold mb-2">Small Class Sizes</h3>
                  <p className="text-sm text-gray-600">
                    Personalized attention with limited enrollment per program
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-brand-100 p-3 rounded-full mb-4">
                    <Clock className="h-8 w-8 text-brand-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Flexible Scheduling</h3>
                  <p className="text-sm text-gray-600">
                    Evening and weekend options to fit your busy schedule
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-brand-100 p-3 rounded-full mb-4">
                    <Award className="h-8 w-8 text-brand-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Certification</h3>
                  <p className="text-sm text-gray-600">
                    Receive industry-recognized certificates upon completion
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Available Programs</h2>
            <p className="text-gray-600">
              Choose from our range of specialized training courses
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {events && events.length > 0 ? (
              events.map((event) => (
                <Card key={event.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle>{event.title}</CardTitle>
                      <span className="px-3 py-1 bg-brand-100 text-brand-600 text-xs rounded-full">
                        {event.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{event.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                      <Calendar className="h-4 w-4" />
                      <span>{event.startDate} - {event.endDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                      <Clock className="h-4 w-4" />
                      <span>{event.duration}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold mb-3">Key Topics Covered:</h4>
                    <ul className="space-y-2 mb-6">
                      {event.topics && event.topics.map((topic, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full">Enroll Now</Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No events available at the moment. Check back soon!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Advance Your Career?</h2>
          <p className="text-xl mb-8 text-brand-50 max-w-2xl mx-auto">
            Join our training programs and gain the skills you need to excel in the engineering industry.
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary">
              Contact Us for More Information
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}