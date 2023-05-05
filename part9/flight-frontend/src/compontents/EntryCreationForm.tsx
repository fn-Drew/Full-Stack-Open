import axios from "axios";
import React, { useEffect, useState } from "react"
import { createNewEntry } from '../flightService';
import { DiaryEntry, NewDiaryEntry } from "../types";

const createDiaryEntry = async (event: React.SyntheticEvent, newEntry: NewDiaryEntry, setErrorMessage: React.Dispatch<React.SetStateAction<string>>): Promise<DiaryEntry> => {
    event.preventDefault()
    try {
        const newDiary = await createNewEntry(newEntry, setErrorMessage)
        return newDiary
    } catch (error) {
        if (axios.isAxiosError(error)) {
            setErrorMessage(error.response?.data)
        }
        throw error
    }
}

const initialEntry: NewDiaryEntry = {
    date: '',
    visibility: '',
    weather: '',
    comment: '',
}

export default function EntryCreationForm() {
    const [newEntry, setNewEntry] = useState<NewDiaryEntry>(initialEntry)
    const [errorMessage, setErrorMessage] = useState<string>('')

    useEffect(() => {
        console.log('newEntry', newEntry)
    }, [newEntry])

    return (
        <>
            <p> {errorMessage} </p>
            <form onSubmit={(event) => createDiaryEntry(event, newEntry, setErrorMessage)}>
                <div>
                    date
                    <input
                        value={newEntry.date}
                        onChange={(event) => setNewEntry({ ...newEntry, date: event.target.value })}
                    />
                </div>
                <div>
                    visibility
                    <input
                        value={newEntry.visibility}
                        onChange={(event) => setNewEntry({ ...newEntry, visibility: event.target.value })}
                    />
                </div>
                <div>
                    weather
                    <input
                        value={newEntry.weather}
                        onChange={(event) => setNewEntry({ ...newEntry, weather: event.target.value })}
                    />
                </div>
                <div>
                    comment
                    <input
                        value={newEntry.comment}
                        onChange={(event) => setNewEntry({ ...newEntry, comment: event.target.value })}
                    />
                </div>
                <button type='submit'> add </button>
            </form>
        </>
    )
}

