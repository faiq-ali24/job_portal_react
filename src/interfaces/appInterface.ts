

export interface UserLogin{
  email: string;
  password: string;
}

export interface UserSignup{
  name: string;
  email: string;
  password: string;
  role: string;
}


export interface filterProps{
    location: string;
    salary: number;
    title: string;

    setLocation: (value: string) => void;
    setSalary: (value: number) => void;
    setTitle: (value: string) => void;
}

export interface jobModel{
    location: string;
    salary: number;
    title: string;
    id: number;
    description : string;
    company_id : number;
    brochure : string | undefined;
    jobDescription : string | undefined;
    requiredSkills?: string[];
    preferredSkills?: string[];
    minimumExperienceYears?: number | null;
}


export interface jobFormProps{
  id: number | null;
}

export interface applicationsHomeProps{
  jobId: number;
}

export interface applicationModel{
  id: number;
  user_id: number;
  job_id: number;
  name: string;
  age: number;
  yoe: number;
  status: string;
  email: string;
  resume: string;
  matchScore?: number | null;
  scoreBreakdown?: MatchScoreBreakdown;
  scoringStatus?: string;
  scoredAt?: string | null;
  scoringVersion?: string | null;
}

export interface MatchScoreComponent {
  ratio: number;
  points: number;
  maximum: number;
  matched?: string[];
  missing?: string[];
  matched_terms?: string[];
  missing_terms?: string[];
  reason?: string;
}

export interface MatchScoreBreakdown {
  version?: string;
  total?: number;
  available_weight?: number;
  excluded_components?: string[];
  components?: Record<string, MatchScoreComponent>;
}


export interface jobDetailsProps {
  id: number;
}


export interface applicationDetailsProps{
  jobId : number
  id : number;
}


export interface userProfile {
  id: number;
  email: string;
  name: string | null;
  role: string;
  location: string | null;
  bio: string | null;
  picture: string | null;
}


export interface ApplicationsListProps{
  status: string;
  setStatus: (value: string) => void;
  statuses: string[];
  applications: applicationModel[];
};

