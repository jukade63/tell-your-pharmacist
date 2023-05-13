const jwt = require("jsonwebtoken");
const createError = require("../utils/createError");
const { Customer } = require("../models");
const { Pharmacy } = require("../models");

exports.userAuthentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization|| !authorization.startsWith("Bearer")) {
      createError("you are not authorized", 401);
    }

    const token = authorization.split(" ")[1];
    if (token === "") {
      createError("you are not authorized");
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const customer = await Customer.findOne({
      where: { id: payload.id },
      attributes: {
        exclude: ["password"],
      },
    });
    const pharmacy = await Pharmacy.findOne({
      where: { id: payload.id },
      attributes: {
        exclude: ["password"],
      },
    });

    if (!customer && !pharmacy) {
      createError("you are not authorized", 401);
    }

    if (customer) {
      req.user = customer;
    } else {
      req.user = pharmacy;
    }
    next();
  } catch (error) {
    next(error);
  }
};

exports.pharmacyAuthentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization|| !authorization.startsWith("Bearer")) {
      createError("you are not authorized", 401);
    }

    const token = authorization.split(" ")[1];
    if (token === "") {
      createError("you are not authorized");
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const pharmacy = await Pharmacy.findOne({
      where: { id: payload.id },
      attributes: {
        exclude: ["password"],
      },
    });

    if (pharmacy === "") {
      createError("you are not authorized", 401);
    }

    req.user = pharmacy;
    
    next();
  } catch (error) {
    next(error);
  }
};

exports.customerAuthentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization === "" || !authorization.startsWith("Bearer")) {
      createError("you are not authorized", 401);
    }

    const token = authorization.split(" ")[1];
    if (token === "") {
      createError("you are not authorized");
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const customer = await Customer.findOne({
      where: { id: payload.id },
      attributes: {
        exclude: ["password"],
      },
    });

    if (customer === "") {
      createError("you are not authorized", 401);
    }

    req.user = customer;
    next();
  } catch (error) {
    next(error);
  }
};

