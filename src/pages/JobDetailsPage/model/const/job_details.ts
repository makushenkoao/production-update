import { Job } from '@/entities/Job';
import { JobCategory } from '@/shared/const/job';

export const JOB_MOCK_DATA: Job = {
    id: '1',
    user: {
        id: '1',
        username: 'Admin',
        // eslint-disable-next-line max-len
        avatar: 'https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-blue-tie-and-beard-face-png-image_5809515.png',
    },
    description:
        // eslint-disable-next-line max-len
        "Шукаю собі помічника на проект React. Проекти є різні, legacy та з нуля. Хорошим плюсом були б знання git. Критично бути на зв'язку та в цілому відповідальність та бажання вчитись, робити по схожому принципу як в готовому коді. Допоможу з моментами, головне бажання. Початок роботи о 10-11 год, бо клієнт десь так подає запити.",
    salary: '400$',
    category: [JobCategory.JAVASCRIPT, JobCategory.HTML_CSS],
    experience: 'Без досвіду',
    type: 'Тільки віддалено',
    location: 'Україна, Київ',
    views: 300,
    createdAt: Date.now(),
    email: 'example@example.com',
    phone: '380938447563',
    website: 'https://lively-croissant-fa859b.netlify.app/',
    title: 'Junior Frontend Developer',
    company: 'Apple',
    aboutCompany:
        // eslint-disable-next-line max-len
        'Apple, as a company, was born in April 2017, when we started working with our first Partner, PTS Travel (based in Brooklyn, New York). Our engineers are talented and skilled people who share our principles and provide high-quality service. We are focused on long-term cooperation. We are a business-oriented outsourcing software development company committed to helping businesses kickstart, develop, and succeed. Also we are competence in working with modern platforms and frameworks is recognized and highly valued within the U.S. and European markets.',
    requirements: 'HTML, CSS, Javascript, Typescript, React, Jest',
    responsibilities:
        'Розробка функціоналу. Створення інтерфейсу. Написання тестів',
    responses: [],
};
