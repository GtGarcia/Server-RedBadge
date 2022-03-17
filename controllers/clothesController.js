const router = require('express').Router();
const { ClothesModel } = require('../model');
let validateJWT = require('../middleware/validate-jwt');

router.post('/create', validateJWT, async (req,res) => {

    let { clothesName, brandName, size, condition, sameClothes, buyPrice, sellPrice } = req.body;

    let clothesCreate = {
        clothesName,
        brandName,
        size,
        condition,
        sameClothes,
        buyPrice,
        sellPrice,
        owner_id: req.user.id

    }
    try {
        const newClothes = await ClothesModel.create(clothesCreate);
        console.log(clothesCreate)
        res.status(200).json({
            message: 'Clothes Listing Created!',
            clothes: newClothes
        })
    } catch (err) {
        res.status(500).json({ error: err});
    }
})


router.get('/', async (req,res) => {
    try{
        const listing = await ClothesModel.findAll();
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
        const userClothes = await ClothesModel.findAll({
            where: {
                owner_id: id
            }
        })
        res.status(200).json(userClothes);
    } catch(err) {
        res.status(500).json({ error: err })
    }
})

//? UPDATE CLOTHES

router.put('/:id', validateJWT, async (req,res) => {
    let {clothesName, brandName, size, condition, sameClothes, buyPrice, sellPrice} = req.body

    const clothesID = req.params.id;
    const ownerid = req.user.id;

    const query = {
        where: {
            id: clothesID,
            owner_id: ownerid
        }
    }

    let newClothes = {
        clothesName,
        brandName,
        size,
        condition,
        sameClothes,
        buyPrice,
        sellPrice,
    }

    try {
        const updateClothes = await ClothesModel.update(newClothes, query);
        res.status(200).json({updateClothes, message: "Clothes item has been updated!"})
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err });
    }
})


//! DELETE 

router.delete('/:id', validateJWT, async (req,res) => {
    const clothesId = req.params.id;
    const ownerid = req.user.id;

    try {
        const query = {
            where: {
                id: clothesId,
                owner_id: ownerid,
            },
        }
        await ClothesModel.destroy(query)
        res.status(201).json({ message: 'Item has been delted!' })
    } catch (err) {
        res.status(500).json({ message: `Opps! heres you error ${err}`})
    }
})

module.exports = router;