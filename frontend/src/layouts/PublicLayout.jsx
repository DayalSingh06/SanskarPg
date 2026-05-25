import { Outlet } from "react-router-dom";
import PublicNavbar from "../components/navbar/PublicNavbar.jsx";
import PublicFooter from "../components/footer/PublicFooter.jsx";

const PublicLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicNavbar />
      <main className="grow">
        <Outlet />
      </main>

      <PublicFooter />
    </div>
  );
};

export default PublicLayout;
