import { useContext, useState } from 'react';
import { Button } from '../../../common/Button/Button';
import { ComnCodSearchStyled } from './styled';
import { ConmCodContext } from '../../../../api/provider/ComnCodMgrProvider';

export const ComnCodSearch = () => {
    const { setSearchKeyword } = useContext(ConmCodContext);
    const [input, setInput] = useState<{
        oname: string;
        sname: string;
    }>({
        oname: '',
        sname: '',
    });

    const handlerSearch = () => {
        setSearchKeyword(input);
    };
    return (
        <ComnCodSearchStyled>
            <select onChange={(e) => setInput({ ...input, oname: e.currentTarget.value })}>
                <option value={'grp_cod'}>그룹코드</option>
                <option value={'grp_cod_nm'}>그룹코드명</option>
            </select>
            <input onChange={(e) => setInput({ ...input, sname: e.target.value })}></input>
            <Button paddingtop={5} paddingbottom={5} onClick={handlerSearch}>
                검색
            </Button>
        </ComnCodSearchStyled>
    );
};
