import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={styles.navbar}>
      <h3 style={styles.title}>Task Dashboard</h3>
      <button onClick={handleLogout} style={styles.logoutBtn}>
        Logout
      </button>
    </div>
  );
}

const styles = {
  navbar: {
    background: "#f8fafc",
    padding: "16px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #e5e7eb",
  },
  title: {
    color: "#2563eb",
    fontWeight: "600",
  },
  logoutBtn: {
    background: "#fee2e2",
    color: "#b91c1c",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  },
};
