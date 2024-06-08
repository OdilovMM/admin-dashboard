import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ScaleLoader } from "react-spinners";
import {
  getSellerDetail,
  updateSellerStatus,
} from "../features/sellerSlice/sellerSlice";
import { MoonLoader } from "react-spinners";

const SellerDetail = () => {
  const navigate = useNavigate();
  const { seller, loader, success } = useSelector((state) => state.seller);
  const { sellerId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSellerDetail(sellerId));
  }, [dispatch, sellerId]);

  const [status, setStatus] = useState("");

  const handleStatusSubmit = (e) => {
    e.preventDefault();

    dispatch(
      updateSellerStatus({
        sellerId,
        status,
      })
    );
    if (success) {
      navigate("/admin/dashboard/sellers");
    }
  };

  useEffect(() => {
    if (seller) {
      setStatus(seller.status);
    }
  }, [seller]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <h1 className="text-[20px] font-bold mb-3 text-[#333] ">
        Details of {seller?.firstName}
      </h1>
      {loader ? (
        <div className="flex justify-center items-center w-full">
          <MoonLoader />
        </div>
      ) : (
        <div className="w-full p-4 bg-[#3D464D] rounded-md">
          <div className="w-full flex flex-wrap text-[#fff]">
            <div className="w-3/12 flex justify-center items-center py-3">
              <div>
                {seller?.image ? (
                  <img className="w-full h-[230px]" src={seller.image} alt="" />
                ) : (
                  <span>Image Not uploaded</span>
                )}
              </div>
            </div>

            <div className="w-4/12">
              <div className="px-0 md:px-5 py-2">
                <div className="py-2 text-lg">
                  <h2>Basic Info</h2>
                </div>

                <div className="flex justify-between text-xl text-[#fff] flex-col gap-2 p-4 bg-[#616b72] rounded-md">
                  <div className="flex gap-2 font-semibold text-[#fff]">
                    <span>First Name : </span>
                    <span>{seller?.firstName} </span>
                  </div>
                  <div className="flex gap-2 font-semibold text-[#fff]">
                    <span>Last Name : </span>
                    <span>{seller?.lastName} </span>
                  </div>
                  <div className="flex gap-2 font-semibold ">
                    <span>Email : </span>
                    <span>{seller?.email} </span>
                  </div>

                  <div className="flex gap-2 font-semibold ">
                    <span>Role : </span>
                    <span>{seller?.role} </span>
                  </div>
                  <div className="flex gap-2 font-semibold ">
                    <span>Status : </span>
                    <span>{seller?.status} </span>
                  </div>
                  <div className="flex gap-2 font-semibold ]">
                    <span>Payment Status : </span>
                    <span>{seller?.payment} </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-4/12">
              <div className="px-0 md:px-5 py-2">
                <div className="py-2 text-lg">
                  <h2>Address</h2>
                </div>

                <div className="flex justify-between text-[#fff] text-sm flex-col gap-2 p-4 bg-[#616b72] rounded-md">
                  <div className="flex gap-2 font-bold text-[#fff]">
                    <span>Shop Name : </span>
                    <span>{seller?.shopInfo?.shopName} </span>
                  </div>
                  <div className="flex gap-2 font-bold ">
                    <span>Region : </span>
                    <span>{seller?.shopInfo?.division} </span>
                  </div>

                  <div className="flex gap-2 font-bold ">
                    <span>Address : </span>
                    <span>{seller?.shopInfo?.district} </span>
                  </div>
                  <div className="flex gap-2 font-bold ">
                    <span>Contact Number : </span>
                    <span>{seller?.shopInfo?.subDistrict} </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleStatusSubmit}>
              <div className="flex gap-4 py-3">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="px-4 py-2 focus:border-[#3D464D] outline-none bg-[#5c666e] border border-slate-700 rounded-md text-[#d0d2d6]"
                  name=""
                  id=""
                  required
                >
                  <option value="">-- Select Status --</option>
                  <option value="active">Active</option>
                  <option value="deactive">De-active</option>
                </select>

                <button
                  type="submit"
                  disabled={loader ? true : false}
                  className="group bg-[#4c9ddc] w-[170px] hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2"
                >
                  {loader ? (
                    <ScaleLoader
                      color="#fff"
                      height={14}
                      width={5}
                      radius={1}
                    />
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerDetail;
