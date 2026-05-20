import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Calendar,
  ImageIcon,
  LogOut,
  Home,
  Building2,
} from 'lucide-react';
import { Section } from './types';
import { DashboardHome } from './DashboardHome';
import { ProjectsSection } from './ProjectsSection';
import { TeamSection } from './TeamSection';
import { EventsSection } from './EventsSection';
import { GallerySection } from './GallerySection.tsx';
import { ClientsSection } from './ClientsSection';

const NAV_ITEMS: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
  { id: 'projects', label: 'Projects', icon: <Briefcase className="h-5 w-5" /> },
  { id: 'team', label: 'Team', icon: <Users className="h-5 w-5" /> },
  { id: 'events', label: 'Events', icon: <Calendar className="h-5 w-5" /> },
  { id: 'gallery', label: 'Gallery', icon: <ImageIcon className="h-5 w-5" /> },
  { id: 'clients', label: 'Clients', icon: <Building2 className="h-5 w-5" /> },
];

const SECTION_LABELS: Record<Section, string> = {
  dashboard: 'Dashboard',
  projects: 'Projects',
  team: 'Team',
  events: 'Events',
  gallery: 'Gallery',
  clients: 'Clients',
};

export function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activeSection, setActiveSection] = useState<Section>('dashboard');

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
    toast.success('Logged out successfully');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-brand-600">Admin Panel</h1>
        </div>

        <nav className="flex-1 p-4">
          {NAV_ITEMS.map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 ${
                activeSection === id
                  ? 'bg-brand-50 text-brand-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {icon}
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t space-y-2">
          <Link to="/" className="block">
            <Button variant="outline" size="sm" className="w-full">
              <Home className="h-4 w-4 mr-2" />
              Website
            </Button>
          </Link>
          <Button variant="outline" size="sm" className="w-full" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b px-8 py-6">
          <h2 className="text-2xl font-bold text-gray-900">{SECTION_LABELS[activeSection]}</h2>
        </header>

        <div className="p-8">
          {activeSection === 'dashboard' && <DashboardHome />}
          {activeSection === 'projects' && <ProjectsSection />}
          {activeSection === 'team' && <TeamSection />}
          {activeSection === 'events' && <EventsSection />}
          {activeSection === 'gallery' && <GallerySection />}
          {activeSection === 'clients' && <ClientsSection />}
        </div>
      </main>
    </div>
  );
}
