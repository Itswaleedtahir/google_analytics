const { Router } = require("express");
const router = Router();

// Middlewares

// Controllers
const controller = require("../controllers/user");

// Routes

router.get("/google", controller.google);

module.exports = router;
