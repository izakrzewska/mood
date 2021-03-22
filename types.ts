// import {Timestamp} from 'firebase'

export interface Mood {
    value: number;
}

export interface MoodFetched extends Mood {
    id: string;
    date: any;
}