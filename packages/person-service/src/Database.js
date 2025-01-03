import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sqlite from 'better-sqlite3';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const database = sqlite(join(__dirname, '../database.sqlite'));
