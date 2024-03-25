import React, { useState } from "react";

function PostPage() {
  const [showComments, setShowComments] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  const [comments, setComments] = useState([]);

  // Mock function to fetch existing comments from the server
  const fetchComments = () => {
    // Mock data for existing comments
    const commentsData = [
      { content: 'Comment 1', user: 'User 1', createdAt: '2024-03-25T12:00:00Z' },
      { content: 'Comment 2', user: 'User 2', createdAt: '2024-03-25T12:10:00Z' },
      { content: 'Comment 3', user: 'User 3', createdAt: '2024-03-25T12:20:00Z' }
    ];
    setComments(commentsData);
  };

  // Handle toggle comments button click
  const handleToggleComments = () => {
    setShowComments(!showComments);
    if (!showComments) {
      fetchComments();
    }
  };

  // Handle submit comment button click
  const handleSubmitComment = () => {
    if (commentContent.trim() === '') {
      alert('Please enter a comment.');
      return;
    }
    // Mock user ID
    const userId = '123';
    const newComment = { content: commentContent, user: userId, createdAt: new Date().toISOString() };
    // Add the new comment to the existing comments
    setComments(prevComments => [...prevComments, newComment]);
    // Clear the comment input
    setCommentContent('');
  };

  return (
    <div className="post-container" style={styles.postContainer}>
      <h2>Title of the Post</h2>
      <p>Content of the post goes here.</p>
      <p>Posted by: User Name</p>
      <button onClick={handleToggleComments} style={styles.toggleButton}>
        {showComments ? 'Hide Comments' : 'Show Comments'}
      </button>
      {showComments && (
        <div className="comments-section" style={styles.commentsSection}>
          <div className="existing-comments">
            {comments.map((comment, index) => (
              <div key={index} className="comment" style={styles.comment}>
                <p>{comment.content}</p>
                <p>By: {comment.user}</p>
                <p>Posted at: {new Date(comment.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
          <div className="new-comment" style={styles.newComment}>
            <textarea
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Write your comment here"
              style={styles.textArea}
            />
            <button onClick={handleSubmitComment} style={styles.submitButton}>Post Comment</button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  postContainer: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
  toggleButton: {
    marginBottom: '10px',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '3px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
  commentsSection: {
    marginTop: '20px',
  },
  comment: {
    marginBottom: '15px',
    padding: '10px',
    border: '1px solid #eee',
    borderRadius: '5px',
    backgroundColor: '#fff',
  },
  newComment: {
    display: 'flex',
    marginTop: '20px',
  },
  textArea: {
    flex: '1',
    marginRight: '10px',
    padding: '5px',
    border: '1px solid #ccc',
    borderRadius: '3px',
  },
  submitButton: {
    padding: '5px',
    border: 'none',
    borderRadius: '3px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default PostPage;
