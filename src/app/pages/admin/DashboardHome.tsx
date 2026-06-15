import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { useContent } from '../../contexts/ContentContext';
import {
  Briefcase,
  ClipboardList,
  GraduationCap,
  Users,
  Building2,
  Layers3,
} from 'lucide-react';

export function DashboardHome() {
  const { teamMembers, clients, portfolio, sectors } = useContent();
  const consultingCount = portfolio.filter((item) => item.type === 'consulting').length;
  const projectCount = portfolio.filter((item) => item.type === 'project').length;
  const trainingCount = portfolio.filter((item) => item.type === 'training').length;

  const stats = [
    { label: 'Projects', value: projectCount, icon: ClipboardList },
    { label: 'Consultings', value: consultingCount, icon: Briefcase },
    { label: 'Trainings', value: trainingCount, icon: GraduationCap },
    { label: 'Team Members', value: teamMembers.length, icon: Users },
    { label: 'Sectors', value: sectors.length, icon: Layers3 },
    { label: 'Clients', value: clients.length, icon: Building2 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card
            key={stat.label}
            className="hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.label}
              </CardTitle>

              <Icon className="h-5 w-5 text-brand-600" />
            </CardHeader>

            <CardContent>
              <p className="text-3xl font-bold text-brand-600">
                {stat.value}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
