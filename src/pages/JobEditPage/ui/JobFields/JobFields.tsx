import React, { FormEvent, memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import cls from './JobFields.module.scss';

import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Input } from '@/shared/ui/redesigned/Input';
import { TextArea } from '@/shared/ui/redesigned/TextArea';
import { SelectOption } from '@/shared/ui/deprecated/Select';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { Text } from '@/shared/ui/redesigned/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Job, FieldName, JobCategory } from '@/entities/Job';

interface JobFieldsProps {
    isEdit?: boolean;
    formData: Job;
    handleInputChange: (v: string, name: FieldName) => void;
    handleChangeCategory: (c: JobCategory) => void;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    loading?: boolean;
}

export const JobFields = memo((props: JobFieldsProps) => {
    const {
        isEdit,
        onSubmit,
        formData,
        handleChangeCategory,
        handleInputChange,
        loading,
    } = props;
    const { t } = useTranslation();

    const categoryOptions = useMemo<SelectOption<JobCategory>[]>(
        () => [
            {
                value: JobCategory.PYTHON,
                content: t('Python'),
            },
            {
                value: JobCategory.JAVASCRIPT,
                content: t('JavaScript'),
            },
            {
                value: JobCategory.TYPESCRIPT,
                content: t('TypeScript'),
            },
            {
                value: JobCategory.JAVA,
                content: t('Java'),
            },
            {
                value: JobCategory.HTML_CSS,
                content: t('HTML/CSS'),
            },
            {
                value: JobCategory.C,
                content: t('C'),
            },
            {
                value: JobCategory.C_PLUS_PLUS,
                content: t('C++'),
            },
            {
                value: JobCategory.C_SHARP,
                content: t('C#'),
            },
            {
                value: JobCategory.KOTLIN,
                content: t('KOTLIN'),
            },
            {
                value: JobCategory.SQL,
                content: t('SQL'),
            },
            {
                value: JobCategory.SWIFT,
                content: t('Swift'),
            },
            {
                value: JobCategory.QA,
                content: t('QA'),
            },
            {
                value: JobCategory.SA,
                content: t('SA'),
            },
            {
                value: JobCategory.GO,
                content: t('Go'),
            },
            {
                value: JobCategory.RUBY,
                content: t('Ruby'),
            },
            {
                value: JobCategory.PHP,
                content: t('PHP'),
            },
            {
                value: JobCategory.RUST,
                content: t('Rust'),
            },
        ],
        [t],
    );

    return (
        <form
            className={cls.form}
            onSubmit={onSubmit}
        >
            <VStack
                max
                gap="32"
            >
                <VStack
                    max
                    gap="16"
                >
                    <Text title={t('Про вашого кандидата')} />
                    <Input
                        placeholder={t('Введіть назву вакансії')}
                        label={t('Назва вакансії')}
                        value={formData.title}
                        onChange={(v) => handleInputChange(v, 'title')}
                        disabled={loading}
                    />
                    <Input
                        placeholder={t(
                            'Введіть зарплатню. Наприклад: 30 000 - 40 000 грн',
                        )}
                        label={t('Заробітна плата')}
                        value={formData.salary}
                        onChange={(v) => handleInputChange(v, 'salary')}
                        disabled={loading}
                    />
                    <Input
                        placeholder={t(
                            'Введіть тип роботи. Наприклад: Віддалено, або Повна зайнятість',
                        )}
                        label={t('Тип роботи')}
                        value={formData.type}
                        onChange={(v) => handleInputChange(v, 'type')}
                        disabled={loading}
                    />
                    <Input
                        label={t('Досвід')}
                        placeholder={t('Введіть досвід, який ви очікуєте')}
                        value={formData.experience}
                        onChange={(v) => handleInputChange(v, 'experience')}
                        disabled={loading}
                    />
                    <TextArea
                        label={t('Опис вакансії')}
                        placeholder={t('Опишіть цю вакансію')}
                        value={formData.description}
                        onChange={(v) => handleInputChange(v, 'description')}
                        disabled={loading}
                    />
                    <TextArea
                        label={t("Обов'язки")}
                        placeholder={t("Опишіть обов'язки")}
                        value={formData.responsibilities}
                        onChange={(v) =>
                            handleInputChange(v, 'responsibilities')
                        }
                        disabled={loading}
                    />
                    <TextArea
                        label={t('Скіли')}
                        placeholder={t('Опишіть скіли')}
                        value={formData.requirements}
                        onChange={(v) => handleInputChange(v, 'requirements')}
                        disabled={loading}
                    />
                    <VStack gap="4">
                        <ListBox
                            label={t('Виберіть категорії вакансії')}
                            items={categoryOptions}
                            direction="top right"
                            value={
                                formData.category[formData.category.length - 1]
                            }
                            onChange={handleChangeCategory}
                            readonly={loading}
                        />
                        <Text
                            text={t('Вибрані категорії:')}
                            bold
                        />
                        <Text text={formData.category.join(', ')} />
                    </VStack>
                </VStack>
                <VStack
                    max
                    gap="16"
                >
                    <Text title={t('Про вас')} />
                    <Input
                        label={t('Назва компанії')}
                        placeholder={t('Введіть назву компанії')}
                        value={formData.company}
                        onChange={(v) => handleInputChange(v, 'company')}
                        disabled={loading}
                    />
                    <TextArea
                        label={t('Про вас')}
                        placeholder={t('Розкажіть про вашу компанію')}
                        value={formData.aboutCompany}
                        onChange={(v) => handleInputChange(v, 'aboutCompany')}
                        disabled={loading}
                    />
                    <Input
                        placeholder={t('Введіть країну')}
                        label={t('Країна')}
                        value={formData.country}
                        onChange={(v) => handleInputChange(v, 'country')}
                        disabled={loading}
                    />
                    <Input
                        placeholder={t('Введіть місто')}
                        label={t('Місто')}
                        value={formData.city}
                        onChange={(v) => handleInputChange(v, 'city')}
                        disabled={loading}
                    />
                    <Input
                        placeholder={t('Введіть адресу')}
                        label={t('Адреса')}
                        value={formData.address}
                        onChange={(v) => handleInputChange(v, 'address')}
                        disabled={loading}
                    />
                    <Input
                        label={t('Пошта')}
                        placeholder={t('Введіть пошту')}
                        value={formData.email}
                        onChange={(v) => handleInputChange(v, 'email')}
                        disabled={loading}
                    />
                    <Input
                        label={t('Номер телефону')}
                        placeholder={t('Введіть номер телефону')}
                        value={formData.phone}
                        onChange={(v) => handleInputChange(v, 'phone')}
                        disabled={loading}
                    />
                    <Input
                        label={t('Сайт')}
                        placeholder={t('Введіть посилання на сайт')}
                        value={formData.website}
                        onChange={(v) => handleInputChange(v, 'website')}
                        disabled={loading}
                    />
                </VStack>
                <HStack
                    max
                    justify="end"
                >
                    <Button
                        type="submit"
                        disabled={loading}
                    >
                        {isEdit ? t('Зберегти') : t('Створити')}
                    </Button>
                </HStack>
            </VStack>
        </form>
    );
});
