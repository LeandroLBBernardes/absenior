import { create } from 'zustand'

type State = {
  userLevel: number;
  setLevel: (level: number) => void;
}

const useUserLevel = create<State>((set) => ({
  userLevel: 1,

  setLevel: (level: number) => set(() => ({ userLevel: level }))
}))

export default useUserLevel;