import React, { useEffect, useState } from "react";
import * as PostService from "../../services/PostService";
import { Button, Modal } from "antd";
import * as message from "../../components/Message/Message";
import { SendOutlined, UserOutlined, LeftOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as UserService from "../../services/UserService";
function PostPage() {
  const [posts, setPosts] = useState([]);
  const [postComments, setPostComments] = useState({});
  const [commentContents, setCommentContents] = useState({});
  const [usersInfo, setUsersInfo] = useState([]);
  const [expandedComments, setExpandedComments] = useState({});
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentContent, setEditedCommentContent] = useState("");
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState(null);

  const user = useSelector((state) => state.user);

  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchPosts(id);
  }, [id]);

  useEffect(() => {
    fetchComments();
  }, [posts]);

  useEffect(() => {
    fetchUsersInfo();
  }, []);

  useEffect(() => {
    const initialExpandedComments = {};
    posts.forEach((post) => {
      initialExpandedComments[post.id] = false;
    });
    setExpandedComments(initialExpandedComments);
  }, [posts]);

  const showDeleteConfirmation = (commentId) => {
    setDeletingCommentId(commentId);
    setDeleteConfirmationVisible(true);
  };

  const hideDeleteConfirmation = () => {
    setDeletingCommentId(null);
    setDeleteConfirmationVisible(false);
  };

  const handleEditComment = (commentId, content) => {
    setEditingCommentId(commentId);
    setEditedCommentContent(content);
  };

  const handleUpdateComment = async (commentId, token, userId) => {
    try {
      await PostService.updateComment(userId, commentId, token, {
        content: editedCommentContent,
      });
      // Cập nhật lại nội dung bình luận sau khi đã cập nhật thành công
      fetchComments();
      // Đặt lại state để kết thúc chế độ chỉnh sửa
      setEditingCommentId(null);
      setEditedCommentContent("");
    } catch (error) {
      console.error("Error updating comment:", error);
      message.error("Đã xảy ra lỗi khi cập nhật bình luận");
    }
  };

  const handleChangeCommentContent = (postId, content) => {
    setCommentContents((prevState) => ({
      ...prevState,
      [postId]: content,
    }));
  };

  const fetchUsersInfo = async () => {
    try {
      const res = await UserService.getUsersInfo();
      localStorage.setItem("usersInfo", JSON.stringify(res.data));
      setUsersInfo(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error(error);
    }
  };

  useEffect(() => {
    const usersInfoFromStorage = localStorage.getItem("usersInfo");
    if (usersInfoFromStorage) {
      setUsersInfo(JSON.parse(usersInfoFromStorage));
    }
  }, []);

  const fetchPosts = async (postId) => {
    try {
      const res = await PostService.getDetailsPost(postId);
      const formattedPost = {
        id: res.data._id,
        title: res.data.title,
        user: res.data.user,
        createdAt: res.data.createdAt,
        sections: res.data.sections.map((section) => ({
          sectionTitle: section.sectionTitle,
          content: section.content,
        })),
        category: res.data.category,
        views: res.data.views,
        tags: res.data.tags,
        images: res.data.images.map((image) => ({
          url: image.url,
          alt: image.alt,
          key: image.url,
        })),
        comments: res.data.comment,
      };
      setPosts([formattedPost]);
    } catch (error) {
      console.error("Error fetching post:", error);
      throw new Error(error);
    }
  };

  const fetchComments = async () => {
    try {
      posts.forEach(async (post) => {
        const res = await PostService.getAllComment(post.id);
        // Thực hiện việc so sánh id của người dùng trong comment với id đã lưu từ usersInfo
        const commentsWithUserInfo = res.data.map((comment) => {
          const userInfo = usersInfo.find((user) => user._id === comment.user);

          return {
            ...comment,
            user: userInfo
              ? userInfo?.information?.name || userInfo.email
              : comment.user,
            avatar: userInfo ? userInfo?.information?.avatar : null,
          };
        });
        setPostComments((prevComments) => ({
          ...prevComments,
          [post.id]: commentsWithUserInfo,
        }));
      });
    } catch (error) {
      console.error("Error fetching comments:", error);
      throw new Error(error);
    }
  };

  const handleSubmitComment = async (userId, postId, token) => {
    const commentContent = commentContents[postId];
    if (commentContent.trim() === "") {
      message.warning("Vui lòng thêm bình luận");
      return;
    }

    if (!user?.id) {
      message.warning("Vui lòng đăng nhập để bình luận");
      navigate("/sign-in", { state: location?.pathname });
    } else {
      const userName = user?.name || user?.email;
      try {
        await PostService.postComment(userId, commentContent, postId, token);
        const newComment = {
          avatar: user?.avatar,
          content: commentContent,
          user: userName,
          createdAt: new Date().toISOString(),
        };
        setPostComments((prevComments) => ({
          ...prevComments,
          [postId]: [...(prevComments[postId] || []), newComment],
        }));
        setCommentContents((prevContents) => ({
          ...prevContents,
          [postId]: "", // Clear text area content
        }));
      } catch (error) {
        console.error("Error posting comment:", error);
        message.error("Đã xảy ra lỗi khi gửi bình luận");
      }
    }
  };

  const handleToggleExpandComments = (postId) => {
    setExpandedComments((prevExpandedComments) => ({
      ...prevExpandedComments,
      [postId]: !prevExpandedComments[postId],
    }));
  };

  const handleDeleteComment = async (commentId, token, userId) => {
    try {
      await PostService.deleteComment(userId, commentId, token);

      fetchComments();
    } catch (error) {
      console.error("Error deleting comment:", error);
      message.error("Đã xảy ra lỗi khi xóa bình luận");
    }
  };

  const handleGoBack = () => {
    navigate("/post");
  };
  return (
    <div className="grid grid-cols-6 gap-4 mx-8 mt-[45px]">
      <div className="absolute top-[160px] left-[10px]">
        <Button type="text" icon={<LeftOutlined />} onClick={handleGoBack}>
          Trở về
        </Button>
      </div>
      {/* Phần hiển thị bài viết */}
      <div className="col-span-4">
        {posts.map((post, index) => (
          <div
            key={index}
            style={{
              ...styles.postContainer,
              marginBottom: "20px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h2 className="font-[700] text-center text-[25px] mb-[15px]">
              {post.title}
            </h2>
            <h3 className="text-[13px] font-[400]">
              POSTED ON{" "}
              <span className="text-blue-700">
                {new Date(post.createdAt).toLocaleString()}
              </span>{" "}
              BY{" "}
              <span
                className="text-blue-700 cursor-pointer"
                onClick={() => navigate("/")}
                style={{
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#0044cc")}
                onMouseLeave={(e) => (e.target.style.color = "")}
              >
                PETMART - CỬA HÀNG THÚ CƯNG
              </span>
            </h3>

            <h3 className="text-[14px] mt-[20px]">
              <span className="font-[500]">Thể loại:</span>{" "}
              <span className="text-blue-700">{post.category}</span>
            </h3>
            <h3 className="text-[14px] mb-[15px]">
              <span className="font-[500]">Tags:</span>{" "}
              <span className="italic opacity-80 text-blue-900">
                {post.tags.join(", ")}
              </span>
            </h3>
            <div
              className="images-container mb-[15px]"
              style={{ ...styles.imagesContainer, maxWidth: "100%" }}
            >
              {post.images.length > 0 && (
                <div className="image-wrapper" style={styles.imageWrapper}>
                  <img
                    src="https://www.petmart.vn/wp-content/uploads/2015/04/cach-tri-ran-cho-meo.jpg"
                    alt={post.images[0].alt}
                    style={{
                      ...styles.image,
                      maxWidth: "100%",
                      height: "auto",
                    }}
                  />
                </div>
              )}
            </div>

            {post.sections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h3 className="text-[18px] font-[500]">
                  {section.sectionTitle}
                </h3>
                <p className="text-[16px]">{section.content}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Phần hiển thị comment và gửi comment */}
      <div
        className="col-span-2"
        style={{
          position: "sticky",
          top: 0,
          overflowY: "auto",
          maxHeight: "calc(100vh - 45px)",
        }}
      >
        {posts.map((post, index) => (
          <div
            key={index}
            style={{
              ...styles.postContainer,
              marginBottom: "20px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h1 className="text-[15px] font-[600]">Bình luận</h1>
            {/* Phần hiển thị comment */}
            <div className="comments-section" style={styles.commentsSection}>
              {postComments[post.id] && (
                <div>
                  {postComments[post.id]
                    .slice(0, expandedComments[post.id] ? undefined : 5) // Chỉ hiển thị 5 bình luận đầu tiên hoặc tất cả nếu đã mở rộng
                    .map((comment, index) => (
                      <div
                        key={index}
                        className="comment"
                        style={styles.comment}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          {comment.avatar ? (
                            <img
                              src={comment.avatar}
                              alt="Avatar"
                              style={{
                                width: "25px",
                                height: "25px",
                                borderRadius: "50%",
                                marginRight: "10px",
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: "25px",
                                height: "25px",
                                borderRadius: "50%",
                                marginRight: "10px",
                                backgroundColor: "#f0f0f0",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <UserOutlined style={{ color: "black" }} />
                            </div>
                          )}
                          <p className="text-[14px] font-bold">
                            {comment.user}
                          </p>
                        </div>
                        {editingCommentId === comment._id ? (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              flex: 1,
                            }}
                          >
                            <textarea
                              value={editedCommentContent}
                              onChange={(e) =>
                                setEditedCommentContent(e.target.value)
                              }
                              placeholder="Chỉnh sửa bình luận"
                              style={{
                                ...styles.textArea,
                                marginRight: "10px",
                                marginBottom: 0,
                              }}
                            />
                            <Button
                              onClick={() =>
                                handleUpdateComment(
                                  comment._id,
                                  user.access_token,
                                  user.id
                                )
                              }
                              style={{
                                ...styles.submitButton,
                                marginBottom: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "40px",
                                height: "40px",
                              }}
                            >
                              <SendOutlined />
                            </Button>
                          </div>
                        ) : (
                          <>
                            <p className="text-[14px]">{comment.content}</p>
                            <p className="italic opacity-80">
                              {comment.updatedAt ? "Updated at" : "Posted at"}:{" "}
                              {new Date(
                                comment.updatedAt || comment.createdAt
                              ).toLocaleString()}
                            </p>
                            {user.name === comment.user && (
                              <>
                                <Button
                                  className="text-[12px] mr-2"
                                  type="link"
                                  onClick={() =>
                                    handleEditComment(
                                      comment._id,
                                      comment.content
                                    )
                                  }
                                >
                                  Chỉnh sửa
                                </Button>
                                <Button
                                  className="text-[12px]"
                                  type="link"
                                  onClick={() =>
                                    showDeleteConfirmation(comment._id)
                                  }
                                >
                                  Xóa
                                </Button>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </div>
            {/* Nếu có nhiều hơn 5 bình luận, hiển thị nút Xem thêm */}
            {postComments[post.id] && postComments[post.id].length > 5 && (
              <Button
                className="text-[12px]"
                type="link"
                onClick={() => handleToggleExpandComments(post.id)}
              >
                {expandedComments[post.id]
                  ? "Ẩn bớt bình luận"
                  : "Xem thêm bình luận"}
              </Button>
            )}

            {/* Phần gửi comment */}
            <div className="new-comment" style={styles.newComment}>
              <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
                <textarea
                  value={commentContents[post.id]}
                  onChange={(e) =>
                    handleChangeCommentContent(post.id, e.target.value)
                  }
                  placeholder="Viết bình luận"
                  style={{
                    ...styles.textArea,
                    marginRight: "10px",
                    marginBottom: 0,
                  }}
                />
                <Button
                  onClick={() =>
                    handleSubmitComment(user?.id, post.id, user?.access_token)
                  }
                  style={{
                    ...styles.submitButton,
                    marginBottom: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "40px",
                    height: "40px",
                  }}
                >
                  <SendOutlined />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal
        title="Xác nhận xóa"
        visible={deleteConfirmationVisible}
        onCancel={hideDeleteConfirmation}
        onOk={() => {
          handleDeleteComment(deletingCommentId, user.access_token, user.id);
          hideDeleteConfirmation();
        }}
        okText="Xóa"
        cancelText="Hủy"
        okButtonProps={{
          style: { backgroundColor: "#ff4d4f", borderColor: "#ff4d4f" },
        }}
      >
        <p>Bạn có chắc chắn muốn xóa bình luận này?</p>
      </Modal>
    </div>
  );
}

const styles = {
  postContainer: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    borderRadius: "5px",
    backgroundColor: "white",
  },
  toggleButton: {
    marginBottom: "10px",
    padding: "5px 10px",
    border: "none",
    borderRadius: "3px",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
  },
  commentsSection: {
    marginTop: "20px",
  },
  comment: {
    marginBottom: "15px",
    padding: "10px",
    border: "1px solid #eee",
    borderRadius: "5px",
    backgroundColor: "#fff",
  },
  newComment: {
    display: "flex",
    marginTop: "20px",
  },
  textArea: {
    flex: "1",
    marginRight: "10px",
    padding: "5px",
    border: "1px solid #ccc",
    borderRadius: "3px",
  },
  submitButton: {
    padding: "5px",
    border: "none",
    borderRadius: "3px",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
  },
  imagesContainer: {
    display: "flex",
    flexWrap: "wrap",
  },
  imageWrapper: {
    flex: "1",
    marginRight: "5px",
    marginBottom: "10px",
  },
  moreImages: {
    flex: "1",
    marginRight: "10px",
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    cursor: "pointer",
  },
  image: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "cover",
  },
};

export default PostPage;
