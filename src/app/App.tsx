import { RouterProvider } from "react-router";
import { router } from "./routes.tsx";
import { Toaster } from "./components/ui/sonner";
import { ContentProvider } from "./contexts/ContentContext";
import { AuthProvider } from "./contexts/AuthContext";
import { Favicon } from "./components/Favicon";

export default function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <Favicon />
        <RouterProvider router={router} />
        <Toaster />
      </ContentProvider>
    </AuthProvider>
  );
}
