const router = require('express').Router();
const { ShoeModel } = require('../model');
let validateJWT = require('../middleware/validate-jwt');

router.post('/create', validateJWT, async (req,res) => {

    let { shoeName, brandName, size, condition, samePair, buyPrice, sellPrice } = req.body;

    let shoeCreate = {
        shoeName,
        brandName,
        size,
        condition,
        samePair,
        buyPrice,
        sellPrice,
        owner_id: req.user.id

    }
    try {
        const newShoe = await ShoeModel.create(shoeCreate);
        console.log(shoeCreate)
        res.json(200).json({
            message: 'Shoe Listing Created!',
            shoe: newShoe
        })
    } catch (err) {
        res.status(500).json({ error: err});
    }
})


router.get('/', async (req,res) => {
    try{
        const listing = await ShoeModel.findAll();
        res.status(200).json({
            message: 'Boom! Here you go!',
            listing
        })
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

router.get('/mine', validateJWT, async(req,res) =>{
    let { id } = req.user

    try{
        const userShoe = await ShoeModel.findAll({
            where: {
                owner_id: id
            }
        })
        res.status(200).json(userShoe);
    } catch(err) {
        res.status(500).json({ error: err })
    }
})

//? UPDATE SHOE

router.put('/:id', validateJWT, async (req,res) => {
    let {shoeName, brandName, size, condition, samePair, buyPrice, sellPrice} = req.body.shoe
})