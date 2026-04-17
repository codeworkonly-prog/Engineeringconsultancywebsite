import { createBrowserRouter } from "react-router-dom";
import { Root } from "./Root";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Training } from "./pages/Training";
import { Projects } from "./pages/Projects";
import { ProjectDetail } from "./pages/ProjectDetail";
import { EventDetail } from "./pages/EventDetail";
import { Contact } from "./pages/Contact";
import { Team } from "./pages/Team";
import { CompanyProfile } from "./pages/CompanyProfile";
import { Dashboard } from "./pages/admin/Dashboard";
import { AdminLogin } from "./components/AdminLogin";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "company-profile", element: <CompanyProfile /> },
      { path: "team", element: <Team /> },
      { path: "events", element: <Training /> },
      { path: "events/:slug", element: <EventDetail /> },
      { path: "projects", element: <Projects /> },
      { path: "projects/:slug", element: <ProjectDetail /> },
      { path: "contact", element: <Contact /> },
    ],
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
]);
