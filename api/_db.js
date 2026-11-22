import pg from 'pg';

const { Pool } = pg;

let pool;

export function getPool() {
  if (!pool) {
    pool = new Pool({
      host: 'aws-0-eu-west-2.pooler.supabase.com',
      port: 6543,
      user: 'postgres.jwdbxlvalwaoxmnpqwza',
      password: 'AmrAtefportfolio',
      database: 'postgres',
      ssl: { rejectUnauthorized: false }
    });
  }
  return pool;
}
