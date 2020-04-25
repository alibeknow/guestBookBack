import db from "../models";
const { User, Post } = db;
import validatePostForm from "../validation/login";

// create user
const create = async (req, res) => {
  const { name } = req.body;

  let postObject = {
    name: name,
    UserId: req.user[0].dataValues.id
  };
  let myresult = await Post.create(postObject, {
    include: [
      {
        model: User
      }
    ]
  });
  res.send(myresult);
};

const findAllPosts = (req, res) => {
  Post.findAll({ limit: 5, order: [["id", "DESC"]] })
    .then(user => {
      res.json({ user });
    })
    .catch(err => res.status(500).json({ err }));
};

// fetch user by userId
const findById = (req, res) => {
  const id = req.params.userId;

  Post.findAll({ where: { id } })
    .then(post => {
      if (!Post.length) {
        return res.json({ msg: "post not found" });
      }
      res.json({ user });
    })
    .catch(err => res.status(500).json({ err }));
};
// fetch user by userId
const countPosts = async (req, res) => {
  let count = await Post.count().catch(err => res.status(500).json({ err }));
  if (count) {
    res.json(count);
  } else {
    res.json({ msg: "not found" });
  }
};

const findAllPaginatioon = async (req, res) => {
  let offset;
  let page = req.params.page;
  if (page > 1) {
    page--;
    offset = 5 * page;
  } else {
    offset = 0;
    page = 1;
  }

  let posts = await Post.findAndCountAll({
    attributes: ["id", "name", "UserId"],
    limit: 5,
    offset: offset,
    order: [["id", "DESC"]]
  });
  res.send(posts);
};
// delete a user
const deletePost = async (req, res) => {
  const id = req.params.postId;
  const author = req.params.UserId;
  let userId = req.user[0].dataValues.id;
  if (author === userId) {
    try {
      await Post.destroy({ where: { id } });
      res.status.json({ msg: "User has been deleted successfully!" });
    } catch (error) {
      res.status(500).json({ msg: "Failed to delete!" });
    }
  } else {
    res.status(401).json({ msg: "doesnt have permission " });
  }
};

export {
  create,
  findAllPosts,
  findById,
  deletePost,
  findAllPaginatioon,
  countPosts
};
