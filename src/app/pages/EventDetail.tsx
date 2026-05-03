import { useParams, Link } from 'react-router';
import { useContent } from '../contexts/ContentContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Calendar, Clock, CheckCircle, ArrowLeft, Tag } from 'lucide-react';

export function EventDetail() {
  const { slug } = useParams();
  const { events } = useContent();

  const event = events.find((e) => e.slug === slug);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
          <p className="text-gray-600 mb-8">The event you're looking for doesn't exist.</p>
          <Link to="/events">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
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
          <Link to="/events">
            <Button variant="secondary" size="sm" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
          <p className="text-xl text-brand-50 mb-6">{event.description}</p>
          <div className="flex flex-wrap items-center gap-4">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm flex items-center gap-2">
              <Tag className="h-3 w-3" />
              {event.type}
            </span>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm flex items-center gap-2">
              <Calendar className="h-3 w-3" />
              {event.startDate} - {event.endDate}
            </span>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm flex items-center gap-2">
              <Clock className="h-3 w-3" />
              {event.duration}
            </span>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="pt-8">
              <h2 className="text-2xl font-bold mb-6">Key Topics Covered</h2>
              {event.topics && event.topics.length > 0 ? (
                <ul className="space-y-4">
                  {event.topics.map((topic, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-lg text-gray-900">{topic}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No topics listed yet.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Event Info Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">Event Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <Calendar className="h-8 w-8 text-brand-600 mb-3" />
                <h3 className="font-semibold mb-2">Dates</h3>
                <p className="text-sm text-gray-600">
                  {event.startDate}
                  <br />
                  to
                  <br />
                  {event.endDate}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Clock className="h-8 w-8 text-brand-600 mb-3" />
                <h3 className="font-semibold mb-2">Duration</h3>
                <p className="text-sm text-gray-600">{event.duration}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Tag className="h-8 w-8 text-brand-600 mb-3" />
                <h3 className="font-semibold mb-2">Type</h3>
                <p className="text-sm text-gray-600">{event.type}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Interested in This Event?</h2>
          <p className="text-xl mb-8 text-brand-50 max-w-2xl mx-auto">
            Contact us for more information or to register for this {event.type.toLowerCase()}.
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary">
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>

      {/* Related Events */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">More Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events
              .filter((e) => e.id !== event.id)
              .slice(0, 3)
              .map((relatedEvent) => (
                <Link key={relatedEvent.id} to={`/events/${relatedEvent.slug}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold line-clamp-2">{relatedEvent.title}</h3>
                        <span className="px-2 py-1 bg-brand-100 text-brand-600 text-xs rounded-full whitespace-nowrap ml-2">
                          {relatedEvent.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{relatedEvent.description}</p>
                      <div className="flex items-center text-xs text-gray-500 gap-2">
                        <Calendar className="h-3 w-3" />
                        <span>{relatedEvent.startDate}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
          {events.filter((e) => e.id !== event.id).length === 0 && (
            <p className="text-gray-500 text-center">No other events available.</p>
          )}
        </div>
      </section>
    </div>
  );
}
