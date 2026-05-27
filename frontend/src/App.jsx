import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";
import PrivateLayout from "./layouts/PrivateLayout.jsx";

import Home from "./pages/Home.jsx";
import Facilities from "./pages/Facilities.jsx";
import Rules from "./pages/Rules.jsx";
import PGDetail from "./pages/PgDetail.jsx";
import WeeklyMenu from "./pages/Menu.jsx";

import Register from "./features/auth/pages/Register.jsx";
import Login from "./features/auth/pages/Login.jsx";

import AdminDashboard from "./features/admin/pages/AdminDashboard.jsx";
import Menu from "./features/admin/pages/Menu.jsx";
import AllPg from "./features/admin/pages/AllPg.jsx";
import AddPg from "./features/admin/components/AddPg.jsx";
import PgInfo from "./features/admin/components/PgInfo.jsx";
import UpdatePgDetails from "./features/admin/components/UpdatePgDetails.jsx";

import RegisteredUsersTable from "./features/admin/pages/RegisteredUsersTable.jsx";
import RejectedUsersTable from "./features/admin/pages/RejectedUsersTable.jsx";
import VerifiedReviews from "./features/admin/pages/VerifiedReviews.jsx";
import NotVerifiedReviews from "./features/admin/pages/NotVerifiedReviews.jsx";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/menu" element={<WeeklyMenu />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pg/:id" element={<PGDetail />} />
        </Route>

        <Route element={<PrivateLayout />}>
          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />
          <Route path="/admin/menu" element={<Menu />} />
          <Route path="/admin/allpg" element={<AllPg />} />
          <Route path="/admin/addPg" element={<AddPg />} />
          <Route path="/pg/:id" element={<PgInfo />} />
          <Route path="/update/:id" element={<UpdatePgDetails />} />

          <Route
            path="/admin/registered-users"
            element={<RegisteredUsersTable />}
          />
          <Route
            path="/admin/rejected-users"
            element={<RejectedUsersTable />}
          />
          <Route
            path="/admin/verified-reviews"
            element={<VerifiedReviews />}
          />

          <Route
            path="/admin/not-verified-reviews"
            element={<NotVerifiedReviews />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
