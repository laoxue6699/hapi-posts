const mongoose = require('mongoose');

class Database {

    static connect() {
        mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
    }

}

module.exports = Database;
