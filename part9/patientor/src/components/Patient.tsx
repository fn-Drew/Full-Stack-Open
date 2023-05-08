import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Diagnosis, Entry, Patient } from '../types'

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

const ViewPatient = ({ patient, diagnoses }: Props) => {
    return patient ? (
        <div>
            <h2> {patient.name} <GenderIcon gender={patient.gender} /> </h2>

            <p> {patient.occupation} </p>
            <h3> Entries </h3>
            {
                patient.entries.map((entry, i) => (
                    <div key={i}>
                        <p> {entry.date} {entry.description} </p>
                        <DiagnosisCodes entry={entry} diagnoses={diagnoses} />
                    </div>
                ))
            }
        </div>
    ) : <div>
        no patient!
    </div>;
};

export default ViewPatient;
