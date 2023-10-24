//const uuid = require("uuid");

const items = document.querySelector(".master-table");
const form = document.getElementById("myForm");

const APILINK = "http://localhost:3000/api/members/";

// Display All the Members
let returnMembers = function (url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.forEach((member) => {
        items.innerHTML += `
            <tr>
                <td>${member.name}</td>
                <td>${member.email}</td>
                <td>${member.status}</td>
                <td>
                  <a href='./updateMember.html?id=${member.id}' class='update-btn-${member.id}' style='text-decoration:none;'>⬆️</a>
                  <a href='./deleteMember.html?id=${member.id}' class='delete-btn-${member.id}' style='text-decoration:none;'>🗑️</a>
                </td>
            </tr>
        `;
      });
    });
};

returnMembers(APILINK);

// Post a member
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  fetch(APILINK, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Response from the server: ", data);
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
    });

  // Reload the current page
  location.reload();
});
