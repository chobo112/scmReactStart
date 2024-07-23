import { Dispatch, FC, SetStateAction, createContext, useState } from 'react';

interface Context {
    searchKeyword: object;
    setSearchKeyWord: Dispatch<SetStateAction<object>>;
}

const defaultValue: Context = {
    searchKeyword: {},
    setSearchKeyWord: () => {},
};

// context를 쉽게 비유해서 설명하자면 state 보관함입니다. 초기값과 타입을 설정해준 이유는 타입스크립트에서 빡세게 잡기 때문이다.
export const ComnCodContext = createContext<Context>(defaultValue);

// reactNode와 reactElement 차이 => reactNode가 reactElement를 포함한다.
export const ComnCodProvider: FC<{ children?: React.ReactNode | React.ReactNode[] }> = ({ children }) => {
    const [searchKeyword, setSearchKeyWord] = useState({});
    return <ComnCodContext.Provider value={{ searchKeyword, setSearchKeyWord }}>{children}</ComnCodContext.Provider>;
};
