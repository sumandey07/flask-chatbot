$(document).ready(function () {
  var x = document.forms["chats"]["msg"].value;

  $("#mic").on("click", function () {
    $.ajax({
      url: "/voice",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ msg: x }),
      success: function (response) {
        document.getElementById("text").value += " " + response;
      },
      error: function (error) {
        console.log(error);
      },
    });
  });

  $("#messageArea").on("submit", function (event) {
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const str_time = hour + ":" + minute;
    var rawText = $("#text").val();
    var x = document.forms["chats"]["msg"].value;

    if (x == "" || x == null) {
      return false;
    }

    var userHtml =
      '<div class="d-flex justify-content-end mb-4"><div class="msg_cotainer_send">' +
      rawText +
      '<span class="msg_time_send">' +
      str_time +
      '</span></div><div class="img_cont_msg"><img src="https://i.ibb.co/d5b84Xw/Untitled-design.png" class="rounded-circle user_img_msg"></div></div>';

    $("#text").val("");
    $("#messageFormeight").append(userHtml);

    $.ajax({
      data: {
        msg: rawText,
      },
      type: "POST",
      url: "/get",
    }).done(function (data) {
      var botHtml =
        '<div class="d-flex justify-content-start mb-4"><div class="img_cont_msg"><img src="https://res.cloudinary.com/sumandey/image/upload/v1702545392/1_C_LFPy6TagD1SEN5SwmVRQ_xpk21w.jpg" class="rounded-circle user_img_msg"></div><div class="msg_cotainer">' +
        data +
        '<span class="msg_time">' +
        str_time +
        "</span></div></div>";
      $("#messageFormeight").append($.parseHTML(botHtml));
    });
    event.preventDefault();
  });
});
