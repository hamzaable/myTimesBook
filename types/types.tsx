export interface LOG {
    id: string;
    duration: string;
    type: string;
    timeStart: { seconds: number; nanoseconds: number };
    timeStartCalc: { seconds: number; nanoseconds: number };
    timeFinish: { seconds: number; nanoseconds: number };
    timeFinishCalc: { seconds: number; nanoseconds: number };
    reportTo: string;
    typeDetail: string;
    tags: string[];
    description: string;
    durationMinutes: number;
    logDate:{ seconds: number; nanoseconds: number };
}

export interface DATERANGE  {
    startDate: Date;
    endDate: Date;
    key: string;
}