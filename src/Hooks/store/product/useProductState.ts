import useStore from "./useProductStore";

// product name state
export const useProductState = () => {
  const productName = useStore((state) => state.productName);
  const setProductName = useStore((state) => state.setProductName);

  return { productName, setProductName };
};
