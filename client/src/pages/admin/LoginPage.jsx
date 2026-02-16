import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import api from "../../api/api";
import { saveToken } from "../../api/auth";

const LoginPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/api/v1/admin/login", {
        username,
        password,
      });

      saveToken(data.access_token);

      navigate("/admin/dashboard");
    } catch (err) {
      Toastify({
        text: err.response.data.message,
        className: "info",
        style: {
          background: "linear-gradient(to right, #ff9a00, #ff5a00)",
        },
      }).showToast();
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginPage;
