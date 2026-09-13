import { RouterProvider } from 'react-router';
import { Suspense } from 'react';
import { router } from './routes.tsx';
import { Toaster } from './components/ui/sonner';
import { ContentProvider } from './contexts/ContentContext';
import { AuthProvider } from './contexts/AuthContext';
import { Favicon } from './components/Favicon';

export default function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <Favicon />
        {/* Route chunks are code-split (React.lazy) — one boundary covers all of them */}
        <Suspense fallback={null}>
          <RouterProvider router={router} />
        </Suspense>
        <Toaster />
      </ContentProvider>
    </AuthProvider>
  );
}