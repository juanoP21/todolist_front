export interface Todo {
    id: number;
    title: string;
    description: string;
    dateend: string;
    state: "pendiente" | "en progreso" | "completada";
}