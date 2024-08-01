import { useNavigate, useParams } from 'react-router-dom';
import { ComnCodeMgrDetailMainStyled } from './styled';
import { ContentBox } from '../../../common/ContentBox/ContentBox';
import { Button } from '../../../common/Button/Button';
import { StyledTable, StyledTd, StyledTh } from '../../../common/styled/StyledTable';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

export interface IListComnDtlCodJsonResponse {
    totalCntComnDtlCod: number;
    listComnDtlCodModel: IComnDetailList[];
    pageSize: number;
    currentPageComnDtlCod: number;
}

export interface IComnDetailList {
    row_num: number;
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

export const ComnCodeMgrDetailMain = () => {
    const { grpCod } = useParams();
    const navigate = useNavigate();
    const [comnDetailList, setComnDetailList] = useState<IComnDetailList[]>();

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

    return (
        <ComnCodeMgrDetailMainStyled>
            <ContentBox>공통코드 상세조회</ContentBox>
            <Button onClick={() => navigate(-1)}>뒤로가기</Button>
            <Button>신규등록</Button>
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
                                <tr>
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
        </ComnCodeMgrDetailMainStyled>
    );
};
