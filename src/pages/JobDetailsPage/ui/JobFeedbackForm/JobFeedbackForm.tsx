import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { TextArea } from '@/shared/ui/redesigned/TextArea';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import cls from '../JobDetailsPage.module.scss';

export const JobFeedbackForm = () => {
    const { t } = useTranslation();
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

    const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Submit vacancy: ', text, selectedFile);
    }, [selectedFile, text]);

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
                        accept=".jpg, .jpeg, .pdf"
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
