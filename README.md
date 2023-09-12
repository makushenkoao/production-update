# MAO - Platform for Knowledge Sharing and Articles

MAO is a web application designed for creating, sharing, and discussing knowledge and articles. The platform enables users to discover interesting articles, create their own publications, engage in discussions, and interact with other participants.

## Key Features

- **Article Browsing:** Explore diverse topics, read articles covering a wide range of knowledge domains.
- **Article Creation:** Registered users can create their own articles using an intuitive editor.
- **Engage in Discussions:** Each article comes with a comment section, allowing you to express your thoughts and join discussions.
- **Private Messaging:** Communicate with other users via private messages for more personalized conversations.
- **Search and Filtering:** Find relevant articles using a convenient search tool.
- **User Profiles:** Each user has a profile displaying their activity information.

## Contact Us

If you have any questions, suggestions, or inquiries, please don't hesitate to contact our team at [antonmak2046@gmail.com](mailto:antonmak2046@gmail.com). We value your feedback and are excited to hear from you!

---

## Start project

```
yarn install - install dependencies
yarn run start:dev или npm run start:dev:vite - launch server + frontend project in dev mode
```

----

## Scripts

- `yarn start` - Start the frontend project on the webpack dev server
- `yarn start:vite` - Start the frontend project on vite
- `yarn start:dev` - Start frontend project on webpack dev server + backend
- `yarn start:dev:vite` - Start the frontend project on vite + backend
- `yarn start:dev:server` - Start the backend server
- `yarn build:prod` - Build in prod mode
- `yarn build:dev` - Build in dev mode (not minified)
- `yarn lint:ts` - Check ts files with linter
- `yarn lint:ts:fix` - Fix ts files with linter
- `yarn lint:scss` - Check scss style files with linter
- `yarn lint:scss:fix` - Fix scss style files with linter
- `yarn test:unit` - Run unit tests from jest
- `yarn test:ui` - Hack screenshot tests from loki
- `yarn test:ui:ok` - Confirm new screenshots
- `yarn test:ui:ci` - Run screenshot tests in CI
- `yarn test:ui:report` - Generate full report for screenshot tests
- `yarn test:ui:json` - Generate json report for screenshot tests
- `yarn test:ui:html` - Generate HTML report for screenshot tests
- `yarn sb` - start Storybook
- `yarn sb:build` - Build storybook build
- `yarn prepare` - precommit hooks
- `yarn generate:slice` - Script to generate FSD slices

----

## Project architecture

The project was written in accordance with the Feature sliced design methodology

Documentation link - [feature sliced design](https://feature-sliced.design/docs/get-started/tutorial)

----

## Working with translations

The project uses the i18next library to work with translations.
Translation files are stored in public/locales.

For comfortable work, we recommend installing the plugin for webstorm/vscode

i18next documentation - [https://react.i18next.com/](https://react.i18next.com/)

----

## Tests

The project uses 4 types of tests:
1) Usual jest unit tests - `npm run test:unit`
2) Tests for components with React testing library -`npm run test:unit`
3) Screenshot testing with loki `npm run test:ui`
4) e2e testing with Cypress `npm run test:e2e`

More about tests - [testing documentation](/docs/tests.md)

----

## Linting

The project uses eslint to check typescript code and stylelint to check files with styles.

Also for strict control of the main architectural principles
own eslint plugin *eslint-plugin-ulbi-tv-plugin* is used,
which contains 3 rules
1) path-checker - prohibits the use of absolute imports within one module
2) layer-imports - checks the correct use of layers in terms of FSD
   (e.g. widgets cannot be used in features and entities)
3) public-api-imports - allows import from other modules only from public api. Has auto fix

##### Run linters
- `npm run lint:ts` - Check ts files with linter
- `npm run lint:ts:fix` - Fix ts files with linter
- `npm run lint:scss` - Check scss style files with linter
- `npm run lint:scss:fix` - Fix scss style files with linter

----
##Storybook

The project describes story cases for each component.
Server requests are mocked using storybook-addon-mock.

A file with stories is created next to the component with the extension .stories.tsx

You can start the storybook with the command:
- `npm run storybook`

More about [Storybook](/docs/storybook.md)

Example:

```typescript jsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonSize, ButtonTheme } from './Button';

const meta: Meta<typeof Button> = {
    title: 'shared/Button',
    component: Button,
    args: {
        children: 'Button',
    }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
    },
};

export const Clear: Story = {
    args: {
        theme: ButtonTheme.CLEAR,
    },
};
```

----

## Project configuration

For development, the project contains 2 configs:
1. Webpack - ./config/build
2. vite - vite.config.ts

Both collectors are adapted to the main features of the application.

All configuration is stored in /config
- /config/babel-babel
- /config/build - webpack configuration
- /config/jest - test environment configuration
- /config/storybook - storybook configuration

The `scripts` folder contains various scripts for refactoring\simplification of writing code\report generation, etc.

----

### Working with feature-flags

Allow feature flags only with toggleFeatures helper

an object with options is passed to it

{
name: feature flag name,
on: a function that will work after enabling the feature
of: function that will work after the feature is turned off
}

To automatically remove a feature, use the remove-feature.ts script,
which takes 2 arguments
1. The name of the feature flag to be removed
2. Status (on\off)

----

## CI pipeline and pre-commit hooks

The github action config is in /.github/workflows.
All types of tests, assembly of the project and storybook, linting are carried out in it.

In precommit hooks, we check the project with linters, the config is in /.husky

----

### Working with data

Interaction with data was carried out using the Redux toolkit.
Whenever possible, reusable entities should be normalized using the EntityAdapter

Server requests are sent using [RTK query](/src/shared/api/rtkApi.ts)

For asynchronous connection of reducers (so as not to pull them into a common bundle), use
[DynamicModuleLoader](/src/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader.tsx)

----

## Entities

- [Article](/src/entities/Article)
- [Comment](/src/entities/Comment)
- [Country](/src/entities/Country)
- [Currency](/src/entities/Currency)
- [Notification](/src/entities/Notification)
- [Profile](/src/entities/Profile)
- [Rating](/src/entities/Rating)
- [User](/src/entities/User)

## Features

- [addCommentForm](/src/features/addCommentForm)
- [articlePageGreeting](/src/features/articlePageGreeting)
- [articleRating](/src/features/articleRating)
- [articleRecommendationsList](/src/features/articleRecommendationsList)
- [articleSortSelector](/src/features/articleSortSelector)
- [articleTypeTabs](/src/features/articleTypeTabs)
- [articleViewSelector](/src/features/articleViewSelector)
- [AuthByUsername](/src/features/AuthByUsername)
- [avatarDropdown](/src/features/avatarDropdown)
- [editableProfileCard](/src/features/editableProfileCard)
- [LangSwitcher](/src/features/LangSwitcher)
- [notificationButton](/src/features/notificationButton)
- [profileRating](/src/features/profileRating)
- [scrollToTopButton](/src/features/scrollToTopButton)
- [ThemeSwitcher](/src/features/ThemeSwitcher)
- [UI](/src/features/UI)
- [uiDesignSwitcher](/src/features/uiDesignSwitcher)
