$(function () {
  getCourseData();
  getComments();
  // $("#test").click(getCourseData);
  // $("#test").click(test);
  $("#postComment").click(postComments);
});

function getCourseData() {
  console.log(" getData event runs");
  $.ajax({
    url: "http://localhost:8080/user/getdata",
    method: "GET",
    success: function (response) {
      console.log(response);
      let display = $("#appendDataBaseHmtl");
      display.empty();
      for (let i = 0; i < response.length; i++) {
        let data = response[i];
        let courseName = data.courseName;
        let link = data.link;
        let description = data.description;
        display.append(`<li><div class="blog-title" courseName=${courseName}>
          <h2><a href="${link}" target="_blank" title="">"${link}" </a></h2>  <i style="float: right;cursor:pointer" class="fa fa-2x fa-solid fa-thumbs-up"></i>	
      </div>
      <div class="blog-desc">
          <p>${description}</p>
      </li>`);
      }
    },
    error: function (err) {
      console.log(err.message);
    },
  });
}

// function test() {
//     console.log(" getData event runs");
//     $.ajax({
//       url: "http://localhost:8080/user/getdata",
//       method: "GET",
//       headers: {"Authorization": localStorage.getItem('SavedToken')},
//       success: function (response) {
//         console.log(response);
//         },error:function(err){
//           console.log(err.message);
//       }

//     });

//   }

function postComments() {
  let comment = $("#commenter-message").val();
  // let courseName = document.element.getAttribute("courseName");

  $.ajax({
    url: "http://localhost:8080/user/postComments",
    method: "POST",
    headers: { Authorization: localStorage.getItem("SavedToken") },
    data: {
      // courseName: courseName,
      comment: comment,
    },
    success: function (response) {
      console.log(response);
      alert("Comments Sent Successfully");
      function clearValues() {
        $("#commenter-message").val("");
      }
      clearValues();
      getComments();
    },
    error: function (err) {
      console.log(err.message);
    },
  });
}

function getComments() {
  $.ajax({
    url: "http://localhost:8080/user/getComments",
    method: "GET",
    success: function (response) {
      let display = $("#commentSection");
      display.empty();
      for (let i = 0; i < response.length; i++) {
        let data = response[i];
        display.append(`
      <li class="comment">
									<div class="avatar"><img alt="" src="./images/username (2).png" style="border:none;width: 70%;	float: right;" class="avatar"></div>
									<div class="comment-container">
										<h5 class="comment-author"><a href="#">${data.email}</a></h5>
										<div class="comment-body">
											<p>${data.comment}</p>
										</div>
									</div>
								</li>
`);
      }
      console.log(response);
    },
    error: function (err) {
      console.log(err.message);
    },
  });
}
