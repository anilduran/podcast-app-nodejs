const express = require('express');
const router = express.Router();
const PodcastListController = require('../controllers/podcastListController');
const auth = require('../middlewares/auth');

router.get('/', auth, PodcastListController.getPodcastLists);

router.get('/search', auth, PodcastListController.searchPodcastLists);

router.get('/:id/podcasts', auth, PodcastListController.getPodcastsByListID);

router.get('/:id/followers', auth, PodcastListController.getFollowersByListID);

router.post('/:id/follow', auth, PodcastListController.followPodcastList);

router.delete('/:id/unfollow', auth, PodcastListController.unfollowPodcastList);

router.post('/', auth, PodcastListController.createPodcastList);

router.post('/:id/podcasts', auth, PodcastListController.createPodcast);

router.put('/:id', auth, PodcastListController.updatePodcastList);

router.put('/:podcastListID/:podcastID', auth, PodcastListController.updatePodcast);

router.delete('/:id', auth, PodcastListController.deletePodcastList);

router.delete('/:podcastListID/:podcastID', auth, PodcastListController.deletePodcast);

router.get('/image-presigned-url', auth, PodcastListController.getImageSignedUrl);

router.get('/podcast-presigned-url', auth, PodcastListController.getPodcastSignedUrl);

module.exports = router;