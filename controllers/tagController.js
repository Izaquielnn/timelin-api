const Tag = require('../models/tag');
const User = require('../models/user');

module.exports = {
    async store(req, res) {
        const user = await User.findByPk(req.user.id);
        const {name, color} = req.body;
        let tag = await Tag.build({name, color});
        tag.validate().catch( (err) => {
            return res.status(400).send(err.errors[0].message);
        });

        tag = await Tag.create({name, color, UserId: user.id})
        const tagCreated = {
            id: tag.id,
            name: tag.name,
            color: tag.color
        }
        res.send(tagCreated);
    },

    async index(req , res) {
        const user = await User.findByPk(req.user.id);
        const tags = await Tag.findAll({
            where: {
                UserId: user.id
            },
            attributes: ['id', 'name', 'color']
        })
        res.send(tags);
    },

    async update(req, res) {
        const tagToUpdate = await Tag.findByPk(req.params.id);
        if(!tagToUpdate) return res.status(400).send('Tag não encontrada');

        const { name, color} = req.body;

        let tag = await Tag.build({
            name: name || tagToUpdate.name,
            color: color || tagToUpdate.color
        });
        tag.validate().catch( (err) => {
            return res.status(400).send(err.errors[0].message);
        });

        tagToUpdate.update({name, color});
        tag = {
            id: tagToUpdate.id,
            name: tagToUpdate.name,
            color: tagToUpdate.color
        }
        res.send(tag);
    },

    async delete(req, res) {
        const tagDeleted = await Tag.destroy({
            where: {id: req.params.id}
        }).catch(() => {
            return res.status(400).send();
        });
        if(tagDeleted === 0) res.send('Tag não encontrada.');
        else res.send('Tag deletada.');
    }
}