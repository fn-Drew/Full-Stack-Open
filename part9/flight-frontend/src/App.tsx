import React, { useEffect, useState } from 'react';
import './App.css';
import { getAllDiaryEntries } from './flightService';
import { DiaryEntry } from './types';

function DisplayEntries({ entries }: { entries: DiaryEntry[] }): JSX.Element {
    return (
        <>
            {
                entries.map((entry) => {
                    return (
                        <>
                            <h3>
                                {entry.date}
                            </h3>
                            <p> visibility: {entry.visibility} </p>
                            <p> weather: {entry.weather} </p>
                        </>
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
            <h2> Diary Entries </h2>
            <DisplayEntries entries={entries} />
            <header className="App-header">
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
