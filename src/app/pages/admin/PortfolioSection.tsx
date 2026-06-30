import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "../../components/ui/dialog";
import { useContent } from "../../contexts/ContentContext";
import { toast } from "sonner";
import { Award, Edit, Search, Trash2, Plus } from "lucide-react";
import { PortfolioItem, PortfolioStatus, PortfolioType } from "../../../types/portfolio.types";

type TypeFilter = PortfolioType | "all";
type StatusFilter = PortfolioStatus | "all";

const formatType = (type: PortfolioType) => {
  const labels: Record<PortfolioType, string> = {
    project: "Project",
    consulting: "Consulting",
    training: "Training & Event",
  };

  return labels[type];
};

export function PortfolioSection() {
  const { portfolio, clients, deletePortfolioItem } = useContent();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!deleteTargetId) return;

    try {
      await deletePortfolioItem(deleteTargetId);
      toast.success("Portfolio item deleted");
      setDeleteDialogOpen(false);
      setDeleteTargetId(null);
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
      setDeleteDialogOpen(false);
      setDeleteTargetId(null);
    }
  };

  const openDeleteDialog = (id: string) => {
    setDeleteTargetId(id);
    setDeleteDialogOpen(true);
  };

  const filteredPortfolio = useMemo(() => {
    const search = searchQuery.trim().toLowerCase();

    return portfolio.filter((item: PortfolioItem) => {
      const matchesType = typeFilter === "all" || item.type === typeFilter;
      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter;
      const clientName = clients.find((c) => c.id === item.clientId)?.name;
      const matchesSearch =
        !search ||
        [
          item.title,
          item.shortDescription,
          clientName,
          item.sector,
          item.location,
          item.fiscalYear,
        ]
          .filter(Boolean)
          .some((value) => value!.toLowerCase().includes(search));

      return matchesType && matchesStatus && matchesSearch;
    });
  }, [portfolio, typeFilter, statusFilter, searchQuery, clients]);

  return (
    <div className="space-y-6">
      <Button
        type="button"
        size="sm"
        onClick={() => navigate("/admin/portfolio/add")}
        className="
    rounded-xl
    px-5
    font-semibold
    shadow-lg
    transition-all
    duration-200
    cursor-pointer

    bg-brand-600
    text-white

    hover:bg-brand-700
    hover:text-white
    hover:shadow-xl
    hover:scale-[1.02]

    active:scale-[0.98]
  "
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Portfolio Item
      </Button>
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center justify-between gap-4">
              <CardTitle>Portfolio ({filteredPortfolio.length})</CardTitle>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_160px_160px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  className="pl-10"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
              </div>

              <Select
                value={typeFilter}
                onValueChange={(value) => setTypeFilter(value as TypeFilter)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="project">Projects</SelectItem>
                  <SelectItem value="consulting">
                    Consulting Services
                  </SelectItem>
                  <SelectItem value="training">Training</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={statusFilter}
                onValueChange={(value) =>
                  setStatusFilter(value as StatusFilter)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            {filteredPortfolio.length === 0 ? (
              <div className="rounded-lg border border-dashed p-8 text-center text-sm text-gray-500">
                No portfolio items found.
              </div>
            ) : (
              filteredPortfolio.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 rounded-lg border p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold">{item.title}</h3>
                      {item.isFlagship && (
                        <Award className="h-4 w-4 text-yellow-500" />
                      )}
                      {item.displayOnHome && (
                        <span className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-700">
                          Featured on Home
                        </span>
                      )}
                      <span className="rounded bg-gray-100 px-2 py-1 text-xs">
                        {formatType(item.type)}
                      </span>
                      {item.status && (
                        <span className="rounded bg-gray-100 px-2 py-1 text-xs">
                          {item.status}
                        </span>
                      )}
                    </div>

                    <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                      {item.shortDescription}
                    </p>

                    <p className="mt-2 text-xs text-gray-500">
                      {[
                        clients.find((c) => c.id === item.clientId)?.name,
                        item.sector,
                        item.fiscalYear,
                      ]
                        .filter(Boolean)
                        .join(" • ") || item.slug}
                    </p>
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      type="button"
                      onClick={() => navigate(`/admin/portfolio/edit/${item.slug}`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>

                    <Button
                      size="sm"
                      variant="ghost"
                      type="button"
                      onClick={() => openDeleteDialog(item.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Portfolio Item</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-gray-600">
            Are you sure you want to delete this portfolio item? This action
            cannot be undone.
          </p>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
