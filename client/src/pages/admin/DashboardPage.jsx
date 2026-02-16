// import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../api/auth";

const DashboardPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/admin/login");
  };
  return (
    <>
      <div>
        Dashboard
        <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
};

export default DashboardPage;
