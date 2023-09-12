import React from 'react';
import { HStack } from '../Stack';
import { Avatar } from '../Avatar';
import { Text } from '../Text';

interface AvatarWithUsernameProps {
    src?: string;
    username?: string;
    size?: number;
}

export const AvatarWithUsername = (props: AvatarWithUsernameProps) => {
    const { src, username, size = 100 } = props;
    return (
        <HStack
            gap="8"
            max
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
