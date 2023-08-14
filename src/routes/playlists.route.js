const express = require('express');
const router = express.Router();
const PlaylistController = require('../controllers/playlist.controller');
const auth = require('../middlewares/auth');

router.post('/', auth, PlaylistController.createPlaylist);

router.put('/:id', auth, PlaylistController.updatePlaylist);

router.delete('/:id', auth, PlaylistController.deletePlaylist);

router.post('/:id/add-podcast', auth, PlaylistController.addPodcast);

router.delete('/:id/remove-podcast', auth, PlaylistController.removePodcast);


module.exports = router;