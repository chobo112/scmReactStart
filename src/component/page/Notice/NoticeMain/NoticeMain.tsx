import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { StyledTable, StyledTd, StyledTh } from '../../../common/styled/StyledTable';
import { NoticeModal } from '../NoticeModal/NoticeModal';
import { Protal } from '../../../common/potal/Portal';
import { useRecoilState } from 'recoil';
import { modalState } from '../../../../stores/modalState';
import { PageNavigate } from '../../../common/pageNavigation/PageNavigate';

export interface INtoceList {
    file_ext: string;
    file_name: string;
    file_size: number;
    logical_path: string;
    loginID: string;
    noti_content: string;
    noti_date: string;
    noti_seq: number;
    noti_title: string;
    phsycal_path: string;
}

export interface INoticeListJsonResponse {
    listCount: number;
    noticeList: INtoceList[];
}

export const NoticeMain = () => {
    const { search } = useLocation();
    const [noticeList, setNoticeList] = useState<INtoceList[]>([]);
    const [listCount, setListCount] = useState<number>(0);
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [notiSeq, setNotiSeq] = useState<number>();
    const [currentParam, setCurrentParam] = useState<number | undefined>();

    useEffect(() => {
        searchNoticeList();
    }, [search]);

    const searchNoticeList = (cpage?: number) => {
        cpage = cpage || 1;
        const searchParam = new URLSearchParams(search);

        searchParam.append('cpage', cpage.toString());
        searchParam.append('pageSize', '5');

        axios.post('/board/noticeListJson.do', searchParam).then((res: AxiosResponse<INoticeListJsonResponse>) => {
            setNoticeList(res.data.noticeList);
            setListCount(res.data.listCount);
            setCurrentParam(cpage);
        });
    };

    const handlerModal = (seq?: number) => {
        setModal(!modal);
        setNotiSeq(seq);
    };

    const postSuccess = () => {
        setModal(!modal);
        searchNoticeList();
    };

    return (
        <>
            총 갯수 : {listCount} 현재 페이지 : {currentParam}
            <StyledTable>
                <thead>
                    <tr>
                        <StyledTh size={5}>번호</StyledTh>
                        <StyledTh size={50}>제목</StyledTh>
                        <StyledTh size={20}>등록일</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {noticeList.length > 0 ? (
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
                itemsCountPerPage={5}
                activePage={currentParam as number}
            ></PageNavigate>
            {modal ? (
                <Protal>
                    <NoticeModal noticeSeq={notiSeq} onSuccess={postSuccess} setNoticeSeq={setNotiSeq}></NoticeModal>
                </Protal>
            ) : null}
        </>
    );
};
