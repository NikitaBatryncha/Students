import { create } from 'zustand';

const useId = create((set) => ({
  id: null,
  updateId: (newId) => set({ id: newId }),
}))

export default useId
