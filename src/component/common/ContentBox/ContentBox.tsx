import { FC } from 'react';
import { ContentBoxStyled, ContentName } from './styled';

export interface IContentBoxProps {
    children?: React.ReactNode | React.ReactNode[];
}

export const ContentBox: FC<IContentBoxProps> = ({ children }) => {
    return (
        <ContentBoxStyled>
            <ContentName>{children}</ContentName>
        </ContentBoxStyled>
    );
};
