import { ArticleView } from '@/entities/Article';
import TiledIcon from '@/shared/assets/icons/tile.svg';
import ListIcon from '@/shared/assets/icons/burger.svg';

export const VIEW_TYPES = [
    {
        view: ArticleView.SMALL,
        icon: TiledIcon,
        title: 'Відображати коротку інформацію статті'
    },
    {
        view: ArticleView.BIG,
        icon: ListIcon,
        title: 'Відображати довгу інформацію статті'
    },
];
