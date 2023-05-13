const { HealthInfo, Address, Customer } = require("../models");
const createError = require("../utils/createError");
const cloudinary = require("../utils/cloudinary");

exports.getMe = async (req, res, next) => {
  try {
    const customer = await Customer.findOne({ where: { id: req.user.id } });
    if (!customer) {
      createError("User not found", 400);
    }

    res.status(200).json({ customer });
  } catch (error) {
    next(error);
  }
};

exports.getHealthInfo = async (req, res, next) => {
  try {
    const healthInfo = await HealthInfo.findOne({
      where: { customerId: req.user.id },
    });

    if (!healthInfo) {
      createError("Health information not found", 400);
    }
    res.status(201).json({ healthInfo });
  } catch (error) {
    next(error);
  }
};

exports.getCustomerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findOne({
      where: { id },
      attributes: ["firstName", "lastName", "profilePic"],
    });
    if (!customer) {
      createError("Customer not found", 400);
    }
    res.status(200).json({ customer });
  } catch (error) {
    next(error);
  }
};
exports.getHealthInfoById = async (req, res, next) => {
  try {
    const { customerId } = req.params;
    const healthInfo = await HealthInfo.findOne({ where: { customerId } });

    if (!healthInfo) {
      createError("Health information not found", 400);
    }

    res.status(201).json({ healthInfo });
  } catch (error) {
    next(error);
  }
};

exports.updateHealthInfo = async (req, res, next) => {
  try {
    const { age, weight, height, allergy, diseases, medication } = req.body;
    const healthInfo = await HealthInfo.findOne({
      where: { customerId: req.user.id },
    });

    healthInfo.age = age;
    healthInfo.weight = weight;
    healthInfo.height = height;
    healthInfo.allergy = allergy;
    healthInfo.diseases = diseases;
    healthInfo.medications = medication;

    healthInfo.save();

    res.status(200).json({ healthInfo });
  } catch (error) {
    next(error);
  }
};

exports.updateAddress = async (req, res, next) => {
  try {
    const { address } = req.body;
    const customer = await Customer.findOne({
      where: { id: req.user.id },
    });

    if (!customer) {
      createError("Customer not found", 400);
    }
    customer.address = address;

    customer.save();
    res.status(201).json({ newAddress: customer.address });
  } catch (error) {
    next(error);
  }
};

exports.deleteAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const address = await Address.findOne({
      where: { id, customerId: req.user.id },
    });

    if (!address) {
      createError("faild to get the address", 400);
    }

    address.destroy();
    req.status(204).json();
  } catch (error) {
    next(error);
  }
};
exports.updateProfilePicture = async (req, res, next) => {
  try {
    if (!req.files.profilePic) {
      createError("profilePic is required", 400);
    }

    let updatedProfilePic;
    if (req.files.profilePic) {
      const result = await cloudinary.upload(req.files.profilePic[0].path);
      if (req.user.profilePic) {
        const splitted = req.user.profilePic.split("/");
        const publicId = splitted[splitted.length - 1].split(".")[0];
        await cloudinary.destroy(publicId);
      }
      updatedProfilePic = result.secure_url;
    }

    await Customer.update(
      { profilePic: updatedProfilePic },
      { where: { id: req.user.id } }
    );
    res.json(updatedProfilePic);
  } catch (err) {
    next(err);
  }
};
