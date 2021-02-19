function displayProfile(user){
    const mainContainer = document.getElementById('main-container');
    if (user) {                  
        // Welcome the logged in user by name
        var welcomeMessage = document.createElement('h4');
        welcomeMessage.textContent = `Welcome ${user.displayName}!`;
        var emailMessage = document.createElement('p');
        emailMessage.textContent = `Your email retrieved from Microsoft Graph is: ${user.mail}!`;
        mainContainer.innerHTML = '';
        mainContainer.appendChild(welcomeMessage);
        mainContainer.appendChild(emailMessage);
    }
    else {
        // Show a sign in button 
        var signInButton = document.createElement('button')
        signInButton.innerHTML = "Click here to sign in";
        signInButton.addEventListener("click", () => { signIn(); });
        mainContainer.appendChild(signInButton);
    }
}