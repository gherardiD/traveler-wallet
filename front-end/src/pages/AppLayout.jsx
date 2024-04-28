// import AppNav from "../components/AppNav";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import styles from "./AppLayout.module.css";
import Map from "../components/Map";
import User from "../components/User";

function AppLayout() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className={styles.app}>
      <SideBar />
      <Map />
      <User />
    </div>
  );
}

export default AppLayout;
