// store.ts
import { create } from 'zustand';

type SignUpState = {
  showPassword: boolean;
  togglePassword: () => void;
};

const useSignUpStore = create<SignUpState>((set) => ({
  showPassword: false,
  togglePassword: () => set((state) => ({ showPassword: !state.showPassword })),
}));

export default useSignUpStore;
