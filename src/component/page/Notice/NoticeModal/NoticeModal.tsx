import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { NoticeModalStyled } from './styled';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useRecoilState } from 'recoil';
import { ILoginInfo } from '../../../../models/interface/store/userInfo';
import { loginInfoState } from '../../../../stores/userInfo';
import NoImage from '../../../../assets/noImage.jpg';
import { INoticeDetail, INoticeList, IPostResponse } from '../../../../models/interface/api/noticeModels';

export interface NoticeModalProps {
    modalOpen: (seq?: number) => void;
    noticeSeq?: number;
    handleSuccess: () => void;
}

// export interface IPostResponse {
//     result: string;
// }

// export interface INoticeDetail {
//     detailValue: INoticeList;
// }

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
            console.log(fileInfo);
            if (fileExtension === 'jpg' || fileExtension === 'gif' || fileExtension === 'png') {
                setImageURL(URL.createObjectURL(fileInfo[0]));
            } else {
                setImageURL('notImage');
            }
            setFileData(fileInfo[0]);
        }
    };

    const downLoadFile = async () => {
        let param = new URLSearchParams();
        param.append('noticeSeq', noticeSeq?.toString() as string);

        // blob: Binary Large Object의 약자로, 대용량 이진 데이터(0과 1로 구성 되어 있는 데이터, binary data)를 다루기 위한 객체
        const postAction: AxiosRequestConfig = {
            url: '/board/noticeDownload.do',
            method: 'POST',
            data: param,
            responseType: 'blob', // 중요한 부분: 응답 타입을 'blob'으로 설정
        };

        // a 태크를 삽입하는 이유 : 1. 브라우저 호환성(크롬, 엣지, 웨일 어디서든 가능)
        //                        2. 단순성(추가적인 라이브러리가 필요없이 쉽게 구현 가능)
        await axios(postAction).then((res) => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', noticeDetail?.file_name as string); // 파일 이름 설정
            document.body.appendChild(link);
            link.click();

            // 링크를 삭제하여 메모리 누수 방지
            link.remove();
        });
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
                <div onClick={downLoadFile}>
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
                </div>
                <div className={'button-container'}>
                    <button onClick={noticeSeq ? handlerUpdate : handlerInsert}>{noticeSeq ? '수정' : '저장'}</button>
                    {noticeSeq ? <button onClick={handlerDelete}>삭제</button> : null}

                    <button onClick={() => modalOpen()}>나가기</button>
                </div>
            </div>
        </NoticeModalStyled>
    );
};
