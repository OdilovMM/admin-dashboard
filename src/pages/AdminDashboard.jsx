import React, { useEffect } from "react";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import { IoCart } from "react-icons/io5";
import { HiMiniUsers } from "react-icons/hi2";
import { FaListCheck } from "react-icons/fa6";
import { FaTruck } from "react-icons/fa6";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAdminDashboardInfo } from "../features/dashboardSlice/dashboardSlice";
import { MoonLoader } from "react-spinners";
import { getPaymentRequestFromSeller } from "../features/paymentSlice/paymentSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { totalProducts } = useSelector((state) => state.product);
  const {
    totalSales,
    totalOrders,
    totalSellers,
    totalCustomers,
    totalCategory,
    totalDeactiveSellers,
    loader,
  } = useSelector((state) => state.dashboard);



  useEffect(() => {
    dispatch(getPaymentRequestFromSeller());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAdminDashboardInfo());
  }, [dispatch]);

  const state = {
    series: [
      {
        name: "Orders",
        data: [23, 27, 32, 45, 45, 98, 32, 12, 45, 87, 56, 15],
      },
      {
        name: "Revenue",
        data: [23, 22, 34, 46, 45, 95, 32, 16, 45, 17, 56, 15],
      },
      {
        name: "Sellers",
        data: [23, 22, 14, 26, 35, 95, 32, 36, 45, 57, 86, 12],
      },
    ],
    options: {
      color: ["#181ee8", "#181ee8"],
      plotOptions: {
        radius: 30,
      },
      chart: {
        background: "transparent",
        foreColor: "#333",
      },
      dataLabels: {
        enabled: false,
      },
      strock: {
        show: true,
        curve: ["smooth", "straight", "stepline"],
        lineCap: "butt",
        colors: "#333",
        width: 0.5,
        dashArray: 0,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apl",
          "May",
          "Jun",
          "Jul",
          "AUg",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        legend: {
          position: "top",
        },
        responsive: [
          {
            breakpoint: 565,
            yaxis: {
              categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apl",
                "May",
                "Jun",
                "Jul",
                "AUg",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
            },
            options: {
              plotOptions: {
                bar: {
                  horizontal: true,
                },
              },
              chart: {
                height: "550px",
              },
            },
          },
        ],
      },
    },
  };

  return (
    <>
      {loader ? (
        <div className="mt-4 w-full h-[300px] flex justify-center items-center">
          <MoonLoader />
        </div>
      ) : (
        <div className="px-2 md:px-7 py-9 ">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
            <div className="flex justify-between items-center  p-5 border-b-[2px] shadow-md hover:shadow-xl cursor-pointer  bg-[#FEFEFE] rounded-md gap-3">
              <div className="flex flex-col justify-start  items-start text-[#333]">
                <h2 className="text-3xl font-semibold">${totalSales}</h2>
                <span className="text-md font-semibold">Total Sales</span>
              </div>
              <div className="w-[45px] h-[45px] rounded-full justify-center items-center">
                <MdOutlineCurrencyExchange color="gray" size={45} />
              </div>
            </div>
            <div className="flex justify-between items-center  p-5 border-b-[2px] shadow-md hover:shadow-xl cursor-pointer  bg-[#FEFEFE] rounded-md gap-3">
              <div className="flex flex-col justify-start  items-start text-[#333]">
                <h2 className="text-3xl font-semibold">{totalProducts}</h2>
                <span className="text-md font-semibold">Total Products</span>
              </div>
              <div className="w-[45px] h-[45px] rounded-full  justify-center items-center">
                <IoCart color="gray" size={45} />
              </div>
            </div>
            <div className="flex justify-between items-center shadow-md bg-[#FEFEFE] hover:shadow-xl cursor-pointer p-5 border-b-[2px]  rounded-md gap-3">
              <div className="flex flex-col justify-start  items-start text-[#333]">
                <h2 className="text-3xl font-semibold">{totalSellers}</h2>
                <span className="text-md font-semibold">Total Sellers</span>
              </div>
              <div className="w-[45px] h-[45px] rounded-full  justify-center items-center">
                <HiMiniUsers color="gray" size={45} />
              </div>
            </div>
            <div className="flex justify-between items-center p-5 border-b-[2px] shadow-md hover:shadow-xl cursor-pointer  bg-[#FEFEFE] rounded-md gap-3">
              <div className="flex flex-col justify-start  items-start text-[#333]">
                <h2 className="text-3xl font-semibold">{totalCustomers}</h2>
                <span className="text-md font-semibold">Total Customers</span>
              </div>
              <div className="w-[45px] h-[45px] rounded-full  justify-center items-center">
                <HiMiniUsers color="gray" size={45} />
              </div>
            </div>
            <div className="flex justify-between items-center shadow-md p-5 border-b-[2px] hover:shadow-xl cursor-pointer  bg-[#FEFEFE] rounded-md gap-3">
              <div className="flex flex-col justify-start  items-start text-[#333]">
                <h2 className="text-3xl font-semibold">
                  {totalDeactiveSellers}
                </h2>
                <span className="text-md font-semibold">
                  Deactive Customers
                </span>
              </div>
              <div className="w-[45px] h-[45px] rounded-full  justify-center items-center">
                <HiMiniUsers color="gray" size={45} />
              </div>
            </div>
            <Link
              to="/admin/dashboard/category"
              className="flex justify-between items-center shadow-md p-5 border-b-[2px] hover:shadow-xl cursor-pointer  bg-[#FEFEFE] rounded-md gap-3"
            >
              <div className="flex flex-col justify-start  items-start text-[#333]">
                <h2 className="text-3xl font-semibold">{totalCategory}</h2>
                <span className="text-md font-semibold">Total Categories</span>
              </div>
              <div className="w-[45px] h-[45px] rounded-full  justify-center items-center">
                <FaListCheck color="gray" size={45} />
              </div>
            </Link>
            <div className="flex justify-between items-center  p-5 border-b-[2px] shadow-md hover:shadow-xl cursor-pointer  bg-[#FEFEFE] rounded-md gap-3">
              <div className="flex flex-col justify-start  items-start text-[#333]">
                <h2 className="text-3xl font-semibold">{totalOrders}</h2>
                <span className="text-md font-semibold">Total Orders</span>
              </div>
              <div className="w-[45px] h-[45px] rounded-full  justify-center items-center">
                <FaTruck color="gray" size={45} />
              </div>
            </div>
          </div>
          {/* chat box and graph */}
          <div className="w-full flex flex-wrap mt-8">
            <div className="w-full lg:w-7/12 lg:pr-3">
              <div className="w-full shadow-lg hover:shadow-xl cursor-pointer  bg-[#FEFEFE] p-4 rounded-[5px]">
                <Chart
                  options={state.options}
                  series={state.series}
                  type="bar"
                  height={350}
                />
              </div>
            </div>
          </div>

     
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
