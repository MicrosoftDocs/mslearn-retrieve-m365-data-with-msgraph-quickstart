// Create an authentication provider
const authProvider = {
    getAccessToken: async () => {
        // Call getToken in auth.js
        return await getToken();
    }
};
// Initialize the Graph client
const graphClient = MicrosoftGraph.Client.initWithMiddleware({ authProvider });
//Get user info from Graph
async function getUser() {
    ensureScope('user.read');
    return await graphClient
        .api('/me')
        .select('id,displayName')
        .get();
}

async function getEmails(page) {
    ensureScope('mail.read');

    var pageSize = 10;

    var query = graphClient
        .api('/me/messages')
        .select('subject,receivedDateTime')
        .orderby('receivedDateTime desc')
        .top(pageSize);

    if (page && page > 1) {
        query.skip((page - 1) * pageSize);
    }

    return await query.get();
}
