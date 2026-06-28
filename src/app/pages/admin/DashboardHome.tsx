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
import { Section } from './types';

interface DashboardHomeProps {
  onNavigate: (section: Section) => void;
}

export function DashboardHome({ onNavigate }: DashboardHomeProps) {
  const { teamMembers, clients, portfolio, sectors } = useContent();

  const consultingCount = portfolio.filter(
    (item) => item.type === 'consulting'
  ).length;

  const projectCount = portfolio.filter(
    (item) => item.type === 'project'
  ).length;

  const trainingCount = portfolio.filter(
    (item) => item.type === 'training'
  ).length;

  const stats: {
    label: string;
    value: number;
    icon: React.ElementType;
    section: Section;
  }[] = [
    {
      label: 'Projects',
      value: projectCount,
      icon: ClipboardList,
      section: 'portfolio',
    },
    {
      label: 'Consultings',
      value: consultingCount,
      icon: Briefcase,
      section: 'portfolio',
    },
    {
      label: 'Trainings',
      value: trainingCount,
      icon: GraduationCap,
      section: 'portfolio',
    },
    {
      label: 'Team Members',
      value: teamMembers.length,
      icon: Users,
      section: 'team',
    },
    {
      label: 'Clients',
      value: clients.length,
      icon: Building2,
      section: 'clients',
    },
    {
      label: 'Sectors',
      value: sectors.length,
      icon: Layers3,
      section: 'sectors',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card
            key={stat.label}
            onClick={() => onNavigate(stat.section)}
            className="cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
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