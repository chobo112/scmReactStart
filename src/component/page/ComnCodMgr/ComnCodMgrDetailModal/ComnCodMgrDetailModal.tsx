import { useRecoilState } from 'recoil';
import { ComnCodDetalTableStyled, ComnCodMgrDetailModalStyled } from './styled';
import { modalState } from '../../../../stores/modalState';
import { Button } from '../../../common/Button/Button';
import { FC, useEffect, useState } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { nullCheck } from '../../../../common/nullCheck';
import { IDetailCod, IPostResponse } from '../../../../models/interface/api/comnCodMgrModels';

export interface IComnCodMgrDetailProps {
    grpCod?: string;
    grpCodNm?: string;
    detailCod?: string;
    modalClose: () => void;
}

// export interface IPostResponse {
//     result: string;
//     comnDtlCodModel: IDetailCod;
// }

// export interface IDetailCod {
//     dtl_grp_cod: string;
//     dtl_cod: string;
//     dtl_cod_nm: string;
//     use_poa: string;
//     dtl_cod_eplti?: string;
// }

export const defaultDelatilObject = {
    dtl_grp_cod: '',
    dtl_cod: '',
    dtl_cod_nm: '',
    use_poa: '',
};

export const ComnCodMgrDetailModal: FC<IComnCodMgrDetailProps> = ({ grpCod, grpCodNm, detailCod, modalClose }) => {
    const [modalOpen, setModalOpen] = useRecoilState<boolean>(modalState);
    const [delatilObject, setDetailObject] = useState<IDetailCod>(defaultDelatilObject);

    useEffect(() => {
        if (modalOpen && detailCod) searchComnCodDetail();
    }, [modalOpen]);

    const searchComnCodDetail = async () => {
        const postAction: AxiosRequestConfig = {
            method: 'POST',
            url: '/system/selectComnDtlCod.do',
            data: { grp_cod: grpCod, dtl_cod: detailCod },
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            await axios(postAction).then((res: AxiosResponse<IPostResponse>) => {
                if (res.data.result === 'SUCCESS') {
                    setDetailObject(res.data.comnDtlCodModel);
                }
            });
        } catch (error) {
            alert(error);
        }
    };

    const handlerCloseModal = () => {
        setModalOpen(!modalOpen);
    };

    const handlerSave = async () => {
        const isNull = nullCheck([
            { inval: delatilObject?.dtl_cod, msg: '상세코드 id를 입력해주세요' },
            { inval: delatilObject?.dtl_cod_nm, msg: '상세코드 명을 입력해주세요' },
            { inval: delatilObject?.use_poa, msg: '사용여부를 입력해주세요' },
        ]);

        if (!isNull) return;
        const postAction: AxiosRequestConfig = {
            method: 'POST',
            url: '/system/saveComnDtlCodJson.do',
            data: { ...delatilObject, dtl_grp_cod: grpCod },
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            await axios(postAction).then((res: AxiosResponse<IPostResponse>) => {
                if (res.data.result === 'SUCCESS') {
                    modalClose();
                }
            });
        } catch (error) {
            alert(error);
        }
    };

    const handlerUpdate = async () => {
        const isNull = nullCheck([
            { inval: delatilObject.dtl_cod, msg: '상세코드 id를 입력해주세요' },
            { inval: delatilObject.dtl_cod_nm, msg: '상세코드 명을 입력해주세요' },
            { inval: delatilObject.use_poa, msg: '사용여부를 입력해주세요' },
        ]);
        if (!isNull) return;
        const postAction: AxiosRequestConfig = {
            method: 'POST',
            url: '/system/updateComnDtlCodJson.do',
            data: { ...delatilObject, dtl_grp_cod: grpCod },
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            await axios(postAction).then((res: AxiosResponse<IPostResponse>) => {
                if (res.data.result === 'SUCCESS') {
                    modalClose();
                }
            });
        } catch (error) {
            alert(error);
        }
    };

    const handlerDelete = async () => {
        const postAction: AxiosRequestConfig = {
            method: 'POST',
            url: '/system/deleteComnDtlCodJson.do',
            data: { dtl_grp_cod: grpCod, dtl_cod: delatilObject?.dtl_cod },
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            await axios(postAction).then((res: AxiosResponse<IPostResponse>) => {
                if (res.data.result === 'SUCCESS') {
                    modalClose();
                }
            });
        } catch (error) {
            alert(error);
        }
    };

    const cleanUp = () => {
        setDetailObject(defaultDelatilObject);
    };

    return (
        <ComnCodMgrDetailModalStyled isOpen={modalOpen} ariaHideApp={false} onAfterClose={cleanUp}>
            <div className="wrap">
                <div className="header">상세 코드 관리</div>
                <ComnCodDetalTableStyled>
                    <tbody>
                        <tr>
                            <th>그룹 코드 id</th>
                            <td>
                                <input type="text" name="grp_cod" readOnly={true} defaultValue={grpCod}></input>
                            </td>
                            <th>그룹 코드 명</th>
                            <td>
                                <input type="text" name="grp_cod_nm" readOnly={true} defaultValue={grpCodNm}></input>
                            </td>
                        </tr>
                        <tr>
                            <th>상세 코드 id *</th>
                            <td>
                                <input
                                    type="text"
                                    onChange={(e) => setDetailObject({ ...delatilObject, dtl_cod: e.target.value })}
                                    defaultValue={delatilObject?.dtl_cod}
                                    readOnly={detailCod ? true : false}
                                ></input>
                            </td>
                            <th>상세 코드 명 *</th>
                            <td>
                                <input
                                    type="text"
                                    onChange={(e) => setDetailObject({ ...delatilObject, dtl_cod_nm: e.target.value })}
                                    defaultValue={delatilObject?.dtl_cod_nm}
                                ></input>
                            </td>
                        </tr>
                        <tr>
                            <th>코드 설명</th>
                            <td colSpan={3}>
                                <input
                                    type="text"
                                    onChange={(e) =>
                                        setDetailObject({ ...delatilObject, dtl_cod_eplti: e.target.value })
                                    }
                                    defaultValue={delatilObject?.dtl_cod_eplti}
                                ></input>
                            </td>
                        </tr>
                        <tr>
                            <th>사용 유무 *</th>
                            <td colSpan={3}>
                                <input
                                    type="radio"
                                    name="useYn"
                                    value={'Y'}
                                    onChange={(e) => setDetailObject({ ...delatilObject, use_poa: e.target.value })}
                                    checked={delatilObject?.use_poa === 'Y'}
                                ></input>
                                사용
                                <input
                                    type="radio"
                                    name="useYn"
                                    value={'N'}
                                    onChange={(e) => setDetailObject({ ...delatilObject, use_poa: e.target.value })}
                                    checked={delatilObject?.use_poa === 'N'}
                                ></input>
                                미사용
                            </td>
                        </tr>
                    </tbody>
                </ComnCodDetalTableStyled>
                <div className="btn-group">
                    <Button onClick={detailCod ? handlerUpdate : handlerSave}>{detailCod ? '수정' : '저장'}</Button>
                    {detailCod ? <Button onClick={handlerDelete}>삭제</Button> : null}
                    <Button onClick={handlerCloseModal}>닫기</Button>
                </div>
            </div>
        </ComnCodMgrDetailModalStyled>
    );
};
