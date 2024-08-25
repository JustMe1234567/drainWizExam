$(function () {
  $("form").on("submit", function (event) {
    event.preventDefault();

    // Collect form data
    const formData = {
      firstName: $("#first-name").val(),
      midName: $("#mid-name").val(),
      lastName: $("#last-name").val(),
      suffix: $("#suffix").val(),
      mobileNumber: $("#mobile-number").val(),
      email: $("#email").val(),
    };

    $.ajax({
      type: "POST",
      url: "add.php",
      data: formData,
      dataType: "json",
      encode: true,
    })
      .done(function (data) {
        console.log(data);

        // Handle successful response
        if (data.success) {
          // Provide feedback to the user, e.g., display a success message
          $("#alert")
            .text("Form submitted successfully!")
            .removeClass("hidden")
            .css("color", "green");
        } else {
          // Handle specific errors or validation messages
          $("#alert")
            .text(data.message || "Submission failed. Please try again.")
            .removeClass("hidden")
            .css("color", "red");
          $("#first-name").val("");
          $("#mid-name").val("");
          $("#last-name").val("");
          $("#suffix").val("");
          $("#mobile-number").val("");
          $("#email").val("");
        }
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        // Handle errors from the AJAX request
        console.error("AJAX request failed:", textStatus, errorThrown);
        $("#alert")
          .text("An error occurred. Please try again.")
          .removeClass("hidden")
          .css("color", "red");
      });
  });
});
