import React from "react";
import { useProduct } from "../../contexts/ProductContext";
import InStockProducts from "../../components/pharmacy/InStockProducts";
import AddProduct from "../../components/pharmacy/AddProduct";
import PageTitle from "../../components/common/PageTitle";

function StockManagement() {

  return (
    <>
      <PageTitle title='เพิ่มรายการยา' toPage='/pharmacy'/>
      <AddProduct/>
      <InStockProducts />
    </>
  );
}

export default StockManagement;
