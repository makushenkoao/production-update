import React, { memo } from 'react';

import cls from './AppLogo.module.scss';
import { HStack } from '../Stack';

import AppSvg from '@/shared/assets/icons/weblogo.svg';
import { classNames } from '@/shared/lib/classNames/classNames';

interface AppLogoProps {
    className?: string;
    width?: string | number;
    height?: string | number;
}

export const AppLogo = memo(
    ({ className, width = 50, height = 50 }: AppLogoProps) => {
        return (
            <HStack
                max
                justify="center"
                className={classNames(cls.appLogoWrapper, {}, [className])}
            >
                <AppSvg
                    width={width}
                    height={height}
                    className={cls.appLogo}
                />
                <div className={cls.gradientBig} />
                <div className={cls.gradientSmall} />
            </HStack>
        );
    },
);
