import { create } from "zustand";

// Define the shape of your store
interface ProductStore {
  productName: string;
  setProductName: (name: string) => void;
}

// Create the store
const useStore = create<ProductStore>((set) => ({
  productName: "", // initial state
  setProductName: () => set((state) => ({ productName: state.productName })), // update state
}));

export default useStore;
