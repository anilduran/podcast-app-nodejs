const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const MeController = require('../controllers/me.controller');

router.get('/', auth, MeController.getAccount);

router.put('/', auth, MeController.updateAccount);

router.get('/following', auth, MeController.getFollowingPodcasts);

router.get('/liked-podcasts', auth, MeController.getLikedPodcasts);

router.get('/podcast-lists', auth , MeController.getPodcastLists);

router.get('/playlists', auth, MeController.getPlaylists)

module.exports = router;