"use client";
import { UpdateUserRole, ApproveUser } from "@/actions/users";
import { User } from "@prisma/client";
import { message, Table, Button } from "antd";
import dayjs from "dayjs";
import React from "react";

interface UsersTableProps {
  users: User[];
}

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  const [loading, setLoading] = React.useState(false);

  const onRoleChange = async (userId: string, isAdmin: boolean) => {
    try {
      setLoading(true);
      const response = await UpdateUserRole(userId, isAdmin);
      if (response.success) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onApprove = async (userId: string, currentStatus: boolean) => {
    try {
      setLoading(true);
      const response = await ApproveUser(userId, currentStatus);
      if (response.success) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Profile Pic",
      dataIndex: "profilePic",
      render: (profilePic: string) => (
        <img src={profilePic} alt="Profile Pic" width="35" className="rounded-full" />
      ),
    },
    {
      title: "Name",
      dataIndex: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Registered On",
      dataIndex: "createdAt",
      render: (createdAt: string) => dayjs(createdAt).format("MMM DD YYYY HH:mm A"),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (isActive: boolean) => (isActive ? "Active" : "Inactive"),
    },
    {
      title: "Role",
      dataIndex: "isAdmin",
      render: (isAdmin: boolean, user: User) => (
        <select
          className="border border-gray-300 py-3 px-7"
          defaultValue={isAdmin ? "admin" : "user"}
          onChange={(e) => onRoleChange(user.id, e.target.value === "admin")}
        >
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_: any, record: User) => (
        <Button
          type="primary"
          style={{
            backgroundColor: record.approved ? '#9CA3AF' : '#1B4242',
            color: 'white',
            borderColor: record.approved ? '#9CA3AF' : '#1B4242',
          }}
          onClick={() => onApprove(record.id, record.approved)}
        >
          {record.approved ? "Unapprove" : "Approve"}
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={users} columns={columns} loading={loading} />
    </div>
  );
};

export default UsersTable;
