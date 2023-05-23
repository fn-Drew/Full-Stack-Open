require('dotenv').config();
const { Sequelize, QueryTypes, DataTypes, Model } = require('sequelize');
const express = require('express');
const app = express();
app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
        // gives 'server does not support SSL' error
        // ssl: {
        //     require: true,
        //     rejectUnauthorized: false
        // }
    },
})

class Blog extends Model { }
Blog.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    author: {
        type: DataTypes.TEXT,
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog'
})
Blog.sync();

app.get('/ping', (_req: any, res: any) => {
    console.log('pong')
    res.send('pong')
})

app.get('/api/blogs', async (_req: any, res: any) => {
    const blogs = await sequelize.query('SELECT * FROM blogs', { type: QueryTypes.SELECT })
    res.send(blogs)
})

app.post('/api/blogs', async (req: any, res: any) => {
    try {
        const blogs = await Blog.create(req.body);
        return res.json(blogs)
    } catch (error) {
        return res.status(400).json({ error: error })
    }
})

app.delete('/api/blogs/:id', async (req: any, res: any) => {
    try {
        const count = await Blog.destroy({ where: { id: req.params.id } })
        return res.status(204).json(count);
    } catch (error) {
        return res.status(404).json({ error: error })
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
