const express = require('express');
const router = express.Router();
const controladorProyecto = require('../controladores/controladorProyectos')
const passport = require('../passport');

const authMiddleware = passport.authenticate('jwt', { session: false });

router.get("/", authMiddleware, controladorProyecto.getAll);
router.get("/:id", controladorProyecto.getByRFC);

module.exports = router;