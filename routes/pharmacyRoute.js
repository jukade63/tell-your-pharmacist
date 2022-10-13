const { upload } = require("../middlewares/upload");
const express = require("express");
const {
  updatePharmacy,
  updatePictures,
  getAllpharmacies,
  getMe,
  getPharmacyById,
  updateIsOpen,
} = require("../controllers/pharmacyController");
const {
  pharmacyAuthentication,
  userAuthentication,
} = require("../middlewares/authentication");
const router = express.Router();

router.get("/", userAuthentication, getMe);
router.put("/", pharmacyAuthentication, updatePharmacy);
router.patch(
  "/upload",
  pharmacyAuthentication,
  upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "coverPhoto", maxCount: 1 },
  ]),
  updatePictures
);
router.patch("/isOpen/update", pharmacyAuthentication, updateIsOpen);
router.get("/:lat/:lng", userAuthentication, getAllpharmacies);
router.get("/:id", userAuthentication, getPharmacyById);

module.exports = router;
