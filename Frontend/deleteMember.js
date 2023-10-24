const items = document.querySelector(".master-table");
const form = document.getElementById("myForm");
const name = document.getElementById("name");
const email = document.getElementById("email");

const APILINK = "http://localhost:3000/api/members/";

const url = new URL(window.location.href);

let deleteId = "";
fetch(APILINK)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    data.forEach((member) => {
      if (member.id == url.searchParams.get("id")) {
        console.log(member);
        deleteId = member.id;
        document.getElementById("name").value = member.name;
        document.getElementById("email").value = member.email;
      }
    });
  })
  .catch((err) => {
    console.error(`Error: ${err}`);
  });

form.addEventListener("submit", (e) => {
  e.preventDefault();

//   const name = document.getElementById("name").value;
//   const email = document.getElementById("email").value;

  fetch(APILINK + deleteId, {
    method: "DELETE",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    // body: JSON.stringify({
    //   name: name,
    //   email: email,
    // }),
  })
    .then((res) => {
      res.json();
    })
    .then((data) => {
      console.log("Response from the server: ", data);
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
    });

  // Redirect to a new page
  window.location.href = "./members.html";
});
