# ToDo Application

This is a simple ToDo application built with React. It allows users to add, delete, and toggle the completion status of ToDo items. The application also uses the React Context API to manage application-wide settings.
Features

## Installation

1. Clone the repository.
2. Install the dependencies using npm install.
3. Start the development server using npm run dev.

## Usage

This application uses a global state to manage the ToDo items. Components consume this global state using the React Context API.

The `useForm()` hook is used to manage the form state in the application. It takes the initial form state as its argument and returns an array containing the current form state and a function to update it.
