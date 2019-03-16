const User = require('../models/user');

module.exports = {
    async store(req, res) {
        const {name, email, password} = req.body;
        let user = await User.build({name, email, password});
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
    },

    async getCurrentUser(req , res) {
        let user = await User.findByPk(req.user.id);
        user = {
            id: user.id,
            name: user.name,
            email: user.email
        } 
        res.send(user);
    },
    async update(req, res) {
        const userToUpdate = await User.findByPk(req.user.id);
        const { name, password, email } = req.body;
        
        let user = await User.build({ 
            name: name || userToUpdate.name,
            password: password || userToUpdate.password,
            email: email || userToUpdate.email
        })
        await user.validate().catch( (err) => {
            return res.status(400).send(err.errors[0].message);
        });

        await userToUpdate.update({name, password, email})
        user = {
            id: userToUpdate.id,
            name: userToUpdate.name,
            email: userToUpdate.email
        } 
        res.send(user);
    }
}