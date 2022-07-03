$(function () {
  loadProfile();
});

function loadProfile() {
  $.ajax({
    url: "http://localhost:8080/user/profile",
    method: "GET",
    headers: { Authorization: localStorage.getItem("SavedToken") },
    success: function (response) {
      let data = response;
      let display = $("#display");
      display.empty();
      display.html(`
      <section style="background-color: #eee;">
          <div class="container py-5">
            <div class="row">
              <div class="col-lg-4">
                <div class="card mb-4">
                  <div class="card-body text-center">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
                      class="rounded-circle img-fluid" style="width: 150px;">
                    <h5 class="my-3">${data.name}</h5>
                    <div class="d-flex justify-content-center mb-2">
        
                    </div>
                  </div>
                </div>
               </div>
          
              <div class="col-lg-8">
                <div class="card mb-4">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-sm-3">
                        <p class="mb-0">Full Name</p>
                      </div>
                      <div class="col-sm-9">
                        <p class="text-muted mb-0">${data.name}</p>
                      </div>
                    </div>
                    <hr>
                    <div class="row">
                      <div class="col-sm-3">
                        <p class="mb-0">Email</p>
                      </div>
                      <div class="col-sm-9">
                        <p class="text-muted mb-0">${data.email}</p>
                      </div>
                    </div>
                    <hr>
                    <div class="row">
                      <div class="col-sm-3">
                        <p class="mb-0">Phone</p>
                      </div>
                      <div class="col-sm-9">
                        <p class="text-muted mb-0">${data.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </div>
          </div>
        </section>
      `);
    },
    error: function (err) {
      console.log(err.message);
    },
  });
}
