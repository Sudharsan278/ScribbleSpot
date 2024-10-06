# ScribbleSpot

ScribbleSpot is a web application for making notes that allows users to add, delete, and update their notes with ease. The application also features user authentication and supports both dark and light modes, making it user-friendly and visually appealing.

## Features

- **User Authentication**: Secure login and registration for users.
- **CRUD Operations**: Add, delete, and update notes.
- **Summarization**: Utilize APIHub's API for content summarization.
- **Dark and Light Mode**: Easily switch between themes for comfortable viewing.

## Technologies Used

- **Frontend**: 
  - React (with React Router for routing)
  - HTML
  - CSS
  - Bootstrap
- **Backend**: 
  - Express.js
  - Bcrypt.js (for password hashing)
  - CORS (for handling cross-origin requests)
  - Express Validator (for validating user input)
  - JSON Web Token (JWT) for user authentication
  - Mongoose (for MongoDB object modeling)
- **Database**: 
  - MongoDB
- **Development**:
  - Nodemon (for automatic server restarts during development)
- **APIs**:
  - APIHub API for content summarization

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

- Node.js installed on your machine
- MongoDB installed and running

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sudharsan278/ScribbleSpot.git
   cd ScribbleSpot
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up your MongoDB connection string in your environment variables or configuration file.


## Acknowledgments

- [Create React App](https://github.com/facebook/create-react-app) for bootstrapping the project.
- [Bootstrap](https://getbootstrap.com/) for styling components.
- [APIHub](https://api-hub.com/) for the content summarization API.


You can learn more about the technologies used in this project:

- [React Documentation](https://reactjs.org/)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
```

- Feel free to customize the **Other Libraries** section to include any additional libraries you may have used.
- If you want to elaborate more on how the API from APIHub is used in your project, you can add a brief description in the **Features** section. 
