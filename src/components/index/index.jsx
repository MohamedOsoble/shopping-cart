import { Outlet } from "react-router-dom";
import Navbar from "../navbar/navbar";

const Index = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Index;
