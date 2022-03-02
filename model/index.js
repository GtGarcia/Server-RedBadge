const UserModel = require('./user');
const ShoeModel = require('./shoe');
const ClothesModel = require('./clothes');

//? ASSOCIATIONS

UserModel.hasMany(ShoeModel);
UserModel.hasMany(ClothesModel);

ShoeModel.belongsTo(UserModel);
ClothesModel.belongsTo(UserModel);


module.exports = {
    UserModel,
    ShoeModel,
    ClothesModel
}