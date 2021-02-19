//MSAL configuration
const msalConfig = {
    auth: {
        clientId: '<your client ID here>',
        redirectUri: 'http://localhost:8080'
    }
};
const msalRequest = { scopes: ['user.read'] };

//Initialize MSAL client
const msalClient = new msal.PublicClientApplication(msalConfig);

async function signIn() {
    const authResult = await msalClient.loginPopup(msalRequest);
    sessionStorage.setItem('msalAccount', authResult.account.username);
    // Get the user's profile from Graph
    const user = await getUser();
    // Save the profile in session storage
    sessionStorage.setItem('graphUser', JSON.stringify(user));   
    displayProfile(user);
}
//Get token from Graph
async function getToken() {
    let account = sessionStorage.getItem('msalAccount');
    if (!account) {
        throw new Error(
            'User info cleared from session. Please sign out and sign in again.');
    }
    try {
        // First, attempt to get the token silently
        const silentRequest = {
            scopes: msalRequest.scopes,
            account: msalClient.getAccountByUsername(account)
        };

        const silentResult = await msalClient.acquireTokenSilent(silentRequest);
        return silentResult.accessToken;
    } catch (silentError) {
        // If silent requests fails with InteractionRequiredAuthError,
        // attempt to get the token interactively
        if (silentError instanceof msal.InteractionRequiredAuthError) {
            const interactiveResult = await msalClient.acquireTokenPopup(msalRequest);
            return interactiveResult.accessToken;
        } else {
            throw silentError;
        }
    }
}

