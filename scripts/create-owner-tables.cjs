const { Client } = require('pg');

async function run() {
  console.log('Connecting to Supabase PostgreSQL database to create owner tables...');
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

    // Create the business owner tables
    console.log('Creating tables...');

    // 1. owner_stores
    await client.query(`
      CREATE TABLE IF NOT EXISTS owner_stores (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID UNIQUE NOT NULL,
        name TEXT NOT NULL,
        type TEXT DEFAULT 'Restaurant',
        cuisine TEXT DEFAULT 'Indian',
        address TEXT,
        contact_number TEXT,
        logo_url TEXT,
        is_open BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      );
    `);
    console.log('- owner_stores created');

    // 2. owner_timings
    await client.query(`
      CREATE TABLE IF NOT EXISTS owner_timings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        store_id UUID UNIQUE NOT NULL REFERENCES owner_stores(id) ON DELETE CASCADE,
        opening_time TEXT DEFAULT '08:00 AM',
        closing_time TEXT DEFAULT '11:00 PM',
        open_all_days BOOLEAN DEFAULT true,
        custom_days TEXT[] DEFAULT ARRAY['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      );
    `);
    console.log('- owner_timings created');

    // 3. owner_locations
    await client.query(`
      CREATE TABLE IF NOT EXISTS owner_locations (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        store_id UUID UNIQUE NOT NULL REFERENCES owner_stores(id) ON DELETE CASCADE,
        address TEXT,
        lat DOUBLE PRECISION DEFAULT 12.9352,
        lng DOUBLE PRECISION DEFAULT 77.6244,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      );
    `);
    console.log('- owner_locations created');

    // 4. owner_bank_details
    await client.query(`
      CREATE TABLE IF NOT EXISTS owner_bank_details (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        store_id UUID UNIQUE NOT NULL REFERENCES owner_stores(id) ON DELETE CASCADE,
        account_holder_name TEXT,
        bank_name TEXT,
        account_number TEXT,
        ifsc_code TEXT,
        upi_id TEXT,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      );
    `);
    console.log('- owner_bank_details created');

    // 5. owner_printer_settings
    await client.query(`
      CREATE TABLE IF NOT EXISTS owner_printer_settings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        store_id UUID UNIQUE NOT NULL REFERENCES owner_stores(id) ON DELETE CASCADE,
        select_printer TEXT DEFAULT 'Kitchen Printer',
        paper_size TEXT DEFAULT '80 mm',
        print_automatically BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      );
    `);
    console.log('- owner_printer_settings created');

    // 6. owner_app_preferences
    await client.query(`
      CREATE TABLE IF NOT EXISTS owner_app_preferences (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID UNIQUE NOT NULL,
        order_sound BOOLEAN DEFAULT true,
        notification_sound BOOLEAN DEFAULT true,
        vibration BOOLEAN DEFAULT true,
        language TEXT DEFAULT 'English',
        theme TEXT DEFAULT 'Light',
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      );
    `);
    console.log('- owner_app_preferences created');

    // 7. owner_categories
    await client.query(`
      CREATE TABLE IF NOT EXISTS owner_categories (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        store_id UUID NOT NULL REFERENCES owner_stores(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        icon_name TEXT DEFAULT '📁',
        display_order INT DEFAULT 1,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now(),
        UNIQUE(store_id, name)
      );
    `);
    console.log('- owner_categories created');

    // 8. owner_menu_items
    await client.query(`
      CREATE TABLE IF NOT EXISTS owner_menu_items (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        store_id UUID NOT NULL REFERENCES owner_stores(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        price DOUBLE PRECISION NOT NULL,
        category TEXT NOT NULL,
        is_bestseller BOOLEAN DEFAULT false,
        is_available BOOLEAN DEFAULT true,
        description TEXT,
        image_url TEXT,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      );
    `);
    console.log('- owner_menu_items created');

    // 9. owner_orders
    await client.query(`
      CREATE TABLE IF NOT EXISTS owner_orders (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        order_number TEXT UNIQUE NOT NULL,
        store_id UUID NOT NULL REFERENCES owner_stores(id) ON DELETE CASCADE,
        customer_name TEXT NOT NULL,
        customer_phone TEXT NOT NULL,
        delivery_address TEXT NOT NULL,
        distance TEXT NOT NULL,
        time TEXT NOT NULL,
        subtotal DOUBLE PRECISION NOT NULL,
        delivery_fee DOUBLE PRECISION DEFAULT 0.0,
        tax_amount DOUBLE PRECISION DEFAULT 0.0,
        total_amount DOUBLE PRECISION NOT NULL,
        status TEXT DEFAULT 'new',
        payment_method TEXT DEFAULT 'digital_wallet',
        payment_status TEXT DEFAULT 'pending',
        delivered_at TEXT,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      );
    `);
    console.log('- owner_orders created');

    // 10. owner_order_items
    await client.query(`
      CREATE TABLE IF NOT EXISTS owner_order_items (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        order_id UUID NOT NULL REFERENCES owner_orders(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        quantity INT NOT NULL,
        price DOUBLE PRECISION NOT NULL
      );
    `);
    console.log('- owner_order_items created');

    // 11. owner_staff
    await client.query(`
      CREATE TABLE IF NOT EXISTS owner_staff (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        store_id UUID NOT NULL REFERENCES owner_stores(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        status TEXT DEFAULT 'active',
        phone TEXT NOT NULL,
        email TEXT NOT NULL,
        permissions TEXT[] DEFAULT ARRAY['Menu'],
        joined_on TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      );
    `);
    console.log('- owner_staff created');

    // 12. owner_notifications
    await client.query(`
      CREATE TABLE IF NOT EXISTS owner_notifications (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        store_id UUID NOT NULL REFERENCES owner_stores(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        message TEXT NOT NULL,
        time TEXT NOT NULL,
        is_read BOOLEAN DEFAULT false,
        type TEXT DEFAULT 'order',
        created_at TIMESTAMPTZ DEFAULT now()
      );
    `);
    console.log('- owner_notifications created');

    console.log('All tables created successfully!');
  } catch (err) {
    console.error('Error executing query:', err);
  } finally {
    await client.end();
    console.log('Database connection closed.');
  }
}

run();
