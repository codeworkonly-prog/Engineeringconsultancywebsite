import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  designation: string;
  qualification: string;
  imageUrl: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'Upcoming' | 'Completed';
  startDate: string;
  endDate: string;
}

export interface GalleryImage {
  id: string;
  albumName: string;
  imageUrl: string;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

interface ContentContextType {
  teamMembers: TeamMember[];
  projects: Project[];
  galleryImages: GalleryImage[];
  events: Event[];
  addTeamMember: (member: Omit<TeamMember, 'id'>) => void;
  updateTeamMember: (id: string, member: Omit<TeamMember, 'id'>) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Omit<Project, 'id'>) => void;
  addGalleryImage: (image: Omit<GalleryImage, 'id'>) => void;
  updateGalleryImage: (id: string, image: Omit<GalleryImage, 'id'>) => void;
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (id: string, event: Omit<Event, 'id'>) => void;
  deleteTeamMember: (id: string) => void;
  deleteProject: (id: string) => void;
  deleteGalleryImage: (id: string) => void;
  deleteEvent: (id: string) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const initialTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'John Anderson',
    role: 'Chief Engineer',
    designation: 'Senior Consultant',
    qualification: 'B.E. Civil, M.Sc. Structural Engineering',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
  },
];

const initialProjects: Project[] = [
  {
    id: '1',
    name: 'City Bridge Infrastructure',
    description: 'Complete structural analysis and renovation of major city bridge.',
    status: 'Completed',
    startDate: '2024-01-15',
    endDate: '2025-12-15',
  },
];

const initialGalleryImages: GalleryImage[] = [
  {
    id: '1',
    albumName: 'Construction Projects',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop',
  },
];

const initialEvents: Event[] = [
  {
    id: '1',
    name: 'Engineering Workshop 2026',
    description: 'A comprehensive workshop on modern engineering practices and sustainable design.',
    startDate: '2026-06-15',
    endDate: '2026-06-17',
  },
];

export function ContentProvider({ children }: { children: ReactNode }) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(initialGalleryImages);
  const [events, setEvents] = useState<Event[]>(initialEvents);

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

  return (
    <ContentContext.Provider
      value={{
        teamMembers,
        projects,
        galleryImages,
        events,
        addTeamMember,
        updateTeamMember,
        addProject,
        updateProject,
        addGalleryImage,
        updateGalleryImage,
        addEvent,
        updateEvent,
        deleteTeamMember,
        deleteProject,
        deleteGalleryImage,
        deleteEvent,
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