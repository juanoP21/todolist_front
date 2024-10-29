import { User } from "@/models/user";

const BACKEND_URL = "http://localhost:4000";

export async function createusers(user: User) {
    try {
        const response = await fetch(`${BACKEND_URL}/users/signUp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        return await response;
    } catch (error) {
        console.error("Error creating user:", error);
        return null;
    }
}

export async function signIn(user: { email: string; password: string }) {
    try {
        const response = await fetch(`${BACKEND_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        return await response.json();
    } catch (error) {
        console.error("Error signing in:", error);
        return null;
    }
}
