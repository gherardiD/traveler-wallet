const express = require("express");

const { getBankBySlug } = require("../controllers/bankController");

const router = express.Router();

router.route("/:slug").get(getBankBySlug);

module.exports = router;
