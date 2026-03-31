import { createBrowserRouter } from 'react-router';
import { Root } from './Root';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Training } from './pages/Training';
import { Projects } from './pages/Projects';
import { Dashboard } from './pages/admin/Dashboard';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'about', Component: About },
      { path: 'training', Component: Training },
      { path: 'projects', Component: Projects },
    ],
  },
  {
    path: '/admin',
    Component: Dashboard,
  },
]);
