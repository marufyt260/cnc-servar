import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'data.db');

const db = new Database(dbPath);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS registrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT,
    last_name TEXT,
    full_name TEXT,
    email TEXT,
    phone TEXT,
    username TEXT,
    package TEXT,
    status TEXT DEFAULT 'pending_payment',
    metadata JSON,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_name TEXT,
    user_mobile TEXT,
    user_email TEXT,
    package TEXT,
    payment_method TEXT,
    amount TEXT,
    transaction_id TEXT,
    status TEXT DEFAULT 'pending',
    notes TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    approval_date TEXT
  );

  CREATE TABLE IF NOT EXISTS active_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    mobile TEXT,
    package TEXT,
    status TEXT DEFAULT 'active',
    join_date TEXT DEFAULT CURRENT_TIMESTAMP,
    expires_at TEXT
  );
`);

export default db;


