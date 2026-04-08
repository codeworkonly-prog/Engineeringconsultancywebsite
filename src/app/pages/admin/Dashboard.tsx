import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { useContent } from '../../contexts/ContentContext';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';
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
} from 'lucide-react';

type Section = 'dashboard' | 'projects' | 'team' | 'events' | 'gallery';

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

  const [activeSection, setActiveSection] = useState<Section>('dashboard');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [projectForm, setProjectForm] = useState({
    name: '',
    description: '',
    status: 'Upcoming' as 'Upcoming' | 'Completed',
    startDate: '',
    endDate: '',
  });

  const [teamForm, setTeamForm] = useState({
    name: '',
    role: '',
    designation: '',
    qualification: '',
    imageUrl: '',
  });

  const [galleryForm, setGalleryForm] = useState({
    albumName: '',
    imageUrl: '',
  });

  const [eventForm, setEventForm] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
  });

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
    toast.success('Logged out successfully');
  };

  // Project handlers
  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.name || !projectForm.description || !projectForm.startDate || !projectForm.endDate) {
      toast.error('Please fill all fields');
      return;
    }

    if (editingId) {
      updateProject(editingId, projectForm);
      toast.success('Project updated');
      setEditingId(null);
    } else {
      addProject(projectForm);
      toast.success('Project added');
    }
    setProjectForm({ name: '', description: '', status: 'Upcoming', startDate: '', endDate: '' });
  };

  const handleEditProject = (project: typeof projects[0]) => {
    setProjectForm({
      name: project.name,
      description: project.description,
      status: project.status,
      startDate: project.startDate,
      endDate: project.endDate,
    });
    setEditingId(project.id);
  };

  // Team handlers
  const handleTeamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamForm.name || !teamForm.role || !teamForm.designation || !teamForm.qualification || !teamForm.imageUrl) {
      toast.error('Please fill all fields');
      return;
    }

    if (editingId) {
      updateTeamMember(editingId, teamForm);
      toast.success('Team member updated');
      setEditingId(null);
    } else {
      addTeamMember(teamForm);
      toast.success('Team member added');
    }
    setTeamForm({ name: '', role: '', designation: '', qualification: '', imageUrl: '' });
  };

  const handleEditTeam = (member: typeof teamMembers[0]) => {
    setTeamForm({
      name: member.name,
      role: member.role,
      designation: member.designation,
      qualification: member.qualification,
      imageUrl: member.imageUrl,
    });
    setEditingId(member.id);
  };

  // Gallery handlers
  const handleGallerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryForm.albumName || !galleryForm.imageUrl) {
      toast.error('Please fill all fields');
      return;
    }

    if (editingId) {
      updateGalleryImage(editingId, galleryForm);
      toast.success('Gallery image updated');
      setEditingId(null);
    } else {
      addGalleryImage(galleryForm);
      toast.success('Gallery image added');
    }
    setGalleryForm({ albumName: '', imageUrl: '' });
  };

  const handleEditGallery = (image: typeof galleryImages[0]) => {
    setGalleryForm({
      albumName: image.albumName,
      imageUrl: image.imageUrl,
    });
    setEditingId(image.id);
  };

  // Event handlers
  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventForm.name || !eventForm.description || !eventForm.startDate || !eventForm.endDate) {
      toast.error('Please fill all fields');
      return;
    }

    if (editingId) {
      updateEvent(editingId, eventForm);
      toast.success('Event updated');
      setEditingId(null);
    } else {
      addEvent(eventForm);
      toast.success('Event added');
    }
    setEventForm({ name: '', description: '', startDate: '', endDate: '' });
  };

  const handleEditEvent = (event: typeof events[0]) => {
    setEventForm({
      name: event.name,
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate,
    });
    setEditingId(event.id);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setProjectForm({ name: '', description: '', status: 'Upcoming', startDate: '', endDate: '' });
    setTeamForm({ name: '', role: '', designation: '', qualification: '', imageUrl: '' });
    setGalleryForm({ albumName: '', imageUrl: '' });
    setEventForm({ name: '', description: '', startDate: '', endDate: '' });
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
            onClick={() => setActiveSection('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 ${
              activeSection === 'dashboard' ? 'bg-brand-50 text-brand-600' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveSection('projects')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 ${
              activeSection === 'projects' ? 'bg-brand-50 text-brand-600' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Briefcase className="h-5 w-5" />
            <span>Projects</span>
          </button>

          <button
            onClick={() => setActiveSection('team')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 ${
              activeSection === 'team' ? 'bg-brand-50 text-brand-600' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Users className="h-5 w-5" />
            <span>Team</span>
          </button>

          <button
            onClick={() => setActiveSection('events')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 ${
              activeSection === 'events' ? 'bg-brand-50 text-brand-600' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Calendar className="h-5 w-5" />
            <span>Events</span>
          </button>

          <button
            onClick={() => setActiveSection('gallery')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 ${
              activeSection === 'gallery' ? 'bg-brand-50 text-brand-600' : 'text-gray-700 hover:bg-gray-50'
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
          <Button variant="outline" size="sm" className="w-full" onClick={handleLogout}>
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
            {activeSection === 'dashboard' && 'Dashboard'}
            {activeSection === 'projects' && 'Projects'}
            {activeSection === 'team' && 'Team'}
            {activeSection === 'events' && 'Events'}
            {activeSection === 'gallery' && 'Gallery'}
          </h2>
        </header>

        <div className="p-8">
          {/* Dashboard Section */}
          {activeSection === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-gray-600">Total Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-brand-600">{projects.length}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-gray-600">Team Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-brand-600">{teamMembers.length}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-gray-600">Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-brand-600">{events.length}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-gray-600">Gallery Images</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-brand-600">{galleryImages.length}</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Projects Section */}
          {activeSection === 'projects' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{editingId ? 'Edit Project' : 'Add New Project'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProjectSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="project-name">Project Name</Label>
                      <Input
                        id="project-name"
                        value={projectForm.name}
                        onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                        placeholder="Enter project name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="project-description">Description</Label>
                      <Textarea
                        id="project-description"
                        value={projectForm.description}
                        onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                        placeholder="Enter project description"
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label htmlFor="project-status">Status</Label>
                      <Select
                        value={projectForm.status}
                        onValueChange={(value: 'Upcoming' | 'Completed') =>
                          setProjectForm({ ...projectForm, status: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Upcoming">Upcoming</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="project-start">Start Date</Label>
                        <Input
                          id="project-start"
                          type="date"
                          value={projectForm.startDate}
                          onChange={(e) => setProjectForm({ ...projectForm, startDate: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="project-end">End Date</Label>
                        <Input
                          id="project-end"
                          type="date"
                          value={projectForm.endDate}
                          onChange={(e) => setProjectForm({ ...projectForm, endDate: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1">
                        {editingId ? 'Update Project' : 'Add Project'}
                      </Button>
                      {editingId && (
                        <Button type="button" variant="outline" onClick={cancelEdit}>
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>All Projects ({projects.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {projects.map((project) => (
                      <div key={project.id} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{project.name}</h3>
                              <span
                                className={`px-2 py-1 rounded text-xs ${
                                  project.status === 'Completed'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-blue-100 text-blue-700'
                                }`}
                              >
                                {project.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                            <p className="text-xs text-gray-500">
                              {project.startDate} - {project.endDate}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleEditProject(project)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                deleteProject(project.id);
                                toast.success('Project deleted');
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
          {activeSection === 'team' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{editingId ? 'Edit Team Member' : 'Add New Team Member'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleTeamSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="team-name">Name</Label>
                      <Input
                        id="team-name"
                        value={teamForm.name}
                        onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                        placeholder="Enter name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="team-role">Role</Label>
                      <Input
                        id="team-role"
                        value={teamForm.role}
                        onChange={(e) => setTeamForm({ ...teamForm, role: e.target.value })}
                        placeholder="e.g., Chief Engineer"
                      />
                    </div>

                    <div>
                      <Label htmlFor="team-designation">Designation</Label>
                      <Input
                        id="team-designation"
                        value={teamForm.designation}
                        onChange={(e) => setTeamForm({ ...teamForm, designation: e.target.value })}
                        placeholder="e.g., Senior Consultant"
                      />
                    </div>

                    <div>
                      <Label htmlFor="team-qualification">Qualification</Label>
                      <Input
                        id="team-qualification"
                        value={teamForm.qualification}
                        onChange={(e) => setTeamForm({ ...teamForm, qualification: e.target.value })}
                        placeholder="e.g., B.E. Civil, M.Sc. Structural Engineering"
                      />
                    </div>

                    <div>
                      <Label htmlFor="team-image">Image URL</Label>
                      <Input
                        id="team-image"
                        value={teamForm.imageUrl}
                        onChange={(e) => setTeamForm({ ...teamForm, imageUrl: e.target.value })}
                        placeholder="https://..."
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1">
                        {editingId ? 'Update Member' : 'Add Member'}
                      </Button>
                      {editingId && (
                        <Button type="button" variant="outline" onClick={cancelEdit}>
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
                      <div key={member.id} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex gap-4">
                          <img src={member.imageUrl} alt={member.name} className="w-16 h-16 rounded-full object-cover" />
                          <div className="flex-1">
                            <h3 className="font-semibold">{member.name}</h3>
                            <p className="text-sm text-brand-600">{member.role}</p>
                            <p className="text-sm text-gray-600">{member.designation}</p>
                            <p className="text-xs text-gray-500">{member.qualification}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleEditTeam(member)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                deleteTeamMember(member.id);
                                toast.success('Team member deleted');
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
          {activeSection === 'events' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{editingId ? 'Edit Event' : 'Add New Event'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleEventSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="event-name">Event Name</Label>
                      <Input
                        id="event-name"
                        value={eventForm.name}
                        onChange={(e) => setEventForm({ ...eventForm, name: e.target.value })}
                        placeholder="Enter event name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="event-description">Description</Label>
                      <Textarea
                        id="event-description"
                        value={eventForm.description}
                        onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                        placeholder="Enter event description"
                        rows={4}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="event-start">Start Date</Label>
                        <Input
                          id="event-start"
                          type="date"
                          value={eventForm.startDate}
                          onChange={(e) => setEventForm({ ...eventForm, startDate: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="event-end">End Date</Label>
                        <Input
                          id="event-end"
                          type="date"
                          value={eventForm.endDate}
                          onChange={(e) => setEventForm({ ...eventForm, endDate: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1">
                        {editingId ? 'Update Event' : 'Add Event'}
                      </Button>
                      {editingId && (
                        <Button type="button" variant="outline" onClick={cancelEdit}>
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
                      <div key={event.id} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold mb-2">{event.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                            <p className="text-xs text-gray-500">
                              {event.startDate} - {event.endDate}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleEditEvent(event)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                deleteEvent(event.id);
                                toast.success('Event deleted');
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
          {activeSection === 'gallery' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{editingId ? 'Edit Gallery Image' : 'Add New Gallery Image'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleGallerySubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="gallery-album">Album Name</Label>
                      <Input
                        id="gallery-album"
                        value={galleryForm.albumName}
                        onChange={(e) => setGalleryForm({ ...galleryForm, albumName: e.target.value })}
                        placeholder="Enter album name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="gallery-image">Image URL</Label>
                      <Input
                        id="gallery-image"
                        value={galleryForm.imageUrl}
                        onChange={(e) => setGalleryForm({ ...galleryForm, imageUrl: e.target.value })}
                        placeholder="https://..."
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1">
                        {editingId ? 'Update Image' : 'Add Image'}
                      </Button>
                      {editingId && (
                        <Button type="button" variant="outline" onClick={cancelEdit}>
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>All Gallery Images ({galleryImages.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {galleryImages.map((image) => (
                      <div key={image.id} className="border rounded-lg overflow-hidden">
                        <img src={image.imageUrl} alt={image.albumName} className="w-full h-48 object-cover" />
                        <div className="p-3">
                          <p className="font-semibold text-sm mb-2">{image.albumName}</p>
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
                                toast.success('Image deleted');
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
