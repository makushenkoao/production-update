import { useTranslation } from 'react-i18next';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import {useInteractive} from "@/shared/lib/hooks/useInteractive/useInteractive";
import {Recipe as IRecipe} from "@/entities/Interactive";

interface RecipeProps {
    recipes?: IRecipe[];
}

export const Recipe = (props: RecipeProps) => {
    const { recipes } = props;
    const { t } = useTranslation();
    const { currentIndex } = useInteractive(recipes);

    return (
        <VStack
            max
            gap="8"
        >
            <Text title={t('Рецепт дня')} />
            <Text
                text={t(`${recipes?.[currentIndex].title}`)}
                bold
            />
            <Text
                text={t('Інгредиенти')}
                bold
            />
            <ul>
                {recipes?.[currentIndex].ingredients.map((text) => (
                    <li>
                        <Text text={t(`${text}`)} />
                    </li>
                ))}
            </ul>
            <Text
                text={t('Інструкція')}
                bold
            />
            <ul>
                {recipes?.[currentIndex].instruction.map((text) => (
                    <li>
                        <Text text={t(`${text}`)} />
                    </li>
                ))}
            </ul>
        </VStack>
    );
};
