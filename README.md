# Giveaway Website

This project is a simple giveaway website where users can submit entries and a winner can be randomly selected.

## Setup

1.  **Create MySQL Database and Table:**
    *   Open your MySQL client.
    *   Run the commands in the `schema.sql` file to create the `giveaway` database and the `entries` table.

2.  **Install Dependencies:**
    *   Open a terminal in the project directory.
    *   Run the following command to install the required Node.js package:
        ```bash
        npm install mysql2
        ```

3.  **Configure Database Connection:**
    *   Open the `db-config.js` file.
    *   Replace the placeholder values for `user` and `password` with your MySQL credentials.

4.  **Run the Server:**
    *   In the terminal, run the following command:
        ```bash
        node server.js
        ```

5.  **Access the Website:**
    *   Open your web browser and go to `http://localhost:3000`.