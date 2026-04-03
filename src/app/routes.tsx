import { createBrowserRouter } from 'react-router';
import { Root } from './Root';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Training } from './pages/Training';
import { Projects } from './pages/Projects';
import { Contact } from './pages/Contact';
import { Team } from './pages/Team';
import { CompanyProfile } from './pages/CompanyProfile';
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
      { path: 'company-profile', Component: CompanyProfile },
      { path: 'team', Component: Team },
      { path: 'events', Component: Training },
      { path: 'projects', Component: Projects },
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