import axios, { AxiosResponse } from 'axios';
import { StyledTable, StyledTd, StyledTh } from '../../../common/styled/StyledTable';
import { ComnCodMgrMainStyled } from './styled';
import { MouseEventHandler, useEffect, useState } from 'react';
import { Button } from '../../../common/Button/Button';
import { useRecoilState } from 'recoil';
import { modalState } from '../../../../stores/modalState';
import { ComnCodMgrModal } from '../ComnCodMgrModal/ComnCodMgrModal';
import { PageNavigate } from '../../../common/pageNavigation/PageNavigate';
import { useNavigate } from 'react-router-dom';

export interface IComnCod {
    row_num: number;
    grp_cod: string;
    grp_cod_nm: string;
    grp_cod_eplti: string;
    use_poa: string;
    fst_enlm_dtt: number;
    reg_date?: string;
    fst_rgst_sst_id?: string;
    fnl_mdfd_dtt?: string;
    fnl_mdfr_sst_id?: string;
    detailcnt: number;
}

export interface ISearchComnCodMgr {
    totalCount: number;
    listComnGrpCod: IComnCod[];
}

export const ComnCodMgrMain = () => {
    const [comnCodList, setComnCodList] = useState<IComnCod[]>();
    const [modalOpen, setModalOpen] = useRecoilState<boolean>(modalState);
    const [totalCount, setTotalCount] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [grpCod, setGrpCod] = useState<string>();
    const navigate = useNavigate();

    useEffect(() => {
        searchComnCod();
    }, [modalOpen]);

    const searchComnCod = (cpage?: number) => {
        cpage = cpage || 1;

        axios
            .post('/system/listComnGrpCodJson.do', { currentPage: cpage, pageSize: 5 })
            .then((res: AxiosResponse<ISearchComnCodMgr>) => {
                setComnCodList(res.data.listComnGrpCod);
                setTotalCount(res.data.totalCount);
                setCurrentPage(cpage || 1);
            });
    };

    const handlerModal = () => {
        setModalOpen(!modalOpen);
        setGrpCod('');
    };

    const handlerUpdateModal = (event: React.MouseEvent<HTMLElement, MouseEvent>, grpCod: string) => {
        event.stopPropagation();
        setGrpCod(grpCod);
        setModalOpen(!modalOpen);
    };

    return (
        <ComnCodMgrMainStyled>
            <Button onClick={handlerModal}>신규등록</Button>
            <StyledTable>
                <thead>
                    <tr>
                        <StyledTh size={10}>그룹코드</StyledTh>
                        <StyledTh size={5}>그룹코드명</StyledTh>
                        <StyledTh size={10}>그룹코드 설명</StyledTh>
                        <StyledTh size={7}>사용여부</StyledTh>
                        <StyledTh size={10}>등록일</StyledTh>
                        <StyledTh size={5}>비고</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {comnCodList && comnCodList.length > 0 ? (
                        comnCodList.map((a) => {
                            return (
                                <tr
                                    key={a.grp_cod}
                                    onClick={() => {
                                        navigate(a.grp_cod);
                                    }}
                                >
                                    <StyledTd>{a.grp_cod}</StyledTd>
                                    <StyledTd>{a.grp_cod_nm}</StyledTd>
                                    <StyledTd>{a.grp_cod_eplti}</StyledTd>
                                    <StyledTd>{a.use_poa}</StyledTd>
                                    <StyledTd>{a.fst_enlm_dtt}</StyledTd>
                                    <StyledTd>
                                        <button onClick={(e) => handlerUpdateModal(e, a.grp_cod)}>수정</button>
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
                totalItemsCount={totalCount}
                onChange={searchComnCod}
                activePage={currentPage}
                itemsCountPerPage={5}
            ></PageNavigate>
            {modalOpen ? <ComnCodMgrModal modalClose={searchComnCod} grpCod={grpCod}></ComnCodMgrModal> : null}
        </ComnCodMgrMainStyled>
    );
};
