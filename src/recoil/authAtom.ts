import { atom, selector } from 'recoil';
import { getType } from '../api/auth';

export const userAtom = atom({
    key: 'userAtom',
    default: undefined,
});

export const weatherAtom = atom({
    key: 'weatherAtom',
    default: getType('weather'),
});

export const emotionAtom = atom({
    key: 'emotionAtom',
    default: getType('emotion'),
});

export const dateAtome = atom({
    key: 'monthAtome',
    default: new Date(),
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
