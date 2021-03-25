export interface IMoodFetched {
  value: number;
  id: string;
  date: any;
  hasNote: boolean;
}

export interface IMoodDetails {
  value: number;
  date: string;
  time: string;
  id: string;
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
