const { User } = require('../models');
const jwt = require('jsonwebtoken');
const generateToken = require('../../config/util').generateToken;

module.exports = {
    async index(req, res) {
        const users = await User.findAll({ limit: 10 });

        return res.json(users);
    },

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
                }
            }
        }).catch(() => {
            return res.status(400).json({ errorMsg: 'Dados invalidos' });
        });
    }
};