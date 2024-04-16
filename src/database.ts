import mysql, { Connection } from 'mysql2/promise';

// Global variable to store the database connection
let connection: Connection;

/**
 * Function to initialize connection with the database
 * @returns A Promise that resolves to a Connection object representing the database connection
 */
export async function initializeConnection(): Promise<Connection> {
  // Check if connection has been initialized
  if (!connection) {
    // Create a new connection
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }
  return connection;
}

/**
 * Function to close connection with the database
 * @returns A Promise that resolves when the connection is closed
 */
export async function closeConnection(): Promise<void> {
  // Check if connection exists
  if (connection) {
    await connection.end();
  }
}

export { connection };
