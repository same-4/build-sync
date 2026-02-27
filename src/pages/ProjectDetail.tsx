import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProject, saveProject, getMaterialRequestsForProject, saveMaterialRequest } from "@/lib/storage";
import { useAuth } from "@/contexts/AuthContext";
import { WORK_TYPES, calculateMaterials, calculateManpower } from "@/lib/coefficients";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, Trash2, Package, Users, HardHat, Calendar, Send } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import type { Project, WorkItem, MaterialRequest } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [workType, setWorkType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [materialRequests, setMaterialRequests] = useState<MaterialRequest[]>([]);

  useEffect(() => {
    if (!id) return;
    const p = getProject(id);
    if (!p) {
      toast.error("Project not found");
      navigate("/dashboard");
      return;
    }
    setProject(p);
    setMaterialRequests(getMaterialRequestsForProject(id));
  }, [id, navigate]);

  if (!project) return null;

  const materials = calculateMaterials(project.workItems);
  const manpower = calculateManpower(project.workItems);

  const addWorkItem = () => {
    if (!workType || !quantity || Number(quantity) <= 0) {
      toast.error("Select a work type and enter a valid quantity");
      return;
    }
    const item: WorkItem = {
      id: crypto.randomUUID(),
      workType,
      quantity: Number(quantity),
    };
    const updated = { ...project, workItems: [...project.workItems, item] };
    saveProject(updated);
    setProject(updated);
    setWorkType("");
    setQuantity("");
    toast.success("Work item added");
  };

  const removeWorkItem = (itemId: string) => {
    const updated = { ...project, workItems: project.workItems.filter((i) => i.id !== itemId) };
    saveProject(updated);
    setProject(updated);
    toast.success("Work item removed");
  };

  const handleGenerateMR = () => {
    if (materials.length === 0) return;
    const mr: MaterialRequest = {
      id: crypto.randomUUID(),
      projectId: project.id,
      projectName: project.name,
      materials: materials,
      status: "pending",
      createdAt: new Date().toISOString()
    };
    saveMaterialRequest(mr);
    setMaterialRequests(getMaterialRequestsForProject(project.id));
    toast.success("Material Request Generated");
  };

  const handleApproveMR = (mr: MaterialRequest) => {
    const updated = { ...mr, status: "approved" as const };
    saveMaterialRequest(updated);
    setMaterialRequests(getMaterialRequestsForProject(project.id));
    toast.success("Material Request Approved");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Button variant="ghost" className="mb-6" onClick={() => navigate("/dashboard")}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Dashboard
        </Button>

        {/* Project Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold mb-1">{project.name}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{format(new Date(project.startDate), "MMM d, yyyy")} — {format(new Date(project.endDate), "MMM d, yyyy")}</span>
            <span className="flex items-center gap-1"><HardHat className="w-3.5 h-3.5" />{project.workItems.length} work items</span>
          </div>
        </div>

        {/* Add Work Item */}
        <Card className="mb-8">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Add Work Item</CardTitle>
            <CardDescription>Select a work type and quantity to calculate resources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 space-y-1">
                <Label className="text-xs">Work Type</Label>
                <Select value={workType} onValueChange={setWorkType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select work type" />
                  </SelectTrigger>
                  <SelectContent>
                    {WORK_TYPES.map((wt) => (
                      <SelectItem key={wt.value} value={wt.value}>{wt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full sm:w-40 space-y-1">
                <Label className="text-xs">Quantity (m³ / m²)</Label>
                <Input type="number" min="0" step="0.1" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="e.g., 100" />
              </div>
              <div className="flex items-end">
                <Button onClick={addWorkItem} className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Work Items List */}
        {project.workItems.length > 0 && (
          <Card className="mb-8">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Work Items</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {project.workItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium capitalize">{item.workType}</TableCell>
                      <TableCell className="text-right font-mono">{item.quantity}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => removeWorkItem(item.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Results Dashboard */}
        {project.workItems.length > 0 && (
          <Tabs defaultValue="materials" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="materials" className="gap-2">
                <Package className="w-4 h-4" /> Materials
              </TabsTrigger>
              <TabsTrigger value="manpower" className="gap-2">
                <Users className="w-4 h-4" /> Manpower
              </TabsTrigger>
            </TabsList>

            <TabsContent value="materials">
              <Card>
                <CardHeader className="pb-3 flex flex-row items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Package className="w-5 h-5 text-accent" /> Total Materials Required
                  </CardTitle>
                  {(user?.role === "project_manager" || user?.role === "admin") && materials.length > 0 && (
                    <Button onClick={handleGenerateMR} size="sm" variant="outline" className="h-8">
                      <Send className="w-4 h-4 mr-2" /> Generate Request
                    </Button>
                  )}
                </CardHeader>
                <CardContent className="p-0">
                  {materials.length === 0 ? (
                    <p className="p-6 text-center text-muted-foreground text-sm">No materials for selected work types</p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Material</TableHead>
                          <TableHead className="text-right">Quantity</TableHead>
                          <TableHead className="text-right">Unit</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {materials.map((m) => (
                          <TableRow key={m.name}>
                            <TableCell className="font-medium">{m.name}</TableCell>
                            <TableCell className="text-right font-mono font-semibold">{m.quantity.toLocaleString()}</TableCell>
                            <TableCell className="text-right text-muted-foreground">{m.unit}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>

              {/* Material Requests Section */}
              {materialRequests.length > 0 && (
                <div className="mt-6 space-y-4">
                  <h3 className="font-semibold text-lg">Material Requests</h3>
                  {materialRequests.map((mr) => (
                    <Card key={mr.id}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <CardTitle className="text-sm">Request {mr.id.split("-")[0]}</CardTitle>
                            <CardDescription>Created {format(new Date(mr.createdAt), "PP")}</CardDescription>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant={mr.status === "pending" ? "outline" : mr.status === "approved" ? "default" : "secondary"}>
                              {mr.status.toUpperCase()}
                            </Badge>
                            {mr.status === "pending" && (user?.role === "project_manager" || user?.role === "admin") && (
                              <Button size="sm" onClick={() => handleApproveMR(mr)}>Approve</Button>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="manpower">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Users className="w-5 h-5 text-accent" /> Total Manpower Required
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {manpower.length === 0 ? (
                    <p className="p-6 text-center text-muted-foreground text-sm">No labor data for selected work types</p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Role</TableHead>
                          <TableHead className="text-right">Days</TableHead>
                          <TableHead className="text-right">Unit</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {manpower.map((m) => (
                          <TableRow key={m.role}>
                            <TableCell className="font-medium">{m.role}</TableCell>
                            <TableCell className="text-right font-mono font-semibold">{m.days.toLocaleString()}</TableCell>
                            <TableCell className="text-right text-muted-foreground">{m.unit}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
