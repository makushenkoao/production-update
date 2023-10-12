import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useSearchUsersQuery } from '../../api/searchPageApi';

import { Page } from '@/widgets/Page';
import { Card } from '@/shared/ui/redesigned/Card';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { getRouteProfile } from '@/shared/const/router';
import { AppLink } from '@/shared/ui/redesigned/AppLink';

export const SearchPage = memo(() => {
    const { t } = useTranslation();
    const [search, setSearch] = useState<string>('');

    const onChange = useCallback((value: string) => {
        setSearch(value);
    }, []);

    const { data, isLoading, error } = useSearchUsersQuery(
        {
            q: search,
        },
        {
            skip: !search,
        },
    );

    return (
        <Page>
            <VStack
                gap="32"
                max
            >
                <Card
                    max
                    padding="24"
                    border="partial"
                >
                    <VStack
                        gap="16"
                        max
                    >
                        <Text title={t('Введіть користувача')} />
                        <Input
                            placeholder={t('Введіть користувача')}
                            value={search}
                            onChange={onChange}
                        />
                    </VStack>
                </Card>
                <HStack
                    gap="16"
                    max
                    wrap="wrap"
                >
                    {data?.map((data) => (
                        <AppLink
                            to={getRouteProfile(data.id)}
                            style={{
                                width: '250px',
                            }}
                            key={data.id}
                        >
                            <Card
                                border="partial"
                                padding="24"
                            >
                                <HStack gap="8">
                                    <Avatar
                                        src={data.avatar}
                                        width={30}
                                        height={30}
                                    />
                                    <Text text={data.username} />
                                </HStack>
                            </Card>
                        </AppLink>
                    ))}
                </HStack>
            </VStack>
        </Page>
    );
});

export default SearchPage;
