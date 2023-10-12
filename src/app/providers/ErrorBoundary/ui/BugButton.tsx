import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/ui/deprecated/Button';

// component for testing error boundary
export const BugButton = () => {
    const [error, setError] = useState<boolean>(false);
    const { t } = useTranslation();

    const throwError = () => {
        setError(true);
    };

    useEffect(() => {
        if (error) throw new Error();
    }, [error]);

    return (
        <Button
            onClick={throwError}
            style={{
                background: '#4d4d4d',
                border: '1px solid #000',
                padding: '10px',
            }}
        >
            {t('Викинути помилку')}
        </Button>
    );
};
