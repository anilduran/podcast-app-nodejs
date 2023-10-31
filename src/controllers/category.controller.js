const prisma = require('../database/prisma')

class CategoryController {


    static async getCategories(req, res, next) {
        try {
            const categories = await prisma.category.findMany()
            return res.status(200).json(categories)

        } catch (error) {
            return res.status(500).json({
                message: 'Unexpected error!'
            }) 
        }
    }

    static async getCategoryByID(req, res, next) {
        try {
            const category = await prisma.category.findFirst({
                where: {
                    id: {
                        equals: req.params.id
                    }
                }
            })
            return res.status(200).json(category)
        } catch(error) {
            return res.status(500).json({
                message: 'Unexpected error!'
            }) 
        }
    }

    static async getPodcastListsByCategoryID(req, res, next) {
        try {

            const podcastLists = await prisma.podcastList.findMany({
                where: {
                    categories: {
                        some: {
                            id: req.params.id
                        }
                    }
                }
            })

            return res.status(200).json(podcastLists)

        } catch(error) {
            return res.status(500).json({
                message: 'Unexpected error!'
            }) 
        }
    }

    static async createCategory(req, res, next) {
        try {

            const category = await prisma.category.create({
                data: {
                    name: req.body.name,
                    description: req.body.description,
                    imageUrl: req.body.imageUrl
                }
            })
            return res.status(201).json(category)

        } catch (error) {
            return res.status(500).json({
                message: 'Unexpected error!'
            }) 
        }
    }

    static async updateCategory(req, res, next) {
        try {
 
            let willBeUpdatedAttributes = {}

            
            if (req.body.name) {
                willBeUpdatedAttributes.name = req.body.name
            }

            if (req.body.description) {
                willBeUpdatedAttributes.description = req.body.description
            }

            if (req.body.imageUrl) {
                willBeUpdatedAttributes.imageUrl = req.body.imageUrl
            }

            const result = await prisma.category.update({
                data: {
                    ...willBeUpdatedAttributes
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

    static async deleteCategory(req, res, next) {
        try {

            const result = await prisma.category.delete({
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

module.exports = CategoryController