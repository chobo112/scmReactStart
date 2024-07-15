import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { NoticeModalStyled } from './styled';
import axios, { AxiosResponse } from 'axios';
import { useRecoilState } from 'recoil';
import { ILoginInfo } from '../../../../models/interface/store/userInfo';
import { loginInfoState } from '../../../../stores/userInfo';
import { INoticeList } from '../NoticeMain/NoticeMain';
import NoImage from '../../../../assets/noImage.jpg';

export interface NoticeModalProps {
    modalOpen: (seq?: number) => void;
    noticeSeq?: number;
    handleSuccess: () => void;
}

export interface IPostResponse {
    result: string;
}

export interface INoticeDetail {
    detailValue: INoticeList;
}

export const NoticeModal: FC<NoticeModalProps> = ({ modalOpen, noticeSeq, handleSuccess }) => {
    const title = useRef<HTMLInputElement>(null);
    const content = useRef<HTMLInputElement>(null);
    const [userInfo] = useRecoilState<ILoginInfo>(loginInfoState);
    const [noticeDetail, setNoticeDetail] = useState<INoticeList>();
    const [imageURL, setImageURL] = useState<string>('notImage');
    const [fileData, setFileData] = useState<File>();

    useEffect(() => {
        if (noticeSeq) {
            axios.post('/board/noticeDetail.do', { noticeSeq: noticeSeq }).then((res: AxiosResponse<INoticeDetail>) => {
                if (res.data.detailValue) {
                    setNoticeDetail(res.data.detailValue);

                    if (
                        res.data.detailValue.file_ext === 'jpg' ||
                        res.data.detailValue.file_ext === 'gif' ||
                        res.data.detailValue.file_ext === 'png'
                    ) {
                        setImageURL(res.data.detailValue.logical_path || NoImage);
                    } else {
                        setImageURL('notImage');
                    }
                }
            });
        }
    }, []);

    // const handlerInsert = () => {
    //     axios
    //         .post('/board/noticeSave.do', {
    //             title: title.current?.value,
    //             content: content.current?.value,
    //             loginId: userInfo.loginId,
    //         })
    //         .then((res: AxiosResponse<IPostResponse>) => {
    //             if (res.data.result === 'success') {
    //                 handleSuccess();
    //             }
    //         });
    // };

    const handlerInsert = () => {
        const fileForm = new FormData();
        const textData = {
            title: title.current?.value,
            content: content.current?.value,
            loginId: userInfo.loginId,
        };
        if (fileData) fileForm.append('file', fileData);
        fileForm.append('text', new Blob([JSON.stringify(textData)], { type: 'application/json' }));
        axios.post('/board/noticeFileSaveJson.do', fileForm).then((res: AxiosResponse<IPostResponse>) => {
            if (res.data.result === 'success') {
                handleSuccess();
            }
        });
    };

    // const handlerUpdate = () => {
    //     axios
    //         .post('/board/noticeUpdate.do', {
    //             title: title.current?.value,
    //             content: content.current?.value,
    //             noticeSeq: noticeDetail?.noti_seq,
    //         })
    //         .then((res: AxiosResponse<IPostResponse>) => {
    //             if (res.data.result === 'success') {
    //                 handleSuccess();
    //             }
    //         });
    // };

    const handlerUpdate = () => {
        const fileForm = new FormData();
        const textData = {
            title: title.current?.value,
            content: content.current?.value,
            loginId: userInfo.loginId,
            noticeSeq: noticeSeq,
        };
        if (fileData) fileForm.append('file', fileData);
        fileForm.append('text', new Blob([JSON.stringify(textData)], { type: 'application/json' }));
        axios.post('/board/noticeFileUpdateJson.do', fileForm).then((res: AxiosResponse<IPostResponse>) => {
            if (res.data.result === 'success') {
                handleSuccess();
            }
        });
    };

    const handlerDelete = () => {
        axios
            .post('/board/noticeDelete.do', { noticeSeq: noticeDetail?.noti_seq })
            .then((res: AxiosResponse<IPostResponse>) => {
                if (res.data.result === 'success') {
                    handleSuccess();
                }
            });
    };

    const handlerFile = (e: ChangeEvent<HTMLInputElement>) => {
        const fileInfo = e.target.files;
        if (fileInfo?.length) {
            const fileInfoSplit = fileInfo[0].name.split('.');
            const fileExtension = fileInfoSplit[1].toLowerCase();

            if (fileExtension === 'jpg' || fileExtension === 'gif' || fileExtension === 'png') {
                setImageURL(URL.createObjectURL(fileInfo[0]));
            } else {
                setImageURL('notImage');
            }
            setFileData(fileInfo[0]);
        }
    };

    return (
        <NoticeModalStyled>
            <div className="container">
                <label>
                    제목 :<input type="text" ref={title} defaultValue={noticeDetail?.noti_title}></input>
                </label>
                <label>
                    내용 : <input type="text" ref={content} defaultValue={noticeDetail?.noti_content}></input>
                </label>
                파일 :<input type="file" id="fileInput" onChange={handlerFile} style={{ display: 'none' }}></input>
                <label className="img-label" htmlFor="fileInput">
                    파일 첨부하기
                </label>
                {imageURL !== 'notImage' ? (
                    <div>
                        <label>미리보기</label>
                        <img src={imageURL} />
                    </div>
                ) : (
                    <div>
                        <label>파일명</label>
                        {fileData?.name || noticeDetail?.file_name}
                    </div>
                )}
                <div className={'button-container'}>
                    <button onClick={noticeSeq ? handlerUpdate : handlerInsert}>{noticeSeq ? '수정' : '저장'}</button>
                    {noticeSeq ? <button onClick={handlerDelete}>삭제</button> : null}

                    <button onClick={() => modalOpen()}>나가기</button>
                </div>
            </div>
        </NoticeModalStyled>
    );
};
