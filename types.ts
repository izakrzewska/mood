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

export interface JournalFormData {
  content: string;
}

export interface EditEmailFormData {
  email: string;
  password: string;
}

export interface EditUsernameFormData {
  username: string;
}

export interface EditPasswordFormData {
  oldPassword: string;
  password: string;
  passwordConf: string;
}

export interface DeleteAccountFormData {
  password: string;
}

export interface Mood {
  value: number;
}

export interface IError {
  code: string;
  message: string;
}

export interface IJournalFetched {
  images: JSX.Element;
  content: string;
  id: string;
  date: any;
}
