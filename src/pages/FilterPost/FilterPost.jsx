import React, { useState, useEffect } from "react";
import * as PostService from "../../services/PostService";
import { useNavigate } from "react-router-dom";
import * as ProductService from "../../services/ProductService";
import { convertPrice } from "../../utils";
import { Spin } from "antd";

export const FilterPost = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  const [selectedTagIndex, setSelectedTagIndex] = useState(null);
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetchPosts();
  }, []);

  // useEffect(() => {
  //   fetchComments(postId);
  // }, [postId]);

  const fetchProductAllSelled = async () => {
    try {
      const res = await ProductService.getAllProductSelled();
      const products = res.data;
      // Sắp xếp sản phẩm theo số lượng bán giảm dần
      const sortedProducts = products.sort((a, b) => b.selled - a.selled);
      // Chọn ra 4 sản phẩm đầu tiên
      const topSellingProducts = sortedProducts.slice(0, 4);
      console.log("Top selling products:", topSellingProducts);
      return topSellingProducts;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error(error);
    }
  };

  useEffect(() => {
    const fetchTopSellingProducts = async () => {
      try {
        setLoading(true); // Bắt đầu fetching dữ liệu, hiển thị loading
        const products = await fetchProductAllSelled();
        setTopSellingProducts(products);
      } catch (error) {
        console.error("Error fetching top selling products:", error);
      } finally {
        setLoading(false); // Kết thúc fetching dữ liệu, ẩn loading
      }
    };
    fetchTopSellingProducts();
  }, []);

  const fetchComments = async (postId) => {
    try {
      const res = await PostService.getAllComment(postId);

      return res.data;
    } catch (error) {
      console.error("Error fetching comments:", error);
      throw new Error(error);
    }
  };

  const fetchPosts = async () => {
    try {
      setLoading(true); // Bắt đầu fetching dữ liệu, hiển thị loading
      const res = await PostService.getAllPost();
      const formattedPosts = await Promise.all(
        res.data.map(async (post) => {
          const commentRes = await PostService.getAllComment(post._id);
          const comments = commentRes.data;
          return {
            id: post._id,
            title: post.title,
            createdAt: post.createdAt,
            user: post.user,
            sections: post.sections.map((section) => ({
              sectionTitle: section.sectionTitle,
              content: section.content,
            })),
            category: post.category,
            views: post.views,
            tags: post.tags,
            images: post.images.map((image) => ({
              url: image.url,
              alt: image.alt,
              key: image.url,
            })),
            comments: comments,
          };
        })
      );
      setPosts(formattedPosts);
      setFilteredPosts(formattedPosts);
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error(error);
    } finally {
      setLoading(false); // Kết thúc fetching dữ liệu, ẩn loading
    }
  };

  // Hàm lọc bài viết dựa trên thể loại và tag được chọn
  const filterPosts = () => {
    let filtered = [...posts];
    if (selectedCategory !== "") {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }
    if (selectedTag !== "") {
      filtered = filtered.filter((post) => post.tags.includes(selectedTag));
    }
    setFilteredPosts(filtered);
  };

  // Gọi hàm lọc bài viết khi selectedCategory hoặc selectedTag thay đổi
  useEffect(() => {
    filterPosts();
  }, [selectedCategory, selectedTag]);

  // Tính số lượng bài viết trong mỗi thể loại
  const countPostsInCategory = (category) => {
    return posts.filter((post) => post.category === category).length;
  };

  // Tính số lượng bài viết trong mỗi tag
  const countPostsWithTag = (tag) => {
    return posts.filter((post) => post.tags.includes(tag)).length;
  };

  const handleDetailPost = (postId) => {
    navigate(`/postDetail/${postId}`);
    fetchComments(postId);
  };
  useEffect(() => {
    if (filteredPosts.length > 0) {
      fetchComments(filteredPosts[0].id);
    }
  }, [filteredPosts]);
  const handelDetailsProduct = (id) => {
    navigate(`/product-details/${id}`);
  };

  return (
    <div className="grid grid-cols-6 gap-4 ml-[20px] mt-[40px] ">
      {/* Menu bên trái */}
      <div className="col-span-6 md:col-span-2">
        <h4 className="text-[rgb(56,56,61)] text-[20px] font-bold mb-[30px]">
          Chuyên mục bài viết
        </h4>
        <div className="flex flex-col gap-[12px] text-[15px]">
          {/* Danh sách thể loại */}
          <Spin spinning={loading}>
            {" "}
            {/* Hiển thị loading nếu đang fetching dữ liệu */}
            <ul>
              <li
                className={`menu-item ${
                  selectedCategoryIndex === null ? "font-bold" : ""
                }`}
                style={{
                  borderBottom: "1px solid #ccc",
                  paddingBottom: "10px",
                  marginBottom: "12px",
                  width: "360px",
                  transition: "background-color 0.3s ease",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSelectedCategory("");
                  setSelectedCategoryIndex(null);
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#f0f0f0")
                }
                onMouseLeave={(e) => (e.target.style.backgroundColor = "")}
              >
                Tất cả thể loại
              </li>
              {[...new Set(posts.map((post) => post.category))].map(
                (category, index) => (
                  <li
                    key={index}
                    className={`menu-item ${
                      selectedCategory === category ? "font-bold" : ""
                    }`}
                    style={{
                      borderBottom: "1px solid #ccc",
                      paddingBottom: "10px",
                      marginBottom: "12px",
                      width: "360px",
                      transition: "background-color 0.3s ease",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setSelectedCategory(category);
                      setSelectedCategoryIndex(index);
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#f0f0f0")
                    }
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "")}
                  >
                    {category} ({countPostsInCategory(category)})
                  </li>
                )
              )}
            </ul>
          </Spin>
        </div>
        <h4 className="text-[rgb(56,56,61)] text-[20px] font-bold mt-[30px] mb-[30px]">
          Tag bài viết
        </h4>
        <div className="flex flex-col gap-[12px] text-[15px]">
          {/* Danh sách tag */}
          <ul>
            <li
              className={`menu-item ${
                selectedTagIndex === null ? "font-bold" : ""
              }`}
              style={{
                borderBottom: "1px solid #ccc",
                paddingBottom: "10px",
                marginBottom: "12px",
                width: "360px",
                transition: "background-color 0.3s ease",
                cursor: "pointer",
              }}
              onClick={() => {
                setSelectedTag("");
                setSelectedTagIndex(null);
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#f0f0f0")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "")}
            >
              Tất cả tag
            </li>
            {[...new Set(posts.flatMap((post) => post.tags))].map(
              (tag, index) => (
                <li
                  key={index}
                  className={`menu-item ${
                    selectedTag === tag ? "font-bold" : ""
                  }`}
                  style={{
                    borderBottom: "1px solid #ccc",
                    paddingBottom: "10px",
                    marginBottom: "12px",
                    width: "360px",
                    transition: "background-color 0.3s ease",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setSelectedTag(tag);
                    setSelectedTagIndex(index);
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#f0f0f0")
                  }
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "")}
                >
                  {tag} ({countPostsWithTag(tag)})
                </li>
              )
            )}
          </ul>
          <h4 className="text-[rgb(56,56,61)] text-[20px] font-bold mb-[30px]">
            Sản phẩm bán chạy
          </h4>
          <div className="flex flex-col gap-6 mb-[20px]">
            {topSellingProducts.map((product) => (
              <div
                key={product._id}
                className="cursor-pointer flex items-center product-item"
                onClick={() => handelDetailsProduct(product?._id)}
                style={{
                  maxWidth: "360px",
                  paddingBottom: "10px",
                  marginBottom: "12px",
                  width: "360px",
                  transition: "all 0.3s ease",
                  borderBottom: "1px solid #ccc",
                  backgroundColor: "inherit",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.querySelector(".text-container").style.color =
                    "#007bff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.querySelector(".text-container").style.color =
                    "inherit";
                }}
              >
                <img
                  className="w-[60px] h-[60px] mr-4"
                  src={product.image}
                  alt={product.name}
                  style={{ marginRight: "4px" }}
                />
                <div
                  className="text-container"
                  style={{
                    overflowWrap: "break-word",
                    flex: "1",
                    transition: "color 0.3s ease",
                  }}
                >
                  <p className="font-[500] text-[15px] mb-1">{product.name}</p>
                  <p className="text-blue-700">{convertPrice(product.price)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Sản phẩm chiếm 18 phần bên phải */}
      <div className="col-span-6 md:col-span-4">
        {/* Hiển thị danh sách bài viết đã lọc dưới dạng card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-[15px]">
          {filteredPosts.map((post) => (
            <div
              onClick={() => handleDetailPost(post.id)}
              key={post.id}
              className="bg-white  shadow-md p-4 cursor-pointer mr-[20px] rounded-[10px] transition duration-300 ease-in-out transform hover:scale-105"
            >
              {post.images.length > 0 && (
                <div className="flex justify-center">
                  <img
                    src={post.images[0].image}
                    style={{ width: "470px", height: "264px" }}
                    alt={post.images[0].alt}
                    className="mb-2 rounded-lg"
                  />
                </div>
              )}
              <div className="bg-[#3e3ed9] w-[50px] h-[20px] py-[2px] px-[4px] absolute top-0 right-0">
                <span className="text-[white] text-[12px] font-[roboto] font-[500] block">
                  {new Date(post.createdAt).getDate()} TH{" "}
                  {String(new Date(post.createdAt).getMonth() + 1).padStart(
                    2,
                    "0"
                  )}
                </span>
              </div>

              <h3 className="text-[15px] font-bold mb-2">{post.title}</h3>
              <p
                className="text-gray-600 overflow-hidden text-[14px]"
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                }}
              >
                {post.sections[0].content}
              </p>
              <div className="text-gray-500 mt-2 border-gray-400 border p-2 rounded-md text-center w-[70px]">
                {post.comments ? post.comments.length : 0} bình luận
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
