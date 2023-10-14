import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import cls from '../JobAdditionalInfo.module.scss';

import { User } from '@/entities/User';
import { ShareModal } from '@/features/shareModal';
import ShareIcon from '@/shared/assets/icons/share.svg';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Tooltip } from '@/shared/ui/redesigned/Tooltip';

interface JobAdditionalFunctionsProps {
    onShare: (user: User) => void;
}

export const JobAdditionalFunctions = memo(
    (props: JobAdditionalFunctionsProps) => {
        const { onShare } = props;
        const { t } = useTranslation();
        const [isOpen, setIsOpen] = useState(false);

        const onOpen = useCallback(() => {
            setIsOpen(true);
        }, []);

        const onClose = useCallback(() => {
            setIsOpen(false);
        }, []);

        return (
            <Card
                padding="24"
                border="round"
                className={cls.card}
            >
                <VStack
                    max
                    gap="16"
                >
                    <Tooltip
                        title={t('Поділитися')}
                        direction="bottom left"
                    >
                        <Icon
                            svg={ShareIcon}
                            clickable
                            onClick={onOpen}
                            width={20}
                            height={20}
                        />
                    </Tooltip>
                    <ShareModal
                        title={t('Поділитися з...')}
                        isOpen={isOpen}
                        onClose={onClose}
                        onShare={onShare}
                    />
                </VStack>
            </Card>
        );
    },
);
