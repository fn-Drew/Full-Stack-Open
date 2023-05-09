import patients from '../../data/patients';
import { v4 as uuid } from 'uuid';
import { NonSensitivePatient, Patient, NewPatient, Entry, NewEntry } from '../types';

const getAllPatientInfo = (): Patient[] => {
    return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id, name, dateOfBirth, gender, occupation, entries
    }));
};

const getPatientById = (correctID: string) => {
    const patient = patients.find(({ id }) => id === correctID);
    if (!patient) {
        throw new Error('patient not found');
    }
    return patient;
};

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient,
    };
    patients.push(newPatient);
    return newPatient;
};

const addEntry = (patient: Patient, newEntry: NewEntry): Entry => {
    const entry = {
        id: uuid(),
        ...newEntry,
    };
    patient.entries.push(entry);
    return entry;
};

export default {
    getNonSensitivePatients,
    getPatientById,
    getAllPatientInfo,
    addPatient,
    addEntry,
};
