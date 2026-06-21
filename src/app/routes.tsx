import { createBrowserRouter } from 'react-router';
import { Root } from './Root';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Training } from './pages/Training';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import { EventDetail } from './pages/EventDetail';
import { Contact } from './pages/Contact';
import { Portfolio } from './pages/Portfolio';
import { Team } from './pages/Team';
import { TeamMemberDetail } from './pages/TeamMemberDetail';
import { CompanyProfile } from './pages/CompanyProfile';
import { CompanySector } from './pages/CompanySector';
import { ConsultingService } from './pages/ConsultingService';
import { PortfolioItemDetail } from './pages/PortfolioItemDetail';
import { Dashboard } from './pages/admin/Dashboard';
import { AdminLogin } from './components/AdminLogin';
import { NotFound } from './pages/NotFound';
import { ProtectedRoute } from './components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'about', Component: About },
      { path: 'company-sector', Component: CompanySector },
      { path: 'consulting', Component: ConsultingService },
      { path: 'consulting/:slug', element: <PortfolioItemDetail expectedType="consulting" /> },
      { path: 'company-profile', Component: CompanyProfile },
      { path: 'team', Component: Team },
      { path: 'team/:slug', Component: TeamMemberDetail },
      { path: 'training', Component: Training },
      { path: 'training/:slug', Component: EventDetail },
      { path: 'projects', Component: Projects },
      { path: 'projects/:slug', Component: ProjectDetail },
      { path: 'portfolio', Component: Portfolio },
      { path: 'contact', Component: Contact },
      { path: '*', Component: NotFound },
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
