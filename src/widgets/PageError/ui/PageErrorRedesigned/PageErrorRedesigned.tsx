import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/redesigned/Button';
import { Text } from '@/shared/ui/redesigned/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';

interface PageErrorProps {
    className?: string;
}

export const PageErrorRedesigned = ({ className }: PageErrorProps) => {
    const { t } = useTranslation();

    const reloadPage = () => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    };

    return (
        <VStack
            max
            justify="center"
            align="center"
            gap="16"
            className={classNames('app_redesigned', {}, [className])}
        >
            <Text title={t('Сталася непередбачена помилка')} />
            <Button
                variant="outline"
                onClick={reloadPage}
            >
                {t('Оновити сторіку')}
            </Button>
        </VStack>
    );
};
