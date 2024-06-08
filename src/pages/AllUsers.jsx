import React, { useEffect, useState } from "react";
import { Pagination, Search } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getActiveSellers } from "../features/sellerSlice/sellerSlice";
import moment from "moment";
import { getAllCustomers } from "../features/dashboardSlice/dashboardSlice";

const AllUsers = () => {
  const dispatch = useDispatch();
  const { customers, totalCustomers } = useSelector((state) => state.dashboard);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);

  useEffect(() => {
    dispatch(getAllCustomers());
  }, [dispatch]);

  return (
    <div className="px-2 lg:px-7 pt-5 relative">
      <div className="flex justify-start gap-6 text-2xl py-2 font-semibold">
        <div className="text-black">
          <span>All Customers {totalCustomers}</span>
        </div>
      </div>

      <div className="w-full p-4 bg-[#3D464D] rounded-md">
        <div className="flex justify-between items-center">
          <select
            onChange={(e) => setParPage(parseInt(e.target.value))}
            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#94A3B8] border border-slate-700 rounded-md text-[#d0d2d6]"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#cacfd5] border border-slate-700 rounded-md text-[#333]"
            type="text"
            placeholder="search"
          />
        </div>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-[#d0d2d6]">
            <thead className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
              <tr>
                <th scope="col" className="py-3 px-4">
                  No
                </th>
                <th scope="col" className="py-3 px-4">
                  First Name
                </th>
                <th scope="col" className="py-3 px-4">
                  Last Name
                </th>
                <th scope="col" className="py-3 px-4">
                  Email
                </th>
                <th scope="col" className="py-3 px-4">
                  Role
                </th>
                <th scope="col" className="py-3 px-4">
                  Registered
                </th>
                <th scope="col" className="py-3 px-4">
                  Gender
                </th>
                <th scope="col" className="py-3 px-4">
                  Country
                </th>
              </tr>
            </thead>

            <tbody>
              {customers?.map((customer, i) => (
                <tr key={i}>
                  <td className="py-1 px-4 font-medium whitespace-nowrap">
                    {i + 1}
                  </td>
                  <td className="py-1 px-4 font-medium whitespace-nowrap">
                    {customer.firstName}
                  </td>
                  <td className="py-1 px-4 font-medium whitespace-nowrap">
                    {customer.lastName}
                  </td>
                  <td className="py-1 px-4 font-medium whitespace-nowrap">
                    {customer.email}
                  </td>
                  <td className="py-1 px-4 font-medium whitespace-nowrap">
                    {customer.role}
                  </td>
                  <td className="py-1 px-4 font-medium whitespace-nowrap">
                    {moment(customer.createdAt).format("MM/DD/YYYY")}
                  </td>

                  <td className="py-1 px-4 font-medium whitespace-nowrap">
                    male
                  </td>

                  <td className="py-1 px-4 font-medium whitespace-nowrap">
                    Uzbekistan
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-full flex justify-end mt-4 bottom-4 right-4">
          {totalCustomers <= parPage ? (
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalCustomers}
              parPage={parPage}
              showItem={4}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
