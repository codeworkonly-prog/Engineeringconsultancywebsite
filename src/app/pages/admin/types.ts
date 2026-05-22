export type Section = 'dashboard' | 'projects' | 'team' | 'events' | 'gallery' | 'clients';

export type ProjectForm = {
  title: string;
  description: string;
  category: string;
  projectType: 'Design and Build' | 'Contract';
  imageUrl: string;
  startDate: string;
  endDate: string;
  status: 'ongoing' | 'completed';
  slug: string;
  client: string;
  location: string;
  area: string;
  completionDate: string;
  servicesProvided: string[];
  overview: string;
  galleryImages: string[];
  result: string;
  keyFeatures: string[];
  beforeImage: string;
  afterImage: string;
  clientTestimonial: string;
  clientName: string;
  faqs: { question: string; answer: string }[];
  isFlagship: boolean; 
};

export type TeamForm = {
  name: string;
  position: string;
  bio: string;
  imageUrl: string;
  slug: string;
};

export type GalleryForm = {
  title: string;
  category: string;
  imageUrl: string;
};

export type EventForm = {
  title: string;
  startDate: string;
  endDate: string;
  duration: string;
  type: 'Workshop' | 'Training' | 'Seminar';
  description: string;
  topics: string[];
  slug: string;
};

export type ClientForm = {
  name: string;
  logoUrl: string;
  website: string;
};

export const defaultProjectForm: ProjectForm = {
  title: '',
  description: '',
  category: '',
  projectType: 'Design and Build',
  imageUrl: '',
  startDate: '',
  endDate: '',
  status: 'ongoing',
  slug: '',
  client: '',
  location: '',
  area: '',
  completionDate: '',
  servicesProvided: [],
  overview: '',
  galleryImages: [],
  result: '',
  keyFeatures: [],
  beforeImage: '',
  afterImage: '',
  clientTestimonial: '',
  clientName: '',
  faqs: [],
  isFlagship: false, // NEW: defaults to false
};

export const defaultTeamForm: TeamForm = {
  name: '',
  position: '',
  bio: '',
  imageUrl: '',
  slug: '',
};

export const defaultGalleryForm: GalleryForm = {
  title: '',
  category: '',
  imageUrl: '',
};

export const defaultEventForm: EventForm = {
  title: '',
  startDate: '',
  endDate: '',
  duration: '',
  type: 'Workshop',
  description: '',
  topics: [],
  slug: '',
};

export const defaultClientForm: ClientForm = {
  name: '',
  logoUrl: '',
  website: '',
};
