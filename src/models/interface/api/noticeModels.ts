export interface INoticeList {
    file_ext: string | null;
    file_name: string | null;
    file_size: number;
    logical_path: string | null;
    loginID: string;
    noti_content: string;
    noti_date: string;
    noti_seq: number;
    noti_title: string;
    phsycal_path: string | null;
}

export interface ISearchResponse {
    listCount: number;
    noticeList: INoticeList[];
}

export interface IPageParam {
    cpage: number;
    pageSize: number;
}

export interface IPostResponse {
    result: string;
}

export interface INoticeDetail {
    detailValue: INoticeList;
}
