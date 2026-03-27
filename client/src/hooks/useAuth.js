export function useAuth() {
  const token = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return {
    token,
    user,
    isAuthenticated: !!token,
    isAdmin: user?.role === "admin",
    isStaff: user?.role === "staff",
  };
}
