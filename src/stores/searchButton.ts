import { atom } from 'recoil';

export const searchButtonState = atom<boolean>({
    key: 'searchButtonState',
    default: false,
});
