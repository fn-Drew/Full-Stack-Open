import { useEffect, useState } from "react";
import { NewEntry, Patient } from "../types";

const createNewForm = () => {
}

interface FormData {
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: string[];
}

const placeholderFields: NewEntry = {
    type: "HealthCheck",
    healthCheckRating: 0,
    description: '',
    date: '',
    specialist: '',
    diagnosisCodes: [],
}

const NewEntryForm = ({ patient }: { patient: Patient }) => {
    const [newEntry, setNewEntry] = useState<NewEntry>(placeholderFields);

    const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        let inputData
        if (name === "diagnosisCodes") {
            inputData = value.split(',');
        } else {
            inputData = value
        }

        setNewEntry({ ...newEntry, [name]: inputData })
    }

    useEffect(() => {
        console.log(newEntry)
    }, [newEntry])

    return (
        <form onSubmit={createNewForm}>
            <div>
                description
                <input
                    name="description"
                    value={newEntry?.description}
                    onChange={handleFieldChange}
                />
            </div>
            <div>
                date
                <input
                    name="date"
                    value={newEntry?.date}
                    onChange={handleFieldChange}
                />
            </div>
            <div>
                specialist
                <input
                    name="specialist"
                    value={newEntry?.specialist}
                    onChange={handleFieldChange}
                />
            </div>
            <div>
                Diagnosis Codes
                <input
                    name="diagnosisCodes"
                    value={newEntry?.diagnosisCodes}
                    onChange={handleFieldChange}
                />
            </div>
            <div>
                HealthCheck Rating
                <input
                    name="healthCheckRating"
                    value={newEntry?.healthCheckRating}
                    onChange={handleFieldChange}
                />
            </div>
        </form>
    )
}

export default NewEntryForm
