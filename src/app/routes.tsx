import { lazy, Suspense, type ComponentType } from 'react';
import { createBrowserRouter } from 'react-router';
import { Root } from './Root';
import { ProtectedRoute } from './components/ProtectedRoute';
import { NotFound } from './pages/NotFound';

// Route-level code splitting: each page is a separate chunk loaded on
// demand, so the public initial bundle stays small. Root and NotFound
// stay eager so the layout shell and 404s render instantly.
const page = (name: string, loader: () => Promise<Record<string, unknown>>) =>
  lazy(async () => {
    const m = await loader();
    return { default: m[name] as ComponentType<any> };
  });

const Home = page('Home', () => import('./pages/Home'));
const About = page('About', () => import('./pages/About'));
const Training = page('Training', () => import('./pages/Training'));
const Projects = page('Projects', () => import('./pages/Projects'));
const ProjectDetail = page('ProjectDetail', () => import('./pages/ProjectDetail'));
const EventDetail = page('EventDetail', () => import('./pages/EventDetail'));
const Contact = page('Contact', () => import('./pages/Contact'));
const Portfolio = page('Portfolio', () => import('./pages/Portfolio'));
const Team = page('Team', () => import('./pages/Team'));
const TeamMemberDetail = page('TeamMemberDetail', () => import('./pages/TeamMemberDetail'));
const CompanyProfile = page('CompanyProfile', () => import('./pages/CompanyProfile'));
const CompanySector = page('CompanySector', () => import('./pages/CompanySector'));
const ConsultingService = page('ConsultingService', () => import('./pages/ConsultingService'));
const PortfolioItemDetail = page('PortfolioItemDetail', () => import('./pages/PortfolioItemDetail'));
const AdminLayout = page('AdminLayout', () => import('./pages/admin/Dashboard'));
const DashboardHome = page('DashboardHome', () => import('./pages/admin/DashboardHome'));
const PortfolioSection = page('PortfolioSection', () => import('./pages/admin/PortfolioSection'));
const PortfolioForm = page('PortfolioForm', () => import('./pages/admin/PortfolioForm'));
const TeamSection = page('TeamSection', () => import('./pages/admin/TeamSection'));
const TeamForm = page('TeamForm', () => import('./pages/admin/TeamForm'));
const ClientsManagement = page('ClientsManagement', () => import('./pages/admin/Clients'));
const ClientForm = page('ClientForm', () => import('./pages/admin/ClientForm'));
const SectorsManagement = page('SectorsManagement', () => import('./pages/admin/Sectors'));
const SectorForm = page('SectorForm', () => import('./pages/admin/SectorForm'));
const FaqsSection = page('FaqsSection', () => import('./pages/admin/FaqsSection'));
const FaqForm = page('FaqForm', () => import('./pages/admin/FaqForm'));
const PrivacyPolicySection = page('PrivacyPolicySection', () => import('./pages/admin/PrivacyPolicySection'));
const HeroCarouselSection = page('HeroCarouselSection', () => import('./pages/admin/HeroCarouselSection'));
const ContactInfoSection = page('ContactInfoSection', () => import('./pages/admin/ContactInfoSection'));
const AdminLogin = page('AdminLogin', () => import('./components/AdminLogin'));
const Faq = page('Faq', () => import('./pages/Faq'));
const PrivacyPolicy = page('PrivacyPolicy', () => import('./pages/PrivacyPolicy'));

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
      { path: 'faq', Component: Faq },
      { path: 'privacy-policy', Component: PrivacyPolicy },
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
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: DashboardHome },
      { path: 'portfolio', Component: PortfolioSection },
      { path: 'portfolio/add', Component: PortfolioForm },
      { path: 'portfolio/edit/:slug', Component: PortfolioForm },
      { path: 'team', Component: TeamSection },
      { path: 'team/add', Component: TeamForm },
      { path: 'team/edit/:slug', Component: TeamForm },
      { path: 'clients', Component: ClientsManagement },
      { path: 'clients/add', Component: ClientForm },
      { path: 'clients/edit/:slug', Component: ClientForm },
      { path: 'sectors', Component: SectorsManagement },
      { path: 'sectors/add', Component: SectorForm },
      { path: 'sectors/edit/:slug', Component: SectorForm },
      { path: 'faqs', Component: FaqsSection },
      { path: 'faqs/add', Component: FaqForm },
      { path: 'faqs/edit/:slug', Component: FaqForm },
      { path: 'hero-carousel', Component: HeroCarouselSection },
      { path: 'contact-info', Component: ContactInfoSection },
      { path: 'privacy-policy', Component: PrivacyPolicySection },
      { path: '*', Component: NotFound },
    ],
  },
]);
