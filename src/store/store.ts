// store.ts
import create from 'zustand';

// 상태의 타입을 정의합니다.
type SignUpState = {
  showPassword: boolean;
  togglePassword: () => void;
};

const useSignUpStore = create<SignUpState>((set) => ({
  showPassword: false,
  togglePassword: () => set((state) => ({ showPassword: !state.showPassword })),
}));

export default useSignUpStore;
