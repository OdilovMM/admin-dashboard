import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getaProduct } from "../features/productSlice/productSlice";
import { useParams } from "react-router-dom";
import moment from "moment";
import ProductReviews from "../components/ProductReviews";

const SingleProduct = () => {
  const { product } = useSelector((state) => state.product);
  const { productId } = useParams();
  const dispatch = useDispatch();

  const {
    name,
    slug,
    category,
    brand,
    discount,
    stock,
    description,
    shopName,
    images,
    rating,
    createdAt,
  } = product;

  useEffect(() => {
    dispatch(getaProduct(productId));
  }, [productId, dispatch]);

  return (
    <div className="p-4 my-6 w-full h-full flex flex-col gap-5 ">
      <div className="flex flex-row gap-2 justify-between items-start">
        <div className="w-7/12 h-[350px]  flex flex-col">
          <div className=" h-[450px] flex flex-row flex-wrap w-full  ">
            {images?.map((image, index) => (
              <div key={index} className="w-[180px] p-1 rounded-lg h-[140px]">
                <img
                  src={image}
                  alt=""
                  className="object-fit rounded-lg w-full h-full "
                />
              </div>
            ))}
          </div>
          <div className=" w-full h-full">
            <div className="p-2">
              <ProductReviews product={product} />
            </div>
          </div>
        </div>
        <div className="w-4/12 flex flex-col shadow-lg p-3 rounded-md border border-blue-600 mr-4">
          <div className="flex flex-row justify-between mr-4">
            <h2 className="font-semibold">Shop Name:</h2>
            <span>{shopName}</span>
          </div>
          <div className="flex flex-row justify-between mr-4">
            <h2 className="font-semibold">Name:</h2>
            <span>{name}</span>
          </div>
          <div className="flex flex-row justify-between mr-4">
            <h2 className="font-semibold">Slug:</h2>
            <span>{slug}</span>
          </div>
          <div className="flex flex-row justify-between mr-4">
            <h2 className="font-semibold">Category:</h2>
            <span>{category}</span>
          </div>
          <div className="flex flex-row justify-between mr-4">
            <h2 className="font-semibold">Brand:</h2>
            <span>{brand}</span>
          </div>
          <div className="flex flex-row justify-between mr-4">
            <h2 className="font-semibold">Discount:</h2>
            <span>-{discount}%</span>
          </div>
          <div className="flex flex-row justify-between mr-4">
            <h2 className="font-semibold">In Stock:</h2>
            <span>{stock}</span>
          </div>
          <div className="flex flex-row justify-between mr-4">
            <h2 className="font-semibold">Rating:</h2>
            <span>{rating}</span>
          </div>
          <div className="flex flex-row justify-between mr-4">
            <h2 className="font-semibold">Created:</h2>
            <span>{moment(createdAt).format("MM/DD/YYYY")}</span>
          </div>
          <div className="flex flex-col justify-between mr-4">
            <h2 className="font-semibold">Description</h2>
            <span className="bg-slate-300 p-[2px] block">{description}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
