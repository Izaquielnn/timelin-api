const Event = require('../models/event');
const User = require('../models/user');
const Tag = require('../models/tag');

module.exports = {
    async store(req, res) {
        const user = await User.findByPk(req.user.id);
        const {name, description, date, color, tags} = req.body;
        let event = await Event.build({name, description, date, color, UserId: user.id});
        event.validate().catch( (err) => {
            return res.status(400).send(err.errors[0].message);
        });

        event = await Event.create({name, description, date, color, UserId: user.id});
        await event.setTags(tags.map(tag => tag.id)).catch(err => {
            return res.status(400).send('Conjunto de tags inválido.');
        });
        const eventTags = await event.getTags();
        var eventCreated = {
            id: event.id,
            name: event.name,
            description: event.description,
            date: event.date,
            color: event.color,
            tags: eventTags.map(tag => ({
                id: tag.id, 
                name: tag.name, 
                color: tag.color}))
        }
        res.send(eventCreated);
    },

    async index(req , res) {
        const user = await User.findByPk(req.user.id);
        const events = await Event.findAll({
            attributes: {exclude: ['UserId', 'updatedAt', 'createdAt']},
            where: {
                UserId: user.id
            },
            include:[{
                model: Tag,
                as: 'tags',
                attributes: ['id', 'name', 'color'],
                through: { attributes: [] }
            }] 
        })
        res.send(events);
    },

    async update(req, res) {
        const eventToUpdate = await Event.findByPk(req.params.id);
        if(!eventToUpdate) return res.status(400).send('Evento não encontrado');

        const { name, description, date, color, tags} = req.body;

        const event = await Event.build({
            name: name || eventToUpdate.name,
            description: description || eventToUpdate.description,
            date: date || eventToUpdate.date,
            color: color || eventToUpdate.color,
        });
        await event.validate().catch( (err) => {
            return res.status(400).send(err.errors[0].message);
        });

        await eventToUpdate.update({name, description, date, color});
        if(tags) await eventToUpdate.setTags(tags.map(tag => tag.id)).catch(() => {
            return res.status(400).send('Conjunto de tags inválido.');
        });
        res.send(eventToUpdate);
    }
}