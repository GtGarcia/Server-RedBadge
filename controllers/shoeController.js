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
        // console.log(shoeCreate)
        res.status(200).json({
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
    let {shoeName, brandName, size, condition, samePair, buyPrice, sellPrice} = req.body

    const shoeID = req.params.id;
    const ownerid = req.user.id;

    const query = {
        where: {
            id: shoeID,
            owner_id: ownerid
        }
    }

    let newShoe = {
        shoeName,
        brandName,
        size,
        condition,
        samePair,
        buyPrice,
        sellPrice,
    }

    try {
        const updateShoee = await ShoeModel.update(newShoe, query);
        res.status(200).json({ updateShoee, message: "Hey! Shoe item has been updated!"})
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err });
    }
})

router.delete('/:id', validateJWT, async (req,res) => {
    const shoeId = req.params.id;
    const ownerid = req.user.id;

    try {
        const query = {
            where: {
                id: shoeId,
                owner_id: ownerid,
            },
        }
        await ShoeModel.destroy(query)
        res.status(201).json({ message: 'Item has been delted!' })
    } catch (err) {
        res.status(500).json({ message: `Opps! heres you error ${err}`})
    }
})

module.exports = router;