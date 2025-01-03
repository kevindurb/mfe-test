import { database } from './Database.js';
import { PersonModel } from './PersonModel.js';
import { SQL } from '@mfe-test/common/SQL';

/**
 * @typedef {Object} PersonRow
 * @property {number} id
 * @property {string} name
 */

export class PersonRepository {
  /**
   * @param {number} id
   */
  getOne(id) {
    const row = /** @type {PersonRow | undefined} */ (
      SQL`
      select id, name from people where id = ${id}
    `.get(database)
    );

    if (!row) return null;

    return new PersonModel(row.id, row.name);
  }

  getAll() {
    const rows = /** @type {PersonRow[]} */ (
      SQL`
      select id, name from people
    `.all(database)
    );

    return rows.map(({ id, name }) => new PersonModel(id, name));
  }

  /**
   * @param {PersonModel} model
   */
  save(model) {
    if (model.id) {
      SQL`
        update people
        set name = ${model.name}
        where id = ${model.id}
      `.run(database);
    } else {
      const info = SQL`
        insert into people (name)
        values (${model.name})
      `.run(database);

      model.id = Number(info.lastInsertRowid);
    }
  }
}
