import { Outlet } from "react-router-dom";
import PrivateRoute from "../routes/PrivateRoute";
import PrivateNavbar from "../components/navbar/PrivateNavbar";
import { useTheme } from "../context/ThemeContext";

const PrivateLayout = () => {
  const { darkMode } = useTheme();

  return (
    <PrivateRoute roles={["admin"]}>
      <div
        className={`flex min-h-screen w-full flex-col transition-colors duration-300 ${
          darkMode ? "bg-[#0f0c1c] text-white" : "bg-[#f5f7fb] text-[#0f0c1c]"
        } `}
      >
        {/* Navbar */}
        <PrivateNavbar />

        {/* Main Layout */}
        <main className="flex-1 overflow-y-auto">
          <div className="px-2 py-4 sm:px-3 md:px-4 lg:px-5">
            <Outlet />
          </div>
        </main>
      </div>
    </PrivateRoute>
  );
};

export default PrivateLayout;
