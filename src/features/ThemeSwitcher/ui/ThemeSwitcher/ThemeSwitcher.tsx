import { memo, useCallback } from 'react';
import { Icon } from '@/shared/ui/redesigned/Icon/Icon';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { saveJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import ThemeIcon from '@/shared/assets/icons/theme-re.svg';
import { classNames } from '@/shared/lib/classNames/classNames';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo((props: ThemeSwitcherProps) => {
    const { className } = props;
    const { theme, toggleTheme } = useTheme();
    const dispatch = useAppDispatch();

    const onToggleHandler = useCallback(() => {
        toggleTheme((newTheme) => {
            dispatch(saveJsonSettings({ theme: newTheme }));
        });
    }, [dispatch, toggleTheme]);

    return (
        <Icon
            className={classNames('', {}, [className])}
            onClick={onToggleHandler}
            clickable
            svg={ThemeIcon}
        />
    );
});
