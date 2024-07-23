import { useContext, useState } from 'react';
import { Button } from '../../../common/Button/Button';
import { ComnCodMgrSearchStyled } from './styled';
import { ComnCodContext } from '../../../../api/provider/ComnCodProvider';

export const ComnCodMgrSearch = () => {
    const { searchKeyword, setSearchKeyWord } = useContext(ComnCodContext);
    const [input, setInput] = useState({});
    const conditionChange = () => {
        setSearchKeyWord(input);
    };
    return (
        <ComnCodMgrSearchStyled>
            <select onChange={(e) => setInput({ ...input, oname: e.currentTarget.value })}>
                <option value={'grp_cod'}>그룹코드</option>
                <option value={'grp_cod_nm'}>그룹코드명</option>
            </select>
            <input onChange={(e) => setInput({ ...input, sname: e.target.value })}></input>
            <Button paddingtop={5} paddingbottom={5} onClick={conditionChange}>
                검색
            </Button>
        </ComnCodMgrSearchStyled>
    );
};
