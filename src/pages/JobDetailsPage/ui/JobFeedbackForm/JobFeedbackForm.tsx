import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { TextArea } from '@/shared/ui/redesigned/TextArea';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import cls from '../JobDetailsPage.module.scss';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getJobDetailsData, Job, responseJobService } from '@/entities/Job';
import { getUserAuthData } from '@/entities/User';

interface JobFeedbackFormProps {
    loading?: boolean;
}

export const JobFeedbackForm = (props: JobFeedbackFormProps) => {
    const { loading } = props;
    const { t } = useTranslation();
    const job = useSelector(getJobDetailsData);
    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);
    const [selectedFile, setSelectedFile] = useState<File | null | undefined>(
        null,
    );
    const [text, setText] = useState('');

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setSelectedFile(file);
    };

    const onChange = useCallback((v: string) => {
        setText(v);
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
                            // file: selectedFile || undefined,
                        },
                    ],
                }),
            );

            setSelectedFile(null);
            setText('');
        },
        [authData?.id, dispatch, job, text],
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
                        onChange={onChange}
                        value={text}
                    />
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className={cls.fileInput}
                        id="customFileInput"
                    />
                    <label
                        htmlFor="customFileInput"
                        className={cls.customFileInput}
                    >
                        {selectedFile?.name
                            ? selectedFile.name
                            : t('Вибрати файл')}
                    </label>
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
