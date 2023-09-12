import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './AddCommentForm.module.scss';
import {
    addCommentFormActions,
    addCommentFormReducer,
} from '../../model/slice/addCommentFormSlice';
import {
    getAddCommentFormText,
    getAddCommentFormError,
    getAddCommentFormIsLoading,
} from '../../model/selectors/addCommentsFormSelectors';
import { HStack } from '@/shared/ui/redesigned/Stack';

const reducers: ReducersList = {
    addCommentForm: addCommentFormReducer,
};

interface AddCommentFormProps {
    className?: string;
    onSendComment: (text: string) => void;
}

const AddCommentForm = memo((props: AddCommentFormProps) => {
    const { className, onSendComment } = props;
    const { t } = useTranslation();
    const text = useSelector(getAddCommentFormText);
    // TODO - loading and error
    const error = useSelector(getAddCommentFormError);
    const isLoading = useSelector(getAddCommentFormIsLoading);
    const dispatch = useAppDispatch();

    const onCommentTextChange = useCallback(
        (v: string) => {
            dispatch(addCommentFormActions.setText(v));
        },
        [dispatch],
    );

    const onSendHandler = useCallback(() => {
        onSendComment(text || '');
        onCommentTextChange('');
    }, [onCommentTextChange, onSendComment, text]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Card
                                    padding="24"
                                    max
                                    border="round"
                                    className={classNames(
                                        cls.AddCommentFormRedesigned,
                                        {},
                                        [className],
                                    )}
                                >
                                    <HStack
                                        data-testid="AddCommentForm"
                                        gap="16"
                                        max
                                    >
                                        <Input
                                            className={cls.input}
                                            value={text}
                                            onChange={onCommentTextChange}
                                            placeholder={t('Введіть коментар')}
                                            data-testid="AddCommentForm.Input"
                                        />
                                        <Button
                                            data-testid="AddCommentForm.Button"
                                            onClick={onSendHandler}
                                        >
                                            {t('Відправити')}
                                        </Button>
                                    </HStack>
                                </Card>
        </DynamicModuleLoader>
    );
});

export default AddCommentForm;
