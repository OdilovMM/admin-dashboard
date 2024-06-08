import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pagination, Search } from "../components";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getDeactiveSellers } from "../features/sellerSlice/sellerSlice";
import { MoonLoader } from "react-spinners";

const DeactiveSeller = () => {
  const dispatch = useDispatch();
  const { totalDeactives, deactiveSellers, loader } = useSelector(
    (state) => state.seller
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);

  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(getDeactiveSellers(obj));
  }, [searchValue, currentPage, parPage, dispatch]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="flex justify-start gap-6 text-2xl py-2 font-semibold">
        <div className="text-black">
          <span>Total Deactives {totalDeactives}</span>
        </div>
      </div>

      {loader ? (
        <div className="w-full flex justify-center items-center">
          <MoonLoader />
        </div>
      ) : (
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
                    Image
                  </th>
                  <th scope="col" className="py-3 px-4">
                    Name
                  </th>
                  <th scope="col" className="py-3 px-4">
                    Shop Name
                  </th>
                  <th scope="col" className="py-3 px-4">
                    Email
                  </th>
                  <th scope="col" className="py-3 px-4">
                    Payment Status
                  </th>

                  <th scope="col" className="py-3 px-4">
                    Status
                  </th>

                  <th scope="col" className="py-3 px-4">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {deactiveSellers?.map((deActiveSeller, i) => (
                  <tr key={i}>
                    <td className="py-1 px-4 font-medium whitespace-nowrap">
                      {i + 1}
                    </td>
                    <td className="py-1 px-4 font-medium whitespace-nowrap">
                      <img
                        className="w-[45px] h-[45px]"
                        src={deActiveSeller.image}
                        alt=""
                      />
                    </td>
                    <td className="py-1 px-4 font-medium whitespace-nowrap">
                      {deActiveSeller.name}
                    </td>

                    <td className="py-1 px-4 font-medium whitespace-nowrap">
                      {deActiveSeller?.shopInfo?.shopName}
                    </td>
                    <td className="py-1 px-4 font-medium whitespace-nowrap">
                      {deActiveSeller.email}
                    </td>
                    <td className="py-1 px-4 font-medium whitespace-nowrap">
                      {deActiveSeller.payment}
                    </td>

                    <td className="py-1 px-4 font-medium whitespace-nowrap">
                      {deActiveSeller.status}
                    </td>

                    <td className="py-1 px-4 font-medium whitespace-nowrap">
                      <div className="flex justify-start items-center gap-4">
                        <Link
                          to={`/admin/dashboard/seller/detail/${deActiveSeller._id}`}
                          className="p-[6px]  rounded  "
                        >
                          <FaEye />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="w-full flex justify-end mt-4 bottom-4 right-4">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalDeactives}
              parPage={parPage}
              showItem={4}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DeactiveSeller;
