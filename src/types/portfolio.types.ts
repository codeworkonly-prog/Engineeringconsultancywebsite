export type PortfolioType =
  | 'project'
  | 'consulting'
  | 'training';

export type PortfolioStatus =
  | 'upcoming'
  | 'ongoing'
  | 'completed';

export type PortfolioFilterType = PortfolioType | 'all';
export type PortfolioSortKey =
  | 'title'
  | 'fiscalYear'
  | 'client'
  | 'contractAmount'
  | 'createdAt';
export type PortfolioSortOrder = 'asc' | 'desc';

export interface PortfolioFilters {
  type?: PortfolioFilterType;
  sector?: string;
  client?: string;
  fiscalYear?: string;
  search?: string;
}

export interface PortfolioItem {
  id: string;

  type: PortfolioType;

  title: string;
  slug: string;

  shortDescription: string;
  overview?: string;
  fullDescription?: string;

  featuredImage: string;

  sector?: string;
  client?: string;
  clientLogo?: string;
  partnerFirms?: string;
  fiscalYear?: string;

  status?: PortfolioStatus;

  location?: string;
  startDate?: string;
  endDate?: string;

  isFlagship?: boolean;

  // Project Fields
  projectType?: string;
  contractAmount?: string;

  // Consulting Fields
  serviceType?: string;

  // Training Fields
  trainingType?: string;
  mode?: 'online' | 'physical' | 'hybrid';

  createdAt?: string;
  updatedAt?: string;
}

export const defaultPortfolioFormData: PortfolioItem = {
  id: '',
  type: 'project',

  title: '',
  slug: '',

  shortDescription: '',
  overview: '',

  featuredImage: '',

  sector: '',
  client: '',
  clientLogo: '',
  fiscalYear: '',

  status: 'ongoing',

  location: '',
  startDate: '',
  endDate: '',

  isFlagship: false,

  projectType: '',
  contractAmount: '',

  serviceType: '',

  trainingType: '',
  mode: 'physical',
};
