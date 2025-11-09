import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import db from './db.js';

const app = express();
const PORT = process.env.PORT || 5050;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'change-me';

app.use(cors({ origin: process.env.ALLOWED_ORIGIN?.split(',') || '*' }));
app.use(express.json());

// Helpers to map DB rows (snake_case) to API responses (camelCase)
function mapPayment(row) {
  if (!row) return row;
  return {
    id: row.id,
    userName: row.user_name,
    userMobile: row.user_mobile,
    userEmail: row.user_email,
    package: row.package,
    paymentMethod: row.payment_method,
    amount: row.amount,
    transactionId: row.transaction_id,
    status: row.status,
    date: row.created_at,
    approvalDate: row.approval_date,
    notes: row.notes,
  };
}

function mapRegistration(row) {
  if (!row) return row;
  return {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    username: row.username,
    package: row.package,
    status: row.status,
    registrationDate: row.created_at,
    metadata: row.metadata,
  };
}

function mapActiveUser(row) {
  if (!row) return row;
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    mobile: row.mobile,
    package: row.package,
    status: row.status,
    joinDate: row.join_date,
    expiresAt: row.expires_at,
  };
}

const insertRegistration = db.prepare(`
  INSERT INTO registrations (first_name, last_name, full_name, email, phone, username, package, status, metadata)
  VALUES (@firstName, @lastName, @fullName, @email, @phone, @username, @package, 'pending_payment', @metadata)
`);

const fetchRegistrations = db.prepare('SELECT * FROM registrations ORDER BY created_at DESC');

const insertPayment = db.prepare(`
  INSERT INTO payments (
    user_name, user_mobile, user_email, package, payment_method, amount, transaction_id, status, notes
  ) VALUES (
    @userName, @userMobile, @userEmail, @package, @paymentMethod, @amount, @transactionId, 'pending', @notes
  )
`);

const fetchPayments = db.prepare('SELECT * FROM payments ORDER BY created_at DESC');
const fetchPaymentById = db.prepare('SELECT * FROM payments WHERE id = ?');
const updatePaymentStatus = db.prepare('UPDATE payments SET status = @status, approval_date = @approvalDate WHERE id = @id');

const insertActiveUser = db.prepare(`
  INSERT INTO active_users (name, email, mobile, package, status, join_date, expires_at)
  VALUES (@name, @email, @mobile, @package, 'active', @joinDate, @expiresAt)
`);

const fetchActiveUsers = db.prepare("SELECT * FROM active_users WHERE status = 'active' ORDER BY join_date DESC");
const deactivateActiveUser = db.prepare("UPDATE active_users SET status = 'inactive' WHERE id = ?");

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/registrations', (req, res) => {
  try {
    const body = req.body || {};
    const payload = {
      firstName: body.firstName || '',
      lastName: body.lastName || '',
      fullName: `${body.firstName || ''} ${body.lastName || ''}`.trim(),
      email: body.email || '',
      phone: body.phone || '',
      username: body.username || '',
      package: body.package || 'basic',
      metadata: JSON.stringify(body.metadata || {}),
    };
    const info = insertRegistration.run(payload);
    res.status(201).json({ id: info.lastInsertRowid, ...payload, status: 'pending_payment' });
  } catch (err) {
    console.error('registration error', err);
    res.status(400).json({ error: 'Invalid request' });
  }
});

app.get('/api/registrations', (_req, res) => {
  try {
    const rows = fetchRegistrations.all();
    res.json(rows.map(mapRegistration));
  } catch (err) {
    console.error('fetch registrations error', err);
    res.status(500).json({ error: 'Failed to load registrations' });
  }
});

app.post('/api/payments', (req, res) => {
  try {
    const body = req.body || {};
    const payload = {
      userName: body.userName || 'User',
      userMobile: body.userMobile || '',
      userEmail: body.userEmail || '',
      package: body.package || 'basic',
      paymentMethod: body.paymentMethod || 'unknown',
      amount: body.amount || '0',
      transactionId: body.transactionId || '',
      notes: body.notes || '',
    };
    const info = insertPayment.run(payload);
    res.status(201).json({ id: info.lastInsertRowid, ...payload, status: 'pending' });
  } catch (err) {
    console.error('payment error', err);
    res.status(400).json({ error: 'Invalid request' });
  }
});

app.get('/api/payments', (_req, res) => {
  try {
    const rows = fetchPayments.all();
    res.json(rows.map(mapPayment));
  } catch (err) {
    console.error('fetch payments error', err);
    res.status(500).json({ error: 'Failed to load payments' });
  }
});

app.patch('/api/payments/:id', (req, res) => {
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  if (!token || token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const id = Number(req.params.id);
  if (!id) {
    return res.status(400).json({ error: 'Invalid id' });
  }

  const body = req.body || {};
  if (!body.status) {
    return res.status(400).json({ error: 'Missing status' });
  }

  const payment = fetchPaymentById.get(id);
  if (!payment) {
    return res.status(404).json({ error: 'Not found' });
  }

  const approvalDate = body.status === 'approved' ? new Date().toISOString() : payment.approval_date;
  updatePaymentStatus.run({ id, status: body.status, approvalDate });

  if (body.status === 'approved') {
    const durationDays = Number(body.durationDays) || 30;
    const joinDate = approvalDate;
    const expiresAt = new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000).toISOString();
    insertActiveUser.run({
      name: payment.user_name,
      email: payment.user_email,
      mobile: payment.user_mobile,
      package: payment.package,
      joinDate,
      expiresAt,
    });
  }

  const updated = fetchPaymentById.get(id);
  res.json(mapPayment(updated));
});

app.get('/api/active-users', (_req, res) => {
  try {
    const rows = fetchActiveUsers.all();
    res.json(rows.map(mapActiveUser));
  } catch (err) {
    console.error('fetch active users error', err);
    res.status(500).json({ error: 'Failed to load active users' });
  }
});

app.delete('/api/active-users/:id', (req, res) => {
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  if (!token || token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const id = Number(req.params.id);
  if (!id) {
    return res.status(400).json({ error: 'Invalid id' });
  }

  deactivateActiveUser.run(id);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

