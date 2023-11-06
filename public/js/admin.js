function deleteOperator(id) {
  fetch("/api/operators/" + id, {
    method: "delete",
  })
    .then((res) => {
      if (res.ok) {
        console.log(res);
        const elem = document.getElementById(id);
        elem.remove();
      }
    })
    .catch((error) => console.log(error));
}

function deleteReviewer(id) {
  fetch("/api/reviewers/" + id, {
    method: "delete",
  })
    .then((res) => {
      if (res.ok) {
        console.log(res);
        const elem = document.getElementById(id);
        elem.remove();
      }
    })
    .catch((error) => console.log(error));
}
function deleteCategory(id) {
  fetch("/api/categories/" + id, {
    method: "delete",
  })
    .then((res) => {
      if (res.ok) {
        console.log(res);
        const elem = document.getElementById(id);
        elem.remove();
      }
    })
    .catch((error) => console.log(error));
}

function edit(id) {
  // Hide the edit button
  document.getElementById(`edit${id}`).style.display = "none";

  // Show the cancel and confirm buttons
  document.getElementById(`cancel${id}`).style.display = "flex";
  document.getElementById(`confirm${id}`).style.display = "flex";

  // Enable the input fields
  const inputs = document.querySelector(`#list${id}`);
  const input = inputs.querySelectorAll(`input`);
  input.forEach((input) => {
    input.disabled = false;
  });
  const select = document.getElementById(`role${id}`);
  select.disabled = false;
}

function cancelEdit(id) {
  // Show the edit button
  document.getElementById(`edit${id}`).style.display = "flex";

  // Hide the cancel and confirm buttons
  document.getElementById(`cancel${id}`).style.display = "none";
  document.getElementById(`confirm${id}`).style.display = "none";

  // Disable and revert the input fields to their initial values
  const inputs = document.querySelector(`#list${id}`);
  const input = inputs.querySelectorAll(`input`);
  input.forEach((input) => {
    input.disabled = true;
    input.value = input.getAttribute("value");
  });
  const select = document.getElementById(`role${id}`);
  select.disabled = true;
}

async function confirmEdit(id, url) {
  // Retrieve the updated values from the input fields
  const data = await getData(id, url);

  await fetch("/api" + url, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        // Show the edit button
        document.getElementById(`edit${id}`).style.display = "flex";

        // Hide the cancel and confirm buttons
        document.getElementById(`cancel${id}`).style.display = "none";
        document.getElementById(`confirm${id}`).style.display = "none";

        // Disable the input fields
        const inputs = document.querySelector(`#list${id}`);
        const input = inputs.querySelectorAll(`input`);
        input.forEach((input) => {
          input.disabled = true;
        });
        const select = document.getElementById(`role${id}`);
        select.disabled = true;
      }
      console.log(res);
    })
    .catch((error) => console.log(error));
}

async function getData(id, url) {
  if (url === "/reviewers") {
    const firstname = document.getElementById(`firstname${id}`).value;
    const lastname = document.getElementById(`lastname${id}`).value;
    const email = document.getElementById(`email${id}`).value;
    const password = document.getElementById(`password${id}`).value;
    const role_id = document.getElementById(`role${id}`).value;
    const data = {
      id,
      firstname,
      lastname,
      email,
      password,
      role: { id: role_id },
    };
    return data;
  } else {
    const firstname = document.getElementById(`firstname${id}`).value;
    const lastname = document.getElementById(`lastname${id}`).value;
    const email = document.getElementById(`email${id}`).value;
    const data = { id, firstname, lastname, email };
    return data;
  }
}
