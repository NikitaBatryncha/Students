import { create } from 'zustand';

const useClientData = create((set) => ({
  data: {
    name: "",
    surname: "",
    lastName: "",
    contacts: [],
  },
  getData: (client) => set({data: client}),
}))

export default useClientData
