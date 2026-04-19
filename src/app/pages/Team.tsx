import { Card, CardContent } from "../components/ui/card";
import { useContent } from "../contexts/ContentContext";

export function Team() {
  const { teamMembers } = useContent();

  return (
    <div>
      {/* Header Section */}
      <section className="bg-gradient-to-r from-brand-500 to-brand-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Our Team</h1>
          <p className="text-xl text-brand-50 max-w-3xl">
            Meet the experienced professionals who drive our success and deliver
            excellence in every project
          </p>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our team consists of qualified and experienced professionals
              including engineers, project managers, procurement experts, and
              administrative professionals who combine technical expertise with
              practical experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.id} className="overflow-hidden">
                <img
                  src={
                    member.imgUrl ||
                    "https://blocks.astratic.com/img/general-img-square.png"
                  }
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-brand-600 text-sm mb-3">
                    {member.position}
                  </p>
                  <p className="text-sm text-gray-600">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {teamMembers.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p>
                No team members added yet. Add team members from the admin
                dashboard.
              </p>
            </div>
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
                  Civil and infrastructure specialists with expertise in design,
                  analysis, and project execution
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Project Managers</h3>
                <p className="text-sm text-gray-600">
                  Experienced professionals in planning, coordination, and
                  delivery of complex projects
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Procurement Experts</h3>
                <p className="text-sm text-gray-600">
                  Contract and procurement specialists ensuring compliance and
                  value for money
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
