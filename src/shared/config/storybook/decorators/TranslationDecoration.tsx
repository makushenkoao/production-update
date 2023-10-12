import { Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Story } from '@storybook/react';

import i18n from '../../i18n/i18n';

export const TranslationDecoration = (StoryComponent: Story) => (
    <Suspense>
        <I18nextProvider i18n={i18n}>
            <StoryComponent />
        </I18nextProvider>
    </Suspense>
);
