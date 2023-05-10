import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CheckIcon from '@mui/icons-material/Check';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { Diagnosis, Entry, Patient } from '../types'
import NewEntryForm from './NewEntryForm';

type Props = {
    patient: Patient | null | undefined;
    diagnoses: Diagnosis[];
};

const GenderIcon = ({ gender }: { gender: string }) => {
    switch (gender) {
        case 'female':
            return <FemaleIcon />
        case 'male':
            return <MaleIcon />
        default:
            return <p> other </p>
    }
}

const DiagnosisCodes = ({ entry, diagnoses }: { entry: Entry, diagnoses: Diagnosis[] }) => {
    if (!entry.diagnosisCodes) return null
    const diagnosisDescription = (code: string) => {
        const diagnosis = diagnoses.find((diagnosis) => diagnosis.code === code)
        if (!diagnosis) return null
        return diagnosis.name
    }
    return (
        <ul>
            {
                entry.diagnosisCodes.map((code: string, i) => (
                    <li key={i}> {code} {diagnosisDescription(code)} </li>
                ))
            }
        </ul>
    )

}

const HospitalEntry = ({ entry, diagnoses }: { entry: Entry, diagnoses: Diagnosis[] }) => {
    return (
        <div>
            <p> {entry.date} {entry.description} </p>
            <p> Hospital <LocalHospitalIcon /> </p>
            <DiagnosisCodes entry={entry} diagnoses={diagnoses} />
        </div>
    )
}

const HealthCheckEntry = ({ entry, diagnoses }: { entry: Entry, diagnoses: Diagnosis[] }) => {
    return (
        <div>
            <p> {entry.date} {entry.description} </p>
            <p> Checkup <CheckIcon /> </p>
            <DiagnosisCodes entry={entry} diagnoses={diagnoses} />
        </div>
    )
}

const OccupationalEntry = ({ entry, diagnoses }: { entry: Entry, diagnoses: Diagnosis[] }) => {
    return (
        <div>
            <p> {entry.date} {entry.description} </p>
            <p> Occupational <BusinessCenterIcon /> </p>
            <DiagnosisCodes entry={entry} diagnoses={diagnoses} />
        </div>
    )
}

const PatientEntry = ({ entry, diagnoses }: { entry: Entry, diagnoses: Diagnosis[] }) => {
    switch (entry.type) {
        case 'Hospital':
            return <HospitalEntry entry={entry} diagnoses={diagnoses} />
        case 'HealthCheck':
            return <HealthCheckEntry entry={entry} diagnoses={diagnoses} />
        case 'OccupationalHealthcare':
            return <OccupationalEntry entry={entry} diagnoses={diagnoses} />

    }
}

const Entries = ({ patient, diagnoses }: { patient: Patient, diagnoses: Diagnosis[] }) => {
    return (
        <>
            {
                patient.entries.map((entry, i) => (
                    <div key={i}>
                        <PatientEntry entry={entry} diagnoses={diagnoses} />
                    </div>
                ))
            }
        </>
    )
}

const ViewPatient = ({ patient, diagnoses }: Props) => {
    return patient ? (
        <div>
            <h2> {patient.name} <GenderIcon gender={patient.gender} /> </h2>
            <p> {patient.occupation} </p>
            <h3> Entries </h3>
            <NewEntryForm patient={patient} />
            <Entries patient={patient} diagnoses={diagnoses} />
        </div>
    ) : <div>
        no patient!
    </div>;
};

export default ViewPatient;
