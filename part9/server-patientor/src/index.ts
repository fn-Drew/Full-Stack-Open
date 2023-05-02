import express from 'express';
import cors from 'cors';
import patientService from './services/patientService';
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/api/patients', (_req, res) => {
    res.send(patientService.getNonSensitivePatients());
});

app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
