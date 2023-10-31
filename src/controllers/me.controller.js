const prisma = require('../database/prisma')
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class MeController {
    
    static async getAccount(req, res, next) {
        try {  
            const account = await prisma.user.findFirst({
                where: {
                    id: req.user.id,
                },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    profilePhotoUrl: true
                }
            })

        
            return res.status(200).json(account)
        
        } catch(error) {
            return res.status(500).json({
                message: 'Unexpected error!'
            }) 
        }
    }

    static async updateAccount(req, res, next) {
        try {

            let params = {}

            if (req.body.username) {
                params.username = req.body.username
            }

            if (req.body.email) {
                params.email = req.body.email
            }   

            if (req.body.password) {
                const encrypedPassword = await bcrypt.hash(req.body.password, 10)
                params.password = encrypedPassword
            }

            if (req.body.profilePhotoUrl) {
                params.profilePhotoUrl = req.body.profilePhotoUrl
            }

            const account = await prisma.user.update({
                data: { 
                    ...params
                },
                where: {
                    id: req.user.id
                },
                select: {
                    id: true,
                    username: true,
                    email: true,    
                    profilePhotoUrl: true
                }
            })

            return res.status(200).json(account)

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
                    creator: {
                        id: req.user.id
                    }
                }
            })
            
            return res.status(200).json(podcastLists)

        } catch (error) {
            return res.status(500).json({
                message: 'Unexpected error!'
            }) 
        }

    }

    static async getPodcasts(req, res, next) {
        try {

            const podcasts = await prisma.podcast.findMany({
                where: {
                    podcastListId: req.params.id
                }
            })

            return res.status(200).json(podcasts)

        } catch(error) {
            return res.status(500).json({
                message: 'Unexpected error!'
            })
        }
    }

    static async getFollowingPodcastLists(req, res, next) {
        try {

            
            const podcastLists = await prisma.podcastList.findMany({
                where: {
                    followingByUsers: {
                        some: {
                            userId: req.user.id,
                        }
                    }
                }
            })

            return res.status(200).json(podcastLists)

        } catch (error) {
            return res.status(500).json({
                message: 'Unexpected error!'
            })
        }
    }

    static async getLikedPodcasts(req, res, next) {
        try {

            const podcasts = await prisma.podcast.findMany({
                select: {
                    id: true,
                    title: true,
                    description: true,
                    imageUrl: true,
                    podcastUrl: true,
                    podcastListId: true,
                    likedByUsers: {
                        where: {
                            userId: req.user.id
                        }
                    },
                },
            })

            return res.status(200).json(podcasts)

        } catch(error) {
            return res.status(500).json({
                message: 'Unexpected error!'
            })
        }
    }

    static async getPlaylists(req, res, next) {
        try {

            const playlists = await prisma.playlist.findMany({
                where: {
                    creator: {
                        id: req.user.id
                    }
                }
            })

            return res.status(200).json(playlists)

        } catch(error) {
            return res.status(500).json({
                message: 'Unexpected error!'
            })
        }
    }


    
    
    


}

module.exports = MeController