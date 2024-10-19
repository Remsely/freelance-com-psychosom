import {Navigation, Review} from "../../@types/types.ts";

export const reviews : Review[]  = [
    {
        id: 1,
        name: "John",
        star: 5,
        message: "Топ4ик",
        date: "10.06.24",
    },
    {
        id: 2,
        name: "Mark",
        star: 5,
        message: "Лучший специалист",
        date: "20.06.24",
    },
    {
        id: 3,
        name: "Alice",
        star: 5,
        message: "Все топ",
        date: "05.07.24",
    },
    {
        id: 4,
        name: "Daniel",
        star: 5,
        message: "Лучший специалист",
        date: "02.08.24",
    },
]

export const navigations : Navigation[]  = [
    {
        id: 1,
        name: "Главная",
        link: "",
    },
    {
        id: 2,
        name: "Записаться на консультацию",
        link: "consultation",
    },
    {
        id: 3,
        name: "Отзывы",
        link: "reviews",
    },
]