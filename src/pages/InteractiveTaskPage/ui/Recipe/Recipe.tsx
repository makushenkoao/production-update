import {useTranslation} from "react-i18next";
import {VStack} from "@/shared/ui/redesigned/Stack";
import {Text} from "@/shared/ui/redesigned/Text";

export const Recipe = () => {
    const { t } = useTranslation();

    return (
        <VStack
            max
            gap="16"
        >
            <Text
                title={t('Рецепт дня')}
            />
            <Text title={t('Інгредиенти')} size="s" />
            <ul>
                <li>{t('1 стакан муки')}</li>
                <li>{t('1 стакан муки')}</li>
                <li>{t('1 стакан муки')}</li>
                <li>{t('1 стакан муки')}</li>
                <li>{t('1 стакан муки')}</li>
            </ul>
            <Text title={t('Інструкція')} size="s" />
            <li>{t('В глубокой миске смешайте муку, сахар и соль.')}</li>
            <li>{t('В глубокой миске смешайте муку, сахар и соль.')}</li>
            <li>{t('В глубокой миске смешайте муку, сахар и соль.')}</li>
            <li>{t('В глубокой миске смешайте муку, сахар и соль.')}</li>
            <li>{t('В глубокой миске смешайте муку, сахар и соль.')}</li>
            <li>{t('В глубокой миске смешайте муку, сахар и соль.')}</li>
        </VStack>
    );
};
