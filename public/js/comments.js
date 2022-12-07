const userId = document.getElementById("user_id").value;
const blogId = document.getElementById("blog_id").value;

const comment = async (event) => {
  event.preventDefault();

  const response = await fetch(`/api/blogs/new-comment/${blogId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace(`/api/blogs/new-comment/${blogId}`);
  } else {
    alert("Error");
  }
};

// // add comment
const newCommentFunction = async () => {
  const comment = document.getElementById("comment-input").value;

  const response = await fetch(`/api/comment/create/${blogId}`, {
    method: "POST",
    body: JSON.stringify({
      comment: comment,
      user_id: userId,
    }),
    headers: { "Content-Type": "application/json" },
  });
  console.log("hello", comment, userId, blogId);
  if (response.ok) {
    document.location.replace("/");
  } else {
    alert("");
  }
};

// update an existing comment
const updateComment = async () => {
  const id = document.getElementById("update").value;
  const comment = document.getElementById("comment-text").value;

  const response = await fetch(`/api/comment/update/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      comment: comment,
      blog_id: blogId,
      user_id: userId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert("Comment updated");
  }
};

// delete and existing comment
const deleteComment = async () => {
  const id = document.getElementById("delete").value;

  const response = await fetch(`/api/comment/delete/${id}`, {
    method: "DELETE",
    body: JSON.stringify({
      where: {
        id: id,
      },
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    document.location.replace("/");
  } else {
    alert("");
  }
};

const commentBtn = document
  .getElementById("make-comment")
  .addEventListener("click", comment);

const deleteBtn = document
  .getElementById("delete")
  .addEventListener("click", deleteComment);

const updateBtn = document
  .getElementById("update")
  .addEventListener("click", updateComment);

const newComment = document
  .getElementById("save-comment-button")
  .addEventListener("click", newCommentFunction);
