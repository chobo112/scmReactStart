import { ComnCodProvider } from '../api/provider/ComnCodProvider';
import { ContentBox } from '../component/common/ContentBox/ContentBox';
import { ComnCodMgrMain } from '../component/page/ComnCodMgr/ComnCodMgrMain/ComnCodMgrMain';
import { ComnCodMgrSearch } from '../component/page/ComnCodMgr/ComnCodMgrSearch/ComnCodMgrSearch';

export const ComnCodMgr = () => {
    return (
        <>
            <ComnCodProvider>
                {/* children 타입이 React.ReactElement일 경우 아래와 같이 조건문을 사용할 수 없다 */}
                {/* {1 == 1 ? '안녕' : '안녕1'} */}
                {/* 하지만 이건 가능 */}
                {/* {1 == 1 ? <div>3</div> : <div>2</div>} */}
                <ContentBox>공통코드</ContentBox>
                <ComnCodMgrMain></ComnCodMgrMain>
                <ComnCodMgrSearch></ComnCodMgrSearch>
            </ComnCodProvider>
        </>
    );
};
