import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Page } from '@/widgets/Page';
import { Button } from '@/shared/ui/redesigned/Button';
import { getRouteInteractiveCreate } from '@/shared/const/router';

const AdminPanelPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const onNavigateToCreateInteractive = useCallback(() => {
        navigate(getRouteInteractiveCreate());
    }, [navigate]);

    return (
        <Page data-testid="AdminPanelPage">
            <Button onClick={onNavigateToCreateInteractive}>
                {t('Створити інтерактив')}
            </Button>
        </Page>
    );
};

export default memo(AdminPanelPage);
