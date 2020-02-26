const db = require('../data/db-config');

module.exports = {
    getUsersProfiles,
    getUserProfileById,
    addUser,
    deleteUser,
    updateUser
}

function getUsersProfiles() {
    return db('users').select('id', 'email', 'first_name', 'last_name', 'avatar', 'points', 'team_id')
}

function getUserProfileById(id) {
    return db('users').where({ id }).first();
}

function addUser(user) {
    return db('users')
        .insert(user, 'id')
        .then(ids => {
            const [id] = ids;
            return getUserProfileById(id)
        })
}

function deleteUser(id) {
    return db('users')
        .where({ id })
        .del()
}

function updateUser(id, changes) {
    return db('users')
        .where('id', '=', id)
        .update(changes, id)
}