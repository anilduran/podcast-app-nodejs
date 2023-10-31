const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const prisma = require('../database/prisma')

class AuthController {

    static async signIn(req, res, next) {

        try {
            const user = await prisma.user.findFirst({
                where: {
                    email: {
                        equals: req.body.email
                    }
                }
            })
    
            if (!user) {
                return res.status(400).json({
                    message: 'User was not found!'
                })
            }
    
            const { id, username, email, password } = user
    
            if (await bcrypt.compare(req.body.password, password)) {
                const token = jwt.sign(
                    {
                        id,
                        username,
                        email
                    },
                    process.env.SALT,
                    {
                        expiresIn: '24h'
                    }
                )
    
                return res.status(200).json({
                    token
                })
            } else {
                return res.status(400).json({
                    message: 'Password is wrong!'
                })
            }
        } catch (error) {
            return res.status(500).json({
                message: 'Unexpected error!'
            })
        }


    }

    static async signUp(req, res, next) {
        
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { username: { equals: req.body.username } },
                    { email: { equals: req.body.email } }
                ]
            }
        })

        if (user) {
            return res.status(400).json({
                message: 'User already exists!'
            })
        } 

        const encryptedPassword = await bcrypt.hash(req.body.password, 10)

        const { username, email } = req.body

        const result = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: encryptedPassword
            }
        })

        if (!result) {
            return res.status(400).json({
                message: 'Unexpected error!'
            })
        }

        const token = jwt.sign(
            {
                id: result.id,
                username,
                email
            },
            process.env.SALT,
            {
                expiresIn: '24h'
            }
        ) 

        return res.status(201).json({
            token
        }) 

    }

}

module.exports = AuthController 


