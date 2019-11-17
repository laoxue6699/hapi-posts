const PostsController = require('../controllers/posts_controller');
const Joi = require('@hapi/joi')

exports.plugin = {
    name:'routePosts',
    version: '1.0.0',
    //pkg: require('../package.json'),
    register: async function (server, options) {

        server.route({
            path: '/posts',
            method: 'GET',
            options: {
                handler: PostsController.getAll,
                description: 'get posts',
                tags: ['api']
            }

        });
        server.route({
            path: '/posts/{id}',
            method: 'GET',

            options: {
                handler: PostsController.findById,
                description: 'get post by id',
                tags: ['api'],
                validate: {
                    params: Joi.object({
                        id: Joi.string()
                            .required()
                            .description('the id of the post')
                    })
                }
            }
        });
        server.route({
            path: '/posts',
            method: 'POST',

            options: {
                handler: PostsController.create,
                description: 'create post',
                tags: ['api'],
                validate: {
                    payload: Joi.object({
                        title: Joi.string()
                            .required()
                            .description('the post title'),
                        content: Joi.string()
                            .description('the post content'),
                        rating: Joi.number()
                            .description('the post rating'),
                    })
                }
            }
        });
        server.route({
            path: '/posts/{id}',
            method: 'PATCH',
            
            options: {
                handler: PostsController.edit,
                description: 'get post by id',
                tags: ['api'],
                validate: {
                    params: Joi.object({
                        id: Joi.string()
                            .required()
                            .description('the id of the post')
                    }),
                    payload: Joi.object({
                        title: Joi.string()
                            .required()
                            .description('the post title'),
                        content: Joi.string()
                            .required()
                            .description('the post content'),
                        rating: Joi.number()
                            .required()
                            .description('the post rating'),
                    })
                }
            }
        });
        server.route({
            path: '/posts/{id}',
            method: 'DELETE',
            
            options: {
                handler: PostsController.delete,
                description: 'get post by id',
                tags: ['api'],
                validate: {
                    params: Joi.object({
                        id: Joi.string()
                            .required()
                            .description('the id of the post')
                    })
                }
            }
        });

    }
}