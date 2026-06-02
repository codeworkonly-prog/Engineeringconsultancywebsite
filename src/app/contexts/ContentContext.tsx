import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../../firebase"; // Adjust path if needed
import { PortfolioItem } from "../../types/portfolio.types";

/* =========================
   Interfaces
========================= */

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  imageUrl: string;
  slug: string;
  isLeadership?: boolean;
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
  projectType: "Design and Build" | "Contract";
  imageUrl: string;
  startDate: string;
  endDate: string;
  status: "ongoing" | "completed";
  slug: string;
  isFlagship: boolean;
  client?: string;
  clientId?: string;
  location?: string;
  area?: string;
  completionDate?: string;
  servicesProvided?: string[];
  overview?: string;
  galleryImages?: string[];
  result?: string;
  keyFeatures?: string[];
  beforeImage?: string;
  afterImage?: string;
  clientTestimonial?: string;
  clientName?: string;
  faqs?: { question: string; answer: string }[];
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
  type: "Workshop" | "Training" | "Seminar";
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
  portfolio: PortfolioItem[];

  addTeamMember: (member: Omit<TeamMember, "id">) => Promise<void>;
  updateTeamMember: (
    id: string,
    member: Omit<TeamMember, "id">
  ) => Promise<void>;
  deleteTeamMember: (id: string) => Promise<void>;

  addProject: (project: Omit<Project, "id">) => Promise<void>;
  updateProject: (
    id: string,
    project: Omit<Project, "id">
  ) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;

  addGalleryImage: (
    image: Omit<GalleryImage, "id">
  ) => Promise<void>;
  updateGalleryImage: (
    id: string,
    image: Omit<GalleryImage, "id">
  ) => Promise<void>;
  deleteGalleryImage: (id: string) => Promise<void>;

  addEvent: (event: Omit<Event, "id">) => Promise<void>;
  updateEvent: (
    id: string,
    event: Omit<Event, "id">
  ) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;

  addClient: (client: Omit<Client, "id">) => Promise<string>;
  updateClient: (
    id: string,
    client: Omit<Client, "id">
  ) => Promise<void>;
  deleteClient: (id: string) => Promise<void>;

  addPortfolioItem: (item: Omit<PortfolioItem, "id">) => Promise<void>;
  updatePortfolioItem: (
    id: string,
    item: Omit<PortfolioItem, "id">
  ) => Promise<void>;
  deletePortfolioItem: (id: string) => Promise<void>;
}

/* =========================
   Context
========================= */

const ContentContext = createContext<ContentContextType | undefined>(
  undefined
);

/* =========================
   Provider
========================= */

export function ContentProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);

  /* =========================
     Fetch Data
  ========================= */

  useEffect(() => {
    fetchTeamMembers();
    fetchProjects();
    fetchGalleryImages();
    fetchEvents();
    fetchClients();
    fetchPortfolio();
  }, []);

  /* =========================
     TEAM MEMBERS
  ========================= */

  const fetchTeamMembers = async () => {
    try {
      const snapshot = await getDocs(
        collection(db, "teamMembers")
      );

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<TeamMember, "id">),
      }));

      setTeamMembers(data);
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };

  const addTeamMember = async (
    member: Omit<TeamMember, "id">
  ) => {
    try {
      const docRef = await addDoc(
        collection(db, "teamMembers"),
        member
      );

      setTeamMembers((prev) => [
        ...prev,
        {
          ...member,
          id: docRef.id,
        },
      ]);
    } catch (error) {
      console.error("Error adding team member:", error);
    }
  };

  const updateTeamMember = async (
    id: string,
    member: Omit<TeamMember, "id">
  ) => {
    try {
      await updateDoc(doc(db, "teamMembers", id), {
        ...member,
      });

      setTeamMembers((prev) =>
        prev.map((m) =>
          m.id === id ? { ...member, id } : m
        )
      );
    } catch (error) {
      console.error("Error updating team member:", error);
    }
  };

  const deleteTeamMember = async (id: string) => {
    try {
      await deleteDoc(doc(db, "teamMembers", id));

      setTeamMembers((prev) =>
        prev.filter((member) => member.id !== id)
      );
    } catch (error) {
      console.error("Error deleting team member:", error);
    }
  };

  /* =========================
     PROJECTS
  ========================= */

  const fetchProjects = async () => {
    try {
      const snapshot = await getDocs(
        collection(db, "projects")
      );

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Project, "id">),
      }));

      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const addProject = async (
    project: Omit<Project, "id">
  ) => {
    try {
      const docRef = await addDoc(
        collection(db, "projects"),
        project
      );

      setProjects((prev) => [
        ...prev,
        {
          ...project,
          id: docRef.id,
        },
      ]);
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  const updateProject = async (
    id: string,
    project: Omit<Project, "id">
  ) => {
    try {
      await updateDoc(doc(db, "projects", id), {
        ...project,
      });

      setProjects((prev) =>
        prev.map((p) =>
          p.id === id ? { ...project, id } : p
        )
      );
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await deleteDoc(doc(db, "projects", id));

      setProjects((prev) =>
        prev.filter((project) => project.id !== id)
      );
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  /* =========================
     GALLERY IMAGES
  ========================= */

  const fetchGalleryImages = async () => {
    try {
      const snapshot = await getDocs(
        collection(db, "galleryImages")
      );

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<GalleryImage, "id">),
      }));

      setGalleryImages(data);
    } catch (error) {
      console.error("Error fetching gallery images:", error);
    }
  };

  const addGalleryImage = async (
    image: Omit<GalleryImage, "id">
  ) => {
    try {
      const docRef = await addDoc(
        collection(db, "galleryImages"),
        image
      );

      setGalleryImages((prev) => [
        ...prev,
        {
          ...image,
          id: docRef.id,
        },
      ]);
    } catch (error) {
      console.error("Error adding gallery image:", error);
    }
  };

  const updateGalleryImage = async (
    id: string,
    image: Omit<GalleryImage, "id">
  ) => {
    try {
      await updateDoc(doc(db, "galleryImages", id), {
        ...image,
      });

      setGalleryImages((prev) =>
        prev.map((i) =>
          i.id === id ? { ...image, id } : i
        )
      );
    } catch (error) {
      console.error("Error updating gallery image:", error);
    }
  };

  const deleteGalleryImage = async (id: string) => {
    try {
      await deleteDoc(doc(db, "galleryImages", id));

      setGalleryImages((prev) =>
        prev.filter((image) => image.id !== id)
      );
    } catch (error) {
      console.error("Error deleting gallery image:", error);
    }
  };

  /* =========================
     EVENTS
  ========================= */

  const fetchEvents = async () => {
    try {
      const snapshot = await getDocs(
        collection(db, "events")
      );

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Event, "id">),
      }));

      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const addEvent = async (
    event: Omit<Event, "id">
  ) => {
    try {
      const docRef = await addDoc(
        collection(db, "events"),
        event
      );

      setEvents((prev) => [
        ...prev,
        {
          ...event,
          id: docRef.id,
        },
      ]);
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const updateEvent = async (
    id: string,
    event: Omit<Event, "id">
  ) => {
    try {
      await updateDoc(doc(db, "events", id), {
        ...event,
      });

      setEvents((prev) =>
        prev.map((e) =>
          e.id === id ? { ...event, id } : e
        )
      );
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      await deleteDoc(doc(db, "events", id));

      setEvents((prev) =>
        prev.filter((event) => event.id !== id)
      );
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  /* =========================
     CLIENTS
  ========================= */

  const fetchClients = async () => {
    try {
      const snapshot = await getDocs(
        collection(db, "clients")
      );

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Client, "id">),
      }));

      setClients(data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const addClient = async (
    client: Omit<Client, "id">
  ): Promise<string> => {
    try {
      // enforce unique client names (case-insensitive)
      const exists = clients.some(
        (c) => c.name.trim().toLowerCase() === client.name.trim().toLowerCase()
      );

      if (exists) {
        throw new Error('Client with this name already exists');
      }

      const docRef = await addDoc(collection(db, "clients"), client);

      setClients((prev) => [
        ...prev,
        {
          ...client,
          id: docRef.id,
        },
      ]);
      return docRef.id;
    } catch (error) {
      console.error("Error adding client:", error);
      throw error;
    }
  };

  const updateClient = async (
    id: string,
    client: Omit<Client, "id">
  ) => {
    try {
      // enforce unique client names (case-insensitive), excluding current
      const exists = clients.some(
        (c) => c.id !== id && c.name.trim().toLowerCase() === client.name.trim().toLowerCase()
      );

      if (exists) {
        throw new Error('Another client with this name already exists');
      }

      await updateDoc(doc(db, "clients", id), {
        ...client,
      });

      setClients((prev) =>
        prev.map((c) => (c.id === id ? { ...client, id } : c))
      );
    } catch (error) {
      console.error("Error updating client:", error);
      throw error;
    }
  };

  const deleteClient = async (id: string) => {
    try {
      // prevent deletion if any portfolio item references this client
      const referenced = portfolio.some((p) => p.clientId === id);

      if (referenced) {
        throw new Error('Cannot delete client: referenced by portfolio items');
      }

      await deleteDoc(doc(db, "clients", id));

      setClients((prev) => prev.filter((client) => client.id !== id));
    } catch (error) {
      console.error("Error deleting client:", error);
      throw error;
    }
  };

  /* =========================
     PORTFOLIO
  ========================= */

  const fetchPortfolio = async () => {
    try {
      const snapshot = await getDocs(collection(db, "portfolio"));

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<PortfolioItem, "id">),
      }));

      setPortfolio(data);
    } catch (error) {
      console.error("Error fetching portfolio:", error);
    }
  };

  const addPortfolioItem = async (item: Omit<PortfolioItem, "id">) => {
    try {
      // remove undefined fields so Firestore doesn't receive `undefined`
      const payload = Object.fromEntries(
        Object.entries(item).filter(([, v]) => v !== undefined)
      );

      const docRef = await addDoc(collection(db, "portfolio"), payload as any);

      setPortfolio((prev) => [
        ...prev,
        {
          ...item,
          id: docRef.id,
        },
      ]);
    } catch (error) {
      console.error("Error adding portfolio item:", error);
      throw error;
    }
  };

  const updatePortfolioItem = async (
    id: string,
    item: Omit<PortfolioItem, "id">
  ) => {
    try {
      const payload = Object.fromEntries(
        Object.entries(item).filter(([, v]) => v !== undefined)
      );

      await updateDoc(doc(db, "portfolio", id), payload as any);

      setPortfolio((prev) =>
        prev.map((portfolioItem) =>
          portfolioItem.id === id ? { ...item, id } : portfolioItem
        )
      );
    } catch (error) {
      console.error("Error updating portfolio item:", error);
      throw error;
    }
  };

  const deletePortfolioItem = async (id: string) => {
    try {
      await deleteDoc(doc(db, "portfolio", id));

      setPortfolio((prev) =>
        prev.filter((portfolioItem) => portfolioItem.id !== id)
      );
    } catch (error) {
      console.error("Error deleting portfolio item:", error);
      throw error;
    }
  };

  /* =========================
     Provider Return
  ========================= */

  return (
    <ContentContext.Provider
      value={{
        teamMembers,
        projects,
        galleryImages,
        events,
        clients,
        portfolio,

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

        addClient,
        updateClient,
        deleteClient,

        addPortfolioItem,
        updatePortfolioItem,
        deletePortfolioItem,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

/* =========================
   Custom Hook
========================= */

export function useContent() {
  const context = useContext(ContentContext);

  if (!context) {
    throw new Error(
      "useContent must be used within ContentProvider"
    );
  }

  return context;
}
