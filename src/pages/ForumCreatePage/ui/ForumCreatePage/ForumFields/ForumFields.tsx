import { useTranslation } from 'react-i18next';
import { FormEvent } from 'react';

import { ForumField } from '../ForumCreatePage';

import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Input } from '@/shared/ui/redesigned/Input';
import { Forum, ForumCategory } from '@/entities/Forum';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { Button } from '@/shared/ui/redesigned/Button';

const items = [
    {
        content: ForumCategory.IT,
        value: ForumCategory.IT,
    },
    {
        content: ForumCategory.SCIENCE,
        value: ForumCategory.SCIENCE,
    },
];

interface ForumFieldsProps {
    formData?: Forum;
    onChange: (v: string | ForumCategory, name: ForumField) => void;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    isEdit?: boolean;
    loading?: boolean;
}

export const ForumFields = (props: ForumFieldsProps) => {
    const { formData, onChange, isEdit = false, onSubmit, loading } = props;
    const { t } = useTranslation();

    return (
        <form onSubmit={onSubmit}>
            <VStack
                max
                gap="16"
            >
                <Input
                    label={t('Назва')}
                    placeholder={t('Введіть назву форуму')}
                    value={formData?.title}
                    onChange={(v) => onChange(v, 'title')}
                    disabled={loading}
                />
                <Input
                    label={t('Опис')}
                    placeholder={t('Введіть опис форуму')}
                    value={formData?.description}
                    onChange={(v) => onChange(v, 'description')}
                    disabled={loading}
                />
                <ListBox
                    items={items}
                    value={formData?.category}
                    onChange={(v) => onChange(v, 'category')}
                />
                <HStack
                    max
                    justify="end"
                >
                    <Button
                        type="submit"
                        disabled={loading}
                    >
                        {t(isEdit ? 'Зберегти' : 'Відправити')}
                    </Button>
                </HStack>
            </VStack>
        </form>
    );
};
