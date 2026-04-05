import { Card, CardContent } from '../components/ui/card';
import { Target, Eye, Award, CheckCircle } from 'lucide-react';

export function About() {
  return (
    <div>
      {/* Header Section */}
      <section className="bg-gradient-to-r from-brand-500 to-brand-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-brand-50 max-w-3xl">
            A multidisciplinary engineering and management consulting firm dedicated to excellence
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
    </div>
  );
}