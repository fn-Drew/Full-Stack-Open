import express from 'express';
const app = express();

app.get('/ping', (_req, res) => {
    res.send('pong');
});

app.get('/bmi', (req, res) => {
    if (Object.keys(req.query).length !== 2) {
        return res.send({
            error: "malformatted parameters"
        }).end()
    }

    const height = Number(req.query.height)
    const weight = Number(req.query.weight)

    if (!height || !weight) {
        return res.send({
            error: "malformatted parameters"
        })
    }

    const bmi = (weight / height ** 2) * 10000

    let bodyType = ''

    if (bmi < 18.5) {
        bodyType = "Underweight"
    } else if (bmi < 24.9) {
        bodyType = "Normal"
    } else if (bmi < 29.9) {
        bodyType = "Overweight"
    } else {
        bodyType = "Obese"
    };

    return res.send({
        weight,
        height,
        bodyType,
        bmi,
    })
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
