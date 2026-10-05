export type ProjectCategory = 'all' | 'cgi' | 'kinetic' | 'realtime' | 'audio';

export interface ProjectMetric {
  label: string;
  value: string;
  sub: string;
  code: string;
}

export interface ProjectColor {
  name: string;
  hex: string;
  rgb: string;
  desc: string;
  dominantRole: string;
  isAccent?: boolean;
}

export interface ProjectApplication {
  title: string;
  tag: string;
  image: string;
  alt: string;
}

export interface ProjectCredit {
  role: string;
  name: string;
}

export interface ProjectSpec {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  num: string;
  client: string;
  clientFull: string;
  title: string;
  year: string;
  timecode?: string;
  resolution?: string;
  fps?: string;
  duration?: string;
  disciplines: string[];
  categories: ProjectCategory[];
  heroImage: string;
  videoUrl?: string; // Optional video or motion asset
  shortDesc: string;
  fullDesc: string;
  featured?: boolean;
  featuredTag?: string;
  challengeTitle?: string;
  challengeDesc?: string[];
  challengeInput?: string;
  solutionTitle?: string;
  solutionDesc?: string[];
  solutionOutput?: string;
  metrics?: ProjectMetric[];
  credits?: ProjectCredit[];
  specs?: ProjectSpec[];
  macroImage?: string;
  wireframeImage?: string;
  wireframeCaption?: string;
  polyCount?: string;
  renderImage?: string;
  renderCaption?: string;
  rayDepth?: string;
  colors?: ProjectColor[];
  applications?: ProjectApplication[];
}

export interface TeamMember {
  id: string;
  tag: string;
  name: string;
  role: string;
  subRole: string;
  bio: string;
  origin: string;
  tools: string[];
  image: string;
  alt: string;
}

export interface Award {
  year: string;
  index: string;
  title: string;
  location: string;
  project: string;
  discipline: string;
}

export interface ProcessStep {
  step: string;
  week: string;
  title: string;
  desc: string;
  deliverable: string;
}
