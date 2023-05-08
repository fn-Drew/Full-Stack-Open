import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Patient } from '../types'
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

const ViewPatient = ({ patient }: Props) => {
    return patient ? (
        <div>
            <h2> {patient.name} </h2>
            <GenderIcon gender={patient.gender} />
            <h3> {patient.occupation} </h3>
        </div>
    ) : <div>
        no patient!
    </div>;
};

export default ViewPatient;
