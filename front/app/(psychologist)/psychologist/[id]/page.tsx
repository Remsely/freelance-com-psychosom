import {PsychologistProfile} from "@/shared/componetns";
import {notFound} from "next/navigation";
import type {Metadata} from "next";

const psychologistsProfilesMock = [
    {
        id: 1,
        firstName: "Анастасия",
        lastName: "Иванова",
        article: [
            {
                type: "paragraph",
                content:
                    "Добро пожаловать! Меня зовут Анастасия Иванова, и я специализируюсь на психосоматике — области, которая помогает понять, как наши мысли и эмоции влияют на тело. Мой подход основан на многолетнем опыте работы и личных исследованиях, которые я провожу, чтобы найти индивидуальное решение для каждого клиента."
            },
            {
                type: "tip",
                content:
                    "Если вас беспокоят хронические симптомы, которые сложно объяснить медицинскими причинами, психосоматика может стать ключом к разгадке."
            },
            {
                type: "paragraph",
                content:
                    "На протяжении своей практики я помогла 20 клиентам в течение 2-х лет избавиться от внутренних блоков, восстановить баланс и обрести гармонию. Имею диплом высшего образования Института Психосоматики."
            }
        ],
        profileImage: "/specialist.jpg",
        educationFiles: ["/certificate.jpg", "/certificate.jpg"]
    },
    {
        id: 2,
        firstName: "Александр",
        lastName: "Петров",
        article: [
            {
                type: "paragraph",
                content:
                    "Здравствуйте! Я Александр Петров — специалист по когнитивно-поведенческой терапии. Помогаю клиентам выявлять и трансформировать неэффективные модели мышления, влияющие на эмоциональное состояние."
            },
            {
                type: "tip",
                content:
                    "Если часто сталкиваетесь с негативным внутренним диалогом, КПТ может помочь изменить его на более конструктивный."
            },
            {
                type: "paragraph",
                content:
                    "За 4 года практики я сопровождал более 60 клиентов, помогая им справиться с тревожностью, депрессивными состояниями и прокрастинацией. Выпускник факультета психологии МГУ."
            }
        ],
        profileImage: "/specialist.jpg",
        educationFiles: ["/certificate.jpg", "/certificate.jpg"]
    },
    {
        id: 3,
        firstName: "Елена",
        lastName: "Соколова",
        article: [
            {
                type: "paragraph",
                content:
                    "Приветствую вас! Меня зовут Елена Соколова, моя специализация — семейная терапия. Работаю над восстановлением гармонии в отношениях между партнёрами, родителями и детьми."
            },
            {
                type: "tip",
                content:
                    "Если в семье накапливаются конфликты и непонимание, семейные сессии могут дать новый взгляд и инструменты для общения."
            },
            {
                type: "paragraph",
                content:
                    "С 2018 года провела более 300 совместных и индивидуальных консультаций, помогая семьям укреплять эмоциональные связи. Имею диплом Санкт-Петербургского института семейной психотерапии."
            }
        ],
        profileImage: "/specialist.jpg",
        educationFiles: ["/certificate.jpg", "/certificate.jpg"]
    },
    {
        id: 4,
        firstName: "Дмитрий",
        lastName: "Орлов",
        article: [
            {
                type: "paragraph",
                content:
                    "Здравствуйте! Я Дмитрий Орлов, практикую гештальт-подход и помогаю клиентам осознавать свои потребности, чувства и жизненные сценарии."
            },
            {
                type: "tip",
                content:
                    "Гештальт-терапия полезна тем, кто хочет научиться проживать эмоции здесь и сейчас, а не подавлять их."
            },
            {
                type: "paragraph",
                content:
                    "Опыт работы — 5 лет, более 150 часов личной терапии и постоянного супервизорства. Окончил Московский институт гештальт-терапии и консультирования."
            }
        ],
        profileImage: "/specialist.jpg",
        educationFiles: ["/certificate.jpg", "/certificate.jpg"]
    },
    {
        id: 5,
        firstName: "Мария",
        lastName: "Кузнецова",
        article: [
            {
                type: "paragraph",
                content:
                    "Здравствуйте! Меня зовут Мария Кузнецова, я специализируюсь на работе с профессиональным выгоранием и стрессом. Помогаю восстанавливать ресурсное состояние и баланс между работой и жизнью."
            },
            {
                type: "tip",
                content:
                    "Если чувствуете постоянную усталость и потерю мотивации, работа со стресс-менеджментом может вернуть энергичность и радость."
            },
            {
                type: "paragraph",
                content:
                    "За три года практики провела свыше 200 часов групповых тренингов и индивидуальных сессий. Выпускница НИУ ВШЭ, направление «Организационная психология»."
            }
        ],
        profileImage: "/specialist.jpg",
        educationFiles: ["/certificate.jpg", "/certificate.jpg"]
    }
];

export async function generateMetadata({params}: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const {id} = await params;
    const idNumber = Number(id);
    const specialist = psychologistsProfilesMock.find(p => p.id === idNumber);

    if (!specialist) {
        return {title: 'Специалист не найден'};
    }

    return {
        title: `Психосоматика | ${specialist.firstName} ${specialist.lastName}`,
        description: `Профиль психолога ${specialist.firstName} ${specialist.lastName}.`,
    };
}

export default async function PsychologistsPage({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    const idNumber = Number(id);

    const specialist = psychologistsProfilesMock.find((p) => p.id === idNumber);

    if (!specialist) return notFound();

    return (
        <div className="container">
            <PsychologistProfile psychologistId={Number(id)} specialist={specialist}/>
        </div>
    );
}