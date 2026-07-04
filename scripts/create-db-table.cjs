const { Client } = require('pg');

async function run() {
  console.log('Connecting to Supabase PostgreSQL database...');
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

    // Create the business_owner_documents table
    console.log('Creating table "business_owner_documents" if not exists...');
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS business_owner_documents (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id TEXT UNIQUE NOT NULL,
        document JSONB NOT NULL,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      );
    `;
    await client.query(createTableQuery);
    console.log('Table "business_owner_documents" created or already exists.');

  } catch (err) {
    console.error('Error executing query:', err);
  } finally {
    await client.end();
    console.log('Database connection closed.');
  }
}

run();
