# AC7 Beauty White E-commerce Shop

Welcome to AC7 Beauty White, your one-stop shop for premium beauty products. This repository contains the codebase for the AC7 Beauty White e-commerce platform.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [License](#license)
- [Contact](#contact)

## Features

- User authentication and authorization
- Product catalog with categories and search functionality
- Shopping cart and wishlist
- Secure checkout process with payment gateway integration
- Order history and tracking
- Admin dashboard for product and order management
- Responsive design for mobile and desktop

## Technologies Used

- **Frontend:**
  - HTML, CSS, JavaScript
  - React JS
  - Tailwind CSS

- **Backend:**
  - Node js
  - Express

- **Database:**
  - MySQL

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

## Contact
For any inquiries or support, please contact us at support@ac7beautywhite.com.

Thank you for using AC7 Beauty White!

## Docker — Run full application

Prerequisites: Docker and Docker Compose installed.

- From the repository root, build and start all services (MySQL, backend, frontend):

```bash
docker-compose up --build
```

- Run in background:

```bash
docker-compose up --build -d
```

- Stop and remove containers:

```bash
docker-compose down
```

Once running:
- Frontend (React dev server): http://localhost:3000
- Backend (Express API): http://localhost:8080
- MySQL: 3306

Notes:
- The frontend uses the `proxy` setting to forward API requests to the backend on port 8080.
- On first run the containers will install dependencies; the commands above mount the local code so changes are visible without rebuilding.

### Run without Docker (local development)

- Start backend:

```bash
cd server
npm install
node index.js
```

- Start frontend (from repo root):

```bash
npm install
npm start
```
