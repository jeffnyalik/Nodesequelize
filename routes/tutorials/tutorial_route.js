const express = require('express');
const router = express.Router();
const tutorials = require('../../controllers/tutorials/tutorialController');


router.get('/', tutorials.getTutorials);
router.get('/published', tutorials.findPublishedTuts);
router.get('/:id', tutorials.getTutotorialById);
router.put('/:id', tutorials.updateTutorial);
router.delete('/:id', tutorials.deleteTutorial);
router.delete('/', tutorials.deleteAll);
router.post('/', tutorials.createTutorial);
module.exports = router;