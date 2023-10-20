import React from 'react';

import { HStack } from '../Stack';
import { Avatar } from '../Avatar';
import { Text } from '../Text';
import { Skeleton } from '../Skeleton';

interface AvatarWithUsernameProps {
    src?: string;
    username?: string;
    size?: number;
    loading?: boolean;
    onClick?: () => void;
    className?: string;
}

export const AvatarWithUsername = (props: AvatarWithUsernameProps) => {
    const { src, username, size = 100, loading, onClick, className } = props;

    if (loading) {
        return (
            <HStack
                gap="8"
                className={className}
                max
            >
                <Skeleton
                    borderRadius="50%"
                    width={size}
                    height={size}
                />
                <Skeleton
                    width={100}
                    height={25}
                />
            </HStack>
        );
    }

    const handleClick = () => {
        onClick?.();
    };

    return (
        <HStack
            gap="8"
            max
            onClick={handleClick}
            className={className}
        >
            <Avatar
                src={src}
                width={size}
                height={size}
            />
            <Text text={username} />
        </HStack>
    );
};
