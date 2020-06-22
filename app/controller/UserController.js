const { User } = require('../models');
const generateToken = require('../../config/util').generateToken;

module.exports = {
    
    async show(req, res) {
        const user = await User.findByPk(req.params.id);

        return res.json(user);
    },

    async store(req, res) {
        const user = await User.create(req.body);

        return res.json(user);
    },

    async update(req, res) {
        const user = await User.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        return res.json(user);
    },

    async delete(req, res) {
        await User.destroy({
            where: {
                id: req.params.id
            }
        });
        return res.send();
    },

    // Authentication using JsonWebToken
    async auth(req, res) {

        const { name, password } = req.body;

        await User.findOne({
            where: {
                name: name
            }
        }).then((user) => {
                        
            if (user != null) {
                if (password == user.password) {
                    generateToken(req, res, user);                    
                } else {
                    return res.status(400).json({ errorMsg: 'Dados invalidos' });
                }
            }
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({ errorMsg: 'Dados invalidos' });
        });
        return res.status(400).json({ errorMsg: 'Dados invalidos' });
    }
};