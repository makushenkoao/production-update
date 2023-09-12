interface AboutMe {
    title: string;
    info: {
        content: string;
        to?: string;
        toContent?: string;
    }[];
}

export const ABOUT_ME: AboutMe[] = [
    {
        title: 'Особиста інформація:',
        info: [
            {
                content: 'Країна - Україна',
            },
            {
                content: 'Місто - Черкаси',
            },
            {
                content: 'Електронна пошта - ',
                to: 'mailto:antonmak2046@gmail.com',
                toContent: 'antonmak2046@gmail.com',
            },
            {
                content: 'Телефон - ',
                to: 'tel:+380939338858',
                toContent: '+380939338858',
            },
            {
                content: 'Telegram - ',
                to: 'https://t.me/makushenkoao',
                toContent: 'makushenkoao',
            },
            {
                content: 'Linkedin - ',
                to: 'https://www.linkedin.com/in/anton-makushenko-53254a199/',
                toContent: 'my linkedin',
            },
            {
                content: 'Github - ',
                to: 'https://github.com/makushenkoao',
                toContent: 'makushenkoao',
            },
        ],
    },
    {
        title: 'Навички: ',
        info: [
            {
                content: 'html',
            },
            {
                content: 'css, scss',
            },
            {
                content: 'javascript',
            },
            {
                content: 'typescript',
            },
            {
                content: 'react.js',
            },
            {
                content: 'next.js',
            },
            {
                content: 'webpack',
            },
            {
                content: 'jest, storybook, loki',
            },
            {
                content: 'mui',
            },
            {
                content: 'node.js, express, mongodb',
            },
            {
                content: 'git, github, ci/cd',
            },
        ],
    },
    {
        title: 'Досвід (проекти):',
        info: [
            {
                content: 'Fronted Developer - Україна (4 місяці)',
            },
            {
                content: 'Fronted Developer - США (1 місяць)',
            },
        ],
    },
];
