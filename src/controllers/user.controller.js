const prisma = require('../database/prisma');

class UserController {

    static async getUsers(req, res, next) {
        try {
            
            const users = await prisma.user.findMany({
                where: {
                    id: {
                        not: req.user.id
                    }
                },
                include: {
                    podcastLists: true
                }
            });

            res.status(200).json(users);

        } catch(error) {
            res.status(500).json({
                message: 'Unexpected error!'
            }); 
        }
    }

    static async getPodcastLists(req, res, next) {
        try {

            const podcastLists = await prisma.podcastList.findMany({
                where: {
                    creatorId: req.params.id
                },
                include: {
                    creator: true
                }
            });

            res.status(200).json(podcastLists);

        } catch(error) {
            res.status(500).json({
                message: 'Unexpected error!'
            }); 
        }
    }


}

module.exports = UserController;