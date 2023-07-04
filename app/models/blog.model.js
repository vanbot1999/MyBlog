const sql = require("./db.js");

// constructor
const Blog = function(blog) {
  this.title = blog.title;
  this.description = blog.description;
  this.published = blog.published;
};

Blog.create = (newBlog, result) => {
  sql.query("INSERT INTO blogs SET ?", newBlog, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created blog: ", { id: res.insertId, ...newBlog });
    result(null, { id: res.insertId, ...newBlog });
  });
};

Blog.findById = (id, result) => {
  sql.query(`SELECT * FROM blogs WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found blog: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Blog with the id
    result({ kind: "not_found" }, null);
  });
};

Blog.getAll = (title, result) => {
  let query = "SELECT * FROM blogs";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("blogs: ", res);
    result(null, res);
  });
};

Blog.getAllPublished = result => {
  sql.query("SELECT * FROM blogs WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("blogs: ", res);
    result(null, res);
  });
};

Blog.updateById = (id, blog, result) => {
  sql.query(
    "UPDATE blogs SET title = ?, description = ?, published = ? WHERE id = ?",
    [blog.title, blog.description, blog.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Blog with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated blog: ", { id: id, ...blog });
      result(null, { id: id, ...blog });
    }
  );
};

Blog.remove = (id, result) => {
  sql.query("DELETE FROM blogs WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Blog with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted blog with id: ", id);
    result(null, res);
  });
};

module.exports = Blog;