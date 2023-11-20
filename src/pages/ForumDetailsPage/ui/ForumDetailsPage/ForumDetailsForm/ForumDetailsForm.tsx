import { FormEvent, memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import cls from './ForumDetailsForm.module.scss';

import { Card } from '@/shared/ui/redesigned/Card';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { addMessageForumDetailsService } from '@/entities/Forum';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData } from '@/entities/User';

interface ForumDetailsFormProps {
    loading: boolean;
}

export const ForumDetailsForm = memo((props: ForumDetailsFormProps) => {
    const { loading } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);
    const [text, setText] = useState('');

    const onChange = (v: string) => {
        setText(v);
    };

    const onSubmit = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            if (text === '') return;

            dispatch(
                addMessageForumDetailsService({
                    id: Date.now().toString(),
                    userId: authData?.id,
                    content: text,
                    createdAt: Date.now(),
                }),
            ).finally(() => {
                setText('');
            });
        },
        [authData?.id, dispatch, text],
    );

    if (loading) {
        return (
            <Card
                border="round"
                padding="24"
                max
                className={cls.ForumDetailsForm}
            >
                <HStack
                    max
                    gap="16"
                    justify="between"
                >
                    <Skeleton
                        height={30}
                        borderRadius="12px"
                    />
                    <Skeleton
                        borderRadius="12px"
                        width={150}
                        height={30}
                    />
                </HStack>
            </Card>
        );
    }

    return (
        <Card
            border="round"
            padding="24"
            className={cls.ForumDetailsForm}
        >
            <form onSubmit={onSubmit}>
                <HStack
                    max
                    gap="16"
                    justify="between"
                >
                    <Input
                        onChange={onChange}
                        value={text}
                        placeholder={t('Введіть повідомлення')}
                    />
                    <Button type="submit">{t('Відправити')}</Button>
                </HStack>
            </form>
        </Card>
    );
});
