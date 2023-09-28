import { create } from 'zustand';

interface SignUpStore {
  showPassword: boolean;
  showConfirmPassword: boolean;
  username: string;
  password: string;
  email: string;
  nickname: string;
  confirmPassword: string;
  passwordMatchError: boolean;
  togglePassword: () => void;
  toggleConfirmPassword: () => void;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  setNickname: (nickname: string) => void;
  setEmail: (email: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  setPasswordMatchError: (passwordMatchError: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  Loading: (isLoading: boolean) => void;
}

export const useSignUpStore = create<SignUpStore>(set => ({
  email: '',
  username: '',
  password: '',
  nickname: '',
  confirmPassword: '',
  showPassword: false,
  showConfirmPassword: false,
  passwordMatchError: false,
  isLoading: false,
  setEmail: email => set({ email }),
  setUsername: username => set({ username }),
  setPassword: password => set({ password }),
  setNickname: nickname => set({ nickname }),
  setConfirmPassword: confirmPassword => set({ confirmPassword }),
  togglePassword: () => set(state => ({ showPassword: !state.showPassword })),
  toggleConfirmPassword: () => set(state => ({ showConfirmPassword: !state.showConfirmPassword })),
  setPasswordMatchError: value => set({ passwordMatchError: value }),
  setIsLoading: value => set({ isLoading: value }),
  Loading: isLoading => set({ isLoading }),
}));
