import { create } from 'zustand';

type StoreState = {
  username: string;
  password: string;
  showPassword: boolean;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  togglePassword: () => void;
};

const useLoginStore = create<StoreState>(set => ({
  username: '',
  password: '',
  showPassword: false,
  setUsername: username => set({ username }),
  setPassword: password => set({ password }),
  togglePassword: () => set(state => ({ showPassword: !state.showPassword })),
}));

export default useLoginStore;
