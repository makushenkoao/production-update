import type { Meta, StoryObj } from '@storybook/react';

import userPng from '../../../../../assets/tests/storybook.png';
import { Avatar } from '../../../Avatar/Avatar';
import { Dropdown } from './Dropdown';

const meta: Meta<typeof Dropdown> = {
    title: 'shared/ui/deprecated/Popups/Dropdown',
    component: Dropdown,
    args: {
        items: [
            {
                content: 'first',
            },
            {
                content: 'second',
            },
            {
                content: 'third',
            },
        ],
        trigger: (
            <Avatar
                src={userPng}
                height={30}
                width={30}
                rounded
                alt="User"
            />
        ),
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DropdownTopRight: Story = {
    args: {
        direction: 'top right',
    },
};

export const DropdownTopLeft: Story = {
    args: {
        direction: 'top left',
    },
};

export const DropdownBottomRight: Story = {
    args: {
        direction: 'bottom right',
    },
};

export const DropdownBottomLeft: Story = {
    args: {
        direction: 'bottom left',
    },
};
