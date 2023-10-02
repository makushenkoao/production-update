import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';

import { ArticleView } from '@/entities/Article';
import { VIEW_TYPES } from '../../model/consts';
import cls from './ArticleViewSelector.module.scss';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Tooltip } from '@/shared/ui/redesigned/Tooltip';

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

    return (
        <Card
            className={classNames(cls.ArticleViewSelectorRedesigned, {}, [
                className,
            ])}
            padding="1"
            border="round"
        >
            <HStack>
                {VIEW_TYPES.map((viewType, index) => (
                    <Tooltip title={viewType.title}>
                        <Icon
                            key={viewType.view}
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
