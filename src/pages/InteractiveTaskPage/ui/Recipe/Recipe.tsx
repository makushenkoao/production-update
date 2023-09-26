import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Recipe as IRecipe } from '../../model/types/interactive';

interface RecipeProps {
    recipes?: IRecipe[];
}

export const Recipe = (props: RecipeProps) => {
    const { recipes } = props;
    const { t } = useTranslation();
    const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);

    useEffect(() => {
        if (recipes && recipes.length > 0) {
            const interval = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * recipes.length);
                setCurrentRecipeIndex(randomIndex);
            }, 24 * 60 * 60 * 1000);

            return () => clearInterval(interval);
        }
    }, [recipes]);

    return (
        <VStack
            max
            gap="8"
        >
            <Text title={t('Рецепт дня')} />
            <Text
                text={t(`${recipes?.[currentRecipeIndex].title}`)}
                bold
            />
            <Text
                text={t('Інгредиенти')}
                bold
            />
            <ul>
                {recipes?.[currentRecipeIndex].ingredients.map((text) => (
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
                {recipes?.[currentRecipeIndex].instruction.map((text) => (
                    <li>
                        <Text text={t(`${text}`)} />
                    </li>
                ))}
            </ul>
        </VStack>
    );
};
