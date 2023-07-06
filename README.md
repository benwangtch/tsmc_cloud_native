This is a documentation application build by MERN stack, designed for company to save and share files, it provide a platform to edit, delete and share files between whether same department or different, all change on documents are saved and can be recovered. It was real time deployed and monitered by jenkins on our server.

How to deploy:
1. Without Docker:
    Move location under backend and run 'npm install' this will install the dependencies. Then 'npm run server', this should start the backend server.
    Move location under client and run 'npm install' this will install the dependencies. Then 'npm start', this should start the frontend server.
    Your browser should show localhost:3000

2. With Docker:
    First, you should have docker desktop and docker, and it will be simple.
    Run 'docker-compose up' will install all the packages and run the servers in containers.
    Run 'docker-compose up --build' if you changes the files, you will need to rebuild it.
