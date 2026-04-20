import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "../lib/firebase";

/* =======================
   TYPES
======================= */

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  imgUrl: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  status: "ongoing" | "completed";
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
  type: "Workshop" | "Training" | "Seminar";
  description: string;
  topics: string[];
  slug: string;
}

export interface Client {
  id: string;
  name: string;
  url: string;
  imageUrl: string;
}

export interface Review {
  id: string;
  name: string;
  position: string;
  company: string;
  reviewerImageUrl: string;
  rating: number;
  testimonial: string;
  approved: boolean;
  createdAt?: any;
}

interface ContentContextType {
  loading: boolean;

  teamMembers: TeamMember[];
  projects: Project[];
  galleryImages: GalleryImage[];
  events: Event[];
  clients: Client[];
  reviews: Review[];

  addTeamMember: (data: Omit<TeamMember, "id">) => Promise<void>;
  updateTeamMember: (id: string, data: Omit<TeamMember, "id">) => Promise<void>;
  deleteTeamMember: (id: string) => Promise<void>;

  addProject: (data: Omit<Project, "id">) => Promise<void>;
  updateProject: (id: string, data: Omit<Project, "id">) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;

  addGalleryImage: (data: Omit<GalleryImage, "id">) => Promise<void>;
  updateGalleryImage: (
    id: string,
    data: Omit<GalleryImage, "id">
  ) => Promise<void>;
  deleteGalleryImage: (id: string) => Promise<void>;

  addEvent: (data: Omit<Event, "id">) => Promise<void>;
  updateEvent: (id: string, data: Omit<Event, "id">) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;

  addClient: (data: Omit<Client, "id">) => Promise<void>;
  updateClient: (id: string, data: Omit<Client, "id">) => Promise<void>;
  deleteClient: (id: string) => Promise<void>;

  addReview: (data: Omit<Review, "id">) => Promise<void>;
  updateReview: (id: string, data: Omit<Review, "id">) => Promise<void>;
  deleteReview: (id: string) => Promise<void>;
  toggleReviewApproval: (id: string, approved: boolean) => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

/* =======================
   PROVIDER
======================= */

export function ContentProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const unsubscribers = [
      onSnapshot(collection(db, "teamMembers"), (snap) => {
        setTeamMembers(
          snap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          })) as TeamMember[]
        );
      }),

      onSnapshot(collection(db, "projects"), (snap) => {
        setProjects(
          snap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          })) as Project[]
        );
      }),

      onSnapshot(collection(db, "galleryImages"), (snap) => {
        setGalleryImages(
          snap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          })) as GalleryImage[]
        );
      }),

      onSnapshot(collection(db, "events"), (snap) => {
        setEvents(
          snap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          })) as Event[]
        );
      }),

      onSnapshot(collection(db, "clients"), (snap) => {
        setClients(
          snap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          })) as Client[]
        );
      }),

      onSnapshot(
        query(collection(db, "reviews"), orderBy("createdAt", "desc")),
        (snap) => {
          setReviews(
            snap.docs.map((d) => ({
              id: d.id,
              ...d.data(),
            })) as Review[]
          );

          setLoading(false);
        }
      ),
    ];

    return () => unsubscribers.forEach((u) => u());
  }, []);

  /* =======================
     TEAM
  ======================= */

  const addTeamMember = async (data: Omit<TeamMember, "id">) => {
    await addDoc(collection(db, "teamMembers"), data);
  };

  const updateTeamMember = async (
    id: string,
    data: Omit<TeamMember, "id">
  ) => {
    await updateDoc(doc(db, "teamMembers", id), data);
  };

  const deleteTeamMember = async (id: string) => {
    await deleteDoc(doc(db, "teamMembers", id));
  };

  /* =======================
     PROJECTS
  ======================= */

  const addProject = async (data: Omit<Project, "id">) => {
    await addDoc(collection(db, "projects"), data);
  };

  const updateProject = async (id: string, data: Omit<Project, "id">) => {
    await updateDoc(doc(db, "projects", id), data);
  };

  const deleteProject = async (id: string) => {
    await deleteDoc(doc(db, "projects", id));
  };

  /* =======================
     GALLERY
  ======================= */

  const addGalleryImage = async (data: Omit<GalleryImage, "id">) => {
    await addDoc(collection(db, "galleryImages"), data);
  };

  const updateGalleryImage = async (
    id: string,
    data: Omit<GalleryImage, "id">
  ) => {
    await updateDoc(doc(db, "galleryImages", id), data);
  };

  const deleteGalleryImage = async (id: string) => {
    await deleteDoc(doc(db, "galleryImages", id));
  };

  /* =======================
     EVENTS
  ======================= */

  const addEvent = async (data: Omit<Event, "id">) => {
    await addDoc(collection(db, "events"), data);
  };

  const updateEvent = async (id: string, data: Omit<Event, "id">) => {
    await updateDoc(doc(db, "events", id), data);
  };

  const deleteEvent = async (id: string) => {
    await deleteDoc(doc(db, "events", id));
  };

  /* =======================
     CLIENTS
  ======================= */

  const addClient = async (data: Omit<Client, "id">) => {
    await addDoc(collection(db, "clients"), data);
  };

  const updateClient = async (id: string, data: Omit<Client, "id">) => {
    await updateDoc(doc(db, "clients", id), data);
  };

  const deleteClient = async (id: string) => {
    await deleteDoc(doc(db, "clients", id));
  };

  /* =======================
     REVIEWS
  ======================= */

  const addReview = async (data: Omit<Review, "id">) => {
    await addDoc(collection(db, "reviews"), {
      ...data,
      createdAt: new Date(),
    });
  };

  const updateReview = async (id: string, data: Omit<Review, "id">) => {
    await updateDoc(doc(db, "reviews", id), data);
  };

  const deleteReview = async (id: string) => {
    await deleteDoc(doc(db, "reviews", id));
  };

  const toggleReviewApproval = async (
    id: string,
    approved: boolean
  ) => {
    await updateDoc(doc(db, "reviews", id), { approved });
  };

  return (
    <ContentContext.Provider
      value={{
        loading,

        teamMembers,
        projects,
        galleryImages,
        events,
        clients,
        reviews,

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

        addReview,
        updateReview,
        deleteReview,
        toggleReviewApproval,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);

  if (!context) {
    throw new Error("useContent must be used inside ContentProvider");
  }

  return context;
}
