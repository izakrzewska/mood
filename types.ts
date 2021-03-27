export interface IMoodFetched {
  value: number;
  id: string;
  date: any;
}

export interface ResetPasswordFormData {
  email: string;
}

export interface LoginFormData extends ResetPasswordFormData {
  password: string;
}

export interface RegisterFormData extends LoginFormData {
  username: string;
  passwordConf: string;
}

export interface MoodFormData {
  value: number;
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
