$(function () {
  $("#registerUser").click(postRegistration);
  // $("#loginButton").click(shiftPage);
  $("#loginButton").click(loginHandle);

  $("#loginEmail").click(function () {
    document.getElementById("InvalidLogin").style.display = "none";
  });
  $("#loginPassword").click(function () {
    document.getElementById("InvalidLogin").style.display = "none";
  });
});

function loginHandle() {
  console.log("login Handle Hits");
  let email = $("#loginEmail").val();
  let password = $("#loginPassword").val();

  let credentails = {
    email: email,
    password: password,
  };

  $.ajax({
    url: "http://localhost:8080/user/login",
    method: "POST",
    data: credentails,
    success: function (response) {
      if (response == false) {
        document.getElementById("InvalidLogin").style.display = "block";
      } else {
        let token = response;
        localStorage.setItem("SavedToken", token);
        shiftPage();
      }
    },
    error: function (xhr) {
      console.log("Error " + xhr);
    },
  });
}

function postRegistration() {
  let name = $("#regName").val();
  let email = $("#regEmail").val();
  let phone = $("#regMobile").val();
  let password = $("#regPassword").val();

  let obj = {
    name: name,
    email: email,
    phone: phone,
    password: password,
  };

  console.log(" SignUp hits");
  $.ajax({
    url: "http://localhost:8080/user/signUp",
    method: "POST",
    data: obj,
    success: function (response) {
      console.log(response);
      alert(response);
      if (response == "User Successfully registered") clearvalues();
    },
    error: function (xhr) {
      console.log("Error " + xhr);
    },
  });
}

function clearvalues() {
  $("#regName").val("");
  $("#regEmail").val("");
  $("#regMobile").val("");
  $("#regPassword").val("");
}

function shiftPage() {
  window.location.href = "../index.html";
}
