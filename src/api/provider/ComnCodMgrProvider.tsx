import { FC, createContext, useState } from 'react';

interface Context {
    searchKeyword: object;
    setSearchKeyword: (keyword: object) => void;
}

const defaultValue: Context = {
    searchKeyword: {},
    setSearchKeyword: () => {},
};

export const ConmCodContext = createContext(defaultValue);

export const ConmCodProvider: FC<{ children: React.ReactNode | React.ReactNode[] }> = ({ children }) => {
    const [searchKeyword, setSearchKeyword] = useState({});
    return <ConmCodContext.Provider value={{ searchKeyword, setSearchKeyword }}>{children}</ConmCodContext.Provider>;
};
