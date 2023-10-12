import type { Preview } from '@storybook/react';

import {
    RouterDecorator,
    StyleDecorator,
    SuspenseDecorator,
    ThemeDecorator,
} from '../../src/shared/config/storybook';
import 'app/styles/index.scss';
import { Theme } from '../../src/shared/const/theme';
import { FeaturesFlagsDecorator } from '../../src/shared/config/storybook/decorators/FeaturesFlagsDecorator';

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
    themes: {
        default: 'light',
        list: [
            {
                name: 'light',
                class: Theme.LIGHT,
                color: '#c2c1c1',
            },
            {
                name: 'dark',
                class: Theme.DARK,
                color: '#1e1e1e',
            },
            {
                name: 'orange',
                class: Theme.ORANGE,
                color: '#f5f5f5',
            },
        ],
    },
    decorators: [
        // @ts-ignore
        StyleDecorator,
        ThemeDecorator(Theme.LIGHT),
        RouterDecorator,
        SuspenseDecorator,
        FeaturesFlagsDecorator({}),
    ],
};

export default preview;
