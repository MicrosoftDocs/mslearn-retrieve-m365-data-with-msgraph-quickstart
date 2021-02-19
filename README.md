# The best app ever

🚀

## Prerequisites

- [Node.js v14](https://nodejs.org/en/)
- [CLI for Microsoft 365](https://aka.ms/cli-m365)
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

### Create Azure AD

- open command line
- using CLI for Microsoft 365, sign in to your tenant by executing: `m365 login` and follow the instructions
- when prompted, consent to the requested permissions
- using CLI for Microsoft 365 create the Azure AD app by executing

  ```command
  m365 aad app add --name 'My app' --platform spa --redirectUris 'http://localhost' --apisDelegated 'https://graph.microsoft.com/User.Read'
  ```

- copy the value of the `appId` property returned by CLI for Microsoft 365
- in the `auth.js` file, on line 4, replace the value of the `clientId` property with the copied `appId`
- todo: after https://github.com/pnp/cli-microsoft365/issues/2187 is implemented we need to add a step to copy the directory ID which we need because the app is single-tenant and we need to specify authority in MSAL. For now, you can get it from the [Azure Portal](https://preview.portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/Overview) by copying the value of the `Tenant ID` property.
- in the `auth.js` file, on line 6, replace the value of the `authority` property with the ID of your Azure AD, eg `https://login.microsoftonline.com/0be187e2-aa5c-464a-bc8b-74b0416b4c3a`