const Users = require('../services/users');
const JWT = require('jsonwebtoken');

class UsersController {

    static async login(request, h) {
        const filter = request.payload;
        let user = await Users.getAll(filter).then(res => {
            return res;
        });
        if (user.length === 0) {
            console.log('登录失败！该用户不存在！')
            return '登录失败！该用户不存在！!'
        } else {
            console.log(user[0].phoneno)
            const token = JWT.sign({
                    phoneno: 'user[0].phoneno',
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                },
                'secret'
            );
            console.log(`token: ${token}`)
            return `token: ${token}`;
        }

    }

    static getAll(request, h) {
        const filter = request.query;
        return Users.getAll(filter);
    }

    static findById(request, h) {
        const userId = request.params.id;
        return Users.findById(userId);
    }

    static async create(request, h) {
        try {
            const user = await Users.create(request.payload);
            return h.response(user).code(201);
        } catch (errors) {
            return h.response(errors).code(422);
        }
    }

    static edit(request, h) {
        const userId = request.params.id;
        const userData = request.payload;
        try {
            return Users.edit(userId, userData);
        } catch (errors) {
            return h.response(errors).code(422);
        }
    }

    static async delete(request, h) {
        const userId = request.params.id;
        await Users.delete(userId);
        return h.response({}).code(204);
    }

}

module.exports = UsersController;