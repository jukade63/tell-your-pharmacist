const { OpeningTime, Pharmacy } = require("../models");
const fs = require("fs");
const cloudinary = require("../utils/cloudinary");
const createError = require("../utils/createError");
const haversine = require("haversine-distance");

exports.getAllpharmacies = async (req, res, next) => {
  try {
    const { lat, lng } = req.params;
    const pharmacies = await Pharmacy.findAll({
      attributes: { exclude: ["password"] },
    });
    if (!pharmacies) {
      createError("Cannot find a pharmacy");
    }
    pharmacies.forEach((p) => {
      const a = { lat, lng };
      const b = { lat: p.latitude, lng: p.longitude };
      p.distance = haversine(a, b);
    });
    pharmacies.sort((a, b) => {
      if (a.distance > b.distance) {
        return 1;
      }
      if (a.distance < b.distance) {
        return -1;
      }
      return 0;
    });
    res.status(200).json({ pharmacies });
  } catch (error) {
    next(error);
  }
};

exports.getPharmacyById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const pharmacy = await Pharmacy.findOne({
      where: { id },
      attributes: { exclude: ["password"] },
    });
    if (!pharmacy) {
      createError("Pharmacy not found", 400);
    }

    res.status(200).json({ pharmacy });
  } catch (error) {
    next(error);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const pharmacy = await Pharmacy.findOne({ where: { id: req.user.id } });
    if (!pharmacy) {
      createError("user not found", 400);
    }

    res.status(200).json({ pharmacy });
  } catch (error) {
    next(error);
  }
};

exports.updateOpeningTime = async (req, res, next) => {
  const validTime = new RegExp("^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$");
  try {
    const { dayStart, dayEnd, timeStart, timeEnd } = req.body;
    const openingTime = await OpeningTime.findOne({
      where: { pharmacyId: req.user.id },
    });

    if (!validTime.test(timeStart) || !validTime.test(timeEnd)) {
      createError(
        'รูปแบบเวลาไม่ถูกต้อง โปรดระบุตัวเลข 00 ถึง 23 สำหรับ นาฬิกา และ 00 ถึง 59 สำหรับ นาที',
        400
      );
    }

    if (!openingTime) {
      createError("opening time not found");
    }

    openingTime.dayStart = dayStart;
    openingTime.dayEnd = dayEnd;
    openingTime.timeStart = timeStart;
    openingTime.timeEnd = timeEnd;

    openingTime.save();
    res.status(201).json({ openingTime });
  } catch (error) {
    next(error);
  }
};
exports.getOpeningTime = async (req, res, next) => {
  try {
    const openingTime = await OpeningTime.findOne({
      where: { pharmacyId: req.user.id },
    });

    if (!openingTime) {
      createError("opening time not found");
    }
    openingTime.save();
    res.status(200).json({ openingTime });
  } catch (error) {
    next();
  }
};
exports.getOpeningTimeByPharmacyId = async (req, res, next) => {
  try {
    const openingTime = await OpeningTime.findOne({
      where: { pharmacyId: req.params.pharmacyId },
    });

    if (!openingTime) {
      createError("opening time not found");
    }
    openingTime.save();
    res.status(200).json({ openingTime });
  } catch (error) {
    next();
  }
};

exports.updatePharmacy = async (req, res, next) => {
  try {
    const { email, latitude, longitude } = req.body;

    const pharmacy = await Pharmacy.findOne({ where: { id: req.user.id } });

    if (!pharmacy) {
      createError("pharmacy not found", 400);
    }

    pharmacy.email = email;
    pharmacy.latitude = latitude;
    pharmacy.longitude = longitude;

    pharmacy.save();
    res.status(200).json({ pharmacy });
  } catch (error) {
    next(error);
  }
};
exports.updateIsOpen = async (req, res, next) => {
  try {
    const { isOpen } = req.body;

    const pharmacy = await Pharmacy.findOne({ where: { id: req.user.id } });

    if (!pharmacy) {
      createError("pharmacy not found", 400);
    }

    pharmacy.isOpen = isOpen;

    pharmacy.save();
    res.status(200).json({ isOpen: pharmacy.isOpen });
  } catch (error) {
    next(error);
  }
};

exports.updatePictures = async (req, res, next) => {
  try {
    const pharmacy = await Pharmacy.findOne({ where: { id: req.user.id } });

    let updatedProfilePic;
    if (req.files.profilePic) {
      const result = await cloudinary.upload(req.files.profilePic[0].path);
      if (pharmacy.profilePic) {
        const splitted = pharmacy.profilePic.split("/");
        const publicId = splitted[splitted.length - 1].split(".")[0];
        await cloudinary.destroy(publicId);
      }
      updatedProfilePic = result.secure_url;
    }

    let updatedCoverPhoto;
    if (req.files.coverPhoto) {
      const result = await cloudinary.upload(req.files.coverPhoto[0].path);
      if (pharmacy.coverPhoto) {
        const splitted = pharmacy.coverPhoto.split("/");
        const publicId = splitted[splitted.length - 1].split(".")[0];
        await cloudinary.destroy(publicId);
      }
      updatedCoverPhoto = result.secure_url;
    }
    pharmacy.profilePic = updatedProfilePic;
    pharmacy.coverPhoto = updatedCoverPhoto;

    pharmacy.save();

    res.status(200).json("profile picture updated");
  } catch (err) {
    next(err);
  }
};
