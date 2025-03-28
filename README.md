  **User Management Dashboard**

A responsive React application for managing users with authentication, pagination, and CRUD operations.

  **Features**

- **User Authentication**
  - Login with JWT token
  - Token persistence using localStorage
  - Protected routes

- **User Management**
  - View user list with avatars
  - Edit user details
  - Delete users with confirmation
  - Infinite scroll pagination

- **UI/UX**
  - Responsive design (mobile & desktop)
  - Modern card-based layout
  - Interactive modals
  - Loading states
  - Error handling

      **Tech Used**

- **Frontend**
  - React 
  - React Hooks (useState, useEffect)
  - Reqres API 
  - Axios for HTTP requests
  - CSS3 with Flexbox/Grid
  
     **How It Works**

**Authentication Flow**
1. User submits login form with email/password
2. App sends request to ReqRes.in mock API
3. On success:
   - Receives JWT token
   - Stores token in browser's localStorage
   - Redirects to protected users page

**User Management**
#### Loading Users
- Fetches users from ReqRes.in API with pagination
- Automatically detects when no more users are available
- "Load More" button disappears when all users are loaded

#### Editing Users
1. Click "Edit" on any user card
2. Modal opens with user's current details
3. Changes are saved [local]

#### Deleting Users
1. Click "Delete" on any user card
2. Confirmation pop-up appears
3. On confirm: 
   - Removes user from local state
   - Updates UI instantly
#### Compatibility
-Works perfectly on Desktop and Mobile
