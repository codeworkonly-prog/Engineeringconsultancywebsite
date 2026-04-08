import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { db } from '../../firebase';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';

// TYPES
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
  status: 'Ongoing' | 'Completed';
  startDate: string;
  endDate: string;
  sector: string;
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

  addTeamMember: (member: Omit<TeamMember, 'id'>) => Promise<void>;
  updateTeamMember: (id: string, member: Omit<TeamMember, 'id'>) => Promise<void>;
  deleteTeamMember: (id: string) => Promise<void>;

  addProject: (project: Omit<Project, 'id'>) => Promise<void>;
  updateProject: (id: string, project: Omit<Project, 'id'>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;

  addGalleryImage: (image: Omit<GalleryImage, 'id'>) => Promise<void>;
  updateGalleryImage: (id: string, image: Omit<GalleryImage, 'id'>) => Promise<void>;
  deleteGalleryImage: (id: string) => Promise<void>;

  addEvent: (event: Omit<Event, 'id'>) => Promise<void>;
  updateEvent: (id: string, event: Omit<Event, 'id'>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  // 🔄 LOAD DATA FROM FIRESTORE
  const loadCollection = async (name: string, setter: any) => {
    const snapshot = await getDocs(collection(db, name));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as any[];
    setter(data);
  };

  const loadAll = async () => {
    await Promise.all([
      loadCollection('project', setProjects),
      loadCollection('team_member', setTeamMembers),
      loadCollection('gallery', setGalleryImages),
      loadCollection('event', setEvents),
    ]);
  };

  useEffect(() => {
    loadAll();
  }, []);

  // =========================
  // 🔵 PROJECT CRUD
  // =========================
  const addProject = async (project: Omit<Project, 'id'>) => {
    await addDoc(collection(db, 'project'), project);
    loadAll();
  };

  const updateProject = async (id: string, project: Omit<Project, 'id'>) => {
    await updateDoc(doc(db, 'project', id), project);
    loadAll();
  };

  const deleteProject = async (id: string) => {
    await deleteDoc(doc(db, 'project', id));
    loadAll();
  };

  // =========================
  // 🔵 TEAM CRUD
  // =========================
  const addTeamMember = async (member: Omit<TeamMember, 'id'>) => {
    await addDoc(collection(db, 'team_member'), member);
    loadAll();
  };

  const updateTeamMember = async (id: string, member: Omit<TeamMember, 'id'>) => {
    await updateDoc(doc(db, 'team_member', id), member);
    loadAll();
  };

  const deleteTeamMember = async (id: string) => {
    await deleteDoc(doc(db, 'team_member', id));
    loadAll();
  };

  // =========================
  // 🔵 GALLERY CRUD
  // =========================
  const addGalleryImage = async (image: Omit<GalleryImage, 'id'>) => {
    await addDoc(collection(db, 'gallery'), image);
    loadAll();
  };

  const updateGalleryImage = async (id: string, image: Omit<GalleryImage, 'id'>) => {
    await updateDoc(doc(db, 'gallery', id), image);
    loadAll();
  };

  const deleteGalleryImage = async (id: string) => {
    await deleteDoc(doc(db, 'gallery', id));
    loadAll();
  };

  // =========================
  // 🔵 EVENTS CRUD
  // =========================
  const addEvent = async (event: Omit<Event, 'id'>) => {
    await addDoc(collection(db, 'event'), event);
    loadAll();
  };

  const updateEvent = async (id: string, event: Omit<Event, 'id'>) => {
    await updateDoc(doc(db, 'event', id), event);
    loadAll();
  };

  const deleteEvent = async (id: string) => {
    await deleteDoc(doc(db, 'event', id));
    loadAll();
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
        deleteTeamMember,

        addProject,
        updateProject,
        deleteProject,

        addGalleryImage,
        updateGalleryImage,
        deleteGalleryImage,

        addEvent,
        updateEvent,
        deleteEvent,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

// HOOK
export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within ContentProvider');
  }
  return context;
}