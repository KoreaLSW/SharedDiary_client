import { atom, selector } from 'recoil';

export const userAtom = atom({
    key: 'userAtom',
    default: undefined,
});

export const weatherAtom = atom({
    key: 'weatherAtom',
    default: undefined,
});

export const emotionAtom = atom({
    key: 'emotionAtom',
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
