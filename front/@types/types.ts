export type Review = {
    id: number;
    name: string;
    star: number;
    message: string;
    date: string;
}

export type Navigation = {
    id: number;
    name: string;
    link: string;
}

export type User = {
    id: number;
    name: string;
    password: string;
    email: string;
}

export type Token = {
    id: string;
    name?: string;
    email?: string;
    image?: string;
}

export type SessionUser = {
    id: string;
    name?: string;
    email?: string;
    image?: string;
}