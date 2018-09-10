module.exports = require('./knex');

module.exports={
    getOne: function(id){
        return knex('user').where('id' id).first();
        
    },
    getOnebyEmail: function(email){
        return knex('user').where('email', email).first();
    }
}