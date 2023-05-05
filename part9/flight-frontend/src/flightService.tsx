import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "./types";

const url = 'http://localhost:3001/api'

export const getAllDiaryEntries = () => {
    return axios
        .get<DiaryEntry[]>(`${url}/diaries`)
        .then(response => response.data)
}

export const createNewEntry = (object: NewDiaryEntry) => {
    return axios
        .post<DiaryEntry>(`http://localhost:3001/api/diaries`, object)
        .then(response => response.data)
}

export const pingServer = () => {
    return axios
        .get(`http://localhost:3001/ping`)
        .then(response => response.data)
}
