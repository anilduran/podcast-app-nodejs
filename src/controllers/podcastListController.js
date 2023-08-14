const prisma = require('../database/prisma');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { v4: uuidv4 } = require('uuid');

class PodcastListController {

    static async getPodcastLists(req, res, next) {
        try {

            const podcastLists = await prisma.podcastList.findMany({
                include: {
                    creator: true,
                    _count: {
                        select: { 
                            podcasts: true 
                        },
                    }
                }
            });

            res.status(200).json(podcastLists);

        } catch (error) {
            res.status(500).json({
                message: 'Unexpected error!'
            });
        }
    }
    

    static async searchPodcastLists(req, res, next) {
        try {
            const podcastLists = await prisma.podcastList.findMany({
                include: {
                    creator: true,
                    _count: {
                        select: {
                            podcasts: true
                        }
                    }
                },
                where: {
                    OR: [
                        {
                            title: {
                                contains: req.query.s.toLowerCase()
                            },                            
                        },
                        {
                            description: {
                                contains: req.query.s.toLowerCase()
                            }
                        }
                    ]
                }
            });

            res.status(200).json(podcastLists);

        } catch(error) {
            console.log(error);
            res.status(500).json({
                message: 'Unexpected error!'
            });
        }
    }


    static async getPodcastsByListID(req, res, next) {
        try {

            const podcasts = await prisma.podcast.findMany({
                where: {
                    podcastListId: req.params.id
                }
            });

            res.status(200).json(podcasts)

        } catch (error) {
            res.status(500).json({
                message: 'Unexpected error!'
            });
        }
    }
    

    static async getFollowersByListID(req, res, next) {
        try {

            const podcastLists = await prisma.podcastList.findMany({
                where: {
                    AND: [
                        {}
                    ]
                }
            });
            
            res.status(200).json(podcastLists);

        } catch (error) {
            res.status(500).json({
                message: 'Unexpected error!'
            });
        }
    }

    static async followPodcastList(req, res, next) {
        try {

            const result = await prisma.followingPodcastLists.create({
                data: {
                    userId: req.user.id,
                    podcastListId: req.params.id
                }
            });

            const podcastList = await prisma.podcastList.findFirst({
                include: {
                    creator: true
                },
                where: {
                    id: result.podcastListId
                }
            });

            res.status(200).json(podcastList);

        } catch(error) {
            res.status(500).json({
                message: 'Unexpected error!'
            });
        }
    }

    static async unfollowPodcastList(req, res, next) {
        try {
            
            const result = await prisma.followingPodcastLists.delete({
                where: {
                    podcastListId_userId: {
                        userId: req.user.id,
                        podcastListId: req.params.id
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

    static async createPodcastList(req, res, next) {
        try {
            let categories = [];

            if (req.body.categories) {
                for (let category of req.body.categories) {
                    categories.push({
                        id: category
                    });
                }
            }

            const podcastList = await prisma.podcastList.create({
                data: {
                    title: req.body.title,
                    description: req.body.description,
                    creator: { connect: { id: req.user.id } },
                    imageUrl: req.body.imageUrl,
                    categories: {
                        connect: [
                            ...categories
                        ]
                    }
                },
                include: {
                    creator: true
                }
            }); 
            res.status(201).json(podcastList);
        } catch(error) {
            console.log(error);
            res.status(500).json({
                message: 'Unexpected error!'
            });
        }
    }

    static async createPodcast(req, res, next) {
        try {

            const { title, description, imageUrl, podcastUrl } = req.body;

            const podcast = await prisma.podcast.create({
                data: {
                    title,
                    description,
                    imageUrl,
                    podcastUrl,
                    podcastList: {
                        connect: {
                            id: req.params.id
                        }
                    }
                },
            });
            
            res.status(201).json(podcast);

        } catch(error) {
            console.log(error);
            res.status(500).json({
                message: 'Unexpected error!'
            });
        }
    }

    static async updatePodcastList(req, res, next) {
        try {

            const { title, description, imageUrl } = req.body;

            let categories = [];

            if (req.body.categories) {
                for (let category of req.body.categories) {
                    categories.push({
                        id: category
                    });
                }
            }

            const podcastList = await prisma.podcastList.update({
                data: {
                    title,
                    description,
                    imageUrl,
                    categories: {
                        connect: [
                            ...categories
                        ]
                    }
                },
                where: {
                    id: req.params.id
                }
            });

            res.status(200).json(podcastList);

        } catch(error) {
            res.status(500).json({
                message: 'Unexpected error!'
            });
        }
    }

    static async updatePodcast(req, res, next) {
        try {

            const { title, description, imageUrl, podcastUrl } = req.body;

            const podcast = await prisma.podcast.update({
                data: {
                    title,
                    description,
                    imageUrl,
                    podcastList
                },
                where: {
                    id: req.params.podcastID
                }
            });

            res.status(200).json(podcast);

        } catch(error) {
            res.status(500).json({
                message: 'Unexpected error!'
            });
        }
    }

    static async deletePodcastList(req, res, next) {
        try {


            const result = await prisma.podcastList.delete({
                where: {
                    id: req.params.id
                }
            });

            res.status(200).json({
                message: 'successfull'
            });

        } catch(error) {
            console.log(error)
            res.status(500).json({
                message: 'Unexpected error!'
            });
        }
    }

    static async deletePodcast(req, res, next) {
        try {
            
            const { podcastListID, podcastID } = req.params;

            const result = await prisma.podcast.delete({
                where: {
                    id: podcastID
                }
            });
            
            res.status(200).json({
                message: 'successfull'
            })

        } catch(error) {
            console.log(error);
            res.status(500).json({
                message: 'Unexpected error!'
            });
        }
    }

    static async getImageSignedUrl(req, res, next) {
        try {
      
            const s3 = new S3Client({
                credentials: {
                    accessKeyId: process.env.accessKeyId,
                    secretAccessKey: process.env.secretAccessKey
                },
                region: 'us-east-1'
            });

            const key = `images/${req.user.id}/${uuidv4()}.jpeg`;

            const command = new PutObjectCommand({
                Bucket: process.env.bucket,
                Key: key,
                ContentType: 'image/jpeg'
            });

            const url = await getSignedUrl(s3, command, { expiresIn: 60 * 5 });
            
            res.status(200).json({ url, key});
        } catch(error) {
            console.log(error);
            res.status(500).json({
                message: 'Unexpected error!'
            });
        }   
    }

    static async getPodcastSignedUrl(req, res, next) {
        try {
            const s3Configuration = {
                credentials: {
                    accessKeyId: process.env.accessKeyId,
                    secretAccessKey: process.env.secretAccessKey
                },
                region: 'us-east-1'
            };
        
            const s3 = new S3Client(s3Configuration);
        
            const key = `podcasts/${req.user.id}/${uuidv4()}.mp3`;
        
            const command = new PutObjectCommand({
                Bucket: process.env.bucket,
                Key: key,
                ContentType: 'audio/mp3'
            });
            
            const url = await getSignedUrl(s3, command, { expiresIn: 60 * 5 });

            res.status(200).json({ url, key});
        } catch(error) {
            console.log(error);
            res.status(500).json({
                message: 'Unexpected error!'
            });
        }
    }


}

module.exports = PodcastListController;