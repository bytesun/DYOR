export interface ChecklistItem {
  text: string;
  checked: boolean;
}

export interface Factor {
  id: number;
  name: string;
  weight: number;
  checklist: ChecklistItem[];
}

export interface ProjectData {
  id?: number;
  name: string;
  factors: Factor[];
  totalScore: number;
  lastUpdated: string;
}

export interface DBOperationResult {
  success: boolean;
  data?: any;
  error?: string;
}
