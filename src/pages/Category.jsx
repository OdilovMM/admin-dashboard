import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pagination, Search } from "../components";
import { FaPenNib } from "react-icons/fa";
import { MdAutoDelete } from "react-icons/md";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { ScaleLoader } from "react-spinners";
import { useSelector, useDispatch } from "react-redux";
import {
  addCategory,
  getAllCategories,
} from "../features/categorySlice/categorySlice";

const Category = () => {
  const { categories, loader, totalCategory } = useSelector(
    (state) => state.category
  );

  const dispatch = useDispatch();

  // *** search components states
  const [parPage, setParPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  // ***

  const [pages, setPages] = useState(5);
  const [show, setShow] = useState(false);

  const [showImage, setShowImage] = useState("");

  const [categoryData, setCategoryData] = useState({
    name: "",
    image: "",
  });

  const handleImageInput = (e) => {
    let files = e.target.files;

    if (files.length > 0) {
      setShowImage(URL.createObjectURL(files[0]));
      setCategoryData({
        ...categoryData,
        image: files[0],
      });
    }
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    dispatch(addCategory(categoryData));

    setTimeout(() => {
      setCategoryData({
        name: "",
        image: null,
      });
      setShowImage("");
    }, 1000);
  };

  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      search,
    };

    dispatch(getAllCategories(obj));
  }, [search, currentPage, parPage, dispatch]);

  return (
    <>
      <div className="px-2 lg:px-7 pt-5">
        <div className="flex lg:hidden justify-between items-center mb-5 p-5 bg-[#3D464D] rounded-[5px]">
          <h1 className="text-white">Category</h1>
          <button
            onClick={() => setShow(true)}
            className="bg-[#94A3B8] px-3 rounded-[5px] py-1"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap w-full">
          <div className="w-full lg:w-7/12">
            <div className="w-full p-4 bg-[#3D464D] rounded-md">
              {totalCategory <= parPage ? (
                " "
              ) : (
                <Search
                  setParPage={setParPage}
                  setSearch={setSearch}
                  search={search}
                />
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
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {categories.map((d, i) => (
                      <tr key={i}>
                        <td className="py-1 px-4 font-medium whitespace-nowrap">
                          {i + 1}
                        </td>
                        <td className="py-1 px-4 font-medium whitespace-nowrap">
                          <img
                            className="w-[45px]  object-center"
                            src={d.image}
                            alt=""
                          />
                        </td>
                        <td className="py-3 px-4 font-medium whitespace-nowrap">
                          {d.name}
                        </td>

                        <td className="py-3 px-4 font-medium whitespace-nowrap">
                          <div className="flex flex-start items-center gap-4">
                            <Link className="px-[6px] cursor-pointer">
                              <FaPenNib />
                            </Link>
                            <button>
                              <MdAutoDelete />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="w-full justify-end flex mt-1 bottom-1 right-2">
                {totalCategory <= parPage ? (
                  " "
                ) : (
                  <Pagination
                    pageNumber={currentPage}
                    setPageNumber={setCurrentPage}
                    totalItem={50}
                    pages={pages}
                    showItem={2}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            className={`w-[320px]  lg:w-5/12 translate-x-100 lg:relative lg:right-0 fixed ${
              show ? "right-0 top-[115px]" : "-right-[340px] z-0"
            } z-0  transition-all duration-500 `}
          >
            <div className="w-full pl-5">
              <div className="bg-[#3D464D] h-screen lg:h-auto px-3 py-2 lg:rounded-md text-[#d0d2d6]">
                <div className="flex flex-row justify-between items-center">
                  <h1 className="text-[#d0d2d6] font-semibold text-xl mb-4 w-full text-center ">
                    Add Category
                  </h1>
                  <div
                    className="block lg:hidden mb-2"
                    onClick={() => setShow(false)}
                  >
                    <IoMdClose size={24} />
                  </div>
                </div>

                <form onSubmit={handleAddCategory}>
                  <div className="flex flex-col w-full gap-1 mb-3">
                    <label htmlFor="name"> Category Name</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#333]"
                      type="text"
                      id="name"
                      name="category_name"
                      placeholder="Category Name"
                      value={categoryData.name}
                      onChange={(e) =>
                        setCategoryData({
                          ...categoryData,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="image"
                      className="flex justify-center items-center flex-col h-[238px] cursor-pointer  border border-dashed w-full "
                    >
                      {showImage ? (
                        <img
                          src={showImage}
                          alt="category"
                          className="h-[235px] w-full object-center"
                        />
                      ) : (
                        <>
                          <span>
                            <MdOutlineAddPhotoAlternate size={45} />
                          </span>
                          <span>Select Image</span>
                        </>
                      )}
                    </label>
                    <input
                      className="hidden"
                      onChange={handleImageInput}
                      type="file"
                      name="image"
                      id="image"
                    />
                    <div className="mt-5">
                      <button
                        type="submit"
                        disabled={loader ? true : false}
                        className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-600"
                      >
                        {loader ? (
                          <ScaleLoader
                            color="#fff"
                            height={22}
                            width={5}
                            radius={2}
                          />
                        ) : (
                          "Add Category"
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
