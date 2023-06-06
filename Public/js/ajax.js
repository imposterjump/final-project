$(document).ready(function() {
    $("#username").on('keyup', function(e) {
        e.preventDefault();
        var data = $('#username').val();
        $.ajax({
            url: '/signup/checkUN',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ username: data }),
            success: function(response) {
                $('#result').html('UserName is ' + response);

                if (response == 'taken') {
                    $('#result').css("color", "red");
                } else {
                    $('#result').css("color", "green");
                }
            },
            error: function(err) {

            }
        });
    });
});