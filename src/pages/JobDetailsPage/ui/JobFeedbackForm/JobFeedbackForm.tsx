import React, { FormEvent, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { TextArea } from '@/shared/ui/redesigned/TextArea';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getJobDetailsData, Job, responseJobService } from '@/entities/Job';
import { getUserAuthData } from '@/entities/User';
import { Input } from '@/shared/ui/redesigned/Input';

interface JobFeedbackFormProps {
    loading?: boolean;
}

export const JobFeedbackForm = (props: JobFeedbackFormProps) => {
    const { loading } = props;
    const { t } = useTranslation();
    const job = useSelector(getJobDetailsData);
    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);
    const [text, setText] = useState('');
    const [link, setLink] = useState('');

    const onChangeText = useCallback((v: string) => {
        setText(v);
    }, []);

    const onChangeLink = useCallback((v: string) => {
        setLink(v);
    }, []);

    const onSubmit = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            dispatch(
                responseJobService({
                    ...(job || ({} as Job)),
                    responses: [
                        ...(job?.responses || []),
                        {
                            id: String(Date.now()),
                            userId: authData?.id || '',
                            description: text,
                            href: link,
                        },
                    ],
                }),
            );

            setLink('');
            setText('');
        },
        [authData?.id, dispatch, job, link, text],
    );

    if (loading) {
        return (
            <Card
                padding="24"
                border="round"
                max
            >
                <VStack
                    max
                    gap="16"
                >
                    <Skeleton
                        width={200}
                        height={30}
                    />
                    <Skeleton
                        height={80}
                        borderRadius="12px"
                    />
                    <Skeleton
                        width={150}
                        height={50}
                        borderRadius="12px"
                    />
                    <HStack
                        max
                        justify="end"
                    >
                        <Skeleton
                            width={150}
                            height={40}
                            borderRadius="12px"
                        />
                    </HStack>
                </VStack>
            </Card>
        );
    }

    return (
        <Card
            padding="24"
            border="round"
            max
        >
            <form onSubmit={onSubmit}>
                <VStack
                    max
                    gap="16"
                >
                    <Text title={t('Відгукнутися на вакансію')} />
                    <TextArea
                        placeholder={t(
                            'Розкажіть про себе та чому хочете потрапити на цю позицію.',
                        )}
                        label={t('Напишіть супровідний лист')}
                        onChange={onChangeText}
                        value={text}
                    />
                    <Input
                        placeholder={t('Введіть посилання на ваше резюме')}
                        label={t('Резюме')}
                        onChange={onChangeLink}
                        value={link}
                    />
                    <HStack
                        max
                        justify="end"
                    >
                        <Button type="submit">{t('Відгукнутися')}</Button>
                    </HStack>
                </VStack>
            </form>
        </Card>
    );
};
