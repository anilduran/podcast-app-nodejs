const prisma = require('../database/prisma')

class PlaylistController {

    static async getPlaylists(req, res, next) {
        try {
            const playlists = await prisma.playlist.findMany()
            return res.status(200).json(playlists)
        } catch(error) {
            return res.status(500).json({
                message: 'Unexpected error!'
            })
        }
    }

    static async getPlaylistByID(req, res, next) {
        try {
            const playlist = await prisma.playlist.findFirst({
                where: {
                    id: req.params.id
                }
            })

            return res.status(200).json(playlist)

        } catch(error) {
            return res.status(500).json({
                message: 'Unexpected error!'
            })
        }
    }

    static async getPodcastsByPlaylistID(req, res, next) {
        try {

            const podcasts = await prisma.podcast.findMany({
                where: {
                    playlists: {
                        some: {
                            playlistId: req.params.id
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

    static async createPlaylist(req, res, next) {
        try {

            const { title, description, imageUrl } = req.body

            const result = await prisma.playlist.create({
                data: {
                    title,
                    description,
                    imageUrl,
                    creator: {
                        connect: {
                            id: req.user.id
                        }
                    }
                }
            })

            return res.status(201).json(result)

        } catch(error) {
            return res.status(500).json({
                message: 'Unexpected error!'
            })
        }
    }

    static async updatePlaylist(req, res, next) {
        try {

            let willBeUpdatedAreas = {}

            if (req.body.title) {
                willBeUpdatedAreas.title = req.body.title
            }

            if (req.body.description) {
                willBeUpdatedAreas.description = req.body.description
            }

            if (req.body.imageUrl) {
                willBeUpdatedAreas.imageUrl = req.body.imageUrl
            }

            const result = await prisma.playlist.update({
                data: {
                    ...willBeUpdatedAreas
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

    static async deletePlaylist(req, res, next) {
        try {

            const result = await prisma.playlist.delete({
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

    static async addPodcast(req, res, next) {
        try {

            const result = await prisma.playlistPodcasts.create({
                data: {
                    playlistId: req.params.id,
                    podcastId: req.body.podcastId
                }
            })

            const podcast = await prisma.podcast.findFirst({
                where: {
                    id: req.body.podcastId
                }
            })

            return res.status(201).json(result)

        } catch(error) {
            return res.status(500).json({
                message: 'Unexpected error!'
            })
        }
    }

    static async removePodcast(req, res, next) {
        try {

            const result = await prisma.playlistPodcasts.delete({
                where: {
                    playlistId_podcastId: {
                        playlistId: req.params.id,
                        podcastId: req.body.podcastId
                    }
                }
            })

            const podcast = await prisma.podcast.findFirst({
                where: {
                    id: req.body.podcastId
                }
            })

            return res.status(200).json(podcast)

        } catch(error) {
            return res.status(500).json({
                message: 'Unexpected error!'
            })
        }
    }

}

module.exports = PlaylistController