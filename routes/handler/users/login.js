//panggil bcrypt untuk md5 password
const bcrypt = require('bcrypt');
// panggil model User
const { User } = require('../../../models');

const Validator  = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
    const schema = {
        email: 'email|empty:false',
        password: 'string|min:6'
    }

    const validate = v.validate(req.body, schema);

    // validasi panjang password
    if (validate.length) {
        return res.status(400).json({
            status: 'Error',
            message: validate
        });
    }

    // check user ada di database
    const user = await User.findOne({
        where: { email: req.body.email }
    });

    // check user ada atau tidak
    if (!user) {
        return res.status(404).json({
            status: 'Error',
            message: 'User Not Found'
        });
    }

    // check email password apakah bener apa tidak
    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword) {
        return res.status(404).json({
            status: 'Error',
            message: 'User Not Found'
        });
    }

    // data dilempar ke frontend
    res.json({
        status: 'Success',
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.role,
            profession: user.profession
        }
    })
}