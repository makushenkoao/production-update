import { memo } from 'react';
import { useParams } from 'react-router-dom';

import { ArticleDetails } from '@/entities/Article';
import { Card } from '@/shared/ui/redesigned/Card';

export const DetailsContainer = memo(
    ({ className }: { className?: string }) => {
        const { id } = useParams<{ id: string }>();

        return (
            <Card
                max
                border="round"
                className={className}
                padding="24"
            >
                <ArticleDetails id={id} />
            </Card>
        );
    },
);
