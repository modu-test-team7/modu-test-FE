// signupStore.ts
import create from 'zustand';

type SignUpState = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  passwordMatchError: boolean;
  isLoading: boolean;
  setEmail: (email: string) => void;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  togglePassword: () => void;
  toggleConfirmPassword: () => void;
  setPasswordMatchError: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
};

export const useSignUpStore = create<SignUpState>(set => ({
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
  showPassword: false,
  showConfirmPassword: false,
  passwordMatchError: false,
  isLoading: false,
  setEmail: email => set({ email }),
  setUsername: username => set({ username }),
  setPassword: password => set({ password }),
  setConfirmPassword: confirmPassword => set({ confirmPassword }),
  togglePassword: () => set(state => ({ showPassword: !state.showPassword })),
  toggleConfirmPassword: () => set(state => ({ showConfirmPassword: !state.showConfirmPassword })),
  setPasswordMatchError: value => set({ passwordMatchError: value }),
  setIsLoading: value => set({ isLoading: value }),
}));
