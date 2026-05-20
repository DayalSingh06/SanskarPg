import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import UserTable from "../components/UserTable";

export default function RegisteredUsersTable() {
  const [registeredUsers, setRegisteredUsers] = useState([]);

  // FETCH REGISTERED USERS
  const fetchRegisteredUsers = async () => {
    try {
      const res = await axios.get("/api/admin/registered");

      setRegisteredUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // APPROVE USER
  const approveUser = async (id) => {
    try {
      await axios.put(`/api/admin/approve/${id}`);

      fetchRegisteredUsers();
    } catch (error) {
      console.log(error);
    }
  };

  // REJECT USER
  const rejectUser = async (id) => {
    try {
      await axios.put(`/api/admin/reject/${id}`);

      fetchRegisteredUsers();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRegisteredUsers();
  }, []);

  return (
    <div className="p-6">
      <UserTable
        title="Registered Users"
        users={registeredUsers}
        type="registered"
        approveUser={approveUser}
        rejectUser={rejectUser}
      />
    </div>
  );
}
