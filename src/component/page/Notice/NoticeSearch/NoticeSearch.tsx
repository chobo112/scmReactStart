import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { modalState } from '../../../../stores/modalState';
import { NoticeSearchStyled } from './styled';
import { Button } from '../../../common/Button/Button';

export const NoticeSearch = () => {
    const title = useRef<HTMLInputElement>(null);
    const [startDate, setStartDate] = useState<string>();
    const [endDate, setEndDate] = useState<string>();
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const navigate = useNavigate();

    const handlerSearch = () => {
        const query: string[] = [];
        !title.current?.value || query.push(`searchTitle=${title.current?.value}`);
        !startDate || query.push(`searchStDate=${startDate}`);
        !endDate || query.push(`searchEdDate=${endDate}`);
        const queryString = query.length > 0 ? `?${query.join('&')}` : '';
        navigate(`/react/board/notice.do${queryString}`);
    };
    const handlerModal = () => {
        setModal(!modal);
    };
    return (
        <NoticeSearchStyled>
            <input ref={title}></input>
            <input
                type="date"
                onChange={(e) => {
                    setStartDate(e.target.value);
                }}
            ></input>
            <input
                type="date"
                onChange={(e) => {
                    setEndDate(e.target.value);
                }}
            ></input>
            <Button width={70} paddingtop={8} paddingbottom={8} fontSize={15} onClick={handlerSearch}>
                검색
            </Button>
            <Button fontSize={15} paddingtop={8} paddingbottom={8} onClick={handlerModal}>
                신규등록
            </Button>
        </NoticeSearchStyled>
    );
};
