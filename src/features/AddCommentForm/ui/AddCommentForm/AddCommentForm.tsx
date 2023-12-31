import { FormEvent, memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import EmojiPicker, {
    EmojiClickData,
    Theme as EmojiTheme,
} from 'emoji-picker-react';

import { addCommentFormReducer } from '../../model/slice/addCommentFormSlice';
import {
    getAddCommentFormError,
    getAddCommentFormIsLoading,
} from '../../model/selectors/addCommentsFormSelectors';
import cls from './AddCommentForm.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { sendNotification } from '@/entities/Notification';
import { getRouteArticleDetails } from '@/shared/const/router';
import { getArticleDetailsData } from '@/entities/Article';
import { getUserAuthData } from '@/entities/User';
import { Icon } from '@/shared/ui/redesigned/Icon';
import EmojiIcon from '@/shared/assets/icons/emoji.svg';
import { usePressKey } from '@/shared/lib/hooks/usePressKey/usePressKey';
import { Theme } from '@/shared/const/theme';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';

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
    const [isPickerVisible, setIsPickerVisible] = useState(false);
    const [text, setText] = useState('');
    // const text = useSelector(getAddCommentFormText);
    // TODO - loading and error
    const error = useSelector(getAddCommentFormError);
    const isLoading = useSelector(getAddCommentFormIsLoading);
    const dispatch = useAppDispatch();
    const article = useSelector(getArticleDetailsData);
    const authData = useSelector(getUserAuthData);
    const { theme } = useTheme();

    usePressKey(() => {
        setIsPickerVisible(false);
    }, 'Escape');

    const onCommentTextChange = useCallback((v: string) => {
        // dispatch(addCommentFormActions.setText(v));
        setText(v);
    }, []);

    const onEmojiClick = useCallback((data: EmojiClickData) => {
        // const updatedText = text + data.emoji;
        // dispatch(addCommentFormActions.setText(updatedText));
        setText((prevState) => prevState + data.emoji);
    }, []);

    const onClickIcon = useCallback(() => {
        setIsPickerVisible((prevState) => !prevState);
    }, []);

    const onSubmit = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            onSendComment(text);
            dispatch(
                sendNotification({
                    id: Date.now().toString(),
                    title: `Вашу статтю "${article?.title}" прокоментував ${authData?.username}`,
                    description: text,
                    href: getRouteArticleDetails(article?.id || ''),
                    userId: article?.user.id,
                }),
            );
            onCommentTextChange('');
        },
        [
            article?.id,
            article?.title,
            article?.user.id,
            authData?.username,
            dispatch,
            onCommentTextChange,
            onSendComment,
            text,
        ],
    );

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Card
                padding="24"
                max
                border="round"
                className={classNames(cls.AddCommentFormRedesigned, {}, [
                    className,
                ])}
            >
                <form
                    onSubmit={onSubmit}
                    className={cls.form}
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
                        <Icon
                            svg={EmojiIcon}
                            clickable
                            onClick={onClickIcon}
                        />
                        {isPickerVisible && (
                            <div className={cls.emoji}>
                                <EmojiPicker
                                    onEmojiClick={onEmojiClick}
                                    theme={
                                        (theme === Theme.DARK
                                            ? 'dark'
                                            : 'light') as EmojiTheme
                                    }
                                />
                            </div>
                        )}
                        <Button
                            data-testid="AddCommentForm.Button"
                            type="submit"
                        >
                            {t('Відправити')}
                        </Button>
                    </HStack>
                </form>
            </Card>
        </DynamicModuleLoader>
    );
});

export default AddCommentForm;
