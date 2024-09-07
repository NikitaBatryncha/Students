import { create } from "zustand";
import createUser from "@/hooks/createUser";
import deleteUser from "@/hooks/deleteUser";
import patchUser from "@/hooks/patchUser";
import getUser from "@/hooks/getUser";


const useClientStore = create((set) => ({
  clients: [],
  result: [],
  clientSearch: [],
  isLoading: false,
  isFetched: false,
  errors: [],
  createClient: async (newClient) => {
    set({ isLoading: true });
    try {
      await createUser(newClient);
      const clients = await getUser();
      set({ clients, isLoading: false, isFetched: true });
    } catch (error) {
      set((state) => ({
        errors: [...state.errors, error],
        isLoading: false,
        isFetched: true,
      }));
    }
  },
  fetchClients: async () => {
    set({ isLoading: true, isFetched: false });
    try {
      const clients = await getUser();
      const clientSearch = clients.map((client) => ({
        id: client.id,
        data: `${client.id}-${client.surname}-${client.name}-${client.lastName}-${client.createdAt.substr(0, 4)}.${client.createdAt.substr(5, 2)}.${client.createdAt.substr(8, 2)}-${client.createdAt.substr(11, 5)}-${client.updatedAt.substr(0, 4)}.${client.updatedAt.substr(5, 2)}.${client.updatedAt.substr(8, 2)}-${client.updatedAt.substr(11, 5)}`,
      }));
      set({ clients, isLoading: false, isFetched: true, clientSearch });
    } catch (error) {
      set((state) => ({
        errors: [...state.errors, error],
        isLoading: false,
        isFetched: true,
      }));
    }
  },
  deleteClient: async (id) => {
    set({ isLoading: true });
    try {
      await deleteUser(id);
      const clients = await getUser();
      set({ clients, isLoading: false, isFetched: true });
    } catch (error) {
      set((state) => ({
        errors: [...state.errors, error],
        isLoading: false,
        isFetched: true,
      }));
    }
  },
  patchClient: async (id, data) => {
    set({ isLoading: true });
    try {
      await patchUser(id, data);
      const clients = await getUser();
      set({ clients, isLoading: false, isFetched: true });
    } catch (error) {
      set((state) => ({
        errors: [...state.errors, error],
        isLoading: false,
        isFetched: true,
      }));
    }
  },
  updateResult: (result) => set({ result: result }),
}));

export default useClientStore;
