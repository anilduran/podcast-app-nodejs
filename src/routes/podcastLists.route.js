const express = require('express')
const router = express.Router()
const PodcastListController = require('../controllers/podcastListController')
const auth = require('../middlewares/auth')

router.get('/', auth, PodcastListController.getPodcastLists)

router.get('/search', auth, PodcastListController.searchPodcastLists)

router.get('/:id/podcasts', auth, PodcastListController.getPodcastsByListID)

router.get('/:id/followers', auth, PodcastListController.getFollowersByListID)

router.post('/:id/follow', auth, PodcastListController.followPodcastList)

router.delete('/:id/unfollow', auth, PodcastListController.unfollowPodcastList)

router.post('/', auth, PodcastListController.createPodcastList)

router.put('/:id', auth, PodcastListController.updatePodcastList)

router.delete('/:id', auth, PodcastListController.deletePodcastList)

router.get('/image-presigned-url', auth, PodcastListController.getImageSignedUrl)

router.get('/podcast-presigned-url', auth, PodcastListController.getPodcastSignedUrl)

router.get('/:id/comments', auth, PodcastListController.getComments)

router.post('/:id/comments', auth, PodcastListController.createComment)

router.put('/:id/comments/:commentId', auth, PodcastListController.updateComment)

router.delete('/:id/comments/:commentId', auth, PodcastListController.deleteComment)

router.get('/:id', auth, PodcastListController.getPodcastListByID)

module.exports = router