import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '../Icon';
import StarIcon from '../../../assets/icons/star.svg';
import cls from './StarRating.module.scss';

interface StarRatingProps {
    className?: string;
    onSelect?: (startCount: number) => void;
    size?: number;
    selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = memo((props: StarRatingProps) => {
    const { className, selectedStars = 0, size = 30, onSelect } = props;
    const [currentStarsCount, setCurrentStarsCount] =
        useState<number>(selectedStars);
    const [isSelected, setIsSelected] = useState<boolean>(
        Boolean(selectedStars),
    );

    const onHover = (startCount: number) => () => {
        if (!isSelected) {
            setCurrentStarsCount(startCount);
        }
    };

    const onLeave = () => {
        if (!isSelected) {
            setCurrentStarsCount(0);
        }
    };

    const onClick = (starsCount: number) => () => {
        if (!isSelected) {
            onSelect?.(starsCount);
            setCurrentStarsCount(starsCount);
            setIsSelected(true);
        }
    };

    return (
        <div className={classNames(cls.StarRatingRedesigned, {}, [className])}>
            {stars.map((starNumber, index) => {
                const commonProps = {
                    className: classNames(
                        cls.starIcon,
                        { [cls.selected]: isSelected },
                        [
                            currentStarsCount >= starNumber
                                ? cls.hovered
                                : cls.normal,
                        ],
                    ),
                    svg: StarIcon,
                    width: size,
                    height: size,
                    onMouseLeave: onLeave,
                    onMouseEnter: onHover(starNumber),
                    onClick: onClick(starNumber),
                    'data-testid': `StarRating.${starNumber}`,
                    'data-selected': currentStarsCount >= starNumber,
                    key: index,
                };

                return (
                    <Icon
                        clickable={!isSelected}
                        {...commonProps}
                    />
                );
            })}
        </div>
    );
});
