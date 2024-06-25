# HealthGPT

HealthGPT is a React-based chatbot application designed to assist users with health-related inquiries. By integrating OpenAI's GPT-4 model, users can engage in natural language conversations with the chatbot to receive health advice and information.

![HealthGPT](public/images/healthbot.png)

## Features

- Chat with HealthGPT to receive health advice
- Select health topics such as wellness and prevention, everyday care, chronic conditions, mental health, etc.
- Get detailed information based on the selected topics
- Support for real-time conversation logging

## Requirements

- Node.js (v14.0 or later)
- npm (v6.0 or later)

## Installation and Running

### Clone the Repository

### Install Dependencies
```bash
`npm start`
```
### Configure Environment Variables
Create a .env file in the project root and add the following content:
```bash
REACT_APP_OPENAI_API_KEY=your_openai_api_key
```
Replace your_openai_api_key with your actual OpenAI API key.

### Run the Application
```bash
npm start
```
The application will run on http://localhost:3000. You can open this address in your browser to view the application.

## Main Files Explanation

### App.js
This is the main component of the application, responsible for handling user input, interacting with the OpenAI API, and displaying the conversation history.

### App.css
Contains the style definitions for the application, making the interface more attractive and user-friendly.

### index.js
The entry point of the React application, responsible for rendering the App component.

## Usage Guide
1. After opening the application, you will see a welcome message and a selection of health topics.
2. You can choose a topic to get detailed information or type your question directly into the input box.
3. Click the "Ask" button, and the chatbot will respond based on your input.
##Notes
Ensure your OpenAI API key is valid and has sufficient quota.
In a production environment, make sure to store and manage your API key securely.
##Contribution
If you want to contribute to this project, please fork the repository and submit a pull request. All forms of contributions are welcome.

##License
This project is licensed under the MIT License.
