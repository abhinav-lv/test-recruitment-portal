const express = require("express");
const router = express.Router();

const { technical, management, project, design } = require('../controllers/domainControllers')

router.get('/technical', technical)
router.get('/management', management)
router.get('/project', project)
router.get('/design', design)

module.exports = router