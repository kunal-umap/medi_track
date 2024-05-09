// const { createRecord } = require("../controller/controller");
const { getAllReports, createRecord } = require("../controller/reportController");
const authentication = require("../middleware/authinticate");

const router = require("express").Router();


router.get("/reports",getAllReports);
router.post("/newReport",createRecord)

module.exports = router