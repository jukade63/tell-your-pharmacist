require('dotenv').config()
const { sequelize } = require('./models')
const express = require('express')
const cors = require('cors')
const path = require('path')
const authCustomerRoute = require('./routes/authCustomerRoute')
const authPharmacyRoute = require('./routes/authPharmacyRoute')
const productRoute = require('./routes/productRoute')
const contactRoute = require('./routes/contactRoute')
const orderRoute = require('./routes/orderRoute')
const customerRoute = require('./routes/customerRoute')
const pharmacyRoute = require('./routes/pharmacyRoute')
const orderDetailRoute = require('./routes/orderDetailRoute')
const userRoute = require('./routes/userRoute')
const reviewRoute = require('./routes/reviewRoute')
const openingTimeRoute = require('./routes/openingTimeRoute')
const stripeRoute = require('./routes/stripeRoute')
const notFound = require('./middlewares/notFound')
const error = require('./middlewares/error')

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/orders", orderRoute);
app.use("/customers", customerRoute);
app.use("/pharmacies", pharmacyRoute);
app.use("/orderDetails", orderDetailRoute);
app.use("/contacts", contactRoute);
app.use("/customerAuth", authCustomerRoute);
app.use("/pharmacyAuth", authPharmacyRoute);
app.use("/users", userRoute);
app.use("/payments", stripeRoute);
app.use("/products", productRoute);
app.use("/reviews", reviewRoute);
app.use("/openingTime", openingTimeRoute);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "/client/dist", "index.html"));
    });
  }

app.use(notFound);
app.use(error);

// sequelize.sync({alter: true})

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("listening to port " + port);
});
