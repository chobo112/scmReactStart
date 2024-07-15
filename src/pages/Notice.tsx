import { NoticeMain } from '../component/page/Notice/NoticeMain/NoticeMain';
import { NoticeSearch } from '../component/page/Notice/NoticeSearch/NoticeSearch';
import { ContentBox } from '../component/common/ContentBox/ContentBox';

export interface IParam {
    title?: string;
    startDate?: string;
    endDate?: string;
}

export const Notice = () => {
    return (
        <>
            <ContentBox>공지사항</ContentBox>
            <NoticeSearch />
            <NoticeMain />
        </>
    );
};
