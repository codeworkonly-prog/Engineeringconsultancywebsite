import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { useContent } from '../../contexts/ContentContext';

export function DashboardHome() {
  const { teamMembers, projects, galleryImages, events, clients, portfolio } = useContent();
  const consultingCount = portfolio.filter((item) => item.type === 'consulting').length;

  const stats = [
    { label: 'Projects', value: projects.length },
    { label: 'Consulting', value: consultingCount },
    { label: 'Team Members', value: teamMembers.length },
    { label: 'Training', value: events.length },
    { label: 'Gallery Images', value: galleryImages.length },
    { label: 'Clients', value: clients.length },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">{stat.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-brand-600">{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
