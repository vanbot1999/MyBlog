const Blog = require("../models/blog.model.js");

// Create and Save a new Blog
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Blog
  const blog = new Blog({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });

  // Save Blog in the database
  Blog.create(blog, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Blog."
      });
    else res.send(data);
  });
};

// Retrieve all blogs from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Blog.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving blogs."
      });
    else res.send(data);
  });
};

// Find a single Blog with a id
exports.findOne = (req, res) => {
  Blog.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Blog with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Blog with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published blogs
exports.findAllPublished = (req, res) => {
  Blog.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving blogs."
      });
    else res.send(data);
  });
};

// Update a Blog identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Blog.updateById(
    req.params.id,
    new Blog(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Blog with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Blog with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Blog with the specified id in the request
exports.delete = (req, res) => {
  Blog.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Blog with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Blog with id " + req.params.id
        });
      }
    } else res.send({ message: `Blog was deleted successfully!` });
  });
};

// Delete all blogs from the database.
exports.deleteAll = (req, res) => {
  Blog.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all blogs."
      });
    else res.send({ message: `All blogs were deleted successfully!` });
  });
};