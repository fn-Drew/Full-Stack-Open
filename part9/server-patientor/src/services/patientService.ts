import patients from '../../data/patients';
import { v4 as uuid } from 'uuid'
import { NonSensitivePatient, Patient, NewPatient } from '../types';

const getAllPatientInfo = (): Patient[] => {
    return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, }) => ({
        id, name, dateOfBirth, gender, occupation,
    }));
};

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient,
    };
    patients.push(newPatient);
    return newPatient;
};

export default {
    getNonSensitivePatients,
    getAllPatientInfo,
    addPatient,
};
