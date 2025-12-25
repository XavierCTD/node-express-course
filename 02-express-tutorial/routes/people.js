const express = require("express");
const { addPerson, getPeople, getPerson, updatePerson, deletePerson } = require("../controllers/people");
const router = express.Router();

router.get("/", getPeople);
router.get("/:id", getPerson);
router.post("/", addPerson);
router.put("/:id", updatePerson);
router.delete("/:id", deletePerson);

module.exports = router;