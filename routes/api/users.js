const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const users = require("../../models/Users");

router.get("/", (reg, res) => {
  res.json(users);
});

router.get("/:id", (reg, res) => {
  const foundID = users.some((user) => user.id == parseInt(reg.params.id));
  if (foundID) {
    res.json(users.filter((user) => user.id == parseInt(reg.params.id)));
  } else {
    res
      .status(400)
      .json({ message: `User with the given ID not found ${reg.params.id}` });
  }
});

router.post("/", (req, res) => {
  const newUser = {
    id: uuid.v4(),
    name: req.body.name,
    title: req.body.title,
    platform: req.body.platform,
    status: "active",
  };

  if (!newUser.name || !newUser.title || !newUser.platform) {
    return res
      .status(400)
      .json({ message: "please include name, title, and platform" });
  }
  users.push(newUser);
  res.json(users);
});

router.put("/:id", (reg, res) => {
  const foundID = users.some((user) => user.id == parseInt(reg.params.id));
  if (foundID) {
    const updateUser = reg.body;
    users.forEach((user) => {
      if (user.id === parseInt(reg.params.id)) {
        user.name = updateUser.name ? updateUser.name : user.name;
        user.title = updateUser.title ? updateUser.title : user.title;
        user.platform = updateUser.platform
          ? updateUser.platform
          : user.platform;
        res.json({ message: "user was updated", user });
      }
    });
  } else {
    res
      .status(400)
      .json({ message: `User with the given ID not found ${reg.params.id}` });
  }
});

router.delete("/:id", (reg, res) => {
  const foundID = users.some((user) => user.id == parseInt(reg.params.id));
  if (foundID) {
    res.json({
      message: "User deleted",
      users: users.filter((user) => user.id !== parseInt(reg.params.id)),
    });
  } else {
    res
      .status(400)
      .json({ message: `User with the given ID not found ${reg.params.id}` });
  }
});

module.exports = router;
