import React, { useEffect, useState } from 'react';
import './App.css';
import EntryCreationForm from './compontents/EntryCreationForm';
import { getAllDiaryEntries } from './flightService';
import { DiaryEntry } from './types';

function DisplayEntries({ entries }: { entries: DiaryEntry[] }): JSX.Element {
    return (
        <>
            {
                entries.map((entry, index) => {
                    return (
                        <div key={index}>
                            <h3>
                                {entry.date}
                            </h3>
                            <p> visibility: {entry.visibility} </p>
                            <p> weather: {entry.weather} </p>
                        </div>
                    )
                })
            }
        </>
    );
}

function App() {
    const [entries, setEntries] = useState<DiaryEntry[]>([]);

    useEffect(() => {
        getAllDiaryEntries().then(entries => {
            setEntries(entries)
        })
    }, [])

    return (
        <div className="App">
            <EntryCreationForm />
            <h2> Diary Entries </h2>
            <DisplayEntries entries={entries} />
        </div>
    );
}

export default App;
