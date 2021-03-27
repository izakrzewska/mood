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
  username: string;
  email: string;
  password: string;
  passwordConf: string;
}

export interface MoodFormData {
  value: number;
  note: string;
}

export interface EditEmailFormData {
  email: string;
}

export interface EditUsernameFormData {
  username: string;
}

export interface Mood {
  value: number;
}

export interface IError {
  code: string;
  message: string;
}
