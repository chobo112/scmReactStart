import { useRecoilState } from 'recoil';
import { modalState } from '../../../../stores/modalState';
import { ComnCodMgrModalStyled, ComnCodMgrTableStyled } from './styled';
import { Button } from '../../../common/Button/Button';
import { FC, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface IComnCod {
    grp_cod?: string;
    grp_cod_nm?: string;
    use_poa?: string;
    grp_cod_eplti?: string;
    fst_rgst_sst_id?: string;
    fnl_mdfr_sst_id?: string;
}

export interface IPostResponse {
    result: string;
}

export interface IComnCodMgrModalProps {
    modalClose: () => void;
    grpCod?: string;
}

export interface IComnGrpCodModel extends IComnCod {
    fnl_mdfd_dtt?: string;
}

export interface ISaveComnGrpCodJson {
    comnGrpCodModel: IComnGrpCodModel;
    result: string;
    resultMsg: string;
}

export const ComnCodMgrModal: FC<IComnCodMgrModalProps> = ({ modalClose, grpCod }) => {
    const [modalOpen, setModalOpen] = useRecoilState<boolean>(modalState);
    const [comnCod, setComnCod] = useState<IComnCod>();

    useEffect(() => {
        if (grpCod) searchDetail();
        // return () => {};
    }, []);

    const searchDetail = async () => {
        const postAction: AxiosRequestConfig = {
            method: 'POST',
            url: '/system/selectComnGrpCod.do',
            data: { grp_cod: grpCod },
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            await axios(postAction).then((res: AxiosResponse<ISaveComnGrpCodJson>) => {
                if ((res.data.result = 'SUCCESS')) {
                    setComnCod(res.data.comnGrpCodModel);
                }
            });
        } catch (error) {
            alert(error);
        }
    };

    const handlerPost = async () => {
        const postAction: AxiosRequestConfig = {
            method: 'POST',
            url: '/system/saveComnGrpCodJson.do',
            data: comnCod,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            await axios(postAction).then((res: AxiosResponse<IPostResponse>) => {
                if (res.data.result === 'SUCCESS') {
                    setModalOpen(!modalOpen);
                }
            });
        } catch (error) {
            alert(error);
        }
    };

    const handlerUpdate = async () => {
        const postAction: AxiosRequestConfig = {
            method: 'POST',
            url: '/system/updateComnGrpCodJson.do',
            data: comnCod,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            await axios(postAction).then((res: AxiosResponse<IPostResponse>) => {
                if (res.data.result === 'SUCCESS') {
                    setModalOpen(!modalOpen);
                }
            });
        } catch (error) {
            alert(error);
        }
    };

    const handlerDelete = async () => {
        const postAction: AxiosRequestConfig = {
            method: 'POST',
            url: '/system/deleteComnGrpCod.do',
            data: comnCod,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            await axios(postAction).then((res: AxiosResponse<IPostResponse>) => {
                if (res.data.result === 'SUCCESS') {
                    setModalOpen(!modalOpen);
                }
            });
        } catch (error) {
            alert(error);
        }
    };

    const handlerCloseModal = () => {
        setModalOpen(!modalOpen);
    };
    return (
        <ComnCodMgrModalStyled isOpen={modalOpen} ariaHideApp={false}>
            <div className="wrap">
                <div className="header">그룹 코드 관리</div>
                <ComnCodMgrTableStyled>
                    <tbody>
                        <tr>
                            <th>그룹 코드 id</th>
                            <td>
                                <input
                                    type="text"
                                    name="grp_cod"
                                    onChange={(e) => setComnCod({ ...comnCod, grp_cod: e.target.value })}
                                    defaultValue={comnCod?.grp_cod}
                                    readOnly={grpCod ? true : false}
                                ></input>
                            </td>
                            <th>그룹 코드 명</th>
                            <td>
                                <input
                                    type="text"
                                    name="grp_cod_nm"
                                    onChange={(e) => setComnCod({ ...comnCod, grp_cod_nm: e.target.value })}
                                    defaultValue={comnCod?.grp_cod_nm}
                                ></input>
                            </td>
                        </tr>
                        <tr>
                            <th>코드 설명</th>
                            <td colSpan={3}>
                                <input
                                    type="text"
                                    onChange={(e) => setComnCod({ ...comnCod, grp_cod_eplti: e.target.value })}
                                    defaultValue={comnCod?.grp_cod_eplti}
                                ></input>
                            </td>
                        </tr>
                        <tr>
                            <th>사용 유무</th>
                            <td colSpan={3}>
                                <input
                                    type="radio"
                                    name="useYn"
                                    value={'Y'}
                                    onChange={(e) => setComnCod({ ...comnCod, use_poa: e.target.value })}
                                    checked={comnCod?.use_poa === 'Y'}
                                ></input>
                                사용
                                <input
                                    type="radio"
                                    name="useYn"
                                    value={'N'}
                                    onChange={(e) => setComnCod({ ...comnCod, use_poa: e.target.value })}
                                    checked={comnCod?.use_poa === 'N'}
                                ></input>
                                미사용
                            </td>
                        </tr>
                    </tbody>
                </ComnCodMgrTableStyled>
                <div className="btn-group">
                    <Button onClick={grpCod ? handlerUpdate : handlerPost}>{grpCod ? '수정' : '저장'}</Button>
                    {grpCod ? <Button onClick={handlerDelete}>삭제</Button> : null}
                    <Button onClick={handlerCloseModal}>닫기</Button>
                </div>
            </div>
        </ComnCodMgrModalStyled>
    );
};
