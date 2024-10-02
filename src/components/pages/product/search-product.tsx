"use client";
import { product } from "@/types/products/product";
import React from "react";

const SearchProduct = ({ productData }: { productData: product }) => {
  console.log(productData);
  return <div>SearchProduct</div>;
};

export default SearchProduct;
