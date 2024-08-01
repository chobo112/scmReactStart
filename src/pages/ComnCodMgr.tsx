import { ContentBox } from '../component/common/ContentBox/ContentBox';
import { ComnCodMgrMain } from '../component/page/ComnCodMgr/ComnCodMgrMain/ComnCodMgrMain';
import { ComnCodSearch } from '../component/page/ComnCodMgr/ComnCodSearch/ComnCodSearch';
import { ConmCodProvider } from '../api/provider/ComnCodMgrProvider';

export const ComnCodMgr = () => {
    return (
        <>
            <ConmCodProvider>
                <ContentBox>공통코드 관리</ContentBox>
                <ComnCodMgrMain></ComnCodMgrMain>
                <ComnCodSearch></ComnCodSearch>
            </ConmCodProvider>
        </>
    );
};
