import { useEffect, useState } from 'react';
import { NoticeMainStyled } from './styled';
import axios, { AxiosResponse } from 'axios';
import { StyledTable, StyledTd, StyledTh } from '../../../common/styled/StyledTable';
import { IParam } from '../../../../pages/Notice';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { modalState } from '../../../../stores/modalState';
import { Protal } from '../../../common/potal/Portal';
import { NoticeModal } from '../NoticeModal/NoticeModal';
import { PageNavigate } from '../../../common/pageNavigation/PageNavigate';
import { INoticeList, IPageParam, ISearchResponse } from '../../../../models/interface/api/noticeModels';

// export interface INoticeList {
//     file_ext: string | null;
//     file_name: string | null;
//     file_size: number;
//     logical_path: string | null;
//     loginID: string;
//     noti_content: string;
//     noti_date: string;
//     noti_seq: number;
//     noti_title: string;
//     phsycal_path: string | null;
// }

// export interface ISearchResponse {
//     listCount: number;
//     noticeList: INoticeList[];
// }

// export interface INoticeMainProps {
//     searchParam?: IParam;
// }

// export interface IPageParam {
//     cpage: number;
//     pageSize: number;
// }

export const NoticeMain = () => {
    const [noticeList, setNoticeList] = useState<INoticeList[]>();
    const [pageParam, setPageParam] = useState<IPageParam>({ cpage: 1, pageSize: 5 });
    const { search } = useLocation();
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [noticeSeq, setNoticeSeq] = useState<number>();
    const [listCount, setListCount] = useState<number>(0);

    const { cpage: currentPage } = pageParam;

    const handlerModal = (seq?: number) => {
        setModal(!modal);
        setNoticeSeq(seq);
    };
    useEffect(() => {
        searchNoticeList();
    }, [search]);

    const searchNoticeList = (cpage?: number) => {
        cpage = cpage || 1;
        const searchParam = new URLSearchParams(search);

        searchParam.append('cpage', cpage.toString());
        searchParam.append('pageSize', '5');
        axios.post('/board/noticeListJson.do', searchParam).then((res: AxiosResponse<ISearchResponse>) => {
            setNoticeList(res.data.noticeList);
            setListCount(res.data.listCount);
            setPageParam({ ...pageParam, cpage: cpage as number });
        });
    };

    const handleSuccess = () => {
        searchNoticeList(currentPage);
        setModal(!modal);
    };

    return (
        <NoticeMainStyled>
            총 갯수 : {listCount} 현재 페이지 : {currentPage}
            <StyledTable>
                <thead>
                    <tr>
                        <StyledTh size={5}>번호</StyledTh>
                        <StyledTh size={50}>제목</StyledTh>
                        <StyledTh size={20}>등록일</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {noticeList && noticeList?.length > 0 ? (
                        noticeList?.map((a) => {
                            return (
                                <tr key={a.noti_seq} onClick={() => handlerModal(a.noti_seq)}>
                                    <StyledTd>{a.noti_seq}</StyledTd>
                                    <StyledTd>{a.noti_title}</StyledTd>
                                    <StyledTd>{a.noti_date}</StyledTd>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <StyledTd colSpan={3}>데이터가 없습니다.</StyledTd>
                        </tr>
                    )}
                </tbody>
            </StyledTable>
            <PageNavigate
                totalItemsCount={listCount}
                onChange={searchNoticeList}
                activePage={currentPage}
                itemsCountPerPage={5}
            ></PageNavigate>
            {modal ? (
                <Protal>
                    <NoticeModal modalOpen={handlerModal} noticeSeq={noticeSeq} handleSuccess={handleSuccess} />
                </Protal>
            ) : null}
        </NoticeMainStyled>
    );
};
