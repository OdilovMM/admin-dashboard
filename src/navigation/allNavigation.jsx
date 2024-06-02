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
    path: "/admin/dashboard",
  },
  {
    id: 2,
    title: "Orders",
    icon: <FaBasketShopping />,
    path: "/admin/dashboard/orders",
  },
  {
    id: 3,
    title: "Category",
    icon: <TbCategoryFilled />,
    path: "/admin/dashboard/category",
  },
  {
    id: 4,
    title: "Sellers",
    icon: <LuUsers />,
    path: "/admin/dashboard/sellers",
  },
  {
    id: 5,
    title: "Payment",
    icon: <MdPayments />,
    path: "/admin/dashboard/payment-request",
  },
  {
    id: 6,
    title: "Block Seller",
    icon: <FaUserLock />,
    path: "/admin/dashboard/block-seller",
  },
  {
    id: 7,
    title: "Request",
    icon: <CiSquareQuestion />,
    path: "/admin/dashboard/sellers-request",
  },
];
