export interface LoginFormValues {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
