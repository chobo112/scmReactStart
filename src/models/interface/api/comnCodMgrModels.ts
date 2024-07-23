export interface IComnCodModal {
    grp_cod: string;
    grp_cod_nm: string;
    use_poa: string;
    grp_cod_eplti?: string;
}

export interface IComnCod extends IComnCodModal {
    row_num: number;
    fst_enlm_dtt: number;
    reg_date: string;
    fnl_mdfd_dtt: string;
    detailcnt: number;
}

export interface IComnCodMgrDetail extends IComnCod {
    dtl_cod: string;
    dtl_cod_nm: string;
    dtl_cod_eplti: string;
    fst_rgst_sst_id: string;
}

export interface IComnCodMgrDetailRespose {
    totalCntComnDtlCod: number;
    listComnDtlCodModel: IComnCodMgrDetail[];
}

// export interface IComnGrpCodModel extends IComnCod {
//     fnl_mdfd_dtt?: string;
// }

export interface ISearchComnCodMgr {
    totalCount: number;
    listComnGrpCod: IComnCod[];
}

export interface IComnGrpCodDetail {
    comnGrpCodModel: IComnCod;
    result: string;
    resultMsg: string;
}

export interface IPostResponse {
    result: string;
}

export interface IPostResponse {
    result: string;
    comnDtlCodModel: IDetailCod;
}

export interface IDetailCod {
    dtl_grp_cod: string;
    dtl_cod: string;
    dtl_cod_nm: string;
    use_poa: string;
    dtl_cod_eplti?: string;
}
