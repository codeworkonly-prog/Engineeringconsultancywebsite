import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  imageUrl: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  date: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
}

interface ContentContextType {
  teamMembers: TeamMember[];
  projects: Project[];
  galleryImages: GalleryImage[];
  addTeamMember: (member: Omit<TeamMember, 'id'>) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  addGalleryImage: (image: Omit<GalleryImage, 'id'>) => void;
  deleteTeamMember: (id: string) => void;
  deleteProject: (id: string) => void;
  deleteGalleryImage: (id: string) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const initialTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'John Anderson',
    position: 'Chief Engineer',
    bio: 'Over 20 years of experience in structural engineering and project management.',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
  },
  {
    id: '2',
    name: 'Sarah Williams',
    position: 'Senior Project Manager',
    bio: 'Specializes in large-scale infrastructure projects and team coordination.',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
  },
  {
    id: '3',
    name: 'Michael Chen',
    position: 'Lead Consultant',
    bio: 'Expert in mechanical systems design and sustainable engineering solutions.',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
  },
];

const initialProjects: Project[] = [
  {
    id: '1',
    title: 'City Bridge Infrastructure',
    description: 'Complete structural analysis and renovation of major city bridge.',
    category: 'Infrastructure',
    imageUrl: 'https://images.unsplash.com/photo-1587814213271-7a2b0f6a2f1d?w=800&h=600&fit=crop',
    date: '2025-12-15',
  },
  {
    id: '2',
    title: 'Commercial Building Complex',
    description: 'Designed mechanical and electrical systems for a 50-story building.',
    category: 'Commercial',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
    date: '2026-01-20',
  },
  {
    id: '3',
    title: 'Water Treatment Facility',
    description: 'Engineering consultancy for state-of-the-art water treatment plant.',
    category: 'Environmental',
    imageUrl: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800&h=600&fit=crop',
    date: '2025-11-10',
  },
];

const initialGalleryImages: GalleryImage[] = [
  {
    id: '1',
    title: 'Construction Site',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop',
    category: 'Projects',
  },
  {
    id: '2',
    title: 'Team Meeting',
    imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop',
    category: 'Team',
  },
  {
    id: '3',
    title: 'Engineering Plans',
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop',
    category: 'Work',
  },
];

export function ContentProvider({ children }: { children: ReactNode }) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(initialGalleryImages);

  const addTeamMember = (member: Omit<TeamMember, 'id'>) => {
    const newMember = { ...member, id: Date.now().toString() };
    setTeamMembers((prev) => [...prev, newMember]);
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject = { ...project, id: Date.now().toString() };
    setProjects((prev) => [...prev, newProject]);
  };

  const addGalleryImage = (image: Omit<GalleryImage, 'id'>) => {
    const newImage = { ...image, id: Date.now().toString() };
    setGalleryImages((prev) => [...prev, newImage]);
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

  return (
    <ContentContext.Provider
      value={{
        teamMembers,
        projects,
        galleryImages,
        addTeamMember,
        addProject,
        addGalleryImage,
        deleteTeamMember,
        deleteProject,
        deleteGalleryImage,
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
