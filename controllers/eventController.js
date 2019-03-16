const Event = require('../models/event');
const User = require('../models/user');

module.exports = {
    async store(req, res) {
        const user = await User.findByPk(req.user.id);
        const {name, description, date, color} = req.body;
        let event = await Event.build({name, description, date, color});
        event.validate().catch( (err) => {
            return res.status(400).send(err.errors[0].message);
        });

        event = await Event.create({name, description, date, color, UserId: user.id})
        res.send(event);
    },

    async index(req , res) {
        const user = await User.findByPk(req.user.id);
        const events = await Event.findAll({
            where: {
                UserId: user.id
            }
        })
        res.send(events);
    }
}