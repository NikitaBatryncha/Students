import { create } from 'zustand';

const useTitle = create((set) => ({
  title: "Новый клиент",
  updateTitle: (newTitle) => set({ title: newTitle }),
}))

export default useTitle
