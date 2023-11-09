import Content from "../../components/main/Content";
import Header from "../../components/global/Header";
import Sidebar from "../../components/global/Sidebar";
// import { useLocation } from "react-router-dom";

const Dashboard = () => {
  // const location = useLocation();
  // const id = Number(location.pathname.split("/")[2]);

  return (
    <div>
      <Header />
      <Sidebar/>
      <Content/>
    </div>
  );
};

export default Dashboard;
