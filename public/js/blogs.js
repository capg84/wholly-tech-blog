// create a new blog
const newBlog = async () => {
  const blogTitle = document.getElementById("blog-title").value;
  const blog = document.getElementById("blog-input").value;

  const response = await fetch("/api/blogs/new-blog", {
    method: "POST",
    body: JSON.stringify({
      title: blogTitle,
      blog: blog,
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

// update an existing blog
const updateBlog = async () => {
  const title = document.getElementById("blog-title").value.trim();
  const blog = document.getElementById("blog-text").value.trim();
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/blogs/update-blog/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title: title,
      blog: blog,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert("Update failed");
  }
};

// delete an existing blog
const deleteBlog = async () => {
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/blogs/delete-blog/${id}`, {
    method: "DELETE",
    body: JSON.stringify({
      id: id,
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

const saveBtn = document
  .getElementById("save-blog-btn")
  .addEventListener("click", newBlog);

const deleteBtn = document
  .getElementById("delete-comment")
  .addEventListener("click", deleteBlog);

const updateBtn = document
  .getElementById("update-comment")
  .addEventListener("click", updateBlog);
