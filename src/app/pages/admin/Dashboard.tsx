import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useContent } from "../../contexts/ContentContext";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "sonner";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Calendar,
  ImageIcon,
  LogOut,
  Home,
  Edit,
  Trash2,
  X,
} from "lucide-react";

type Section = "dashboard" | "projects" | "team" | "events" | "gallery";

export function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const {
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
  } = useContent();

  const [activeSection, setActiveSection] = useState<Section>("dashboard");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [projectStatusFilter, setProjectStatusFilter] = useState<
    "all" | "ongoing" | "completed"
  >("all");

  // Form states
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    category: "",
    imageUrl: "",
    startDate: "",
    endDate: "",
    status: "ongoing" as "ongoing" | "completed",
    slug: "",
  });

  const [teamForm, setTeamForm] = useState({
    name: "",
    position: "",
    bio: "",
    imageUrl: "",
  });

  const [galleryForm, setGalleryForm] = useState({
    title: "",
    category: "",
    imageUrl: "",
  });

  const [eventForm, setEventForm] = useState({
    title: "",
    startDate: "",
    endDate: "",
    duration: "",
    type: "Workshop" as "Workshop" | "Training" | "Seminar",
    description: "",
    topics: [] as string[],
  });

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
    toast.success("Logged out successfully");
  };

  // Helper function to generate slug from title
  const generateSlug = (title: string, existingId?: string) => {
    let baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    // Check if slug exists (excluding current project being edited)
    const slugExists = (slug: string) =>
      projects.some((p) => p.slug === slug && p.id !== existingId);

    let slug = baseSlug;
    let counter = 1;

    while (slugExists(slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    return slug;
  };

  // Auto-generate slug when title changes
  const handleProjectTitleChange = (title: string) => {
    const slug = generateSlug(title, editingId || undefined);
    setProjectForm({ ...projectForm, title, slug });
  };

  // Project handlers
  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !projectForm.title ||
      !projectForm.description ||
      !projectForm.category ||
      !projectForm.imageUrl ||
      !projectForm.startDate ||
      !projectForm.endDate
    ) {
      toast.error("Please fill all fields");
      return;
    }

    // Validate that end date is after start date
    if (new Date(projectForm.endDate) < new Date(projectForm.startDate)) {
      toast.error("End date must be after start date");
      return;
    }

    if (editingId) {
      updateProject(editingId, projectForm);
      toast.success("Project updated");
      setEditingId(null);
    } else {
      addProject(projectForm);
      toast.success("Project added");
    }
    setProjectForm({
      title: "",
      description: "",
      category: "",
      imageUrl: "",
      startDate: "",
      endDate: "",
      status: "ongoing",
      slug: "",
    });
  };

  const handleEditProject = (project: (typeof projects)[0]) => {
    setProjectForm({
      title: project.title || "",
      description: project.description || "",
      category: project.category || "",
      imageUrl: project.imageUrl || "",
      startDate: project.startDate || "",
      endDate: project.endDate || "",
      status: project.status || "ongoing",
      slug: project.slug || "",
    });
    setEditingId(project.id);
  };

  // Team handlers
  const handleTeamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !teamForm.name ||
      !teamForm.position ||
      !teamForm.bio ||
      !teamForm.imageUrl
    ) {
      toast.error("Please fill all fields");
      return;
    }

    if (editingId) {
      updateTeamMember(editingId, teamForm);
      toast.success("Team member updated");
      setEditingId(null);
    } else {
      addTeamMember(teamForm);
      toast.success("Team member added");
    }
    setTeamForm({ name: "", position: "", bio: "", imageUrl: "" });
  };

  const handleEditTeam = (member: (typeof teamMembers)[0]) => {
    setTeamForm({
      name: member.name,
      position: member.position,
      bio: member.bio,
      imageUrl: member.imageUrl,
    });
    setEditingId(member.id);
  };

  // Gallery handlers
  const handleGallerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryForm.title || !galleryForm.category || !galleryForm.imageUrl) {
      toast.error("Please fill all fields");
      return;
    }

    if (editingId) {
      updateGalleryImage(editingId, galleryForm);
      toast.success("Gallery image updated");
      setEditingId(null);
    } else {
      addGalleryImage(galleryForm);
      toast.success("Gallery image added");
    }
    setGalleryForm({ title: "", category: "", imageUrl: "" });
  };

  const handleEditGallery = (image: (typeof galleryImages)[0]) => {
    setGalleryForm({
      title: image.title,
      category: image.category,
      imageUrl: image.imageUrl,
    });
    setEditingId(image.id);
  };

  // Event handlers
  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !eventForm.title ||
      !eventForm.startDate ||
      !eventForm.endDate ||
      !eventForm.duration ||
      !eventForm.type ||
      !eventForm.description
    ) {
      toast.error("Please fill all fields");
      return;
    }

    // Validate that end date is after start date
    if (new Date(eventForm.endDate) < new Date(eventForm.startDate)) {
      toast.error("End date must be after start date");
      return;
    }

    // Filter out empty topics
    const filteredTopics = eventForm.topics.filter(
      (topic) => topic.trim() !== "",
    );

    if (filteredTopics.length === 0) {
      toast.error("Please add at least one topic");
      return;
    }

    const eventData = {
      ...eventForm,
      topics: filteredTopics,
    };

    if (editingId) {
      updateEvent(editingId, eventData);
      toast.success("Event updated");
      setEditingId(null);
    } else {
      addEvent(eventData);
      toast.success("Event added");
    }
    setEventForm({
      title: "",
      startDate: "",
      endDate: "",
      duration: "",
      type: "Workshop",
      description: "",
      topics: [],
    });
  };

  const handleEditEvent = (event: (typeof events)[0]) => {
    setEventForm({
      title: event.title || "",
      startDate: event.startDate || "",
      endDate: event.endDate || "",
      duration: event.duration || "",
      type: event.type || "Workshop",
      description: event.description || "",
      topics: event.topics || [],
    });
    setEditingId(event.id);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setProjectForm({
      title: "",
      description: "",
      category: "",
      imageUrl: "",
      startDate: "",
      endDate: "",
      status: "ongoing",
      slug: "",
    });
    setTeamForm({ name: "", position: "", bio: "", imageUrl: "" });
    setGalleryForm({ title: "", category: "", imageUrl: "" });
    setEventForm({
      title: "",
      startDate: "",
      endDate: "",
      duration: "",
      type: "Workshop",
      description: "",
      topics: [],
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-brand-600">Admin Panel</h1>
        </div>

        <nav className="flex-1 p-4">
          <button
            onClick={() => setActiveSection("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 ${
              activeSection === "dashboard"
                ? "bg-brand-50 text-brand-600"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveSection("projects")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 ${
              activeSection === "projects"
                ? "bg-brand-50 text-brand-600"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Briefcase className="h-5 w-5" />
            <span>Projects</span>
          </button>

          <button
            onClick={() => setActiveSection("team")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 ${
              activeSection === "team"
                ? "bg-brand-50 text-brand-600"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Users className="h-5 w-5" />
            <span>Team</span>
          </button>

          <button
            onClick={() => setActiveSection("events")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 ${
              activeSection === "events"
                ? "bg-brand-50 text-brand-600"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Calendar className="h-5 w-5" />
            <span>Events</span>
          </button>

          <button
            onClick={() => setActiveSection("gallery")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 ${
              activeSection === "gallery"
                ? "bg-brand-50 text-brand-600"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <ImageIcon className="h-5 w-5" />
            <span>Gallery</span>
          </button>
        </nav>

        <div className="p-4 border-t space-y-2">
          <Link to="/" className="block">
            <Button variant="outline" size="sm" className="w-full">
              <Home className="h-4 w-4 mr-2" />
              Website
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b px-8 py-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {activeSection === "dashboard" && "Dashboard"}
            {activeSection === "projects" && "Projects"}
            {activeSection === "team" && "Team"}
            {activeSection === "events" && "Events"}
            {activeSection === "gallery" && "Gallery"}
          </h2>
        </header>

        <div className="p-8">
          {/* Dashboard Section */}
          {activeSection === "dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-gray-600">
                    Total Projects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-brand-600">
                    {projects.length}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-gray-600">
                    Team Members
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-brand-600">
                    {teamMembers.length}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-gray-600">
                    Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-brand-600">
                    {events.length}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-gray-600">
                    Gallery Images
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-brand-600">
                    {galleryImages.length}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Projects Section */}
          {activeSection === "projects" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {editingId ? "Edit Project" : "Add New Project"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProjectSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="project-name">Project Name</Label>
                      <Input
                        id="project-name"
                        value={projectForm.title}
                        onChange={(e) =>
                          handleProjectTitleChange(e.target.value)
                        }
                        placeholder="Enter project name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="project-description">Description</Label>
                      <Textarea
                        id="project-description"
                        value={projectForm.description}
                        onChange={(e) =>
                          setProjectForm({
                            ...projectForm,
                            description: e.target.value,
                          })
                        }
                        placeholder="Enter project description"
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label htmlFor="project-category">Category</Label>
                      <Input
                        id="project-category"
                        value={projectForm.category}
                        onChange={(e) =>
                          setProjectForm({
                            ...projectForm,
                            category: e.target.value,
                          })
                        }
                        placeholder="Enter project category"
                      />
                    </div>

                    <div>
                      <Label htmlFor="project-image">Image URL</Label>
                      <Input
                        id="project-image"
                        value={projectForm.imageUrl}
                        onChange={(e) =>
                          setProjectForm({
                            ...projectForm,
                            imageUrl: e.target.value,
                          })
                        }
                        placeholder="https://..."
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="project-start-date">Start Date</Label>
                        <Input
                          id="project-start-date"
                          type="date"
                          value={projectForm.startDate}
                          onChange={(e) =>
                            setProjectForm({
                              ...projectForm,
                              startDate: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="project-end-date">End Date</Label>
                        <Input
                          id="project-end-date"
                          type="date"
                          value={projectForm.endDate}
                          onChange={(e) =>
                            setProjectForm({
                              ...projectForm,
                              endDate: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="project-status">Status</Label>
                      <Select
                        value={projectForm.status}
                        onValueChange={(value: "ongoing" | "completed") =>
                          setProjectForm({ ...projectForm, status: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ongoing">Ongoing</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="project-slug">
                        Slug (Auto-generated)
                      </Label>
                      <Input
                        id="project-slug"
                        value={projectForm.slug}
                        readOnly
                        placeholder="Auto-generated from title"
                        className="bg-gray-50"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        URL: /projects/{projectForm.slug || "your-project-name"}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1">
                        {editingId ? "Update Project" : "Add Project"}
                      </Button>
                      {editingId && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={cancelEdit}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>
                      All Projects (
                      {
                        projects.filter(
                          (p) =>
                            projectStatusFilter === "all" ||
                            p.status === projectStatusFilter,
                        ).length
                      }
                      )
                    </CardTitle>
                    <Select
                      value={projectStatusFilter}
                      onValueChange={(value: "all" | "ongoing" | "completed") =>
                        setProjectStatusFilter(value)
                      }
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Projects</SelectItem>
                        <SelectItem value="ongoing">Ongoing</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {projects
                      .filter(
                        (p) =>
                          projectStatusFilter === "all" ||
                          p.status === projectStatusFilter,
                      )
                      .map((project) => (
                        <div
                          key={project.id}
                          className="border rounded-lg p-4 hover:bg-gray-50"
                        >
                          <div className="flex justify-between items-start gap-4">
                            <img
                              src={project.imageUrl}
                              alt={project.title}
                              className="w-20 h-20 rounded object-cover flex-shrink-0"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold">
                                  {project.title}
                                </h3>
                                <span className="px-2 py-1 rounded text-xs bg-brand-100 text-brand-600">
                                  {project.category}
                                </span>
                                <span
                                  className={`px-2 py-1 rounded text-xs ${
                                    project.status === "ongoing"
                                      ? "bg-green-100 text-green-600"
                                      : "bg-gray-100 text-gray-600"
                                  }`}
                                >
                                  {project.status === "ongoing"
                                    ? "Ongoing"
                                    : "Completed"}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">
                                {project.description}
                              </p>
                              <p className="text-xs text-gray-500">
                                {project.startDate} - {project.endDate}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                Slug: {project.slug}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditProject(project)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  deleteProject(project.id);
                                  toast.success("Project deleted");
                                }}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Team Section */}
          {activeSection === "team" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {editingId ? "Edit Team Member" : "Add New Team Member"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleTeamSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="team-name">Name</Label>
                      <Input
                        id="team-name"
                        value={teamForm.name}
                        onChange={(e) =>
                          setTeamForm({ ...teamForm, name: e.target.value })
                        }
                        placeholder="Enter name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="team-position">Position</Label>
                      <Input
                        id="team-position"
                        value={teamForm.position}
                        onChange={(e) =>
                          setTeamForm({ ...teamForm, position: e.target.value })
                        }
                        placeholder="e.g., Chief Engineer"
                      />
                    </div>

                    <div>
                      <Label htmlFor="team-bio">Bio</Label>
                      <Textarea
                        id="team-bio"
                        value={teamForm.bio}
                        onChange={(e) =>
                          setTeamForm({ ...teamForm, bio: e.target.value })
                        }
                        placeholder="Enter team member bio"
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label htmlFor="team-image">Image URL</Label>
                      <Input
                        id="team-image"
                        value={teamForm.imageUrl}
                        onChange={(e) =>
                          setTeamForm({ ...teamForm, imageUrl: e.target.value })
                        }
                        placeholder="https://..."
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1">
                        {editingId ? "Update Member" : "Add Member"}
                      </Button>
                      {editingId && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={cancelEdit}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>All Team Members ({teamMembers.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {teamMembers.map((member) => (
                      <div
                        key={member.id}
                        className="border rounded-lg p-4 hover:bg-gray-50"
                      >
                        <div className="flex gap-4">
                          <img
                            src={member.imageUrl}
                            alt={member.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold">{member.name}</h3>
                            <p className="text-sm text-brand-600">
                              {member.position}
                            </p>
                            <p className="text-sm text-gray-600">
                              {member.bio}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditTeam(member)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                deleteTeamMember(member.id);
                                toast.success("Team member deleted");
                              }}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Events Section */}
          {activeSection === "events" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {editingId ? "Edit Event" : "Add New Event"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleEventSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="event-name">Event Name</Label>
                      <Input
                        id="event-name"
                        value={eventForm.title}
                        onChange={(e) =>
                          setEventForm({ ...eventForm, title: e.target.value })
                        }
                        placeholder="Enter event name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="event-description">Description</Label>
                      <Textarea
                        id="event-description"
                        value={eventForm.description}
                        onChange={(e) =>
                          setEventForm({
                            ...eventForm,
                            description: e.target.value,
                          })
                        }
                        placeholder="Enter event description"
                        rows={4}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="event-start">Date</Label>
                        <Input
                          id="event-start"
                          type="date"
                          value={eventForm.startDate}
                          onChange={(e) =>
                            setEventForm({
                              ...eventForm,
                              startDate: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="event-end">End Date</Label>
                        <Input
                          id="event-end"
                          type="date"
                          value={eventForm.endDate}
                          onChange={(e) =>
                            setEventForm({
                              ...eventForm,
                              endDate: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="event-duration">Duration</Label>
                      <Input
                        id="event-duration"
                        type="text"
                        value={eventForm.duration}
                        onChange={(e) =>
                          setEventForm({
                            ...eventForm,
                            duration: e.target.value,
                          })
                        }
                        placeholder="e.g., 3 days, 5 days"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Enter duration like "3 days" or "2 weeks"
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="event-type">Type</Label>
                      <Select
                        value={eventForm.type}
                        onValueChange={(
                          value: "Workshop" | "Training" | "Seminar",
                        ) => setEventForm({ ...eventForm, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Workshop">Workshop</SelectItem>
                          <SelectItem value="Training">Training</SelectItem>
                          <SelectItem value="Seminar">Seminar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="event-topics">Topics</Label>
                      <Textarea
                        id="event-topics"
                        value={eventForm.topics.join("\n")}
                        onChange={(e) =>
                          setEventForm({
                            ...eventForm,
                            topics: e.target.value.split("\n"),
                          })
                        }
                        placeholder="Enter topics, one per line"
                        rows={4}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1">
                        {editingId ? "Update Event" : "Add Event"}
                      </Button>
                      {editingId && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={cancelEdit}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>All Events ({events.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {events.map((event) => (
                      <div
                        key={event.id}
                        className="border rounded-lg p-4 hover:bg-gray-50"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold mb-2">
                              {event.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              {event.description}
                            </p>
                            <p className="text-xs text-gray-500">
                              {event.startDate} - {event.endDate}
                            </p>
                            <p className="text-xs text-gray-500">
                              Type: {event.type}
                            </p>
                            {event.topics && event.topics.length > 0 && (
                              <p className="text-xs text-gray-500">
                                Topics: {event.topics.join(", ")}
                              </p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditEvent(event)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                deleteEvent(event.id);
                                toast.success("Event deleted");
                              }}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Gallery Section */}
          {activeSection === "gallery" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {editingId ? "Edit Gallery Image" : "Add New Gallery Image"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleGallerySubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="gallery-title">Title</Label>
                      <Input
                        id="gallery-title"
                        value={galleryForm.title}
                        onChange={(e) =>
                          setGalleryForm({
                            ...galleryForm,
                            title: e.target.value,
                          })
                        }
                        placeholder="Enter title"
                      />
                    </div>

                    <div>
                      <Label htmlFor="gallery-category">Category</Label>
                      <Input
                        id="gallery-category"
                        value={galleryForm.category}
                        onChange={(e) =>
                          setGalleryForm({
                            ...galleryForm,
                            category: e.target.value,
                          })
                        }
                        placeholder="Enter category"
                      />
                    </div>

                    <div>
                      <Label htmlFor="gallery-image">Image URL</Label>
                      <Input
                        id="gallery-image"
                        value={galleryForm.imageUrl}
                        onChange={(e) =>
                          setGalleryForm({
                            ...galleryForm,
                            imageUrl: e.target.value,
                          })
                        }
                        placeholder="https://..."
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1">
                        {editingId ? "Update Image" : "Add Image"}
                      </Button>
                      {editingId && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={cancelEdit}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    All Gallery Images ({galleryImages.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {galleryImages.map((image) => (
                      <div
                        key={image.id}
                        className="border rounded-lg overflow-hidden"
                      >
                        <img
                          src={image.imageUrl}
                          alt={image.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-3">
                          <p className="font-semibold text-sm mb-1">
                            {image.title}
                          </p>
                          <p className="text-xs text-gray-500 mb-2">
                            {image.category}
                          </p>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={() => handleEditGallery(image)}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                deleteGalleryImage(image.id);
                                toast.success("Image deleted");
                              }}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
