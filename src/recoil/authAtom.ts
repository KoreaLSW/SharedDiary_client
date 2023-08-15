import { useQuery } from 'react-query';
import { atom, selector, useRecoilValue } from 'recoil';
import { me } from '../api/auth';
import { setLocal } from '../localstorage/localstorage';
console.log('리코일!');

export const userAtom = atom({
    key: 'CartAtom',
    default: undefined,
});

export const userSelector = selector({
    key: 'UserSelector',
    get: ({ get }) => !!get(userAtom),
});

// export const QuantitySelector = selector({
//     key: 'QuantitySelector',
//     get: ({ get }) => {
//         const CurrentItem = get(CartAtom);
//         return CurrentItem.length.toLocaleString();
//     },
// });
