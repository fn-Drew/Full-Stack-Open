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

app.get('/ping', (_req: any, res: any) => {
    console.log('pong')
    res.send('pong')
})

app.get('/api/blogs', async (_req: any, res: any) => {
    const blogs = await sequelize.query('SELECT * FROM blogs', { type: QueryTypes.SELECT })
    res.send(blogs)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
