import { memo } from 'react';
import {useTranslation} from "react-i18next";

import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '@/shared/ui/redesigned/Icon';
import CircleIcon from '@/shared/assets/icons/circle-up.svg';
import {Tooltip} from "@/shared/ui/redesigned/Tooltip";

interface ScrollToTopButtonProps {
    className?: string;
}

export const ScrollToTopButton = memo((props: ScrollToTopButtonProps) => {
    const { className } = props;
    const {t} = useTranslation()

    const onCLick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Tooltip title={t('Нагору')} direction="bottom left">
            <Icon
                svg={CircleIcon}
                clickable
                onClick={onCLick}
                width={32}
                height={32}
                className={classNames('', {}, [className])}
            />
        </Tooltip>
    );
});
