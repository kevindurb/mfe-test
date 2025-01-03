import { database } from './Database.js';
import { SQL } from './SQL.js';

export class PersonRepository {
  getOne(id) {
    const row = SQL`
      select id, name from people where id = ${id}
    `.get(database);

    if (!row) return null;

    return new Person(row.id, row.name);
  }

  getAll() {
    const rows = SQL`
      select id, name from people
    `.all(database);

    return rows.map(({ id, name }) => new Person(id, name));
  }
}
