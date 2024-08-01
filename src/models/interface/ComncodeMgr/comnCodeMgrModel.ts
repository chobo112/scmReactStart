export interface IComnCod {
    grp_cod: string;
    grp_cod_nm: string;
    use_poa: string;
    grp_cod_eplti: string;
}

export interface IComnCodList extends IComnCod {
    row_num: number;
    reg_date: string | null;
    fst_enlm_dtt: number;
    detailcnt: number;
}

export interface IComnDetailList extends IComnCod {
    row_num: number;
    fst_enlm_dtt: string;
    dtl_cod: string;
    dtl_cod_nm: string;
    dtl_cod_eplti: string;
    fst_rgst_sst_id: string;
    fnl_mdfd_dtt: string;
}

export interface ISearchComnCod {
    totalCount: number;
    listComnGrpCod: IComnCodList[];
}

export interface IDetailResponse extends IPostResponse {
    comnGrpCodModel: IComnCod;
    resultMsg: string;
}

export interface IListComnDtlCodJsonResponse {
    totalCntComnDtlCod: number;
    listComnDtlCodModel: IComnDetailList[];
    pageSize: number;
    currentPageComnDtlCod: number;
}

export interface IPostResponse {
    result: 'SUCCESS';
}

export interface ISelectComnDtlCodResponse extends IPostResponse {
    comnDtlCodModel: IComnDtlCodModel;
}

export interface ISelectComnDtlCod extends IPostResponse {
    resultMsg: string;
}

export interface IComnDtlCodModel {
    row_num?: number;
    grp_cod?: string;
    grp_cod_nm?: string;
    use_poa?: string;
    dtl_cod?: string;
    dtl_cod_nm?: string;
    dtl_cod_eplti?: string;
}
