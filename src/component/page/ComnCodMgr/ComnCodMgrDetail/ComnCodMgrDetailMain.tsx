import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { StyledTable, StyledTd, StyledTh } from '../../../common/styled/StyledTable';
import { useCallback, useEffect, useState } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Button } from '../../../common/Button/Button';
import { useRecoilState } from 'recoil';
import { modalState } from '../../../../stores/modalState';
import { ComnCodMgrDetailModal } from '../ComnCodMgrDetailModal/ComnCodMgrDetailModal';

export interface IComnCodMgrDetailRespose {
    totalCntComnDtlCod: number;
    listComnDtlCodModel: IComnCodMgrDetail[];
}

export interface IComnCodMgrDetail {
    row_num: string;
    grp_cod: string;
    grp_cod_nm: string;
    dtl_cod: string;
    dtl_cod_nm: string;
    dtl_cod_eplti: string;
    use_poa: string;
    fst_enlm_dtt: string;
    fst_rgst_sst_id: string;
    fnl_mdfd_dtt: string;
}

export const ComnCodMgrDetailMain = () => {
    // const grpCod = useParams();
    // console.log(grpCod);
    const { grpCod } = useParams();
    const { state } = useLocation();
    const [comnDetailList, setComnDetailList] = useState<IComnCodMgrDetail[]>();
    const [totalCount, setTotalCount] = useState<number>();
    const [modalOpen, setModalOpen] = useRecoilState<boolean>(modalState);
    const [detailCod, setDetailCod] = useState<string>();
    const [currentPage, setCrrentPage] = useState<number>();
    const navigate = useNavigate();

    useEffect(() => {
        searchDetail();
    }, []);

    const searchDetail = async (cpage?: number) => {
        cpage = cpage || 1;
        const postAction: AxiosRequestConfig = {
            method: 'POST',
            url: '/system/listComnDtlCodJson.do',
            data: { grp_cod: grpCod, currentPage: cpage, pageSize: 5 },
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            await axios(postAction).then((res: AxiosResponse<IComnCodMgrDetailRespose>) => {
                setComnDetailList(res.data.listComnDtlCodModel);
                setTotalCount(res.data.totalCntComnDtlCod);
                setCrrentPage(cpage);
            });
        } catch (error) {
            alert(error);
        }
    };

    const handlerModal = (detailCod?: string) => {
        setModalOpen(!modalOpen);
        setDetailCod(detailCod);
    };

    const modalClose = () => {
        searchDetail(currentPage);
        setModalOpen(!modalOpen);
    };

    return (
        <>
            <Button onClick={handlerModal}>신규등록</Button>
            <Button onClick={() => navigate(-1)}>뒤로가기</Button>
            <StyledTable>
                <thead>
                    <tr>
                        <StyledTh size={10}>그룹코드</StyledTh>
                        <StyledTh size={10}>상세코드</StyledTh>
                        <StyledTh size={7}>상세코드명</StyledTh>
                        <StyledTh size={10}>상세코드 설명</StyledTh>
                        <StyledTh size={5}>사용여부</StyledTh>
                        <StyledTh size={5}>비고</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {comnDetailList && comnDetailList?.length > 0 ? (
                        comnDetailList.map((a) => {
                            return (
                                <tr key={a.dtl_cod} onClick={() => handlerModal(a.dtl_cod)}>
                                    <StyledTd>{a.grp_cod}</StyledTd>
                                    <StyledTd>{a.dtl_cod}</StyledTd>
                                    <StyledTd>{a.dtl_cod_nm}</StyledTd>
                                    <StyledTd>{a.dtl_cod_eplti}</StyledTd>
                                    <StyledTd>{a.use_poa}</StyledTd>
                                    <StyledTd>
                                        <button>수정</button>
                                    </StyledTd>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <StyledTd colSpan={6}>데이터가 없습니다.</StyledTd>
                        </tr>
                    )}
                </tbody>
                <ComnCodMgrDetailModal
                    grpCod={grpCod}
                    grpCodNm={state.grpCodNm}
                    detailCod={detailCod}
                    modalClose={modalClose}
                ></ComnCodMgrDetailModal>
            </StyledTable>
        </>
    );
};
