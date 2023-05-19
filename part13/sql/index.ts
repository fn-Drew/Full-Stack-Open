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

class Note extends Model { }
Note.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    important: {
        type: DataTypes.BOOLEAN,
    },
    date: {
        type: DataTypes.DATE,
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'note'
})

app.get('/api/notes', async (_req: any, res: any) => {
    const notes = await Note.findAll()
    res.json(notes)
})

app.post('/api/notes', async (req: any, res: any) => {
    try {
        const note = await Note.create(req.body)
        return res.json(note)
    } catch (error) {
        return res.status(400).json({ error: error })
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
