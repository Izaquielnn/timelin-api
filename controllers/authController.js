const User = require('../models/user');

module.exports = {
    async login(req, res) {
        const {email, password} = req.body;
        let user = User.build({ email, password});
        user.validate({fields: ['email', 'password']}).catch( (err) => {
            return res.status(400).send(err.errors[0].message);
        });

        user = await  User.findOne({ where: { email }});
        if(!user) return res.status(400).send('Email inválido');
        
        const validPassword = user.password === password;
        if(!validPassword) return res.status(400).send('Senha inválida.');
        
        const token = user.generateToken;
        res.send(token);
    }
}