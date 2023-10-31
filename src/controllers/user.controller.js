const prisma = require('../database/prisma')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class UserController {

    static async getUsers(req, res, next) {
        try {
            
            const users = await prisma.user.findMany({
                where: {
                    id: {
                        not: req.user.id
                    }
                }
            })

            return res.status(200).json(users)

        } catch(error) {
            return res.status(500).json({
                message: 'Unexpected error!'
            }) 
        }
    }

    static async getPodcastLists(req, res, next) {
        try {

            const podcastLists = await prisma.podcastList.findMany({
                where: {
                    creatorId: req.params.id
                }
            })

            return res.status(200).json(podcastLists)

        } catch(error) {
            return res.status(500).json({
                message: 'Unexpected error!'
            }) 
        }
    }

    static async getUserById(req, res, next) {
        try {

            const user = await prisma.user.findFirst({
                where: {
                    id: req.params.id
                }
            })

            return res.status(200).json(user)

        } catch(error) {
            return res.status(500).json({
                message: 'Unexpected error!'
            })
        }
    }

    static async createUser(req, res, next) {
        try {

            const user = await prisma.user.findFirst({
                where: {
                    OR: [
                        {
                            username: req.body.username
                        },
                        {
                            email: req.body.email
                        }
                    ]
                }
            })

            if (user) {
                return res.status(400).json({
                    message: 'User already exists!'
                })
            }

            const encrpytedPassword = await bcrypt.hash(req.body.password, 10)

            const result = await prisma.user.create({
                data: {
                    username: req.body.username,
                    email: req.body.email,
                    password: encrpytedPassword
                }
            })

            return res.status(201).json(result)

        } catch(error) {
            return res.status(500).json({
                message: 'Unexpected error!'
            })
        }
    }

    static async updateUser(req, res, next) {
        try {

            let willBeUpdatedAreas = {}

            if (req.body.username) {
                willBeUpdatedAreas.username = req.body.username
            }

            if (req.body.email) {
                willBeUpdatedAreas.email = req.body.email
            }

            if (req.body.password) {
                const encryptedPassword = await bcrypt.hash(req.body.password, 10)
                willBeUpdatedAreas.password = encryptedPassword
            }

            const result = await prisma.user.update({
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

    static async deleteUser(req, res, next) {
        try {

            const result = await prisma.user.delete({
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

}

module.exports = UserController