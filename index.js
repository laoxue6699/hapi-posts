const Hapi = require('@hapi/hapi');
const Database = require('./config/database');

const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');

const init = async () => {

  const server = Hapi.server({
    port: 8000,
    host: 'localhost'
  });

  Database.connect();

  const swaggerOptions = {
    info: {
      title: 'Test API Documentation',
      version: Pack.version,
    },
  };

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ]);

  await server.register([{
      plugin: require('./routes/posts'),
      options:{}
    },
    {
      plugin: require('./routes/users'),
      options:{}
    }
  ]);

  await server.start();
  console.log('Listening on %s', server.info.uri);

}

init();