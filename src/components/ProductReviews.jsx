import React, { useEffect, useState } from "react";
import RatingTemps from "./RatingTemps";
import Rating from "./Rating";
import Pagination from "./Pagination";
import { useSelector, useDispatch } from "react-redux";
import { getAllReviews } from "./../features/productSlice/productSlice";

const ProductReviews = ({ product }) => {
  const dispatch = useDispatch();

  const { totalReviews, ratingReview, reviews, isLoading } = useSelector(
    (state) => state.product
  );

  const [parPage, setParPage] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    if (product._id) {
      dispatch(
        getAllReviews({
          productId: product._id,
          pageNumber,
        })
      );
    }
  }, [dispatch, pageNumber, product]);

  return (
    <div className="mt-8">
      <div className="flex gap-10 justify-between  md-lg:flex-col">
        <div className="flex flex-col gap-2 justify-start items-start py-4">
          <div>
            <span className="text-6xl font-semibold">{product?.rating}</span>
            <span className="text-3xl font-semibold text-slate-600">/5</span>
          </div>
          <div className="flex text-3xl md:w-full">
            <Rating ratings={product.rating} />
          </div>
          <p className="text-sm text-slate-600">({totalReviews}) Reviews</p>
        </div>

        <div className="flex gap-2 flex-col py-4">
          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemps rating={5} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div
                style={{
                  width: `${Math.floor(
                    (100 * (ratingReview[0]?.sum || 0)) / totalReviews
                  )}%`,
                }}
                className="h-full bg-[#Edbb0E] w-[60%]"
              ></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">
              {ratingReview[0]?.sum}
            </p>
          </div>

          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemps rating={4} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div
                style={{
                  width: `${Math.floor(
                    (100 * (ratingReview[1]?.sum || 0)) / totalReviews
                  )}%`,
                }}
                className="h-full bg-[#Edbb0E] w-[60%]"
              ></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">
              {" "}
              {ratingReview[1]?.sum}
            </p>
          </div>

          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemps rating={3} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div
                style={{
                  width: `${Math.floor(
                    (100 * (ratingReview[2]?.sum || 0)) / totalReviews
                  )}%`,
                }}
                className="h-full bg-[#Edbb0E] w-[60%]"
              ></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">
              {ratingReview[2]?.sum}
            </p>
          </div>

          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemps rating={2} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div
                style={{
                  width: `${Math.floor(
                    (100 * (ratingReview[3]?.sum || 0)) / totalReviews
                  )}%`,
                }}
                className="h-full bg-[#Edbb0E] w-[60%]"
              ></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">
              {ratingReview[3]?.sum}
            </p>
          </div>

          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemps rating={1} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div
                style={{
                  width: `${Math.floor(
                    (100 * (ratingReview[4]?.sum || 0)) / totalReviews
                  )}%`,
                }}
                className="h-full bg-[#Edbb0E] w-[60%]"
              ></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">
              {ratingReview[4]?.sum}
            </p>
          </div>

          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemps rating={0} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div
                style={{
                  width: `${Math.floor(
                    (100 * (ratingReview[5]?.sum || 0)) / totalReviews
                  )}%`,
                }}
                className="h-full bg-[#Edbb0E] w-[60%]"
              ></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">
              {ratingReview[5]?.sum}
            </p>
          </div>
        </div>
      </div>
      <h2 className="text-slate-600 text-xl font-bold py-5">
        Product Review {totalReviews}
      </h2>

      <div className="flex flex-col gap-8 pb-10 pt-4">
        {reviews.map((r, i) => (
          <div
            key={i}
            className="flex flex-col gap-1 border border-blue-500 p-2 rounded-md"
          >
            <div className="flex justify-between items-center">
              <div className="flex gap-1 text-xl">
                <RatingTemps rating={r.rating} />
              </div>
              <span className="text-red-600">{r.date}</span>
            </div>
            <span className="text-slate-600 text-md font-bold">
              {r.firstName}
            </span>
            <p className=" text-sm text-blue-600 ">{r.review}</p>
          </div>
        ))}
        <div className="flex justify-end">
          {totalReviews > 5 && (
            <Pagination
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              totalItem={totalReviews}
              parPage={parPage}
              showItem={Math.floor(totalReviews / 3)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
