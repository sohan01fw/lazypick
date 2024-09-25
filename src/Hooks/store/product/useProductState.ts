import useStore from "./useProductStore";

// product name state
export const useProductState = () => {
  const setProductName = useStore((state) => state.setProductName);
  const productName = useStore((state) => state.productName);

  return { setProductName, productName };
};
