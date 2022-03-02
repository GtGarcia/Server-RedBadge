const router = require('express').Router();
const { UserModel } = require('../model');
const { UniqueConstraintError } = require('sequelize/lib/errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/register', async (req,res) => {
    
    try {
        let { firstName, lastName, userName, email, password, phoneNumber } = req.body;
        
        let User = await UserModel.create ({
            firstName,
            lastName,
            userName,
            email,
            password: bcrypt.hashSync(password, 10),
            phoneNumber
        });
        
        const token = jwt.sign(
            { id: User.id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: 60 * 60 * 24 }
        )
        res.status(201).json({
            message: 'User Registered!',
            user: User,
            sessionToken: token
        });
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: 'Email or Username already in use!',
            });
        }else {
            res.status(500).json({
                message: `Failed to register user ${err}`
            })
        }
    }
})

router.post('/login', async (req,res) => {

    let { email, password } = req.body;

    try {
        const loginUser = await UserModel.fineOne({
            where: { email }
        })

        if (loginUser) {
            let passwordCompare = await bcrypt.compare(password, loginUser.password)

            if (passwordCompare) {
                let token = jwt.sign(
                    { id: loginUser.id },
                    process.env.JWT_SECRET_KEY,
                    { expiresIn: 60 * 60 * 24}
                )

                res.status(200).json({
                    message: 'User logged in!',
                    user: loginUser,
                    sessionToken: token
                })
            } else {
                res.status(401).json({
                    message: 'Incorrect Email or Password'
                })
            }
        } else { 
            res.status(401).json({
                message: 'Incorrect Email / Password'
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: `Opps IDK what happen [Error]: ${err}`
        })
    }
})

module.exports = router;