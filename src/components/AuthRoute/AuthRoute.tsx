import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

export const AuthRoute = () => (
  <>
    {/* localStorage.getItem */}
    <div>{!Cookies.get('access_token') ? <Navigate to="/" /> : <Outlet />}</div>
  </>
);

export default AuthRoute;

