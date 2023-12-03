export interface IHookForms {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTerms?: boolean | undefined;
  picture?: FileList | undefined;
  country: string;
}

export interface IUpdatedValues {
  picture: string;
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTerms: boolean;
  country: string;
}
