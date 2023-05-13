import React from "react";
import InStockProducts from "../../components/pharmacy/InStockProducts";
import AddProduct from "../../components/pharmacy/AddProduct";
import PageTitle from "../../components/common/PageTitle";

function StockManagement() {

  return (
    <>
      <PageTitle title='Edit stock items' toPage='/pharmacy'/>
      <AddProduct/>
      <InStockProducts />
    </>
  );
}

export default StockManagement;
