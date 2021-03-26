export interface IMoodFetchedHistory {
  value: number;
  id: string;
  date: any; // TODO: add type to dates
  hasNote: boolean;
}
export interface IMoodFetchedStatistics {
  value: number;
  id: string;
  date: any;
}

export interface IMoodDetails {
  value: number;
  date: string;
  note: string;
}

export interface ResetPasswordFormData {
  email: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData extends LoginFormData {
  email: string;
  password: string;
  passwordConf: string;
}

export interface MoodFormData {
  value: number;
  note: string;
}

export interface Mood {
  value: number;
}
