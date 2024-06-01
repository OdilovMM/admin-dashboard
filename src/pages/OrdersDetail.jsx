import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "react-router-dom";
import {
  getSingleOrderDetail,
  updateOrderStatus,
} from "../features/orderSlice/orderSlice";
import { MoonLoader } from "react-spinners";

const OrdersDetail = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const { order, isLoading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getSingleOrderDetail(orderId));
  }, [dispatch, orderId]);

  const [status, setStatus] = useState("");
  useEffect(() => {
    setStatus(order?.deliveryStatus);
  }, [order]);

  const updateStatus = (e) => {
    dispatch(updateOrderStatus({ orderId, info: { status: e.target.value } }));
    setStatus(e.target.value);
  };

  return (
    <div className="px-2 lg:px-7 pt-5">
      <h2 className="text-xl p-2 text-[#333]">Order Details</h2>

      {isLoading ? (
        <div className="flex justify-center items-center w-full">
          <MoonLoader />
        </div>
      ) : (
        <div className="w-full p-4 bg-[#3D464D] rounded-md">
          <div className="flex justify-between items-center p-4">
            <select
              onChange={updateStatus}
              value={status}
              name=""
              id=""
              className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#818994] border border-slate-700 rounded-md text-[#d0d2d6]"
            >
              <option value="pending">pending</option>
              <option value="processing">processing</option>
              <option value="warehouse">warehouse</option>
              <option value="placed">placed</option>
              <option value="cancelled">cancelled</option>
            </select>
          </div>

          <div className="p-4">
            <div className="flex gap-2 text-lg text-[#d0d2d6]">
              <h2>#{order._id} /</h2>
              <span>{order.date}</span>
            </div>

            <div className="flex flex-wrap">
              <div className="w-[50%]">
                <div className="pr-3 text-[#d0d2d6] text-lg">
                  <div className="flex flex-col gap-1">
                    <h2 className="pb-2 font-semibold">
                      Deliver To : {order?.shippingInfo?.name}{" "}
                    </h2>
                    <p>
                      <span className="text-sm">
                        {order?.shippingInfo?.address} /
                        {order?.shippingInfo?.building} /
                        {order?.shippingInfo?.city} /{order?.shippingInfo?.post}{" "}
                        /{order?.shippingInfo?.state} /
                        {order?.shippingInfo?.phone} /
                      </span>
                    </p>
                  </div>

                  <div className="flex justify-start items-center gap-3">
                    <h2>Payment Status</h2>
                    <span className="text-base">{order?.paymentStatus}</span>
                  </div>

                  <span>Price : ${order?.price}</span>
                  {order?.products &&
                    order?.products.map((product, index) => (
                      <div
                        key={index}
                        className="mt-4 flex flex-col gap-4 bg-[#728382ef] rounded-sm"
                      >
                        <div className="text-white">
                          <div className="flex gap-3 text-medium p-1">
                            <img
                              className="w-[54px] h-[54px]"
                              src={product.images[0]}
                              alt=""
                            />
                            <div className="">
                              <h2>{product.name}</h2>
                              <p>
                                <span>{product?.brand}:</span>
                                <span> {product?.shopName} : </span>
                                <span> {product?.quantity}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* right */}

              <dir className="w-[50%]">
                <div className="">
                  <div className="mt-4 flex flex-col bg-[#8eafac84] rounded-md p-3">
                    {order?.suborder &&
                      order?.suborder?.map((subOrder, index) => (
                        <div key={index} className="text-white">
                          <div className="flex justify-start items-center gap-3">
                            <h2>Seller {index + 1} order:</h2>
                            <span>{subOrder?.deliveryStatus}</span>
                          </div>
                          <div className="mt-6 flex flex-col gap-4 bg-[#728382ef] rounded-sm">
                            <div className="text-white">
                              {subOrder?.products &&
                                subOrder?.products?.map((p, ind) => (
                                  <div
                                    key={ind}
                                    className="flex gap-3 text-medium mt-4"
                                  >
                                    <img
                                      className="w-[54px] h-[54px]"
                                      src={p.images[0]}
                                      alt=""
                                    />
                                    <div className="">
                                      <h2>{p?.name}</h2>
                                      <p>
                                        <span>{p.brand}</span>
                                        <span> {p.shopName} </span>
                                      </p>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </dir>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersDetail;
