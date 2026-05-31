import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowRight, BookOpen, Users, Clock, Award, CheckCircle, Calendar, GraduationCap, MapPin } from 'lucide-react';
import { Link } from 'react-router';
import { useContent } from '../contexts/ContentContext';

export function Training() {
  const { events, portfolio } = useContent();
  const trainingItems = [
    ...events.map((event) => ({
      id: `event-${event.id}`,
      title: event.title,
      description: event.description,
      slug: event.slug,
      type: event.type,
      startDate: event.startDate,
      endDate: event.endDate,
      duration: event.duration,
      topics: event.topics,
      imageUrl: '',
      location: '',
    })),
    ...portfolio
      .filter((item) => item.type === 'training')
      .map((item) => ({
        id: `portfolio-${item.id}`,
        title: item.title,
        description: item.shortDescription,
        slug: item.slug,
        type: item.trainingType || 'Training',
        startDate: item.startDate || item.fiscalYear || '',
        endDate: item.endDate || '',
        duration: item.mode ? `${item.mode} mode` : 'Program',
        topics: [item.sector, item.client, item.location].filter(Boolean) as string[],
        imageUrl: item.featuredImage,
        location: item.location || item.client || '',
      })),
  ];

  return (
    <div>
      {/* Header Section */}
      <section className="bg-gradient-to-r from-brand-500 to-brand-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Training</h1>
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
                    Learn directly from experienced professionals working in real-world infrastructure and projects.
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
                  <h3 className="font-semibold mb-2">Practical Hands-on Training</h3>
                  <p className="text-sm text-gray-600">
                    Gain real project experience through applied workshops and field-based learning.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-brand-100 p-3 rounded-full mb-4">
                    <GraduationCap className="h-8 w-8 text-brand-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Comprehensive Learning Support</h3>
                  <p className="text-sm text-gray-600">
                    Well-structured programs with all necessary resources made easily accessible to participants.
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
            {trainingItems.length > 0 ? (
              trainingItems.map((event) => (
                <Link key={event.id} to={`/training/${event.slug}`}>
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full group">
                    <div className="relative overflow-hidden">
                      {event.imageUrl ? (
                        <img
                          src={event.imageUrl}
                          alt={event.title}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="h-64 bg-gradient-to-br from-brand-600 via-brand-500 to-slate-800" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-800 text-white">
                          {event.type}
                        </span>
                      </div>
                    </div>

                    <CardContent className="pt-6">
                      <div className="mb-3">
                        <span className="px-3 py-1 bg-brand-100 text-brand-600 text-xs rounded-full font-medium">
                          {event.duration}
                        </span>
                      </div>

                      <h3 className="font-semibold text-xl mb-2 group-hover:text-brand-600 transition-colors">
                        {event.title}
                      </h3>

                      {event.location && (
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                      )}

                      <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                        {event.description}
                      </p>

                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <Calendar className="h-4 w-4" />
                        <span>{event.startDate} - {event.endDate}</span>
                      </div>

                      {event.topics.length > 0 && (
                        <ul className="space-y-2 mb-6">
                          {event.topics.slice(0, 3).map((topic, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                              <CheckCircle className="h-4 w-4 text-brand-500 mt-0.5 flex-shrink-0" />
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="flex items-center text-brand-600 text-sm font-medium group-hover:gap-2 transition-all">
                        <span>View Training</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No training programs available at the moment. Check back soon!</p>
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
