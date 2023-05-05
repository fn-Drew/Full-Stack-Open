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
                        type='date'
                        value={newEntry.date}
                        onChange={(event) => setNewEntry({ ...newEntry, date: event.target.value })}
                    />
                </div>
                <fieldset>
                    <input type="radio" name="visibility" value="great" onChange={(event) => setNewEntry({ ...newEntry, visibility: event.target.value })} />
                    <label>great</label>
                    <input type="radio" name="visibility" value="good" onChange={(event) => setNewEntry({ ...newEntry, visibility: event.target.value })} />
                    <label>good</label>
                    <input type="radio" name="visibility" value="ok" onChange={(event) => setNewEntry({ ...newEntry, visibility: event.target.value })} />
                    <label>ok</label>
                    <input type="radio" name="visibility" value="poor" onChange={(event) => setNewEntry({ ...newEntry, visibility: event.target.value })} />
                    <label>poor</label>
                </fieldset>
                <fieldset>
                    <input type="radio" name="weather" value="sunny" onChange={(event) => setNewEntry({ ...newEntry, weather: event.target.value })} />
                    <label>sunny</label>
                    <input type="radio" name="weather" value="rainy" onChange={(event) => setNewEntry({ ...newEntry, weather: event.target.value })} />
                    <label>rainy</label>
                    <input type="radio" name="weather" value="cloudy" onChange={(event) => setNewEntry({ ...newEntry, weather: event.target.value })} />
                    <label>cloudy</label>
                    <input type="radio" name="weather" value="stormy" onChange={(event) => setNewEntry({ ...newEntry, weather: event.target.value })} />
                    <label>stormy</label>
                    <input type="radio" name="weather" value="windy" onChange={(event) => setNewEntry({ ...newEntry, weather: event.target.value })} />
                    <label>windy</label>
                </fieldset>
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

