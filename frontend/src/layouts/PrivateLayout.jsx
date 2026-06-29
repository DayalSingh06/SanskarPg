import { Outlet } from 'react-router-dom';
import PrivateNavbar from '../components/navbar/PrivateNavbar';
import { useTheme } from '../context/ThemeContext';

const PrivateLayout = () => {
  const { darkMode } = useTheme();

  return (
    <div
      className={`flex min-h-screen w-full flex-col overflow-x-hidden transition-colors duration-300 ${
        darkMode ? 'bg-[#0f0c1c] text-white' : 'bg-[#f5f7fb] text-[#0f0c1c]'
      }`}
    >
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full">
        <PrivateNavbar />
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="mx-auto w-full max-w-400 px-1 sm:px-1 md:px-1 lg:px-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default PrivateLayout;
