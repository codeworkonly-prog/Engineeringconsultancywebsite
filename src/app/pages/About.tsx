import { Card, CardContent } from '../components/ui/card';
import { Target, Eye, Award, CheckCircle } from 'lucide-react';
import { Link } from 'react-router';
import { useContent } from '../contexts/ContentContext';

export function About() {
  const { teamMembers } = useContent();
  const managingDirector = teamMembers[0];
  const otherMembers = teamMembers.slice(1);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div>
      {/* Header Section */}
      <section className="bg-gradient-to-r from-brand-500 to-brand-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-brand-50 max-w-3xl mb-8">
            A multidisciplinary engineering and management consulting firm dedicated to excellence
          </p>

          {/* Subsection Navigation */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => scrollToSection('who-we-are')}
              className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white border border-white/30 transition-colors duration-200"
            >
              Who We Are
            </button>
            <button
              onClick={() => scrollToSection('our-team')}
              className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white border border-white/30 transition-colors duration-200"
            >
              Our Team
            </button>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section id="who-we-are" className="py-16 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
              <p className="text-gray-600 mb-4">
                Diksha Consulting & Training Pvt. Ltd. is a multidisciplinary engineering and management 
                consulting firm based in Kathmandu, Nepal. Established as a private limited company, we 
                specialize in delivering high-quality consultancy, technical advisory, and capacity-building 
                services to both public and private sector organizations.
              </p>
              <p className="text-gray-600 mb-4">
                With a strong focus on innovation, sustainability, and professional excellence, we support 
                clients throughout the project lifecycle—from feasibility studies and design to procurement, 
                supervision, and training.
              </p>
              <p className="text-gray-600">
                We pride ourselves on our commitment to quality, sustainability, and client satisfaction. 
                Every project we undertake is approached with meticulous attention to detail and a 
                dedication to excellence.
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
                  <div className="bg-brand-100 p-3 rounded-full mb-4">
                    <Eye className="h-8 w-8 text-brand-600" />
                  </div>
                  <h3 className="font-semibold mb-3">Our Vision</h3>
                  <div className="text-sm text-gray-600 space-y-3 text-left">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-brand-600 mt-0.5 flex-shrink-0" />
                      <p>Leading consulting firm in engineering and management</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-brand-600 mt-0.5 flex-shrink-0" />
                      <p>Recognized for delivering innovative and reliable solutions</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-brand-600 mt-0.5 flex-shrink-0" />
                      <p>Committed to sustainable development practices</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-brand-100 p-3 rounded-full mb-4">
                    <Target className="h-8 w-8 text-brand-600" />
                  </div>
                  <h3 className="font-semibold mb-3">Our Mission</h3>
                  <div className="text-sm text-gray-600 space-y-3 text-left">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-brand-600 mt-0.5 flex-shrink-0" />
                      <p>Enhance project quality through expert technical and management services</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-brand-600 mt-0.5 flex-shrink-0" />
                      <p>Strengthen institutional and human capacity across sectors</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-brand-600 mt-0.5 flex-shrink-0" />
                      <p>Deliver efficient, cost-effective, and sustainable solutions</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-brand-100 p-3 rounded-full mb-4">
                    <Award className="h-8 w-8 text-brand-600" />
                  </div>
                  <h3 className="font-semibold mb-3">Our Values</h3>
                  <div className="text-sm text-gray-600 space-y-3 text-left">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-brand-600 mt-0.5 flex-shrink-0" />
                      <p>Excellence in everything we do</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-brand-600 mt-0.5 flex-shrink-0" />
                      <p>Integrity and transparency</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-brand-600 mt-0.5 flex-shrink-0" />
                      <p>Innovation and collaboration</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section id="our-team" className="py-16 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our team consists of qualified and experienced professionals including engineers,
              project managers, procurement experts, and administrative professionals who combine
              technical expertise with practical experience.
            </p>
          </div>

          {teamMembers.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No team members added yet. Add team members from the admin dashboard.</p>
            </div>
          ) : (
            <>
              {/* Managing Director - Center Highlight */}
              {managingDirector && (
                <div className="max-w-2xl mx-auto mb-16">
                  <Link to={`/team/${managingDirector.slug}`}>
                    <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-200 cursor-pointer">
                      <div className="grid md:grid-cols-2 gap-6">
                        <img
                          src={managingDirector.imageUrl}
                          alt={managingDirector.name}
                          className="w-full h-full object-cover"
                        />
                        <CardContent className="pt-6 flex flex-col justify-center">
                          <div className="inline-block px-3 py-1 bg-brand-100 text-brand-600 text-xs rounded-full mb-3 w-fit">
                            Leadership
                          </div>
                          <h3 className="font-semibold text-2xl mb-2">{managingDirector.name}</h3>
                          <p className="text-brand-600 mb-4">{managingDirector.position}</p>
                          <p className="text-gray-600">{managingDirector.bio}</p>
                        </CardContent>
                      </div>
                    </Card>
                  </Link>
                </div>
              )}

              {/* Other Team Members */}
              {otherMembers.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {otherMembers.map((member) => (
                    <Link key={member.id} to={`/team/${member.slug}`}>
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer h-full">
                        <img
                          src={member.imageUrl}
                          alt={member.name}
                          className="w-full h-64 object-cover"
                        />
                        <CardContent className="pt-6">
                          <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                          <p className="text-brand-600 text-sm mb-3">{member.position}</p>
                          <p className="text-sm text-gray-600">{member.bio}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Expertise</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our multidisciplinary team brings diverse skills and experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Engineers</h3>
                <p className="text-sm text-gray-600">
                  Civil and infrastructure specialists with expertise in design, analysis, and project execution
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Project Managers</h3>
                <p className="text-sm text-gray-600">
                  Experienced professionals in planning, coordination, and delivery of complex projects
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Procurement Experts</h3>
                <p className="text-sm text-gray-600">
                  Contract and procurement specialists ensuring compliance and value for money
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Support Staff</h3>
                <p className="text-sm text-gray-600">
                  Financial, administrative, and technical support professionals
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}