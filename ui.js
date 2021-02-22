function displayProfile(user) {    
    if (!user) {
        return;
    }

    // set user data
    var userName = document.getElementById('userName');
    userName.innerText = user.displayName;  

    // hide login button and show user info
    var signInButton = document.getElementById('signin');
    signInButton.style = "display: none";
    var content = document.getElementById('content');
    content.style = "display: block";
}