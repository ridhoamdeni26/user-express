// Ambil Model User
const { User } = require('../../../models');

module.exports = async (req, res) => {

    // get user ids from postman
    const userIds = req.query.user_ids || [];

    // get attributes
    const sqlOption = {
        attributes: ['id', 'name', 'email', 'role', 'profession', 'avatar']
    }


    // get user length filter by id
    if (userIds.length) {
        sqlOption.where = {
            id: userIds
        }
    }

    const users = await User.findAll(sqlOption);

    return res.json({
        status: 'Success',
        data: users
    });
}