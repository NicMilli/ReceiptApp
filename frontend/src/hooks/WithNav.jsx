import { Outlet } from 'react-router';
import Navbar from "../components/Navbar";

const WithNav = () => {
  return (
    <>
      <Outlet />
      <Navbar />
    </>
  );
};

export default WithNav

