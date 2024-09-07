import { create } from 'zustand';

//AFM = (Active Form Modal)
const useAFM = create((set) => ({
  active: false,
  setActive: (state) => set({ active: state }),
}))

export default useAFM
