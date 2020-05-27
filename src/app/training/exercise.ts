export interface Exercise {
    exerciseId: string;
    exerciseName: string;
    exerciseDuration: number;
    calories: number;
    date?: Date;
    status?: 'completed'|'cancelled'|null;
}