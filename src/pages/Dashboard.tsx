import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getProjects, deleteProject, getMaterialRequests, saveMaterialRequest } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HardHat, Plus, FolderOpen, Calendar, Trash2, LogOut, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import type { Project, MaterialRequest } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>(getProjects());
  const [materialRequests, setMaterialRequests] = useState<MaterialRequest[]>([]);

  useState(() => {
    if (user?.role === "procurement_officer") {
      setMaterialRequests(getMaterialRequests().filter(mr => mr.status === "approved" || mr.status === "ordered" || mr.status === "delivered"));
    }
  });

  const handleDelete = (id: string) => {
    deleteProject(id);
    setProjects(getProjects());
    toast.success("Project deleted");
  };

  const handleCreatePO = (mr: MaterialRequest) => {
    const updated = { ...mr, status: "ordered" as const };
    saveMaterialRequest(updated);
    setMaterialRequests(getMaterialRequests().filter(m => m.status === "approved" || m.status === "ordered" || m.status === "delivered"));
    toast.success("Purchase Order Created");
  };

  const handleDeliverPO = (mr: MaterialRequest) => {
    const updated = { ...mr, status: "delivered" as const };
    saveMaterialRequest(updated);
    setMaterialRequests(getMaterialRequests().filter(m => m.status === "approved" || m.status === "ordered" || m.status === "delivered"));
    toast.success("Materials Marked as Delivered");
  };

  if (user?.role === "procurement_officer") {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <HardHat className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">BuildSync</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden sm:block">
                {user?.name} · <span className="capitalize">{user?.role?.replace("_", " ")}</span>
              </span>
              <Button variant="ghost" size="sm" onClick={() => { logout(); navigate("/"); }}>
                <LogOut className="w-4 h-4 mr-1" /> Sign out
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 max-w-5xl">
          <div className="mb-8">
            <h1 className="text-2xl font-extrabold">Procurement Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Manage approved Material Requests and create Purchase Orders
            </p>
          </div>

          <div className="space-y-4">
            {materialRequests.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <h3 className="font-semibold text-lg mb-1">No pending requests</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    There are no approved material requests waiting for purchase orders.
                  </p>
                </CardContent>
              </Card>
            ) : (
              materialRequests.map((mr) => (
                <Card key={mr.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-base">Project: {mr.projectName}</CardTitle>
                        <p className="text-sm text-muted-foreground">Request {mr.id.split("-")[0]} · Created {format(new Date(mr.createdAt), "PP")}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={mr.status === "ordered" ? "default" : mr.status === "delivered" ? "secondary" : "outline"}>
                          {mr.status.toUpperCase()}
                        </Badge>
                        {mr.status === "approved" && (
                          <Button size="sm" onClick={() => handleCreatePO(mr)}>Create PO</Button>
                        )}
                        {mr.status === "ordered" && (
                          <Button size="sm" variant="secondary" onClick={() => handleDeliverPO(mr)}>Mark Delivered</Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))
            )}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <HardHat className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">BuildSync</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {user?.name} · <span className="capitalize">{user?.role?.replace("_", " ")}</span>
            </span>
            <Button variant="ghost" size="sm" onClick={() => { logout(); navigate("/"); }}>
              <LogOut className="w-4 h-4 mr-1" /> Sign out
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-extrabold">Projects</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Manage your construction projects and resources
            </p>
          </div>
          <Button onClick={() => navigate("/projects/new")} className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
            <Plus className="w-4 h-4 mr-2" /> New Project
          </Button>
        </div>

        {projects.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <FolderOpen className="w-12 h-12 text-muted-foreground/40 mb-4" />
              <h3 className="font-semibold text-lg mb-1">No projects yet</h3>
              <p className="text-muted-foreground text-sm mb-6">
                Create your first project to start planning materials and manpower.
              </p>
              <Button onClick={() => navigate("/projects/new")} className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Plus className="w-4 h-4 mr-2" /> Create Project
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <Card key={p.id} className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => navigate(`/projects/${p.id}`)}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-base leading-tight">{p.name}</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity -mt-1 -mr-2 text-destructive hover:text-destructive"
                      onClick={(e) => { e.stopPropagation(); handleDelete(p.id); }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{format(new Date(p.startDate), "MMM d")} — {format(new Date(p.endDate), "MMM d, yyyy")}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium bg-secondary px-2 py-1 rounded-md">
                      {p.workItems.length} work item{p.workItems.length !== 1 ? "s" : ""}
                    </span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
