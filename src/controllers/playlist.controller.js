const prisma = require('../database/prisma');

class PlaylistController {

    static async createPlaylist(req, res, next) {
        try {

            const { title, description, imageUrl } = req.body;

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
            });

            res.status(201).json(result);

        } catch(error) {
            res.status(500).json({
                message: 'Unexpected error!'
            });
        }
    }

    static async updatePlaylist(req, res, next) {
        try {

            let willBeUpdatedAreas = {};

            if (req.body.title) {
                willBeUpdatedAreas.title = req.body.title;
            }

            if (req.body.description) {
                willBeUpdatedAreas.description = req.body.description;
            }

            if (req.body.imageUrl) {
                willBeUpdatedAreas.imageUrl = req.body.imageUrl;
            }

            const result = await prisma.playlist.update({
                data: {
                    ...willBeUpdatedAreas
                },
                where: {
                    id: req.params.id
                }
            });

            res.status(200).json(result);

        } catch(error) {
            res.status(500).json({
                message: 'Unexpected error!'
            });
        }
    }

    static async deletePlaylist(req, res, next) {
        try {

            const result = await prisma.playlist.delete({
                where: {
                    id: req.params.id
                }
            });

            res.status(200).json(result)

        } catch(error) {
            res.status(500).json({
                message: 'Unexpected error!'
            });
        }
    }

    static async addPodcast(req, res, next) {
        try {

            const result = await prisma.playlistPodcasts.create({
                data: {
                    playlistId: req.params.id,
                    podcastId: req.body.podcastID
                }
            });

            res.status(201).json(result);

        } catch(error) {
            res.status(500).json({
                message: 'Unexpected error!'
            });
        }
    }

    static async removePodcast(req, res, next) {
        try {

            const result = await prisma.playlistPodcasts.delete({
                where: {
                    playlistId_podcastId: {
                        playlistId: req.params.id,
                        podcastId: req.body.podcastID
                    }
                }
            });

            res.status(200).json(result);

        } catch(error) {
            res.status(500).json({
                message: 'Unexpected error!'
            });
        }
    }

}

module.exports = PlaylistController;