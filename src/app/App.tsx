import { RouterProvider } from 'react-router';
import { router } from './routes.tsx';
import { Toaster } from './components/ui/sonner';
import { ContentProvider } from './contexts/ContentContext';

export default function App() {
  return (
    <ContentProvider>
      <RouterProvider router={router} />
      <Toaster />
    </ContentProvider>
  );
}