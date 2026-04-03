import { Card, CardContent } from '../components/ui/card';
import { CheckCircle, Building2, Users, Award, Lightbulb } from 'lucide-react';

export function CompanyProfile() {
  const services = [
    {
      category: 'Engineering Consultancy',
      items: [
        'Detailed Engineering Design & Drawings',
        'Feasibility Studies & Master Planning',
        'Cost Estimation & BOQ Preparation',
        'Infrastructure Planning & Development',
        'Water Supply & Sanitation Systems',
        'Structural, Architectural & MEP Design',
      ],
    },
    {
      category: 'Project Management & Supervision',
      items: [
        'Construction Supervision',
        'Contract Administration',
        'Quality Assurance & Control',
        'Third-Party Inspection',
      ],
    },
    {
      category: 'Procurement & Bid Support',
      items: [
        'Preparation of Bid Documents',
        'Bid Evaluation & Procurement Support',
        'PPP Advisory Services',
      ],
    },
    {
      category: 'Research & Development',
      items: [
        'Socio-economic Studies',
        'Policy & Institutional Framework Development',
        'Environmental & Impact Assessments',
      ],
    },
    {
      category: 'Training & Capacity Building',
      items: [
        'Public Procurement & Contract Management',
        'Project Planning & Management Tools (Primavera, etc.)',
        'Organizational Development & Technical Training',
      ],
    },
  ];

  const clients = [
    'Government of Nepal ministries and departments',
    'Kathmandu Valley Water Supply Management Board',
    'Nepal Oil Corporation',
    'Special Economic Zone Authority',
    'Department of Urban Development & Building Construction',
    'International organizations such as UNICEF and UNDP',
  ];

  const projectTypes = [
    'Water supply and wastewater management systems',
    'Special Economic Zone (SEZ) infrastructure design',
    'Fuel depots, storage systems, and pipelines',
    'Urban infrastructure and tourism master planning',
    'Disaster risk management and reconstruction projects',
    'Institutional strengthening and training programs',
  ];

  return (
    <div>
      {/* Header Section */}
      <section className="bg-gradient-to-r from-brand-500 to-brand-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Company Profile</h1>
          <p className="text-xl text-brand-50 max-w-3xl">
            A comprehensive overview of our services, experience, and capabilities
          </p>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Core Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer comprehensive engineering and management consulting services across multiple disciplines
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-4 text-brand-600">{service.category}</h3>
                  <ul className="space-y-2">
                    {service.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Experience Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Experience</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We have successfully delivered <span className="font-bold text-brand-600">100+ consulting assignments</span> across Nepal, 
              working with government agencies, development partners, and private sector clients.
            </p>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 text-center">Our Project Portfolio Includes:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectTypes.map((type, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <Building2 className="h-5 w-5 text-brand-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{type}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Project Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-brand-50 to-brand-100 rounded-lg p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <Award className="h-8 w-8 text-brand-600" />
                <h2 className="text-3xl font-bold">Flagship Project Highlight</h2>
              </div>
              
              <h3 className="text-2xl font-semibold mb-4 text-brand-700">Sisneri Water Supply Project</h3>
              
              <p className="text-gray-700 mb-6">
                One of our major assignments involved detailed engineering design and consultancy services 
                for a large-scale water supply system serving Kathmandu Valley.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Key Highlights:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-gray-700">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Designed a system serving 1.2–1.4 million people</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Capacity of 140 MLD water treatment plant</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Included dam, pumping systems, transmission lines, and reservoirs</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Comprehensive services: survey, design, cost estimation, and procurement documentation</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-6">
                  <p className="text-gray-700 italic">
                    "This project demonstrates our capability to handle complex, large-scale infrastructure 
                    projects with technical precision and professional excellence."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Clients Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Clients</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We have collaborated with a wide range of reputable organizations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-brand-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">{client}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
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
    </div>
  );
}
