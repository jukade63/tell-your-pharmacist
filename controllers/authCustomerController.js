const { Customer, HealthInfo, sequelize } = require("../models");
const createError = require("../utils/createError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");

exports.login = async (req, res, next) => {
  try {
    const { phoneNumber, password } = req.body;
    const customer = await Customer.findOne({ where: { phoneNumber } });

    if (!customer) {
      createError("ชื่อหรือรหัสผ่านไม่ถูกต้อง", 400);
    }

    const isMatch = await bcrypt.compare(password, customer.password);

    if (!isMatch) {
      createError("ชื่อหรือรหัสผ่านไม่ถูกต้อง", 400);
    }

    const token = jwt.sign({ id: customer.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signup = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      confirmPassword,
    } = req.body;

    const existCustomer = await Customer.findOne({ where: { phoneNumber } });

    if (existCustomer) {
      createError("User already registered", 400);
    }
    if (!phoneNumber) {
      createError("phone number is required", 400);
    }

    if (!password) {
      createError("password is required", 400);
    }
    if (password !== confirmPassword) {
      createError("password and confirm password not matched", 400);
    }

    const isMobilePhone = validator.isMobilePhone(phoneNumber + "");
    const isEmail = validator.isEmail(email + "");
    if (!isMobilePhone && !isEmail) {
      createError("email or phone number is invalid format", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const customer = await Customer.create(
      {
        firstName,
        lastName,
        email,
        phoneNumber,
        password: hashedPassword,
      },
      { transaction: t }
    );

    await HealthInfo.create(
      {
        customerId: customer.id,
      },
      { transaction: t }
    );

    await t.commit();

    const token = jwt.sign({ id: customer.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(201).json({ token });
  } catch (error) {
    await t.rollback();
    next(error);
  }
};
