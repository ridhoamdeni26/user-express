const { RefreshToken } = require('../../../models');

module.exports = async (req, res) => {
    const refreshToken = req.query.refresh_token;

    const token = await RefreshToken.findOne({
        attributes: ['id', 'token', 'user_id'],
        where: { token: refreshToken }
    });

    if (!token) {
        return res.status(404).json({
            status: 'Error',
            message: 'Invalid Token'
        });
    }

    return res.json({
        status: 'Success',
        token
    });
}