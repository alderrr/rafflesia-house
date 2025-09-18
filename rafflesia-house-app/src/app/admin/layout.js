export default function AdminDashboardLayout({ children }) {
  return (
    <div>
      <nav>Dashboard Menu</nav>
      <main>{children}</main>
    </div>
  );
}
