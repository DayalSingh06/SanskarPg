import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import { useNavigate } from "react-router-dom";
import WelcomeBanner from "../../../components/common/banner/WelcomeBanner";
import TotalUsersCard from "../components/TotalUsersCard";
import TotalReviewsCard from "../components/TotalReviewsCard";
import UserTable from "../components/UserTable";
import { PlusIcon } from "../../../components/common/icons/SvgIcons";
import { useTheme } from "../../../context/ThemeContext";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const [pendingUsers, setPendingUsers] = useState([]);

  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingUsers: 0,
    registeredUsers: 0,
    rejectedUsers: 0,
  });
  const [reviewStats, setReviewStats] = useState({
    totalReviews: 0,
    verifiedReviews: 0,
    notVerifiedReviews: 0,
    percentage: 0,
  });

  // FETCH USERS
  const fetchUsers = async () => {
    try {
      const pendingRes = await axios.get("/api/admin/pending");

      setPendingUsers(pendingRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  // APPROVE USER
  const approveUser = async (id) => {
    try {
      await axios.put(`/api/admin/approve/${id}`);

      await fetchUsers();
      await getStats();
    } catch (error) {
      console.log(error);
    }
  };

  // REJECT USER
  const rejectUser = async (id) => {
    try {
      await axios.put(`/api/admin/reject/${id}`);

      await fetchUsers();
      await getStats();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const getStats = async () => {
    const usersRes = await axios.get("/api/admin/dashboard-counts");

    setStats(usersRes.data.counts);
  };

  useEffect(() => {
    getStats();
  }, []);

  const getRegisteredPercentage = () => {
    if (stats.totalUsers === 0) return 0;

    return ((stats.registeredUsers / stats.totalUsers) * 100).toFixed(1);
  };

  const getReviewStats = async () => {
    try {
      const response = await axios.get("/api/review/stats");

      setReviewStats(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReviewStats();
  }, []);

  return (
    <div
      className={`min-h-screen px-2 transition-colors duration-300 sm:px-4 ${darkMode ? "bg-[#0f0c1c] text-white" : "bg-[#f5f7fb] text-[#0f0c1c]"} `}
    >
      {/* MAIN */}
      <main className="py-6">
        <div className="mx-auto flex flex-col gap-8">
          {/* WELCOME BANNER */}
          <div className="mb-2">
            <WelcomeBanner />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <TotalUsersCard
              title="Total Users"
              total={stats.totalUsers}
              registered={stats.registeredUsers}
              rejected={stats.rejectedUsers}
              percentage={getRegisteredPercentage()}
              image="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            />

            <TotalReviewsCard
              title="Total Reviews"
              total={reviewStats.totalReviews}
              verified={reviewStats.verifiedReviews}
              notVerified={reviewStats.notVerifiedReviews}
              percentage={reviewStats.percentage}
              image="https://cdn-icons-png.flaticon.com/512/3135/3135789.png"
            />
          </div>

          {/* PENDING USERS */}
          <UserTable
            title="Pending Users"
            users={pendingUsers}
            type="pending"
            approveUser={approveUser}
            rejectUser={rejectUser}
          />
        </div>
      </main>
    </div>
  );
}
