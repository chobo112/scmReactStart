import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Button } from '../../../common/Button/Button';
import { StyledTable, StyledTd, StyledTh } from '../../../common/styled/StyledTable';
import { ComnCodMgrMainStyled } from './styled';
import React, { useContext, useEffect, useState } from 'react';
import { fomatDate } from '../../../../common/fomatData';
import { PageNavigate } from '../../../common/pageNavigation/PageNavigate';
import { ConmCodContext } from '../../../../api/provider/ComnCodMgrProvider';
import { useRecoilState } from 'recoil';
import { modalState } from '../../../../stores/modalState';
import { ComnCodMgrModal } from '../ComnCodMgrModal/ComnCodMgrModal';
import { useNavigate } from 'react-router-dom';
import { IComnCodList, ISearchComnCod } from '../../../../models/interface/ComncodeMgr/comnCodeMgrModel';
import { postComnCodMgrApi } from '../../../../api/postComnCodMgrApi';
import { ComnCodMgrApi } from '../../../../api/api';

export const ComnCodMgrMain = () => {
    const [comnCodList, setComnCodList] = useState<IComnCodList[]>();
    const [totalCnt, setTotalCnt] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>();
    const { searchKeyword } = useContext(ConmCodContext);
    const [modal, setModal] = useRecoilState(modalState);
    const [grpCod, setGrpCod] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        searchComnCod();
    }, [searchKeyword]);

    const searchComnCod = async (cpage?: number) => {
        cpage = cpage || 1;
        // axios.post('/system/listComnGrpCodJson.do', { currentPage: cpage, pageSize: 5 });
        // const postAction: AxiosRequestConfig = {
        //     method: 'POST',
        //     url: '/system/listComnGrpCodJson.do',
        //     data: { ...searchKeyword, currentPage: cpage, pageSize: 5 },
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // };

        // axios(postAction).then((res: AxiosResponse<ISearchComnCod>) => {
        //     setComnCodList(res.data.listComnGrpCod);
        //     setTotalCnt(res.data.totalCount);
        //     setCurrentPage(cpage);
        // });

        const postSearchComnCod = await postComnCodMgrApi<ISearchComnCod>(ComnCodMgrApi.listComnGrpCodJson, {
            ...searchKeyword,
            currentPage: cpage,
            pageSize: 5,
        });

        if (postSearchComnCod) {
            setComnCodList(postSearchComnCod.listComnGrpCod);
            setTotalCnt(postSearchComnCod.totalCount);
            setCurrentPage(cpage);
        }
    };

    const onPostSuccess = () => {
        setModal(!modal);
        searchComnCod(currentPage);
    };

    const handlerModal = (grpCod: string, e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.stopPropagation();
        setGrpCod(grpCod);
        setModal(!modal);
    };

    return (
        <ComnCodMgrMainStyled>
            <Button
                onClick={() => {
                    setModal(!modal);
                }}
            >
                신규등록
            </Button>
            <StyledTable>
                <colgroup>
                    <col width="20%" />
                    <col width="10%" />
                    <col width="20%" />
                    <col width="7%" />
                    <col width="10%" />
                    <col width="5%" />
                </colgroup>
                <thead>
                    <tr>
                        <StyledTh size={10}>그룹코드</StyledTh>
                        <StyledTh size={5}>그룹코드명</StyledTh>
                        <StyledTh size={10}>그룹코드 설명</StyledTh>
                        <StyledTh size={5}>사용여부</StyledTh>
                        <StyledTh size={7}>등록일</StyledTh>
                        <StyledTh size={3}>비고</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {comnCodList && comnCodList?.length > 0 ? (
                        comnCodList.map((a) => {
                            return (
                                <tr
                                    key={a.grp_cod}
                                    onClick={() => {
                                        navigate(a.grp_cod, { state: { grpCodNm: a.grp_cod_nm } });
                                    }}
                                >
                                    <StyledTd>{a.grp_cod}</StyledTd>
                                    <StyledTd>{a.grp_cod_nm}</StyledTd>
                                    <StyledTd>{a.grp_cod_eplti}</StyledTd>
                                    <StyledTd>{a.use_poa}</StyledTd>
                                    <StyledTd>{fomatDate(a.fst_enlm_dtt)}</StyledTd>
                                    <StyledTd>
                                        <a
                                            onClick={(e) => {
                                                handlerModal(a.grp_cod, e);
                                            }}
                                        >
                                            수정
                                        </a>
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
            </StyledTable>
            <PageNavigate
                totalItemsCount={totalCnt}
                onChange={searchComnCod}
                itemsCountPerPage={5}
                activePage={currentPage as number}
            ></PageNavigate>
            <ComnCodMgrModal onPostSuccess={onPostSuccess} grpCod={grpCod} setGrpCod={setGrpCod}></ComnCodMgrModal>
        </ComnCodMgrMainStyled>
    );
};
