import { createBrowserRouter } from 'react-router';
import { Root } from './Root';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Training } from './pages/Training';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import { EventDetail } from './pages/EventDetail';
import { Contact } from './pages/Contact';
import { Team } from './pages/Team';
import { TeamMemberDetail } from './pages/TeamMemberDetail';
import { CompanyProfile } from './pages/CompanyProfile';
import { CompanySector } from './pages/CompanySector';
import { ConsultingService } from './pages/ConsultingService';
import { Dashboard } from './pages/admin/Dashboard';
import { AdminLogin } from './components/AdminLogin';
import { ProtectedRoute } from './components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'about', Component: About },
      { path: 'company-sector', Component: CompanySector },
      { path: 'consulting-service', Component: ConsultingService },
      { path: 'company-profile', Component: CompanyProfile },
      { path: 'team', Component: Team },
      { path: 'team/:slug', Component: TeamMemberDetail },
      { path: 'events', Component: Training },
      { path: 'events/:slug', Component: EventDetail },
      { path: 'projects', Component: Projects },
      { path: 'projects/:slug', Component: ProjectDetail },
      { path: 'contact', Component: Contact },
    ],
  },
  {
    path: '/admin/login',
    Component: AdminLogin,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
]);