import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import cls from './ArticleViewSelector.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleView } from '@/entities/Article';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Tooltip } from '@/shared/ui/redesigned/Tooltip';
import TiledIcon from '@/shared/assets/icons/tile.svg';
import ListIcon from '@/shared/assets/icons/burger.svg';

interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleView;
    onViewClick?: (view: ArticleView) => void;
}

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
    const { className, onViewClick, view } = props;
    const { t } = useTranslation();

    const onClick = (newView: ArticleView) => () => {
        onViewClick?.(newView);
    };

    const viewTypes = useMemo(
        () => [
            {
                view: ArticleView.SMALL,
                icon: TiledIcon,
                title: t('Відображати коротку інформацію статті'),
            },
            {
                view: ArticleView.BIG,
                icon: ListIcon,
                title: t('Відображати довгу інформацію статті'),
            },
        ],
        [t],
    );

    return (
        <Card
            className={classNames(cls.ArticleViewSelectorRedesigned, {}, [
                className,
            ])}
            padding="1"
            border="round"
        >
            <HStack>
                {viewTypes.map((viewType, index) => (
                    <Tooltip
                        title={viewType.title}
                        key={viewType.view}
                    >
                        <Icon
                            svg={viewType.icon}
                            className={classNames('', {
                                [cls.selectedRedesigned]:
                                    viewType.view === view,
                                [cls.left]: index === 0,
                                [cls.right]: index === 1,
                            })}
                            clickable
                            onClick={onClick(viewType.view)}
                        />
                    </Tooltip>
                ))}
            </HStack>
        </Card>
    );
});
