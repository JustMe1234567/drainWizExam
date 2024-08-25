$(document).ready(function () {
  setTimeout(function () {
    $.ajax({
      url: "load.php",
      type: "GET",
      dataType: "json",
      success: function (response) {
        console.log(response); // Log the response to inspect it

        if (response) {
          // h1(response)
          $("#applicant-name").text(response.fullname);
          $("#student-id").text(response.id || "N/A");
          $("#applicant-code").text(response.applicantcodeid || "N/A");
          $("#student-name").text(response.fullname || "N/A");
          $("#mobile-number").text(response.mobileno || "N/A");
          $("#email").text(response.emailadd || "N/A");

          // Hide loading section and show student information
          $("#loading").addClass("hidden");
          $("#applicant-main").removeClass("hidden");
          $("#student-info").removeClass("hidden");
        } else {
          // No applicants found
          $("#loading").addClass("hidden");
          $("#no-applicants").removeClass("hidden");
        }
      },
      error: function () {
        console.log("An error occurred while fetching the applicant data.");
        $("#loading").addClass("hidden");
        $("#no-applicants").removeClass("hidden").text("Error loading data.");
      },
    });
  }, 1000); // simulate loading
});
