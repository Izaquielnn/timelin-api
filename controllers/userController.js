const User = require('../models/user');

module.exports = {
    async store(req, res) {
        const {name, email, password} = req.body;
        let user = User.build({name, email, password});
        user.validate().catch( (err) => {
            return res.status(400).send(err.errors[0].message);
        });

        user = await  User.findOne({ where: { email }});
        if(user) return res.status(400).send('Usuário já cadastrado.');
        
        const newUser = await User.create({name, email, password});
        user = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
        }
        
        const token = newUser.generateToken;
        res.header('x-auth-token', token).send(user);
    }
}