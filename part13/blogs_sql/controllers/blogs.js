const router = require('express').Router()
const { Blog } = require('../models')

router.get('/', async (_req, res) => {
    const blogs = await Blog.findAll()
    res.send(blogs)
})

router.post('/', async (req, res) => {
    try {
        const blogs = await Blog.create(req.body);
        return res.json(blogs)
    } catch (error) {
        return res.status(400).json({ error: error })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id)
        await blog.update({ ...req.body, likes: blog.likes + 1 })
        return res.status(200).json(blog)
    } catch (error) {
        return res.status(400).json({ error: error })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const count = await Blog.destroy({ where: { id: req.params.id } })
        return res.status(204).json(count);
    } catch (error) {
        return res.status(400).json({ error: error })
    }
})

module.exports = router
