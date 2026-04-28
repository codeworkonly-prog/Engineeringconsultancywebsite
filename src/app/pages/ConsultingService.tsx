import { Card, CardContent } from '../components/ui/card';
import { CheckCircle, FileText, Users, Target, BarChart, Briefcase, Lightbulb, Settings } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';

export function ConsultingService() {
  const consultingServices = [
    {
      title: 'Engineering Design & Planning',
      icon: FileText,
      description: 'Comprehensive engineering design services for infrastructure projects',
      services: [
        'Detailed Engineering Design & Drawings',
        'Feasibility Studies & Master Planning',
        'Cost Estimation & BOQ Preparation',
        'Technical Specifications',
        'Infrastructure Planning & Development',
        'Value Engineering Studies',
      ],
    },
    {
      title: 'Project Management',
      icon: Briefcase,
      description: 'End-to-end project management and supervision services',
      services: [
        'Construction Supervision',
        'Contract Administration',
        'Quality Assurance & Control',
        'Third-Party Inspection',
        'Project Scheduling & Monitoring',
        'Risk Management',
      ],
    },
    {
      title: 'Water & Sanitation',
      icon: Settings,
      description: 'Specialized consulting for water supply and sanitation systems',
      services: [
        'Water Supply System Design',
        'Wastewater Management',
        'Treatment Plant Design',
        'Distribution Network Planning',
        'Pumping System Design',
        'Water Quality Assessment',
      ],
    },
    {
      title: 'Procurement & Contract Support',
      icon: Target,
      description: 'Professional procurement and contract management services',
      services: [
        'Preparation of Bid Documents',
        'Bid Evaluation & Analysis',
        'Procurement Support',
        'PPP Advisory Services',
        'Contract Negotiation Support',
        'Vendor Management',
      ],
    },
    {
      title: 'Research & Development',
      icon: Lightbulb,
      description: 'Evidence-based research and policy development',
      services: [
        'Socio-economic Studies',
        'Policy & Institutional Framework',
        'Environmental Impact Assessments',
        'Market Research & Analysis',
        'Technical Studies',
        'Baseline Surveys',
      ],
    },
    {
      title: 'Training & Capacity Building',
      icon: Users,
      description: 'Professional training and organizational development',
      services: [
        'Public Procurement Training',
        'Contract Management Workshops',
        'Project Planning & Management Tools',
        'Technical Training Programs',
        'Organizational Development',
        'Leadership Development',
      ],
    },
  ];

  const sectors = [
    'Water Supply & Sanitation',
    'Urban Infrastructure',
    'Transportation',
    'Energy & Power',
    'Building & Construction',
    'Industrial Facilities',
    'Special Economic Zones',
    'Institutional Infrastructure',
  ];

  const whyChooseUs = [
    {
      title: 'Multidisciplinary Expertise',
      description: 'Team of qualified engineers, project managers, and technical specialists',
      icon: Users,
    },
    {
      title: 'Proven Track Record',
      description: '100+ successful consulting assignments across Nepal',
      icon: BarChart,
    },
    {
      title: 'Quality & Compliance',
      description: 'Strong understanding of local and international standards',
      icon: CheckCircle,
    },
    {
      title: 'Client-Centric Approach',
      description: 'Tailored solutions focused on client needs and project success',
      icon: Target,
    },
  ];

  return (
    <div>
      {/* Header Section */}
      <section className="bg-gradient-to-r from-brand-500 to-brand-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Consulting Services</h1>
          <p className="text-xl text-brand-50 max-w-3xl">
            Professional engineering and management consulting services to deliver excellence across the project lifecycle
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Consulting Solutions</h2>
            <p className="text-gray-600">
              Diksha Consulting & Training Pvt. Ltd. provides multidisciplinary engineering and management
              consulting services to support clients throughout the project lifecycle—from feasibility studies
              and design to procurement, supervision, and training.
            </p>
          </div>
        </div>
      </section>

      {/* Consulting Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Consulting Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer comprehensive consulting services tailored to meet the unique needs of each project
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {consultingServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="pt-6">
                    <div className="bg-brand-100 p-3 rounded-full w-fit mb-4">
                      <Icon className="h-8 w-8 text-brand-600" />
                    </div>
                    <h3 className="font-semibold text-xl mb-2">{service.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.services.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sectors We Serve Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Sectors We Serve</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our consulting expertise spans multiple sectors and industries
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sectors.map((sector, index) => (
              <Card key={index}>
                <CardContent className="pt-6 text-center">
                  <p className="text-sm font-medium text-gray-700">{sector}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Consulting Services</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-brand-100 p-3 rounded-full mb-4">
                        <Icon className="h-8 w-8 text-brand-600" />
                      </div>
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-brand-50 to-brand-100 rounded-lg p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">Our Consulting Approach</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div className="text-center">
                  <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-brand-600">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Understand</h3>
                  <p className="text-sm text-gray-700">
                    Deep dive into client requirements, project objectives, and constraints
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-brand-600">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Deliver</h3>
                  <p className="text-sm text-gray-700">
                    Execute with technical precision, quality standards, and professional excellence
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-brand-600">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Support</h3>
                  <p className="text-sm text-gray-700">
                    Ongoing support and capacity building for sustained project success
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Professional Consulting Services?</h2>
          <p className="text-xl mb-8 text-brand-50">
            Let's discuss how we can support your project with our expertise.
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary">
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
