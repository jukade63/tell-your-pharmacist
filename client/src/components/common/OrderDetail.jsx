import { useNavigate, useParams } from "react-router-dom";
import OrderDetailItem from "./OrderDetailItem";
import { useOrder } from "../../contexts/OrderContext";
import {
  Button,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import axios from "../../config/axios";
import { useAuth } from "../../contexts/AuthContext";
import { STRIPE_KEY } from "../../config/env";
import ReviewModal from "./ReviewModal";
import PageTitle from "./PageTitle";

const KEY = STRIPE_KEY;

function OrderDetail({path}) {
  const {
    orderDetail,
    getOrderById,
    updatePaidOrder,
    updateDeliveryOrder,
    updateOrderCompleted,
  } = useOrder();
  const [order, setOrder] = useState({});
  const { orderId } = useParams();
  const { user } = useAuth();
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);


  const total = orderDetail.reduce((acc, curr) => {
    acc += curr.price * curr.amount;
    return acc + +order?.deliveryFee;
  }, 0);

  const onToken = (token) => {
    setStripeToken(token);
  };

  const fetchOrder = async () => {
    const res = await getOrderById(orderId);
    setOrder(res.data.order);
  };


  useEffect(() => {
    fetchOrder();
  }, [orderId]);
  

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await updatePaidOrder(orderId);
        await axios.post("/payments", {
          tokenId: stripeToken.id,
          amount: total,
        });

        navigate("/orders");
      } catch (error) {
        console.log(error);
      }
    };

    stripeToken && makeRequest();
  }, [stripeToken]);

  let renderedBtn;
  if (order.status === "PENDING" && order.customerId === user.id) {
    renderedBtn = (
      <StripeCheckout
        name="Tell your pharmacist"
        amount={(total * 100) / 37}
        token={onToken}
        stripeKey={KEY}
      >
        <Button variant="contained" fullWidth>
          ชำระเงิน
        </Button>
      </StripeCheckout>
    );
  } else if (order.status === "PAID" && order.pharmacyId === user.id) {
    renderedBtn = (
      <Button
        variant="contained"
        fullWidth
        onClick={() => updateDeliveryOrder(orderId)}
      >
        จัดส่ง
      </Button>
    );
  } else if (order.status === "DELIVERING" && order.customerId === user.id) {
    renderedBtn = (
      <Button
        variant="contained"
        fullWidth
        onClick={() => {
          updateOrderCompleted(orderId)
          setOpen(true)
        }}
      >
        ยืนยันรับออเดอร์
      </Button>
    );
  }

  return (
    <>
    <PageTitle title='รายละเอียดออเดอร์' toPage={`${path}/orders`}/>
      <ReviewModal open={open} setOpen={setOpen} order={order} />
      <Paper sx={{ px: 1, py: 1.5 }}>
        <Stack my="auto" heigth="740px">
          <Stack>
            <Typography>เลขที่ออเดอร์ : {order.id?.slice(0, 20)}</Typography>
            <Typography sx={{ mt: 1 }}>
              สถานะ :{" "}
              <Typography
                component="span"
                sx={{ background: "lightPink", p: "5px" }}
              >
                {order.status}
              </Typography>{" "}
            </Typography>
            <Typography sx={{ mt: 2 }}>รายการยา</Typography>
          </Stack>
          <ol>
            {orderDetail?.map((el) => {
              return (
                <li >
                  <OrderDetailItem key={el.id} {...el} />
                </li>
              );
            })}
          </ol>
          {order.deliveryFee && (
            <Typography>
              ค่าส่ง{" "}
              <span style={{ marginLeft: "250px" }}>
                {(+order.deliveryFee).toFixed(2)}
              </span>
            </Typography>
          )}
          <Divider sx={{ my: 1 }} />
          <Typography>
            ทั้งหมด{" "}
            <span style={{ marginLeft: "230px" }}>{total.toFixed(2)}</span>
          </Typography>
          <Divider sx={{ my: 1 }} />
          {renderedBtn}
        </Stack>
      </Paper>
    </>
  );
}

export default OrderDetail;
