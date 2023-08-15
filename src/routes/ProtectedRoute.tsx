import { useRecoilValue } from 'recoil';
import { userSelector } from '../recoil/authAtom';
import { Navigate, Outlet } from 'react-router-dom';

type Props = {
    page: JSX.Element;
};

export function ProtectedRoute({ page }: Props) {
    const isLogin = useRecoilValue(userSelector);
    console.log('라우터', isLogin);

    return isLogin ? page : <Navigate to={'/login'} replace />;
}
