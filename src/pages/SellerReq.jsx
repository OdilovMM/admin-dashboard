import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pagination, Search } from "../components";
import { FaEye } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { getSellerRequest } from "../features/sellerSlice/sellerSlice";
import { MoonLoader } from "react-spinners";

const SellerReq = () => {
  const dispatch = useDispatch();
  const { loader, sellers, totalSellers } = useSelector(
    (state) => state.seller
  );

  // *** search components states
  const [parPage, setParPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  // ***

  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      search,
    };
    dispatch(getSellerRequest(obj));
  }, [search, currentPage, parPage, dispatch]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="flex justify-start gap-6 text-2xl py-2 font-semibold">
        <div className="text-black">
          <span>Total Requests {totalSellers}</span>
        </div>
      </div>

      {loader ? (
        <div className="w-full flex justify-center items-center">
          <MoonLoader />
        </div>
      ) : (
        <div className="w-full p-4 bg-[#3D464D] rounded-md">
          {totalSellers > 0 ? (
            <Search
              setParPage={setParPage}
              setSearch={setSearch}
              search={search}
            />
          ) : (
            <></>
          )}
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
                {sellers?.map((d, i) => (
                  <tr key={i}>
                    <td className="py-1 px-4 font-medium whitespace-nowrap">
                      {i + 1}
                    </td>
                    <td className="py-1 px-4 font-medium whitespace-nowrap">
                      <img className="w-[45px] h-[45px]" src={d.image} alt="" />
                    </td>
                    <td className="py-1 px-4 font-medium whitespace-nowrap">
                      {d.name}
                    </td>

                    <td className="py-1 px-4 font-medium whitespace-nowrap">
                      {d.email}
                    </td>
                    <td className="py-1 px-4 font-medium whitespace-nowrap">
                      <span>{d.payment}</span>{" "}
                    </td>

                    <td className="py-1 px-4 font-medium whitespace-nowrap">
                      {d.status}
                    </td>

                    <td className="py-1 px-4 font-medium whitespace-nowrap">
                      <div className="flex justify-start items-center gap-4">
                        <Link
                          className="p-[6px]  rounded"
                          to={`/admin/dashboard/seller/detail/${d._id}`}
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
              totalItem={50}
              parPage={parPage}
              showItem={3}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerReq;
