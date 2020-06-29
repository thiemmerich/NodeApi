const jwt = require('jsonwebtoken');

const expireTime = 300;

module.exports = {
    validateToken: (req, res, next) => {
        const authorizationHeaader = req.headers.authorization;
        let result;

        if (authorizationHeaader) {
            const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
            const options = {
                expiresIn: expireTime,
                issuer: 'https://scotch.io'
            };

            try {
                // verify makes sure that the token hasn't expired and has been issued by us
                result = jwt.verify(token, process.env.JWT_SECRET, options);

                // Let's pass back the decoded token to the request object
                req.decoded = result;

                // We call next to pass execution to the subsequent middleware
                next();
            } catch (err) {
                // Throw an error just in case anything goes wrong with verification
                result = {
                    error: 'Unable to authenticate',
                    status: 401
                };
                res.status(401).send(result);
            }
        } else {
            result = {
                error: 'Unable to authenticate',
                status: 401
            };
            res.status(401).send(result);
        }
    },

    generateToken: (req, res, user) => {

        const result = {};

        const payload = { user: user.name };
        //console.log("PAYLOAD: " + payload);

        const options = { expiresIn: expireTime, issuer: 'https://scotch.io' };
        //console.log("OPTIONS: " + options);

        const secret = process.env.JWT_SECRET;
        //console.log("SECRET: " + secret);

        const token = jwt.sign(payload, secret, options);
        //console.log("TOKEN: " + token);

        result.token = token;
        result.status = 200;
        result.result = {
            id: user.id,
            name: user.name,
            email: user.email
        };

        return res.status(200).send(result);
    }
};