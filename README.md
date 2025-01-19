# Connect Pro

An Socket IO web based application for real time chatting with friends.

___

### Features

- Full Stack functionality of a chat application
  - Chat with a user
  - Group chats
  - Admin Dashboard
  - File Sharing
  - Hate Speech Detection

### Architecture

![architecture drawio](https://github.com/user-attachments/assets/7bb72c8a-da15-47c6-92ff-27635359fef4)

### Enviroment Variables
To run this project, you will need to add the following environment variables to your .env file

for server .env

`MONGO_URI` - Atlas Database URL

`PORT` - Preferred port to run the application

`JWT_SECRET` - Random string

`ADMIN_SECRET` - Random string

`CLIENT_URL` - URL of Client

`CLOUDINARY_NAME`
`CLOUDINARY_API_KEY` 
`CLOUDINARY_API_SECRET` 

And for client .env

`VITE_SERVER` - URL of Server
`VITE_FLASK_SERVER` - URL of Flask server which uses NLP

### Installation & Run locally

Clone this repository git

```bash
  git clone https://github.com/Ashish-Bind/Blog-MERN-Stack-Project.git
  cd Blog-MERN-Stack-Project
```

Install dependencies from npm

```
  cd server
  npm i
```

```
  cd client
  npm i
```
### Screenshots
![architecture drawio (2)](https://github.com/user-attachments/assets/f70fa334-6985-4cbe-9a80-039fa223611c)
![architecture drawio (3)](https://github.com/user-attachments/assets/216c2e85-5062-4574-b28e-17cf9e5bb190)

Made with 💖 by Ashish and Team
