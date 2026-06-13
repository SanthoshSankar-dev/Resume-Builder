import { useState } from 'react';
import { Project } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FolderKanban, Plus, Trash2, ChevronDown, ChevronUp, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectsFormProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

export const ProjectsForm = ({ projects, onChange }: ProjectsFormProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(projects[0]?.id || null);
  const [techInputs, setTechInputs] = useState<Record<string, string>>({});

  const addProject = () => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name: '',
      description: '',
      technologies: [],
      link: '',
      github: '',
    };
    onChange([...projects, newProject]);
    setExpandedId(newProject.id);
  };

  const removeProject = (id: string) => {
    onChange(projects.filter((proj) => proj.id !== id));
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    onChange(
      projects.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    );
  };

  const addTechnology = (projectId: string) => {
    const input = techInputs[projectId]?.trim();
    if (input) {
      const project = projects.find((p) => p.id === projectId);
      if (project && !project.technologies.includes(input)) {
        updateProject(projectId, 'technologies', [...project.technologies, input]);
        setTechInputs({ ...techInputs, [projectId]: '' });
      }
    }
  };

  const removeTechnology = (projectId: string, tech: string) => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      updateProject(
        projectId,
        'technologies',
        project.technologies.filter((t) => t !== tech)
      );
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-xl font-display font-semibold text-foreground">Projects</h2>
        <p className="text-muted-foreground text-sm">
          Showcase your best projects and personal work.
        </p>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <button
              onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <FolderKanban className="w-5 h-5 text-primary" />
                <div className="text-left">
                  <p className="font-medium text-foreground">
                    {project.name || 'New Project'}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {project.description || 'Project description'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeProject(project.id);
                  }}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                {expandedId === project.id ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
            </button>

            <div
              className={cn(
                "overflow-hidden transition-all duration-300",
                expandedId === project.id ? "max-h-[800px]" : "max-h-0"
              )}
            >
              <CardContent className="pt-4 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor={`name-${project.id}`}>Project Name</Label>
                    <Input
                      id={`name-${project.id}`}
                      placeholder="E-commerce Platform"
                      value={project.name}
                      onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor={`description-${project.id}`}>Description</Label>
                    <Textarea
                      id={`description-${project.id}`}
                      placeholder="A full-stack e-commerce platform with user authentication, product management, and payment integration..."
                      value={project.description}
                      onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                    />
                  </div>

                  <div className="space-y-3 sm:col-span-2">
                    <Label>Technologies Used</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add technology (e.g., React)"
                        value={techInputs[project.id] || ''}
                        onChange={(e) =>
                          setTechInputs({ ...techInputs, [project.id]: e.target.value })
                        }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addTechnology(project.id);
                          }
                        }}
                      />
                      <Button
                        variant="secondary"
                        onClick={() => addTechnology(project.id)}
                        className="shrink-0"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="gap-1 py-1.5 px-3">
                            {tech}
                            <button
                              onClick={() => removeTechnology(project.id, tech)}
                              className="ml-1 hover:text-destructive"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`link-${project.id}`}>Live Demo URL</Label>
                    <Input
                      id={`link-${project.id}`}
                      placeholder="https://myproject.com"
                      value={project.link}
                      onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`github-${project.id}`}>GitHub URL</Label>
                    <Input
                      id={`github-${project.id}`}
                      placeholder="https://github.com/user/project"
                      value={project.github}
                      onChange={(e) => updateProject(project.id, 'github', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}

        <Button onClick={addProject} variant="outline" className="w-full gap-2">
          <Plus className="w-4 h-4" />
          Add Project
        </Button>
      </div>
    </div>
  );
};
