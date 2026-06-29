import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
