import { create } from 'zustand';

//ADM = (Active Delete Modal)
const useADM = create((set) => ({
  active: false,
  setActive: (state) => set({ active: state }),
}))

export default useADM
