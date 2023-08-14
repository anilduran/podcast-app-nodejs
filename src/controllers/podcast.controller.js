const prisma = require('../database/prisma');

class PodcastController {

    static async getPodcasts(req, res, next) {
        try {
            const podcasts = await prisma.podcast.findMany();
            res.status(200).json(podcasts);
        } catch (error) {
            res.status(500).json({
                message: 'Unexpected error!'
            });
        }
    }

    static async getLikedPodcasts(req, res, next) {
        try {
            // const podcasts = await prisma.podcast.findMany()

            const podcasts = await prisma.podcast.findMany({
                where: {
                    likedByUsers: {
                        some: {
                            userId: req.user.id
                        }
                    }
                }
            })

            res.status(200).json(podcasts)
        } catch(error) {
            res.status(500).json({
                message: 'Unexpected error!'
            });
        }
    }

    static async likePodcast(req, res, next) {
        try {

            // const result = await prisma.user.update({
            //     data: {
            //         likedPodcasts: {
            //             connect: {
            //                 podcastId_userId: {
            //                     userId: req.user.id,
            //                     podcastId: req.params.id
            //                 }
            //             }
            //         }
            //     },
            //     where: {
            //         id: req.user.id
            //     }
            // });

            const result = await prisma.podcastLikes.create({
                data: {
                    podcastId: req.params.id,
                    userId: req.user.id
                }
            });

            // const result = await prisma.podcastLikes.findMany();


            res.status(200).json(result);
            
        } catch(error) {
            console.log(error);
            res.status(500).json({
                message: 'Unexpected error!'
            });
        }
    }

    static async unlikePodcast(req, res, next) {
        try {

            // const result = await prisma.user.update({
            //     data: {
            //         likedPodcasts: {
            //             disconnect: {
            //                 podcastId_userId: {
            //                     userId: req.user.id,
            //                     podcastId: req.params.id
            //                 }
            //             }
            //         }
            //     },
            //     where: {
            //         id: req.user.id
            //     }
            // });

            const result = await prisma.podcastLikes.delete({
                where: {
                    podcastId_userId: {
                        podcastId: req.params.id,
                        userId: req.user.id
                    }
                }
            });

            res.status(200).json(result);

        } catch(error) {
            console.log(error);
            res.status(500).json({
                message: 'Unexpected error!'
            });
        }
    }

    static async updatePodcast(req, res, next) {
        try {

        } catch(error) {
            res.status(500).json({
                message: 'Unexpected error!'
            });
        }
    }

    static async deletePodcast(req, res, next) {
        try {

            const result = await prisma.podcast.delete({
                where: {
                    id: req.params.id
                }
            });

            res.status(200).json({
                message: 'Successfull!'
            });


        } catch(error) {
            res.status(500).json({
                message: 'Unexpected error!'
            });
        }
    }

}

module.exports = PodcastController;