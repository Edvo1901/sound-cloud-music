# SoundCloud Clone - Project README

## Project Overview

Welcome to the SoundCloud Clone project! This project is a web application built using modern web technologies to mimic the core functionalities of SoundCloud. It allows users to play and pause music, log in and out using various authentication methods, comment on songs, create playlists, upload songs, view uploaded songs, and utilize an admin panel for managing content. The application is built with ReactJS, TypeScript, and Next.js, styled using SCSS and MUI, and features real-time updates.

## Features

### User Features

- **Play/Pause Music**: Users can play and pause music tracks.
- **Login/Logout**: Users can authenticate using GitHub, Google, or server credentials.
- **Comment on Songs**: Users can leave comments on songs.
- **Create Playlists**: Users can create and manage their own playlists.
- **Upload Songs**: Users can upload their own music tracks.
- **View Uploaded Songs**: Users can view a list of their uploaded songs.
- **Like Songs**: Users can like songs and view the number of likes.
- **Real-Time Updates**: The application supports real-time updates for comments, likes, and other features.

### Admin Features

- **Delete Comments**: Admins can delete comments from songs.
- **Delete & Update Songs**: Admins can delete or update songs.
- **View and Manage Users**: Admins can view and manage user accounts and content.

### Docker Support
- The project is set up to run in a Docker container, making it easy to deploy and manage in different environments.

## Technology Stack

- **Front-end**: ReactJS, TypeScript, Next.js
- **Styling**: SCSS, MUI (Material-UI)
- **Authentication**: GitHub, Google, Server Credentials
- **Back-end**: To be integrated with a back-end service for data management (NestJS, MongoDB) and real-time features
- **Containerization**: Docker

## Installation

### Prerequisites

- Node.js (v18.x or higher)
- npm or yarn
- Git

### Steps

1. **Clone the Repository**

```
git clone https://github.com/Edvo1901/sound-cloud-music.git
cd sound-cloud-music
```

2. **Install Dependencies**

```
npm install
# or
yarn install
```

3. **Set Up Environment Variables**

   Create a `.env.developement` file in the root directory and add the necessary environment variables:

   ```
	NEXT_PUBLIC_BACKEND_URL=<your-backend-host-url>
	GITHUB_ID=<Github-ID>
	GITHUB_SECRET=<Github-secret-key>
	NEXTAUTH_URL=<Your-hosting-url>
	NEXTAUTH_SECRET=<secret-string>
   ```

4. **Run the Development Server**

   ```
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

### User Guide

1. **Sign Up / Log In**

   - Use GitHub, Google, or server credentials to sign up or log in.

2. **Play Music**

   - Browse songs and click the play button to start listening. Use the pause button to stop.

3. **Comment on Songs**

   - Navigate to a song's page and leave a comment in the comments section.

4. **Create Playlists**

   - Use the playlist creation feature to organize your favorite tracks.

5. **Upload Songs**

   - Use the upload feature to add your own tracks to the platform.

6. **Like Songs**

   - Click the like button on songs you enjoy.

### Admin Guide

1. **Access Admin Panel**

   - Navigate to the admin panel via the admin dashboard.

2. **Manage Comments**

   - View, delete, or update comments on songs.

3. **Manage Songs**

   - View, delete, or update songs uploaded by users.

## Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or suggestions, feel free to open an issue or contact the project maintainer at [DongVo1901@gmail.com].
