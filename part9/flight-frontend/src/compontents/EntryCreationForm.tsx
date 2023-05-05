import React, { useEffect, useState } from "react"
import { createNewEntry } from '../flightService';
import { DiaryEntry, NewDiaryEntry } from "../types";

const createDiaryEntry = async (event: React.SyntheticEvent, newEntry: NewDiaryEntry): Promise<DiaryEntry> => {
    event.preventDefault()
    const newDiary = await createNewEntry(newEntry)
    return newDiary
}

const initialEntry: NewDiaryEntry = {
    date: '',
    visibility: '',
    weather: '',
    comment: '',
}

export default function EntryCreationForm() {
    const [newEntry, setNewEntry] = useState<NewDiaryEntry>(initialEntry)

    useEffect(() => {
        console.log('newEntry', newEntry)
    }, [newEntry])

    return (
        <form onSubmit={(event) => createDiaryEntry(event, newEntry)}>
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
    )
}

