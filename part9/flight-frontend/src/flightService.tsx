import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "./types";

const url = 'http://localhost:3001/api'

export const getAllDiaryEntries = () => {
    return axios
        .get<DiaryEntry[]>(`${url}/diaries`)
        .then(response => response.data)
}

export const createNote = (object: NewDiaryEntry) => {
    return axios
        .post<DiaryEntry>(`${url}/diaries`, object)
        .then(response => response.data)
}
