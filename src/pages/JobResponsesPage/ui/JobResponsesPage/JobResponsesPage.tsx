import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import { Text } from '@/shared/ui/redesigned/Text';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import {
    getJobDetailsData,
    getJobDetailsIsLoading,
    getJobDetailsService,
    jobDetailsReducer,
} from '@/entities/Job';
import { JobResponseItem } from './JobResponseItem/JobResponseItem';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

interface JobResponsesPageProps {
    className?: string;
}

const reducers: ReducersList = {
    jobDetails: jobDetailsReducer,
};

export const JobResponsesPage = memo((props: JobResponsesPageProps) => {
    const { className } = props;
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const job = useSelector(getJobDetailsData);
    const loading = useSelector(getJobDetailsIsLoading);

    useInitialEffect(() => {
        dispatch(getJobDetailsService(id));
    });

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount
        >
            <Page className={classNames('', {}, [className])}>
                <VStack
                    max
                    gap="16"
                >
                    <Text title={t('Відгуки')} />
                    {loading
                        ? [1, 2, 3].map((item) => (
                              <Card
                                  max
                                  padding="24"
                                  border="round"
                                  key={item}
                              >
                                  <VStack
                                      gap="16"
                                      max
                                  >
                                      <HStack gap="8">
                                          <Skeleton
                                              width={48}
                                              height={48}
                                              borderRadius="50%"
                                          />
                                          <Skeleton
                                              width={100}
                                              height={24}
                                          />
                                      </HStack>
                                      <Skeleton
                                          width={150}
                                          height={24}
                                      />
                                      <Skeleton height={50} />
                                  </VStack>
                              </Card>
                          ))
                        : job?.responses.map((response) => (
                              <JobResponseItem
                                  key={response.id}
                                  response={response}
                              />
                          ))}
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
});
