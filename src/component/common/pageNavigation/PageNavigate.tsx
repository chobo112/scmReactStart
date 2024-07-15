import { FC } from 'react';
import Pagination from 'react-js-pagination';
import { PageNavigateStyled } from './styled';

export interface IPageNavigateProps {
    totalItemsCount: number;
    activePage: number;
    itemsCountPerPage: number;
    onChange: (pageNumber: number) => void;
}

export const PageNavigate: FC<IPageNavigateProps> = ({ totalItemsCount, onChange, activePage, itemsCountPerPage }) => {
    return (
        <PageNavigateStyled>
            <Pagination
                totalItemsCount={totalItemsCount}
                onChange={onChange}
                activePage={activePage}
                itemsCountPerPage={itemsCountPerPage}
                prevPageText={'<'}
                nextPageText={'>'}
                lastPageText={'>>'}
                firstPageText={'<<'}
                itemClassFirst={'first'}
                linkClassPrev={'prev'}
                linkClassNext={'next'}
                linkClassLast={'last'}
                activeClass={'active'}
            ></Pagination>
        </PageNavigateStyled>
    );
};
