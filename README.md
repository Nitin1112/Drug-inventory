# PharmaOne - Drug Inventory and Supply Chain Tracking System

## Overview
PharmaOne is an innovative solution designed to streamline the pharmaceutical supply chain, ensuring the "7 Rights" of supply chain management: **Right Quantity**, **Right Product**, **Right Place**, **Right Time**, **Right Condition**, **Right Cost**, and **Right People**. This system enhances efficiency, reduces errors, and ensures the consistent availability of high-quality drugs across healthcare institutions.

## Key Features
- **Centralized Database**: Manage drug inventory, expiration dates, and supply chain details in a single cloud-based system.
- **Predictive Analytics**: Employ machine learning for demand forecasting and inventory optimization.
- **User-friendly Dashboard**: Provide stakeholders with real-time monitoring and data visualization tools.
- **Quality Control**: Ensure drug quality across the supply chain through robust quality assurance modules.
- **Cost Optimization**: Optimize logistics and purchasing strategies to reduce overall costs.

## Under Development
- **Mobile Accessibility**: Flutter-based app for on-the-go access to inventory and order management.
- **Real-time Tracking**: Leverage live tracking maps for live shipment tracking and delivery updates.

## Tech Stack
- **Frontend**: React.js, Flutter
- **Backend**: Node.js (Express), Django
- **Database**: MongoDB Atlas
- **Cloud Platform**: AWS or Google Cloud Platform
- **State Management**: Redux, GetX (Flutter)
- **Authentication**: OAuth2

## Use Cases
1. **Hospitals and Clinics**: Manage drug stock levels and receive alerts for replenishment.
2. **Vendors and Distributors**: Track shipments and optimize delivery routes.
3. **Healthcare Administrators**: Analyze consumption patterns and monitor quality control.

## Project Highlights
- Predictive analytics to prevent stock-outs and minimize wastage.
- Mobile and web-based platforms for comprehensive accessibility and usability.

## Project Structure
```bash
   DRUG-INVENTORY/
   │
   ├── public/                # Static files
   ├── server/                # Backend (Node.js, Express)
   │   ├── controller/        # Controller logic for APIs
   │   ├── middlewares/       # Middleware for handling requests
   │   ├── models/            # Database models (Mongoose Schemas)
   │   ├── routes/            # API routes
   │   ├── templates/         # Views and email templates
   │   ├── utils/             # Utility functions
   │   ├── server.config.js   # Server configuration file (Secret Keys)
   │   ├── server.js          # Entry point for the backend server
   │
   └── src/                   # Frontend (React.js)
       ├── assets/            # Static assets (images, icons, etc.)
       ├── components/        # React components
       ├── controllers/       # React component controllers
       ├── App.jsx            # Main React component
       ├── index.css          # Global styles for the frontend
       ├── index.html         # Main HTML file
       ├── main.jsx           # Entry point for React app
       └── client.config.mjs  # Client-side configurations (Client Secret Keys)
```

## Installation and Running the Project

Follow these steps to set up and run the project:

### Prerequisites:
- Ensure you have **Node.js** and **npm** installed.
- For the backend, set up **MongoDB Atlas** and **Django** dependencies.

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Nitin1112/Drug-inventory.git
   cd Drug-inventory

2. **Install Dependencies**
   Ensure you have Node.js installed, then run:
    ```bash
    npm install

3. **Run the Development Server**
   Start the Vite development server with:
   ```bash
   npm run dev

4. **Build the Project for Production**
   To generate a production build, use:
   ```bash
   npm run build

5. **Preview the Production Build**
   Test the production build locally with:
   ```bash
   npm run preview

6. **Run the Back-end Server**
   Start the node server with:
   ```bash
   cd server
   npm run dev

7. **Access the Application**
   Open your browser and navigate to the development server URL displayed in your terminal (e.g., `http://localhost:3000`).

## License
This project is licensed under the [MIT License](LICENSE).

## Team PharmaOne
### Meet the Team:

<div> <a href="https://github.com/Navin82005" style="display: inline-block;"> <img src="https://avatars.githubusercontent.com/Navin82005" width="50px" style="border-radius: 50%;" alt="Naveen N"/> </a> <img width="20" /> <a href="https://github.com/Nitin1112" style="display: inline-block; padding: 0 20px;"> <img src="https://avatars.githubusercontent.com/Nitin1112" width="50px" style="border-radius: 50%;" alt="Nitin B"/> </a> <img width="20" /> <a href="https://github.com/mohammedasan" style="display: inline-block;"> <img src="https://avatars.githubusercontent.com/mohammedasan" width="50px" style="border-radius: 50%;" alt="Mohammed Asan I"/> </a> <img width="20" /> <a href="https://github.com/naveen-raj" style="display: inline-block; padding: 0 20px;"> <img src="https://avatars.githubusercontent.com/naveen-raj" width="50px" style="border-radius: 50%;" alt="Naveen Raj"/> </a> </div>
