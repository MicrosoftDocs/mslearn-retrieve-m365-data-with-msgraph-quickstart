async function displayUI() {    
    await signIn();

    // Display info from user profile
    const user = await getUser();
    var userName = document.getElementById('userName');
    userName.innerText = user.displayName;  

    // Hide login button and initial UI
    var signInButton = document.getElementById('signin');
    signInButton.style = "display: none";
    var content = document.getElementById('content');
    content.style = "display: block";
}

var page = 1;
async function displayEmail() {
    var emails = await getEmails(page);
    if (!emails || emails.value.length < 1) {
        return;
    }

    var emailsUl = document.getElementById('emails');
    // clear existing elements
    emailsUl.innerHTML = '';
    emails.value.forEach(email => {
        var emailLi = document.createElement('li');
        emailLi.innerText = `${email.subject} (${new Date(email.receivedDateTime).toLocaleString()})`;
        emailsUl.appendChild(emailLi);
    });

    // stop if there are no more emails to display
    if (page === 1 && !emails['@odata.nextLink']) {
        return;
    }

    var emailsPagingButtons = document.getElementById('emailsPaging');
    emailsPagingButtons.style = 'display: block';

    var previousEmailsButton = document.getElementById('emailsPagingPrevious');
    // hide previous button on the first page
    previousEmailsButton.style = `display: ${page === 1 ? 'none' : 'inline'}`;

    var nextEmailsButton = document.getElementById('emailsPagingNext');
    // hide next button on the last page
    nextEmailsButton.style = `display: ${!emails['@odata.nextLink'] ? 'none' : 'inline'}`;
}
