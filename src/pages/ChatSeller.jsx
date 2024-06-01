import React, { useEffect, useRef, useState } from "react";
import { FaList } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";

import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { socket } from "../utils/utils";
import {
  adminMessageToSeller,
  getAdminMessages,
  getSellers,
  messageClear,
  updateSellerMessage,
} from "../features/chatSlice/chatSlice";

const ChatSeller = () => {
  const dispatch = useDispatch();
  const scrollRef = useRef();

  const {
    sellers,
    activeSeller,
    sellerAdminMessage,
    currentSeller,
    successMessage,
  } = useSelector((state) => state.chat);
  const { sellerId } = useParams();
  const [show, setShow] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [incomingMessage, setIncomingMessage] = useState("");

  useEffect(() => {
    dispatch(getSellers());
  }, [dispatch]);

  const handleSendMessageToSeller = (e) => {
    e.preventDefault();
    if (messageText) {
      dispatch(
        adminMessageToSeller({
          senderId: "",
          receiverId: sellerId,
          senderName: "Admin",
          message: messageText,
        })
      );
      setMessageText("");
    } else {
      toast.error("Enter your message");
      return;
    }
  };

  useEffect(() => {
    if (sellerId) {
      dispatch(getAdminMessages(sellerId));
    }
  }, [sellerId, dispatch]);

  useEffect(() => {
    socket.on("sellerMessage", (msg) => {
      dispatch(updateSellerMessage(msg));
      setIncomingMessage(msg);
    });
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      socket.emit(
        "adminSendMessageSeller",
        sellerAdminMessage[sellerAdminMessage.length - 1]
      );
      dispatch(messageClear());
    }
  }, [successMessage, dispatch, sellerAdminMessage]);

  useEffect(() => {
    if (incomingMessage) {
      if (
        incomingMessage.sellerId === sellerId &&
        incomingMessage.receiverId === ""
      ) {
        dispatch(updateSellerMessage(incomingMessage));
      } else {
        toast.success(incomingMessage.senderName + " " + "Send a message");
        dispatch(messageClear());
      }
    }
  }, [incomingMessage, dispatch, sellerId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sellerAdminMessage]);

  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full bg-[#3D464D] px-4 py-4 rounded-md h-[calc(100vh-140px)]">
        <div className="flex w-full h-full relative">
          <div
            className={`w-[280px] h-full absolute z-10 ${
              show ? "-left-[16px]" : "-left-[336px]"
            } md:left-0 md:relative transition-all `}
          >
            <div className="w-full h-[calc(100vh-177px)] bg-[#a9a8bc] md:bg-transparent overflow-y-auto">
              <div className="flex text-xl justify-between items-center p-4 md:p-0 md:px-3 md:pb-3 text-white">
                <h2>Sellers</h2>
                <span
                  className="block cursor-pointer md:hidden"
                  onClick={() => setShow(!show)}
                >
                  <IoMdClose />{" "}
                </span>
              </div>
              <ul className="">
                {sellers.map((seller, index) => {
                  return (
                    <li key={index} className="hover:bg-slate-600">
                      <Link
                        key={index}
                        to={`/admin/dashboard/chat-seller/${seller._id}`}
                        className={`${
                          sellerId === seller._id ? "bg-slate-600" : ""
                        } h-[60px] flex justify-start gap-0 items-center text-white px-2 py-1 rounded-sm cursor-pointer `}
                      >
                        <div className="relative">
                          <img
                            src={seller.image}
                            className="w-[39px] h-[39px] rounded-full max-w-[38px] p-[2px] border border-white-[5px]"
                            alt=""
                          />
                        </div>
                        <div className="flex justify-center items-start flex-col w-full">
                          <div className="flex flex-col justify-center items-end w-full">
                            <h2 className="font-bold">
                              {seller?.shopInfo?.shopName}
                            </h2>
                            <div>
                              {activeSeller.some(
                                (active) => active.sellerId === seller._id
                              ) ? (
                                <span className="text-[13px] text-blue-600 ">
                                  Online
                                </span>
                              ) : (
                                <span className="text-[13px] text-white ">
                                  Offline
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="w-full md:w-[calc(100%-200px)] md:pl-4">
            <div className="flex justify-between items-center">
              {sellerId && (
                <div className="flex justify-start items-center gap-3">
                  <div className="relative">
                    <img
                      // src={currentSeller.image}
                      className="w-[44px] h-[44px] rounded-full max-w-[46px] p-[2px] border-2 border-white"
                      alt=""
                    />
                  </div>
                  <div>
                    <h1 className="text-white">{currentSeller.name}</h1>
                    <div>
                      {activeSeller.some(
                        (active) => active.sellerId === currentSeller._id
                      ) ? (
                        <span className="text-[13px] text-blue-600 ">
                          Online
                        </span>
                      ) : (
                        <span className="text-[13px] text-white ">Offline</span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div
                onClick={() => setShow(!show)}
                className="w-[35px] flex md:hidden h-[35px] rounded-sm bg-blue-500 shadow-lg hover:shadow-blue-500 justify-center cursor-pointer items-center text-white"
              >
                <span>
                  <FaList />
                </span>
              </div>
            </div>

            <div className="py-4">
              <div className="bg-[#98a3a4eb] h-[calc(100vh-290px)] rounded-[5px] overflow-y-scroll">
                {sellerId ? (
                  sellerAdminMessage.map((message, index) => {
                    if (message.senderId === sellerId) {
                      return (
                        <div
                          ref={scrollRef}
                          key={index}
                          className="w-full flex justify-start items-center "
                        >
                          <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                            <div>
                              <img
                                src="https://pics.craiyon.com/2023-07-15/dc2ec5a571974417a5551420a4fb0587.webp"
                                className="w-[44px] h-[44px] rounded-full max-w-[46px] p-[2px] border-2 border-white"
                                alt=""
                              />
                            </div>
                            <div className="flex justify-center items-start flex-col bg-blue-300 text-[#333]  px-2 rounded-tl-full rounded-tr-full rounded-br-full">
                              <span>{message.message}</span>
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          ref={scrollRef}
                          key={index}
                          className="w-full flex justify-end items-center "
                        >
                          <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                            <div className="flex justify-center items-start flex-col bg-blue-300 text-[#333] px-2 rounded-tl-full rounded-bl-full rounded-tr-full ">
                              <span>{message.message}</span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })
                ) : (
                  <div className="w-full h-full flex justify-center bg-slate-600 rounded-md items-center">
                    <span className="text-[18px] text-white  font-bold">
                      Select a Seller
                    </span>
                  </div>
                )}
              </div>
            </div>

            {sellerId && (
              <form className="flex gap-3" onSubmit={handleSendMessageToSeller}>
                <input
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  type="text"
                  className="w-full flex justify-between px-2 border rounded-[5px] border-slate-700 items-center py-[5px] outline-none bg-[#85a8ac83]"
                  placeholder="Type your text"
                />
                <button className="shadow-lg bg-green-600 rounded-md px-4 py-2 h-[36px] ">
                  Send
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSeller;
