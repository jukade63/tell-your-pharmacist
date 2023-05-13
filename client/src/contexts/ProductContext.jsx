import { createContext, useContext, useEffect, useState } from "react";
import axios from "../config/axios";

const ProductContext = createContext();

function ProductContextProvider({ children }) {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const response = await axios.get("/products");
    setProducts(response.data.products);
  };

  const addProduct = async (input) => {
    const newProductList = [...products];
    setProducts([input, ...newProductList]);
    await axios.post("/products", input);
  };

  const deleteProduct = async (id) => {
    await axios.delete(`/products/${id}`);
    const newProductList = [...products]
    const idx = products.findIndex(item=>item.id === id)
    if(idx !== -1){
      newProductList.splice(idx, 1)
    }
    setProducts(newProductList)
  };

  const updateProduct = async (id, value) => {
    await axios.put(`/products/${id}`, value);
    const newProductList = [...products]
    const idx = products.findIndex(item=>item.id === id)
    if(idx !== -1){
      newProductList[idx] = {...newProductList[idx], ...value}
    }
    setProducts(newProductList)
  };

  return (
    <ProductContext.Provider
      value={{ products, getProducts, setProducts, addProduct, deleteProduct, updateProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
}

const useProduct = () => {
  const context = useContext(ProductContext);
  return context;
};

export default ProductContextProvider;
export { ProductContext, useProduct };
