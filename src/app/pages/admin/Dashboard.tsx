import { useState } from 'react';
import { Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { useContent } from '../../contexts/ContentContext';
import { toast } from 'sonner';
import { Trash2, Home, ImagePlus, Users as UsersIcon, Briefcase } from 'lucide-react';

export function Dashboard() {
  const {
    teamMembers,
    projects,
    galleryImages,
    addTeamMember,
    addProject,
    addGalleryImage,
    deleteTeamMember,
    deleteProject,
    deleteGalleryImage,
  } = useContent();

  // Team Member Form State
  const [teamForm, setTeamForm] = useState({
    name: '',
    position: '',
    bio: '',
    imageUrl: '',
  });

  // Project Form State
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    category: '',
    imageUrl: '',
    date: '',
  });

  // Gallery Form State
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    imageUrl: '',
    category: '',
  });

  const handleAddTeamMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamForm.name || !teamForm.position || !teamForm.bio || !teamForm.imageUrl) {
      toast.error('Please fill in all fields');
      return;
    }
    addTeamMember(teamForm);
    setTeamForm({ name: '', position: '', bio: '', imageUrl: '' });
    toast.success('Team member added successfully!');
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !projectForm.title ||
      !projectForm.description ||
      !projectForm.category ||
      !projectForm.imageUrl ||
      !projectForm.date
    ) {
      toast.error('Please fill in all fields');
      return;
    }
    addProject(projectForm);
    setProjectForm({ title: '', description: '', category: '', imageUrl: '', date: '' });
    toast.success('Project added successfully!');
  };

  const handleAddGalleryImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryForm.title || !galleryForm.imageUrl || !galleryForm.category) {
      toast.error('Please fill in all fields');
      return;
    }
    addGalleryImage(galleryForm);
    setGalleryForm({ title: '', imageUrl: '', category: '' });
    toast.success('Gallery image added successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <Link to="/">
              <Button variant="outline" size="sm">
                <Home className="h-4 w-4 mr-2" />
                Back to Website
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="gallery" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-3">
            <TabsTrigger value="gallery">
              <ImagePlus className="h-4 w-4 mr-2" />
              Gallery
            </TabsTrigger>
            <TabsTrigger value="team">
              <UsersIcon className="h-4 w-4 mr-2" />
              Team Members
            </TabsTrigger>
            <TabsTrigger value="projects">
              <Briefcase className="h-4 w-4 mr-2" />
              Projects
            </TabsTrigger>
          </TabsList>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add Gallery Image</CardTitle>
                <CardDescription>Upload a new image to the project gallery</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddGalleryImage} className="space-y-4">
                  <div>
                    <Label htmlFor="gallery-title">Image Title</Label>
                    <Input
                      id="gallery-title"
                      placeholder="e.g., Construction Site"
                      value={galleryForm.title}
                      onChange={(e) =>
                        setGalleryForm({ ...galleryForm, title: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="gallery-url">Image URL</Label>
                    <Input
                      id="gallery-url"
                      placeholder="https://..."
                      value={galleryForm.imageUrl}
                      onChange={(e) =>
                        setGalleryForm({ ...galleryForm, imageUrl: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="gallery-category">Category</Label>
                    <Input
                      id="gallery-category"
                      placeholder="e.g., Projects, Team, Work"
                      value={galleryForm.category}
                      onChange={(e) =>
                        setGalleryForm({ ...galleryForm, category: e.target.value })
                      }
                    />
                  </div>
                  <Button type="submit" className="w-full">Add to Gallery</Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Gallery Images ({galleryImages.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {galleryImages.map((image) => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.imageUrl}
                        alt={image.title}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <div className="text-center text-white">
                          <p className="font-semibold">{image.title}</p>
                          <p className="text-sm text-gray-300">{image.category}</p>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="mt-2"
                            onClick={() => {
                              deleteGalleryImage(image.id);
                              toast.success('Image removed');
                            }}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add Team Member</CardTitle>
                <CardDescription>Add a new member to your team</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddTeamMember} className="space-y-4">
                  <div>
                    <Label htmlFor="team-name">Full Name</Label>
                    <Input
                      id="team-name"
                      placeholder="e.g., John Doe"
                      value={teamForm.name}
                      onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="team-position">Position</Label>
                    <Input
                      id="team-position"
                      placeholder="e.g., Senior Engineer"
                      value={teamForm.position}
                      onChange={(e) => setTeamForm({ ...teamForm, position: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="team-bio">Bio</Label>
                    <Textarea
                      id="team-bio"
                      placeholder="Brief description of the team member..."
                      value={teamForm.bio}
                      onChange={(e) => setTeamForm({ ...teamForm, bio: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="team-image">Profile Image URL</Label>
                    <Input
                      id="team-image"
                      placeholder="https://..."
                      value={teamForm.imageUrl}
                      onChange={(e) => setTeamForm({ ...teamForm, imageUrl: e.target.value })}
                    />
                  </div>
                  <Button type="submit" className="w-full">Add Team Member</Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Team Members ({teamMembers.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <img
                        src={member.imageUrl}
                        alt={member.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{member.name}</h3>
                        <p className="text-sm text-blue-600">{member.position}</p>
                        <p className="text-sm text-gray-600 mt-1">{member.bio}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          deleteTeamMember(member.id);
                          toast.success('Team member removed');
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add Project</CardTitle>
                <CardDescription>Add a new project to your portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddProject} className="space-y-4">
                  <div>
                    <Label htmlFor="project-title">Project Title</Label>
                    <Input
                      id="project-title"
                      placeholder="e.g., City Bridge Infrastructure"
                      value={projectForm.title}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, title: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="project-description">Description</Label>
                    <Textarea
                      id="project-description"
                      placeholder="Brief description of the project..."
                      value={projectForm.description}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, description: e.target.value })
                      }
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="project-category">Category</Label>
                    <Input
                      id="project-category"
                      placeholder="e.g., Infrastructure, Commercial, Environmental"
                      value={projectForm.category}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, category: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="project-image">Project Image URL</Label>
                    <Input
                      id="project-image"
                      placeholder="https://..."
                      value={projectForm.imageUrl}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, imageUrl: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="project-date">Project Date</Label>
                    <Input
                      id="project-date"
                      type="date"
                      value={projectForm.date}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, date: e.target.value })
                      }
                    />
                  </div>
                  <Button type="submit" className="w-full">Add Project</Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Projects ({projects.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-24 h-24 rounded object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{project.title}</h3>
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded">
                            {project.category}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{project.description}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(project.date).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          deleteProject(project.id);
                          toast.success('Project removed');
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
