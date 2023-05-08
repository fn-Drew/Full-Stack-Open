import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Entry, Patient } from '../types'
type Props = {
    patient: Patient | null | undefined;
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

const DiagnosisCodes = ({ entry }: { entry: Entry }) => {
    if (!entry.diagnosisCodes) return null
    return (
        <ul>
            {
                entry.diagnosisCodes.map((code: string, i) => (
                    <li key={i}> {code} </li>
                ))
            }
        </ul>
    )

}

const ViewPatient = ({ patient }: Props) => {
    return patient ? (
        <div>
            <h2> {patient.name} <GenderIcon gender={patient.gender} /> </h2>

            <p> {patient.occupation} </p>
            <h3> Entries </h3>
            {
                patient.entries.map((entry, i) => (
                    <div key={i}>
                        <p> {entry.date} {entry.description} </p>
                        <DiagnosisCodes entry={entry} />
                    </div>
                ))
            }
        </div>
    ) : <div>
        no patient!
    </div>;
};

export default ViewPatient;
