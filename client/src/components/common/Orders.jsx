import React, { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useOrder } from "../../contexts/OrderContext";
import OrderCard from "./OrderCard";
import PageTitle from "./PageTitle";

function Orders({path}) {
  const { getOrders, orders } = useOrder();
  const {user} = useAuth()

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <PageTitle title='ออเดอร์' toPage={path}/>
      {orders.map((order) => {
        return <OrderCard key={order.id} order={order} user={user} path={path}/>;
      })}
    </div>
  );
}

export default Orders;
