const prisma = require('../database/prisma')

class PodcastController {

    static async getPodcasts(req, res, next) {
        try {
            const podcasts = await prisma.podcast.findMany()
            return res.status(200).json(podcasts)
        } catch (error) {
            res.status(500).json({
                message: 'Unexpected error!'
            })
        }
    }

    static async getPodcastById(req, res, next) {
        try {

            const podcast = await prisma.podcast.findFirst({
                where: {
                    id: req.params.id
                }
            })

            return res.status(200).json(podcast)

        } catch (error) {
            return res.status(500).json({
                message: 'Unexpected error!'
            })
        }
    }
    static async createPodcast(req, res, next) {
        try {

            const { title, description, imageUrl, podcastUrl, podcastListId } = req.body

            const podcast = await prisma.podcast.create({
                data: {
                    title,
                    description,
                    imageUrl,
                    podcastUrl,
                    podcastList: {
                        connect: {
                            id: podcastListId
                        }
                    }
                },
            })
            
            return res.status(201).json(podcast)

        } catch(error) {
            return res.status(500).json({
                message: 'Unexpected error!'
            })
        }
    }

    static async updatePodcast(req, res, next) {
        try {

            let willBeUpdatedFields = {}

            if (req.body.title) {
                willBeUpdatedFields.title = req.body.title
            }
            
            if (req.body.description) {
                willBeUpdatedFields.description = req.body.description
            }

            if (req.body.imageUrl) {
                willBeUpdatedFields.imageUrl = req.body.imageUrl
            }

            if (req.body.podcastUrl) {
                willBeUpdatedFields.podcastUrl = req.body.podcastUrl
            }

            const result = await prisma.podcast.update({
                data: {
                    ...willBeUpdatedFields
                },
                where: {
                    id: req.params.id
                }
            })

            return res.status(200).json(result)

        } catch(error) {
            return res.status(500).json({
                message: 'Unexpected error!'
            })
        }
    }

    static async deletePodcast(req, res, next) {
        try {
            const result = await prisma.podcast.delete({
                where: {
                    id: req.params.id
                }
            })

            return res.status(200).json(result)

        } catch(error) {
            return res.status(500).json({
                message: 'Unexpected error!'
            })
        }
    }

    static async getLikedPodcasts(req, res, next) {
        try {
            const podcasts = await prisma.podcast.findMany({
                where: {
                    likedByUsers: {
                        some: {
                            userId: req.user.id
                        }
                    }
                }
            })

            return res.status(200).json(podcasts)
        } catch(error) {
            return res.status(500).json({
                message: 'Unexpected error!'
            })
        }
    }

    static async likePodcast(req, res, next) {
        try {
            const result = await prisma.podcastLikes.create({
                data: {
                    podcastId: req.params.id,
                    userId: req.user.id
                }
            })

            return res.status(200).json(result)
            
        } catch(error) {
            return res.status(500).json({
                message: 'Unexpected error!'
            })
        }
    }

    static async unlikePodcast(req, res, next) {
        try {

            const result = await prisma.podcastLikes.delete({
                where: {
                    podcastId_userId: {
                        podcastId: req.params.id,
                        userId: req.user.id
                    }
                }
            })

            return res.status(200).json(result)

        } catch(error) {
            return res.status(500).json({
                message: 'Unexpected error!'
            })
        }
    }

    static async getComments(req, res, next) {
        try {
            const comments = await prisma.podcastComment.findMany({
                where: {
                    podcastId: req.params.id
                }
            })

            return res.status(200).json(comments)
        } catch(error) {
            return res.status(500).json({
                message: 'Unexpected error!'
            })
        }
    }

    static async createComment(req, res, next) {
        try {

            const comment = await prisma.podcastComment.create({
                data: {
                    content: req.body.content,
                    userId: req.body.userId,
                    podcastId: req.body.podcastId
                }
            })

            return res.status(201).json(comment)

        } catch(error) {
            return res.status(500).json({
                message: 'Unexpected error!'
            })
        }
    }

    static async updateComment(req, res, next) {
        try {

            const comment = await prisma.podcastComment.update({
                data: {
                    content: req.body.content
                },
                where: {
                    id: req.params.id
                }
            })

            return res.status(200).json(comment)
        } catch(error) {
            return res.status(500).json({
                message: 'Unexpected error!'
            })
        }
    }

    static async deleteComment(req, res, next) {
        try {
            const comment = await prisma.podcastComment.delete({
                where: {
                    id: req.params.id
                }
            })

            return res.status(200).json(comment)
        } catch(error) {
            return res.status(500).json({
                message: 'Unexpected error!'
            })
        }
    }

    

}

module.exports = PodcastController