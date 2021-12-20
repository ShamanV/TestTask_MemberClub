
let MembersList = [];
let newMember = new Object();

let form = document.forms.myForm;
let nameError = document.getElementById("nameError");
let emailError = document.getElementById("emailError");

function resetForm() {
  nameError.textContent = "";
  emailError.textContent = "";
  document.forms.myForm.name.value = "";
  document.forms.myForm.email.value = "";
}

function validateForm() {
  let name = form.elements.name.value.trim();
  let email = form.elements.email.value.trim();

  nameError.textContent = validateFormName(name);
  emailError.textContent = validateFormEmail(email);

  if (nameError.textContent != "") {
    form.name.focus();
  } else if (emailError.textContent != "") {
    form.email.focus();
  } else {
      addNewMember(name, email);
      updateMemberUITable();
      resetForm();
  }

  event.preventDefault();
}

function validateFormName(name) {
  if (name == '') {
    return "Name is required";
  } else if (!(/^[a-z. ]+$/i).test(name)) {
    return "Name format is not valid (use Latin, spaces and dots only)";
  } else {
    return "";
  }
}

function validateFormEmail(email) {
  if (email == '') {
    return "Email is required";
  } else if (!(/^[A-Z0-9_+-.]+@[A-Z0-9-]+.[A-Z]{2,4}$/i).test(email)) {
    return "Email format is not valid";
  } else if (!isEmailUnique(email)) {
    return "Member with such Email is already exist";
  } else {
    return "";
  }
}

function isEmailUnique(email) {
  for (let Member of MembersList) {
    if (Member.email == email) {
      return false;
    }
  }
  return true;
}

function addNewMember(name, email) {
  let newMember = {
    name: name,
    email: email,
    date:  composeDate(new Date())
  };
  MembersList.push(newMember);
}

function composeDate(d) {
  return d.getDate() + "."
    + (d.getMonth() + 1) + "."
    + d.getFullYear() + " "
    + (d.getHours() < 10 ? "0" + d.getHours() : d.getHours()) + ":"
    + (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes());
}

function updateMemberUITable() {
  let Member = MembersList[MembersList.length - 1];
  let row = document.createElement("tr");
  row.innerHTML = `<th scope="row">${MembersList.length}</th>
    <td>${Member.name}</td>
    <td>${Member.email}</td>
    <td>${Member.date}</td>`;
  document.querySelector(".tbody").appendChild(row);
}
