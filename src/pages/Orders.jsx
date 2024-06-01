import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineOpenWith } from "react-icons/md";
import { Pagination, Search } from "../components";
import { getAdminAllOrders } from "../features/orderSlice/orderSlice";
import { MoonLoader } from "react-spinners";

const Orders = () => {
  const dispatch = useDispatch();
  const { totalOrders, isLoading, myOrders } = useSelector(
    (state) => state.order
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);

  const [show, setShow] = useState(false);

  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(getAdminAllOrders(obj));
  }, [searchValue, currentPage, parPage, dispatch]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      {isLoading ? (
        <div className="w-full flex justify-center items-center">
          <MoonLoader />
        </div>
      ) : (
        <div className="w-full p-4 bg-[#FEFEFE] min-h-[400px] hover:shadow-2xl cursor-pointer shadow-xl rounded-[5px] ">
          <div className="flex justify-between items-center">
            <select
              onChange={(e) => setParPage(parseInt(e.target.value))}
              className="px-4 py-2 hover:border-indigo-400 outline-none bg-slate-200 cursor-pointer  border-slate-600 rounded-md text-[#333] "
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>

            <input
              onChange={(e) => setSearchValue(e.target.value)}
              type="text"
              name="search"
              className="bg-[#E2DDDD] px-4 py-1 focus:border-indigo-400 outline-none"
              placeholder="search"
            />
          </div>

          <div className="relative mt-5 overflow-x-auto">
            <div className="w-full text-sm text-left bg-[#FEFEFE]">
              <div className="text-sm text-[#333] uppercase border-b border-slate-500 ">
                <div className="flex justify-between items-center">
                  <div className="py-3 w-[25%] font-bold ">Order ID</div>
                  <div className="py-3 w-[14%] font-bold ">PRICE</div>
                  <div className="py-3 w-[19%] font-bold ">Payment Status</div>
                  <div className="py-3 w-[19%] font-bold ">Order status</div>
                  <div className="py-3 w-[19%] font-bold ">Action</div>
                  <div className="py-3 w-[9%] font-bold "></div>
                </div>
              </div>
            </div>
          </div>

          {myOrders.map((myOrder, index) => (
            <div key={index} className=" text-[#333]  ">
              <div className="flex justify-between items-start border-b border-slate-600">
                <div className="py-3 w-[25%] font-medium whitespace-nowrap ">
                  #{myOrder._id}
                </div>
                <div className="py-3 w-[14%] font-medium ">
                  ${myOrder.price}
                </div>
                <div className="py-3 w-[19%] font-medium ">
                  {myOrder.paymentStatus}
                </div>
                <div className="py-3 w-[19%] font-medium ">
                  {myOrder.deliveryStatus}
                </div>
                <div className="py-3 w-[19%] font-medium ">
                  <Link to={`/admin/dashboard/orders/details/${myOrder._id}`}>
                    View
                  </Link>
                </div>
                <div
                  onClick={(e) => setShow(myOrder._id)}
                  className="py-3 w-[9%] font-medium "
                >
                  <MdOutlineOpenWith
                    size={16}
                    color="gray"
                    className="cursor-pointer"
                  />
                </div>
              </div>
              <div
                className={
                  show === myOrder._id
                    ? "block border-b border-slate-500 bg-slate-200 transition-all duration-300"
                    : "hidden"
                }
              >
                {myOrder.suborder.map((sub, index) => (
                  <div
                    key={index}
                    className="flex justify-start items-start border-b border-slate-800"
                  >
                    <div className="py-3 w-[24%] font-medium whitespace-nowrap ">
                      #{sub._id}
                    </div>
                    <div className="py-3 w-[13%] font-medium ">
                      ${sub.price}
                    </div>
                    <div className="py-3 w-[18%] font-medium ">
                      {sub.paymentStatus}
                    </div>
                    <div className="py-3 w-[19%] font-medium ">
                      {sub.deliveryStatus}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="w-full justify-center items-center flex mt-1 bottom-1 right-2">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalOrders}
              pages={parPage}
              showItem={4}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
