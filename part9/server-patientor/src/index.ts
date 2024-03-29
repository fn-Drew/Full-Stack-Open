import express from 'express';
import cors from 'cors';
import patientService from './services/patientService';
import validatePatient from './utils';
import diagnosesService from './services/diagnosesService';
import validateEntry from './validateEntry';
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

app.get('/api/patients', (_req, res) => {
    res.send(patientService.getNonSensitivePatients());
});

app.get('/api/patients/:id', (req, res) => {
    const patient = patientService.getPatientById(req.params.id);
    res.send(patient);
});

app.post('/api/patients', (req, res) => {
    try {
        const newPatient = validatePatient(req.body);
        const addedPatient = patientService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

app.post('/api/patients/:id/entries', (req, res) => {
    const patient = patientService.getPatientById(req.params.id);
    const newEntry = validateEntry(req.body);
    const entry = patientService.addEntry(patient, newEntry);
    res.send(entry);
});

app.get('/api/diagnoses', (_req, res) => {
    res.send(diagnosesService.getAllDiagnoses());
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
