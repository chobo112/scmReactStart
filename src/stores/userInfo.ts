import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { ILoginInfo } from '../models/interface/store/userInfo';
const { persistAtom } = recoilPersist();

export const loginInfoState = atom<ILoginInfo>({
    key: 'loginInfoState',
    default: {
        loginId: '',
        userNm: '',
        usrMnuAtrt: [],
        userType: '',
        serverName: '',
    },
    effects_UNSTABLE: [persistAtom],
});
