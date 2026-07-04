const { Client } = require('pg');

async function run() {
  console.log('Connecting to Supabase PostgreSQL database to create users table...');
  const client = new Client({
    user: 'postgres.gdxwfnnktulujdxahzln',
    host: 'aws-0-ap-northeast-1.pooler.supabase.com',
    database: 'postgres',
    password: 'Vedelivery@123',
    port: 6543,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    console.log('Connected successfully!');

    // Create the users table
    console.log('Creating table "users" if not exists...');
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        first_name TEXT,
        last_name TEXT,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      );
    `;
    await client.query(createTableQuery);
    console.log('Table "users" created successfully or already exists.');

  } catch (err) {
    console.error('Error executing query:', err);
  } finally {
    await client.end();
    console.log('Database connection closed.');
  }
}

run();
