document.querySelector('form').addEventListener('submit', function(event) {
    const password = document.querySelector('#password').value;
    const confirmPassword = document.querySelector('#confirm-password').value;

    // Check if the two passwords match
    if (password !== confirmPassword) {
        alert('The two passwords do not match.');
        event.preventDefault();
    }


});

function validate() {
    if (document.getElementById('result').innerHTML.includes('taken'))
        return false;
    else
        return true;
}