# Browsi Admin Web Application

## Overview

The Browsi Admin Web Application is a single-page application built with Angular for managing publishers, domains, and monetization strategies. This app allows users to oversee their publishers, edit publisher information, and manage domains effectively.

## Features

### Basic Features

- **Add Publisher**: Users can add new publishers to the system.
- **Add Domain**: Users can add new domains to a publisher. A new button labeled "Add Domain" is available next to the "Add Publisher" button.
- **Edit Domain**: Users can edit existing domains, with fixed bugs and improved validation.
- **Validation**:
  - **Unique Domain Validation**: Ensures that the same domain cannot exist on multiple publishers.
  - **Error Messaging**: Displays a proper message if a user attempts to save a domain that already exists on another publisher.

### Advanced Features

- **Delete Publisher**: Users can delete a publisher along with all its related domains.
- **Edit Publisher Name**: Users can edit the name of an existing publisher.
- **Optional Data**: Displays "Total User Clicks Desktop Ads" and "Total User Clicks Mobile Ads" as demonstration of optional data.

## Running the Application

### Client (Angular)

1. **Install Dependencies**: Navigate to the Angular project directory and install the required packages.
   ```bash
   npm install

2. **Run the Angular Application**: Start the Angular development server.
    ng serve
    The application will be available at http://localhost:4200.

### Server (Node.js)
1. **Clone the Repository**: Clone the Node.js project repository.
    git clone https://github.com/NoamBenBarak/server_browsi.git

2. **Install Dependencies**: Navigate to the Node.js project directory and install the required packages.
    npm install

3. **Run the Node.js Server**: Start the Node.js server.
    npm start
    The server will be available at http://localhost:5000.



# API Endpoints

* **GET** `/publishers` - Retrieve a list of all publishers.
* **POST** `/publishers` - Create a new publisher.
* **PUT** `/publishers/:publisherName` - Update a specific publisher.
* **DELETE** `/publishers/:publisherName` - Delete a specific publisher along with its domains.
* **GET** `/publishers/:publisherName/domains` - Retrieve domains for a specific publisher.
* **POST** `/publishers/:publisherName/domains` - Create a new domain for a specific publisher.
* **PUT** `/publishers/:publisherName/domains/:domainName` - Update a specific domain.
* **DELETE** `/publishers/:publisherName/domains/:domainName` - Delete a specific domain.

# Demo Data

* **Total User Clicks Desktop Ads**: Displays the total number of user clicks on desktop ads.
* **Total User Clicks Mobile Ads**: Displays the total number of user clicks on mobile ads.

# Setup Instructions

## Frontend:

* Install Node.js (version 18) and Angular CLI.
* Navigate to the Angular project directory and run `npm install` to install dependencies.
* Start the Angular server with `ng serve`.

## Backend:

* Install Node.js (version 18).
* Clone the Node.js project repository and run `npm install` to install dependencies.
* Start the Node.js server with `npm start`.

# Notes

* The application uses Angular version 17 for the frontend and Node.js version 18 for the backend.
* Ensure that both the frontend and backend servers are running for the application to function correctly.

