const express = require("express");
const uuid = require("uuid");
const members = require("../../Members");
const router = express.Router();

// Get all the members
router.get("/", (req, res) => res.json(members));

// Get one member
router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No member with the id: ${req.params.id}` });
  }
});

// Create new Member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "Please provide a name and email" });
  }

  members.push(newMember);
  res.json(members);
});

// Update an existing memeber
router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id == req.params.id);

  if (found) {
    members.forEach((member) => {
      const updMember = req.body;
      if (member.id == req.params.id) {
        member.name = updMember.name ? updMember.name : member.name;
        member.email = updMember.email ? updMember.email : member.email;

        res.json(members);
      }
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

// Delete a member
router.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id == req.params.id);

  if (found) {
    const memberIndex = members.findIndex(
      (member) => member.id == req.params.id
    );

    const deletedMember = members.splice(memberIndex, 1);

    res.json({
      deletedMember: deletedMember,
      currentMembers: members,
    });
    
  } else {
    res.status(400).json({ msg: `No member with the id: ${req.params.id}` });
  }
});

module.exports = router;
