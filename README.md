
# Task List Frontend Application

A frontend React-based application for managing tasks in a full-stack project. This frontend interacts with a backend API and a PostgreSQL database to provide task management functionality.

## About the Project

This project is part of the coursework for [Ada Developers Academy](https://adadevelopersacademy.org/), created to practice and strengthen skills in full-stack development. It focuses on building a task management application with a frontend, backend, and database integration.

## Project Overview

This project is part of a full-stack application that includes:
- **Backend API**: A Flask-based RESTful API. [Link to Backend Repository](https://github.com/Nerpassevera/task-list-api)
- **Database**: PostgreSQL database to store task data.

## Features

- **Create Tasks**: Add new tasks.
- **Delete Tasks**: Remove tasks from the list.
- **Read Tasks**: View all tasks dynamically.
- **Mark Tasks as Completed/Incompleted**: Update task status and reflect it dynamically in the UI.
- **Slack Notifications**: A Slack message is sent to a designated channel when a task is marked as completed.

## Technologies Used

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **Axios**: Used for making HTTP requests to the backend API.

### Development Tools
- **Vite**: A fast build tool for modern web development.

## User Experience Enhancements

- **Dynamic Task Display**: Tasks are dynamically updated in the UI without needing to refresh the page.

## Setup Instructions

### Prerequisites
- Node.js (version 16 or higher)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Nerpassevera/task-list-front-end.git
    cd task-list-front-end
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```

4. To build for production:
    ```bash
    npm run build
    ```

## Deployment

This frontend application is deployed using GitHub Pages. You can access the live version [here](https://nerpassevera.github.io/task-list-front-end).

## Future Plans

- Add functionality to edit task titles and descriptions.
- Allow users to dynamically change the Slack channel for notifications.
- Display user-friendly success and error messages for actions like exceeding text field length or other validations.
- Implement user-friendly notifications for both successful and failed actions.
- Add a feature to filter and sort tasks based on priority or completion status.
- Allow users to manage Slack channel settings directly from the UI.

## Authors

- [Tatiana Trofimova](https://github.com/Nerpassevera)
- [Wei Qiang](https://github.com/hintow)
  
## Contributing

This project is built for educational purposes, and contributions are welcome. If you'd like to contribute, please fork the repository, make changes, and open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
