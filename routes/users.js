const UsersController = require('../controllers/users_controller');
const Joi = require('@hapi/joi')

exports.plugin = {
    name: 'routeUsers',
    version: '1.0.0',
    // pkg: require('../package.json'),
    register: async function (server, options) {

        server.route({
            path: '/users',
            method: 'GET',
            
            options: {
                handler: UsersController.getAll,
                description: 'get users',
                tags: ['api']
            }
        });
        server.route({
            path: '/users/{id}',
            method: 'GET',
            
            options: {
                handler: UsersController.findById,
                description: 'get user by id',
                tags: ['api'],
                validate: {
                    params: Joi.object({
                        id: Joi.string()
                            .required()
                            .description('the id of the user')
                    })
                }
            }
        });

        server.route({
            path: '/login',
            method: 'POST',
            
            options: {
                handler: UsersController.login,
                description: 'user login',
                tags: ['api'],
                validate: {
                    payload: Joi.object({
                        phoneno: Joi.number()
                            .description('the user phoneno'),
                    })
                }
            }
        });


        server.route({
            path: '/users',
            method: 'POST',
            
            options: {
                handler: UsersController.create,
                description: 'create user',
                tags: ['api'],
                validate: {
                    payload: Joi.object({
                        nick_name: Joi.string()
                            .required()
                            .description('the user nick_name'),
                        avatar_urls: Joi.string()
                            .description('the user avatar_urls'),
                        open_id: Joi.string()
                            .description('the user open_id'),
                        phoneno: Joi.number()
                            .description('the user phoneno'),
                    })
                }
            }
        });

        server.route({
            path: '/users/{id}',
            method: 'PATCH',
            
            options: {
                handler: UsersController.edit,
                description: 'patch user by id',
                tags: ['api'],
                validate: {
                    params: Joi.object({
                        id: Joi.string()
                            .required()
                            .description('the id of the user')
                    }),
                    payload: Joi.object({
                        nick_name: Joi.string()
                            .required()
                            .description('the user nick_name'),
                        avatar_urls: Joi.string()
                            .description('the user avatar_urls'),
                        open_id: Joi.string()
                            .description('the user open_id'),
                        phoneno: Joi.number()
                            .description('the user phoneno')
                    })
                }
            }
        });
        server.route({
            path: '/users/{id}',
            method: 'DELETE',
            
            options: {
                handler: UsersController.delete,
                description: 'delete user by id',
                tags: ['api'],
                validate: {
                    params: Joi.object({
                        id: Joi.string()
                            .required()
                            .description('the id of the user')
                    })
                }
            }
        });

    }
}