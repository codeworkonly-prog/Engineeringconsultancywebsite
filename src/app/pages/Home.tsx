import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { HomeFaqDisplay } from './admin/FaqsSection';
import { CheckCircle, Users, Award, Lightbulb } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import { PortfolioItem, PortfolioType } from '../../types/portfolio.types';
const engineering = new URL('../../imports/engineering.webp', import.meta.url).href;
import { Helmet } from 'react-helmet-async';
import { slugify } from '../../utils/slug';

const portfolioTypeLabels: Record<PortfolioType, string> = {
  project: 'Project',
  consulting: 'Consulting',
  training: 'Training',
};

export function Home() {
  const { clients, portfolio } = useContent();
  const [selectedPortfolioType, setSelectedPortfolioType] = useState<PortfolioType>('project');

  const featuredPortfolioItems = portfolio
    .filter((item) => item.type === selectedPortfolioType && item.displayOnHome)
    .slice(0, 4);

  const getPortfolioLink = (item: PortfolioItem) => {
    if (item.type === 'project') return `/projects/${item.slug}`;
    if (item.type === 'consulting') return `/consulting/${item.slug}`;
    return `/training/${item.slug}`;
  };

  const getClientPortfolioLink = (clientId: string) =>
    `/portfolio?client=${encodeURIComponent(
      clients.find((client) => client.id === clientId)?.slug ||
        slugify(clients.find((client) => client.id === clientId)?.name || clientId)
    )}`;

  return (
    <>
      <Helmet>
        {/* Basic meta tags — highest SEO priority */}
        <title>Diksha Consulting and Projects | Engineering Consultancy Nepal</title>
        <meta
          name="description"
          content="Diksha Consulting and Projects Pvt. Ltd. is a Nepal-based engineering consultancy specializing in infrastructure development, project management, water supply engineering, structural design, and technical training solutions."
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="engineering consultancy Nepal, infrastructure development Nepal, project management Nepal, structural engineering Nepal, water supply engineering Nepal, DPR consultant Nepal"
        />
        <link rel="canonical" href="https://www.dikshacp.com.np" />

        {/* Open Graph — for social sharing previews */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.dikshacp.com.np" />
        <meta property="og:title" content="Diksha Consulting and Projects | Engineering Consultancy Nepal" />
        <meta property="og:description" content="Expert engineering consultancy, project management, and training solutions across Nepal." />
        <meta property="og:image" content="https://www.dikshacp.com.np/og-image.webp" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EngineeringCompany",
            name: "Diksha Consulting and Projects Pvt. Ltd.",
            url: "https://www.dikshacp.com.np",
            logo: "https://www.dikshacp.com.np/DCP_logo-1.webp",
            image: "https://www.dikshacp.com.np/og-image.webp",
            description: "Engineering consultancy and infrastructure development company in Nepal.",
            telephone: "+977-9841707077",
            email: "consultingdiksha@gmail.com",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Ghattekulo-32",
              addressLocality: "Kathmandu",
              addressRegion: "Bagmati Province",
              postalCode: "44600",
              addressCountry: "NP",
            },
            areaServed: "Nepal",
            sameAs: [
              // add your LinkedIn, Facebook etc.
            ],
          })}
        </script>
      </Helmet>

      <div>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center text-white overflow-hidden">

          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={engineering}
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
                    className="
        w-full sm:w-auto
        px-6 py-2
        rounded-full
        bg-white/10
        hover:bg-white/20
        text-white
        border border-white/30
        transition-all duration-300
        backdrop-blur-sm
      "
                  >
                    Learn More
                  </Button>
                </Link>

                <Link to="/projects">
                  <Button
                    size="lg"
                    className="
        w-full sm:w-auto
        px-6 py-2
        rounded-full
        bg-transparent
        hover:bg-white/10
        text-white
        border border-white/30
        transition-all duration-300
        backdrop-blur-sm
      "
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

        {/* Featured Work */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-12">
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold mb-4">Featured Work</h2>
                <p className="text-gray-600">
                  Explore our portfolio by selecting the type of work you want to view.
                </p>
              </div>

              <div className="w-full max-w-xs">
                <Select
                  value={selectedPortfolioType}
                  onValueChange={(value) => setSelectedPortfolioType(value as PortfolioType)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select work type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="project">Project</SelectItem>
                    <SelectItem value="consulting">Consulting Services</SelectItem>
                    <SelectItem value="training">Training</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {featuredPortfolioItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredPortfolioItems.map((item) => (
                  <Link
                    key={item.id}
                    to={getPortfolioLink(item)}
                    className="group"
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer h-full">
                      <div className="overflow-hidden">
                        <img
                          src={item.featuredImage}
                          alt={item.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <CardContent className="pt-6">
                        <div className="inline-block px-3 py-1 bg-brand-100 text-brand-600 text-xs rounded-full mb-3">
                          {item.sector || portfolioTypeLabels[item.type]}
                        </div>

                        <h3 className="font-semibold mb-2 group-hover:text-brand-600 transition-colors">
                          {item.title}
                        </h3>

                        <p className="text-sm text-gray-600">
                          {item.shortDescription}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600">
                No featured work available for {portfolioTypeLabels[selectedPortfolioType]}.
              </p>
            )}

            <div className="text-center mt-8">
              <Link to="/portfolio">
                <Button variant="outline">View All Portfolio</Button>
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
                  <Link
                    key={client.id}
                    to={getClientPortfolioLink(client.id)}
                    className="flex items-center justify-center p-6 bg-white rounded-lg hover:shadow-lg transition-shadow duration-200"
                  >
                    <img
                      src={client.logoUrl}
                      alt={client.name}
                      className="max-h-16 max-w-full object-contain"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

{/* FAQ Section */}
        <HomeFaqDisplay />

        {/* CTA Section */}
        <section className="py-16 bg-brand-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Your Project?
            </h2>

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
    </>
  );
}
