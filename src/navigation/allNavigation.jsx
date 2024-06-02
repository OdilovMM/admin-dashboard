import { RxDashboard } from "react-icons/rx";
import { FaBasketShopping, FaUserLock } from "react-icons/fa6";
import { TbCategoryFilled } from "react-icons/tb";
import { LuUsers } from "react-icons/lu";
import { MdPayments } from "react-icons/md";
import { CiSquareQuestion } from "react-icons/ci";

export const allNav = [
  {
    id: 1,
    title: "Dashboard",
    icon: <RxDashboard />,
    role: "admin",
    path: "/admin/dashboard",
  },
  {
    id: 2,
    title: "Orders",
    icon: <FaBasketShopping />,
    role: "admin",
    path: "/admin/dashboard/orders",
  },
  {
    id: 3,
    title: "Category",
    icon: <TbCategoryFilled />,
    role: "admin",
    path: "/admin/dashboard/category",
  },
  {
    id: 4,
    title: "Sellers",
    icon: <LuUsers />,
    role: "admin",
    path: "/admin/dashboard/sellers",
  },
  {
    id: 5,
    title: "Payment",
    icon: <MdPayments />,
    role: "admin",
    path: "/admin/dashboard/payment-request",
  },
  {
    id: 6,
    title: "Block Seller",
    icon: <FaUserLock />,
    role: "admin",
    path: "/admin/dashboard/block-seller",
  },
  {
    id: 7,
    title: "Request",
    icon: <CiSquareQuestion />,
    role: "admin",
    path: "/admin/dashboard/sellers-request",
  },
];
