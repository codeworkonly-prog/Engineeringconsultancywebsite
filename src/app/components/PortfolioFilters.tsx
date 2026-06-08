import { Download, Search } from "lucide-react";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

export type PortfolioFilterType = "all" | "project" | "consulting" | "training";

export interface PortfolioFiltersState {
  search?: string;
  type?: PortfolioFilterType;
  sector?: string;
  fiscalYear?: string;
  client?: string;
}

export interface Client {
  id: string;
  name: string;
}

export interface FilterValues {
  sectors: string[];
  fiscalYears: string[];
}

export interface PortfolioFiltersPaginationInfo {
  visibleCount: number;
  filteredCount: number;
  page: number;
  totalPages: number;
  itemLabel?: string;
}

export interface PortfolioFiltersProps {
  filters: PortfolioFiltersState;
  filterValues: FilterValues;
  clients: Client[];
  pagination: PortfolioFiltersPaginationInfo;
  hasActiveFilters: boolean;
  /** Disable the Export CSV button when there is nothing to export */
  isEmpty: boolean;
  onUpdateFilters: (patch: Partial<PortfolioFiltersState>) => void;
  onClearFilters: () => void;
  onDownloadCsv: () => void;
}

// ── Component ────────────────────────────────────────────────────────────────

export function PortfolioFilters({
  filters,
  filterValues,
  clients,
  pagination,
  hasActiveFilters,
  isEmpty,
  onUpdateFilters,
  onClearFilters,
  onDownloadCsv,
}: PortfolioFiltersProps) {
  const { visibleCount, filteredCount, page, totalPages } = pagination;

  return (
    <section className="mt-8 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1.25fr_repeat(5,minmax(0,1fr))_auto_auto]">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={filters.search ?? ""}
            onChange={(e) => onUpdateFilters({ search: e.target.value })}
            placeholder="Search keyword"
            className="pl-10"
          />
        </div>

        {/* Type */}
        <Select
          value={filters.type ?? "all"}
          onValueChange={(value) =>
            onUpdateFilters({ type: value as PortfolioFilterType })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="project">Project</SelectItem>
            <SelectItem value="consulting">Consulting</SelectItem>
            <SelectItem value="training">Training</SelectItem>
          </SelectContent>
        </Select>

        {/* Sector */}
        <Select
          value={filters.sector ?? "all"}
          onValueChange={(value) =>
            onUpdateFilters({ sector: value === "all" ? undefined : value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Sector" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sectors</SelectItem>
            {filterValues.sectors.map((sector) => (
              <SelectItem key={sector} value={sector}>
                {sector}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Fiscal Year */}
        <Select
          value={filters.fiscalYear ?? "all"}
          onValueChange={(value) =>
            onUpdateFilters({ fiscalYear: value === "all" ? undefined : value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Fiscal Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Years</SelectItem>
            {filterValues.fiscalYears.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Client */}
        <Select
          value={filters.client ?? "all"}
          onValueChange={(value) =>
            onUpdateFilters({ client: value === "all" ? undefined : value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Client" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Clients</SelectItem>
            {clients.map((client) => (
              <SelectItem key={client.id} value={client.id}>
                {client.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Clear */}
        <Button variant="outline" onClick={onClearFilters} disabled={!hasActiveFilters}>
          Clear
        </Button>

        {/* Export CSV */}
        <Button
          onClick={onDownloadCsv}
          disabled={isEmpty}
          className={isEmpty ? "cursor-not-allowed" : "cursor-pointer"}
          title={
            isEmpty
              ? "No portfolio items match the selected filters"
              : "Download the currently displayed portfolio table data as CSV"
          }
        >
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Pagination summary */}
      <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-4 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <span>
          Showing {visibleCount} of {filteredCount}
        </span>
        <span>
          Page {page} of {totalPages}
        </span>
      </div>
    </section>
  );
}
