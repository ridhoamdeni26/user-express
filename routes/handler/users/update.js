//panggil bcrypt untuk md5 password
const bcrypt = require('bcrypt');
// panggil model User
const { User } = require('../../../models');
// untuk validasi
const Validator  = require('fastest-validator');
const v = new Validator();

module.exports = async(req, res) => {
    // create validate
    const schema = {
        name: 'string|empty:false',
        email: 'email|empty:false',
        password: 'string|min:6',
        profession: 'string|optional',
        avatar: 'string|optional'
    };

    // check validate if wrong
    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res.status(404).json({
            status: 'error',
            message: validate
        });
    }

    // check id
    const id = req.params.id;
    // get user with id
    const user = await User.findByPk(id);

    // if user not found
    if (!user) {
        return res.status(404).json({
            status: 'error',
            message: 'User Not Found'
        });
    }

    // check email
    const email = req.body.email;
    if (email) {
        const checkEmail = await User.findOne({
            where: { email }
        });

        // if email already exist
        if (checkEmail && email !== user.email) {
            return res.status(409).json({
                status: 'error',
                message: 'Email Already Exist'
            });
        }
    }

    const password = await bcrypt.hash(req.body.password, 10);
    const {
        name, profession, avatar
    } = req.body;

    await user.update({
        email,
        password,
        name,
        profession,
        avatar
    });

    return res.json({
        status: 'Success',
        data: {
            id: user.id,
            name,
            email,
            profession,
            avatar
        }
    });

}