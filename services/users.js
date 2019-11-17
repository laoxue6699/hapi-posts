const User = require('../models/user');

class Users {

    static async getAll(filter) {
        return User.find(filter);
    }

    static async findById(userId) {
        return User.findById(userId);
    }

    static async create(userData) {
        Users.validateModel(userData);
        return new User(userData).save();
    }

    static async edit(userId, userData) {
        Users.validateModel(userData);
        await User.updateOne({_id: userId}, userData);
        return this.findById(userId);
    }

    static async delete(userId) {
        return User.deleteOne({_id: userId});
    }

    static validateModel(data) {
        const user = new User(data);
        const validation = user.validateSync();
        if (validation)
            throw validation.errors
    }

}

module.exports = Users;