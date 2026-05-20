import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import UserTable from "../components/UserTable";

export default function RejectedUsersTable() {
  const [rejectedUsers, setRejectedUsers] = useState([]);

  // FETCH REJECTED USERS
  const fetchRejectedUsers = async () => {
    try {
      const res = await axios.get("/api/admin/rejected");

      setRejectedUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // APPROVE USER
  const approveUser = async (id) => {
    try {
      await axios.put(`/api/admin/approve/${id}`);

      fetchRejectedUsers();
    } catch (error) {
      console.log(error);
    }
  };

  // REJECT USER
  const rejectUser = async (id) => {
    try {
      await axios.put(`/api/admin/reject/${id}`);

      fetchRejectedUsers();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRejectedUsers();
  }, []);

  return (
    <div className="p-6">
      <UserTable
        title="Rejected Users"
        users={rejectedUsers}
        type="rejected"
        approveUser={approveUser}
        rejectUser={rejectUser}
      />
    </div>
  );
}
