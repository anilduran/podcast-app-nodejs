const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const prisma = require('../database/prisma');
const PodcastController = require('../controllers/podcast.controller');

router.get('/', auth, PodcastController.getPodcasts);

router.get('/liked', auth, PodcastController.getLikedPodcasts);

router.post('/:id/like', auth, PodcastController.likePodcast);

router.delete('/:id/unlike', auth, PodcastController.unlikePodcast);

router.delete('/:id', auth, PodcastController.deletePodcast);

module.exports = router;