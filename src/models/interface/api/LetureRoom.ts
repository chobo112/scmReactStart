export interface ILectureRoomListjson {
    listcnt: number;
    listdata: IListData[];
}

export interface IListData {
    equ_id: number;
    equ_name: string | null;
    equ_note: string | null;
    equ_num: number;
    lecrm_id: number;
    lecrm_name: string;
    lecrm_note: string;
    lecrm_size: string;
    lecrm_snum: string;
}
