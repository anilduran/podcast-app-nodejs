const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const prisma = require('../database/prisma')
const PodcastController = require('../controllers/podcast.controller')

router.get('/', auth, PodcastController.getPodcasts)

router.get('/:id', auth, PodcastController.getPodcastById)

router.post('/', auth, PodcastController.createPodcast)

router.put('/:id', auth, PodcastController.updatePodcast)

router.delete('/:id', auth, PodcastController.deletePodcast)

router.get('/liked', auth, PodcastController.getLikedPodcasts)

router.post('/:id/like', auth, PodcastController.likePodcast)

router.delete('/:id/unlike', auth, PodcastController.unlikePodcast)

router.get('/:id/comments', auth, PodcastController.getComments)

router.post('/:id/comments', auth, PodcastController.createComment)

router.put('/:id/comments/:commentId', auth, PodcastController.updateComment)

router.delete('/:id/comments/:commentId', auth, PodcastController.deleteComment)

module.exports = router