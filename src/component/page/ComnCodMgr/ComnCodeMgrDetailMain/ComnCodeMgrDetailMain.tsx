import { useNavigate, useParams } from 'react-router-dom';
import { ComnCodeMgrDetailMainStyled } from './styled';
import { ContentBox } from '../../../common/ContentBox/ContentBox';
import { Button } from '../../../common/Button/Button';
import { StyledTable, StyledTd, StyledTh } from '../../../common/styled/StyledTable';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { modalState } from '../../../../stores/modalState';
import { ComnCodeMgrDetailModal } from '../ComnCodeMgrDetailModal/ComnCodeMgrDetailModal';
import {
    IComnDetailList,
    IListComnDtlCodJsonResponse,
} from '../../../../models/interface/ComncodeMgr/comnCodeMgrModel';

export const ComnCodeMgrDetailMain = () => {
    const { grpCod } = useParams();
    const navigate = useNavigate();
    const [comnDetailList, setComnDetailList] = useState<IComnDetailList[]>();
    const [modal, setModal] = useRecoilState(modalState);
    const [detailCod, setDetailCode] = useState<string>();

    useEffect(() => {
        searchComnCodeDetail();
    }, []);

    const searchComnCodeDetail = (cpage?: number) => {
        cpage = cpage || 1;
        const postAction: AxiosRequestConfig = {
            method: 'POST',
            url: '/system/listComnDtlCodJson.do',
            data: { grp_cod: grpCod, currentPage: cpage, pageSize: 5 },
            headers: {
                'Content-Type': 'application/json',
            },
        };

        axios(postAction).then((res: AxiosResponse<IListComnDtlCodJsonResponse>) => {
            setComnDetailList(res.data.listComnDtlCodModel);
        });
    };

    const handlerModal = (dltCd?: string) => {
        setModal(!modal);
        setDetailCode(dltCd);
    };

    const onPostSuccess = () => {
        setModal(!modal);
        searchComnCodeDetail();
    };

    return (
        <ComnCodeMgrDetailMainStyled>
            <ContentBox>공통코드 상세조회</ContentBox>
            <Button onClick={() => navigate(-1)}>뒤로가기</Button>
            <Button onClick={handlerModal}>신규등록</Button>
            <StyledTable>
                <thead>
                    <tr>
                        <StyledTh size={10}>그룹코드</StyledTh>
                        <StyledTh size={10}>상세코드</StyledTh>
                        <StyledTh size={7}>상세코드명</StyledTh>
                        <StyledTh size={10}>상세코드 설명</StyledTh>
                        <StyledTh size={5}>사용여부</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {comnDetailList && comnDetailList.length > 0 ? (
                        comnDetailList.map((a) => {
                            return (
                                <tr key={a.dtl_cod} onClick={() => handlerModal(a.dtl_cod)}>
                                    <StyledTd>{a.grp_cod}</StyledTd>
                                    <StyledTd>{a.dtl_cod}</StyledTd>
                                    <StyledTd>{a.dtl_cod_nm}</StyledTd>
                                    <StyledTd>{a.dtl_cod_eplti}</StyledTd>
                                    <StyledTd>{a.use_poa}</StyledTd>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <StyledTd colSpan={6}>데이터가 없습니다.</StyledTd>
                        </tr>
                    )}
                </tbody>
            </StyledTable>
            <ComnCodeMgrDetailModal detailCod={detailCod} onPostSuccess={onPostSuccess}></ComnCodeMgrDetailModal>
        </ComnCodeMgrDetailMainStyled>
    );
};
