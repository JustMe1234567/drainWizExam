$(function () {
  console.log("Ready");
  //   sugests students from the database
  $("#name").on("input", function () {
    let name = $(this).val();
    if (name != "") {
      $.ajax({
        url: "search.php",
        method: "POST",
        data: {
          name: name,
        },
        success: function (response) {
          console.log(response);
          let names = JSON.parse(response);
          let suggestions = "";

          if (names.length > 0) {
            $("#show-names").removeClass("hidden");
            names.forEach(function (name) {
              suggestions += `<h1 class="suggestion-item p-1"><a href="#">${name}</a></h1><hr/>`;
            });

            $("#show-names").html(suggestions).removeClass("hidden");
          } else {
            $("#show-names").addClass("hidden ");
          }
        },
        error: function () {
          console.log("An error occurred while fetching the names.");
          $("#show-names").addClass("hidden");
        },
      });
    } else {
      $("#show-names").addClass("hidden");
    }
  });

  //   get data of the student clicked
  $(document).on("click", "#show-names a", function () {
    $("#name").val($(this).text());
    $("#show-names").addClass("hidden");
    let name = $(this).text();
    $.ajax({
      url: "getStudent.php",
      method: "post",
      data: {
        name: name,
      },
      dataType: "json",
      success: function (response) {
        let data = response;
        console.log(data);

        $("#application").removeClass("hidden");
        $("#student-id").text(data.id);
        $("#school-code").text(data.schoolcode);
        $("#applicant-code").text(
          `${data.applicantcodeid ? data.applicantcodeid : "Not Set"}
        `
        );
        $("#applicant-number").text(
          data.applicantno ? data.applicantno : "Not Set"
        );
        $("#last-name").text(data.lastname);
        $("#first-name").text(data.firstname);
        $("#middle-name").text(data.midname);
        $("#suffix").text(`${data.suffix ? data.suffix : "N/A"}`);
        $("#applicant-name").text(data.fullname);
        $("#full-name").text(
          `${data.firstname} ${data.lastname} ${data.suffix ? data.suffix : ""}`
        );
        $("#mobile-number").text(data.mobileno);
        $("#email").text(data.emailadd);
        $("#name").val("");
      },
    });
  });
});
