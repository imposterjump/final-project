$(document).ready(function() {
    $("#username").on('keyup', function(e) {
        e.preventDefault();
        var value = $('#username').val();
        $.ajax({
            url: '/sign-up/checkUN',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ username: value }),
            success: function(result) {
                $('#result').html('username' + result);

                if (result == 'taken') {
                    $('#result').css("color", "red");
                    $('#btn-sub').css("background-color", "red");
                    $('#btn-sub').prop("disabled", true);
                } else {
                    $('#result').css("color", "green");
                    $('#btn-sub').prop("disabled", false);
                }
            },
            error: function(err) {
                console.log(err);
            }
        });
    });
});