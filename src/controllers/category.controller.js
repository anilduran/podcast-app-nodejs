const prisma = require('../database/prisma');

class CategoryController {


    static async getCategories(req, res, next) {
        try {
            const categories = await prisma.category.findMany();
            res.status(200).json(categories);

        } catch (error) {
            res.status(500).json({
                message: 'Unexpected error!'
            }); 
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
            });
            res.status(200).json(category);
        } catch(error) {
            res.status(500).json({
                message: 'Unexpected error!'
            }); 
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
            });

            res.status(200).json(podcastLists);

        } catch(error) {
            res.status(500).json({
                message: 'Unexpected error!'
            }); 
        }
    }

    static async addCategory(req, res, next) {
        try {

            const category = await prisma.category.create({
                data: {
                    name: req.body.name
                }
            });
            res.status(201).json(category);

        } catch (error) {
            res.status(500).json({
                message: 'Unexpected error!'
            }); 
        }
    }


}

module.exports = CategoryController;