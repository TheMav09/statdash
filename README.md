StatDash3.0
StatDash3.0 is a React-based application that integrates with Azure, Meraki, and Asset Panda for monitoring IT infrastructure health, managing assets, and viewing Azure costs. It uses MSAL for Azure AD authentication and Redux for state management.

Available Scripts
npm start
Runs the app in development mode at http://localhost:3000.

npm test
Runs the test runner.

npm run build
Builds the app for production in the build folder.

npm run eject
Copies configuration files and dependencies into your project for more control over the build process.

Project Structure
bash
Copy code
/src
  /components
    - Logout.tsx          # Reusable logout button
  /config
    - msalConfig.ts       # MSAL configuration
  /pages
    - WelcomePage.tsx     # User login page
    - HomePage.tsx        # Dashboard overview
    - AzureHealth.tsx     # Azure VM health monitoring
    - AzureCosts.tsx      # Azure costs breakdown
    - AzureManagement.tsx # Admin-only management page
    - AssetManagement.tsx # Asset Panda integration for IT asset management
  /services
    - azureService.ts     # Azure API service (WIP)
    - merakiService.ts    # Meraki API service (WIP)
    - assetPandaService.ts # Asset Panda API service (WIP)
  /store
    - slices              # Redux slices (auth, assets, costs, metrics)
    - index.ts            # Redux store setup
  App.tsx                 # Main app component
  index.tsx               # Entry point
  reportWebVitals.ts      # Performance monitoring
Environment Variables
Create a .env file with the following variables:

makefile
Copy code
REACT_APP_AZURE_CLIENT_ID=<Your Azure Client ID>
REACT_APP_AZURE_TENANT_ID=<Your Azure Tenant ID>
REACT_APP_AZURE_CLIENT_SECRET=<Your Azure Client Secret>
REACT_APP_REDIRECT_URI=http://localhost:3000
Key Features
Azure VM Health Monitoring
Asset Management via Asset Panda
Azure Costs Breakdown
Admin-Only Azure Management
Authentication with Azure AD
Testing
Run tests using:

bash
Copy code
npm test
