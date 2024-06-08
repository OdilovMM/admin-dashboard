import { FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CiBellOn } from "react-icons/ci";
import { FaBell } from "react-icons/fa6";
import { getPaymentRequestFromSeller } from "../features/paymentSlice/paymentSlice";
import { useEffect } from "react";

const Header = ({ showBar, setShowBar }) => {
  const { adminInfo } = useSelector((state) => state.auth);
  const { pendingWithdraws } = useSelector((state) => state.payment);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPaymentRequestFromSeller());
  }, [dispatch]);

  return (
    <div className="fixed top-0 left-0 w-full py-5 px-2 lg:px-7 z-40 shadow-xl bg-[#FEFEFE]">
      <div className="ml-0 lg:ml-[260px] rounded-sm h-[64px]  flex justify-between items-center  px-5 transition-all">
        <div
          onClick={() => setShowBar(!showBar)}
          className="w-[35px] flex lg:hidden h-[35px] rounded-sm  shadow-sm hover:shadow-indigo-500/50 justify-center items-center cursor-pointer transition-all duration-400"
        >
          <span>
            <FaBars size={26} />
          </span>
        </div>
        <div className="hidden md:block relative "></div>

        {/* notifications */}

        <div className="flex justify-center items-center gap-8 relative">
          <div className="flex justify-center items-center gap-6">
            <div className="relative">
              <div className=" w-[45px]">
                <FaBell size={35} color="gray" />
              </div>
              {pendingWithdraws.length > 0 ? (
                <span className="absolute top-[-15px] right-[-6px] bg-green-400 p-3 font-semibold text-md py-1 rounded-full flex justify-center items-center">
                  1
                </span>
              ) : (
                ""
              )}
            </div>

            <div className="flex justify-center items-center gap-4">
              <div className="flex justify-center items-center flex-col text-end">
                <h1 className="text-md font-bold">{adminInfo?.firstName}</h1>
                <h1 className="text-md font-bold">{adminInfo?.lastName}</h1>
                <span className="text-[14px] uppercase w-full font-normal">
                  {adminInfo?.role}
                </span>
              </div>
              <Link to="/admin/dashboard">
                {adminInfo.role === "admin" ? (
                  <img
                    src="https://pics.craiyon.com/2023-07-15/dc2ec5a571974417a5551420a4fb0587.webp"
                    alt=""
                    className="w-[45px] h-[45px] cursor-pointer rounded-full overflow-hidden object-cover"
                  />
                ) : (
                  <Link to="/seller/dashboard/profile">
                    <img
                      src={adminInfo.image}
                      alt=""
                      className="w-[45px] h-[45px] cursor-pointer rounded-full overflow-hidden object-cover"
                    />
                  </Link>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
