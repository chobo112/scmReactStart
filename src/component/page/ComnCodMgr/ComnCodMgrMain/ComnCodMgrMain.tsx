import axios, { AxiosResponse } from 'axios';
import { StyledTable, StyledTd, StyledTh } from '../../../common/styled/StyledTable';
import { ComnCodMgrMainStyled } from './styled';
import { useContext, useEffect, useState } from 'react';
import { Button } from '../../../common/Button/Button';
import { useRecoilState } from 'recoil';
import { modalState } from '../../../../stores/modalState';
import { ComnCodMgrModal } from '../ComnCodMgrModal/ComnCodMgrModal';
import { PageNavigate } from '../../../common/pageNavigation/PageNavigate';
import { useNavigate } from 'react-router-dom';
import { ComnCodContext } from '../../../../api/provider/ComnCodProvider';

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
    const { searchKeyword } = useContext(ComnCodContext);
    const navigate = useNavigate();
    useEffect(() => {
        searchComnCod();
        // console.log(searchKeyword);
    }, [searchKeyword]);

    const searchComnCod = (cpage?: number) => {
        cpage = cpage || 1;

        axios
            .post('/system/listComnGrpCodJson.do', { ...searchKeyword, currentPage: cpage, pageSize: 5 })
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

    const fomatData = (timeStamp: number) => {
        const date = new Date(timeStamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    const modalClose = () => {
        setModalOpen(!modalOpen);
        searchComnCod(currentPage);
    };

    return (
        <ComnCodMgrMainStyled>
            <Button onClick={handlerModal}>신규등록</Button>
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
                    {comnCodList && comnCodList.length > 0 ? (
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
                                    <StyledTd>{fomatData(a.fst_enlm_dtt)}</StyledTd>
                                    <StyledTd>
                                        <a onClick={(e) => handlerUpdateModal(e, a.grp_cod)}>수정</a>
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
            {modalOpen ? <ComnCodMgrModal modalClose={modalClose} grpCod={grpCod}></ComnCodMgrModal> : null}
        </ComnCodMgrMainStyled>
    );
};
