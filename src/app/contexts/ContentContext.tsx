import React, { createContext, useContext, useState, ReactNode } from 'react';
import dikshaImage from "../../imports/diksha1.png";
import shreyaImage from "../../imports/shreya1.png";
import satyaImage from "../../imports/Satya1.png";
import abhishekImage from "../../imports/Abhishek1.png";

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  imageUrl: string;
  slug: string;
}

export interface Client {
  id: string;
  name: string;
  logoUrl: string;
  website: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  projectType: 'Design and Build' | 'Contract';
  imageUrl: string;
  startDate: string;
  endDate: string;
  status: 'ongoing' | 'completed';
  slug: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

export interface Event {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  duration: string;
  type: 'Workshop' | 'Training' | 'Seminar';
  description: string;
  topics: string[];
  slug: string;
}

interface ContentContextType {
  teamMembers: TeamMember[];
  projects: Project[];
  galleryImages: GalleryImage[];
  events: Event[];
  clients: Client[];
  addTeamMember: (member: Omit<TeamMember, 'id'>) => void;
  updateTeamMember: (id: string, member: Omit<TeamMember, 'id'>) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Omit<Project, 'id'>) => void;
  addGalleryImage: (image: Omit<GalleryImage, 'id'>) => void;
  updateGalleryImage: (id: string, image: Omit<GalleryImage, 'id'>) => void;
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (id: string, event: Omit<Event, 'id'>) => void;
  addClient: (client: Omit<Client, 'id'>) => void;
  updateClient: (id: string, client: Omit<Client, 'id'>) => void;
  deleteTeamMember: (id: string) => void;
  deleteProject: (id: string) => void;
  deleteGalleryImage: (id: string) => void;
  deleteEvent: (id: string) => void;
  deleteClient: (id: string) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const initialTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Diksha Shrestha',
    position: 'Managing Director',
    bio: 'Strong leadership, expert management, and a commitment to delivering innovative consulting and project solutions with excellence.',
    imageUrl: dikshaImage,
    slug: 'diksha-shrestha',
  },
  {
    id: '2',
    name: 'Abhishek Sharma',
    position: 'Environmental/Civil Engineer',
    bio: 'Master of Science - MS, Environmental/Environmental Health Engineering, Bachelor of Engineering - BE, Civil Engineering',
    imageUrl: abhishekImage,
    slug: 'abhishek-sharma',
  },
  {
    id: '3',
    name: 'Shreya Tuladhar',
    position: 'Architect',
    bio: 'Bachelor of Architecture (B.Arch)',
    imageUrl: shreyaImage,
    slug: 'shreya-tuladhar',
  },
  {
    id: '4',
    name: 'Satya Raj Pandey',
    position: 'Engineer',
    bio: 'Bachelors Degree in Civil Engineering',
    imageUrl: satyaImage,
    slug: 'satya-raj-pandey',
  }
];

const initialClients: Client[] = [
  {
    id: '1',
    name: 'Gorkha Brewery',
    logoUrl: 'https://gorkhabrewery.com/media/o13b1o33/gorkha-brewery-carlsberg-group-logo.jpeg?width=172&mode=max',
    website: 'https://gorkhabrewery.com/en/',
  },
  {
    id: '2',
    name: 'Iva Tara',
    logoUrl: 'https://www.ivatara.com/assets/images/logo.svg',
    website: 'https://www.ivatara.com/',
  },
];

const initialProjects: Project[] = [
  {
    id: '1',
    title: 'City Bridge Infrastructure',
    description: 'Complete structural analysis and renovation of major city bridge.',
    category: 'Infrastructure',
    projectType: 'Design and Build',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop',
    startDate: '2024-01-15',
    endDate: '2025-12-15',
    status: 'ongoing',
    slug: 'city-bridge-infrastructure',
  },
];

const initialGalleryImages: GalleryImage[] = [
  {
    id: '1',
    title: 'Construction Projects',
    category: 'Construction',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop',
  },
];

const initialEvents: Event[] = [
  {
    id: '1',
    title: 'Advanced Structural Engineering Workshop',
    startDate: '2024-03-15',
    endDate: '2024-03-15',
    duration: '2 hours',
    type: 'Workshop',
    description: 'Learn advanced techniques in structural engineering.',
    topics: ['Finite Element Analysis', 'Material Properties', 'Load Analysis'],
    slug: 'advanced-structural-engineering-workshop',
  },
];

export function ContentProvider({ children }: { children: ReactNode }) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(initialGalleryImages);
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [clients, setClients] = useState<Client[]>(initialClients);

  const addTeamMember = (member: Omit<TeamMember, 'id'>) => {
    const newMember = { ...member, id: Date.now().toString() };
    setTeamMembers((prev) => [...prev, newMember]);
  };

  const updateTeamMember = (id: string, member: Omit<TeamMember, 'id'>) => {
    setTeamMembers((prev) => prev.map((m) => (m.id === id ? { ...member, id } : m)));
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject = { ...project, id: Date.now().toString() };
    setProjects((prev) => [...prev, newProject]);
  };

  const updateProject = (id: string, project: Omit<Project, 'id'>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...project, id } : p)));
  };

  const addGalleryImage = (image: Omit<GalleryImage, 'id'>) => {
    const newImage = { ...image, id: Date.now().toString() };
    setGalleryImages((prev) => [...prev, newImage]);
  };

  const updateGalleryImage = (id: string, image: Omit<GalleryImage, 'id'>) => {
    setGalleryImages((prev) => prev.map((i) => (i.id === id ? { ...image, id } : i)));
  };

  const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent = { ...event, id: Date.now().toString() };
    setEvents((prev) => [...prev, newEvent]);
  };

  const updateEvent = (id: string, event: Omit<Event, 'id'>) => {
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...event, id } : e)));
  };

  const deleteTeamMember = (id: string) => {
    setTeamMembers((prev) => prev.filter((member) => member.id !== id));
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
  };

  const deleteGalleryImage = (id: string) => {
    setGalleryImages((prev) => prev.filter((image) => image.id !== id));
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  const addClient = (client: Omit<Client, 'id'>) => {
    const newClient = { ...client, id: Date.now().toString() };
    setClients((prev) => [...prev, newClient]);
  };

  const updateClient = (id: string, client: Omit<Client, 'id'>) => {
    setClients((prev) => prev.map((c) => (c.id === id ? { ...client, id } : c)));
  };

  const deleteClient = (id: string) => {
    setClients((prev) => prev.filter((client) => client.id !== id));
  };


  return (
    <ContentContext.Provider
      value={{
        teamMembers,
        projects,
        galleryImages,
        events,
        clients,
        addTeamMember,
        updateTeamMember,
        addProject,
        updateProject,
        addGalleryImage,
        updateGalleryImage,
        addEvent,
        updateEvent,
        addClient,
        updateClient,
        deleteTeamMember,
        deleteProject,
        deleteGalleryImage,
        deleteEvent,
        deleteClient,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}