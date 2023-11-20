import { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { SidebarItem } from '../SidebarItem/SidebarItem';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import cls from './Sidebar.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { LangSwitcher } from '@/features/LangSwitcher';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { AppLogo } from '@/shared/ui/redesigned/AppLogo';
import { Icon } from '@/shared/ui/redesigned/Icon';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Tooltip } from '@/shared/ui/redesigned/Tooltip';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const { t } = useTranslation();
    const sidebarItemsList = useSelector(getSidebarItems);
    const onToggle = (): void => setCollapsed((prevState) => !prevState);

    const itemsList = useMemo(
        () =>
            sidebarItemsList.map((item) => (
                <SidebarItem
                    key={item.path}
                    item={item}
                    collapsed={collapsed}
                />
            )),
        [collapsed, sidebarItemsList],
    );

    const switchers = (
        <>
            <ThemeSwitcher />
            <LangSwitcher short={collapsed} />
        </>
    );

    return (
        <aside
            data-testid="sidebar"
            className={classNames(
                cls.SidebarRedesigned,
                { [cls.collapsedRedesigned]: collapsed },
                [className],
            )}
        >
            <AppLink to="/">
                <Tooltip
                    title={t('Головна сторінка')}
                    direction="bottom left"
                >
                    <AppLogo
                        className={cls.appLogo}
                        width={collapsed ? 30 : 50}
                        height={collapsed ? 30 : 50}
                    />
                </Tooltip>
            </AppLink>
            <VStack
                role="navigation"
                align={collapsed ? 'center' : 'start'}
                gap="4"
                className={cls.items}
            >
                {itemsList}
            </VStack>
            <Icon
                data-testid="sidebar-toggle"
                clickable
                onClick={onToggle}
                className={cls.collapseBtn}
                svg={ArrowIcon}
            />
            {collapsed ? (
                <VStack
                    align="center"
                    className={cls.switchers}
                    gap="4"
                >
                    {switchers}
                </VStack>
            ) : (
                <HStack
                    className={cls.switchers}
                    justify="center"
                    gap="8"
                >
                    {switchers}
                </HStack>
            )}
        </aside>
    );
});
