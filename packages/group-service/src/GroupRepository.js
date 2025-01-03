import { database } from './Database.js';
import { GroupModel } from './GroupModel.js';
import { SQL } from './SQL.js';

/**
 * @typedef {Object} GroupRow
 * @property {number} id
 * @property {string} name
 */

export class GroupRepository {
  /**
   * @param {number} id
   */
  getOne(id) {
    const row = /** @type {GroupRow | undefined} */ (
      SQL`select id, name from groups where id = ${id}`.get(database)
    );

    if (!row) return null;

    return new GroupModel(row.id, row.name);
  }

  getAll() {
    const rows = /** @type {GroupRow[]} */ (
      SQL`select id, name from groups`.all(database)
    );

    return rows.map(({ id, name }) => new GroupModel(id, name));
  }

  /**
   * @param {GroupModel} model
   */
  save(model) {
    if (model.id) {
      SQL`
        update groups
        set name = ${model.name}
        where id = ${model.id}
      `.run(database);
    } else {
      const info = SQL`
        insert into groups (name)
        values (${model.name})
      `.run(database);

      model.id = Number(info.lastInsertRowid);
    }
  }

  /**
   * @param {GroupModel} group
   */
  getMemberIds(group) {
    const rows = /** @type {{ person_id: number }[]} */ (
      SQL`
        select person_id from group_members where group_id = ${group.id}
      `.all(database)
    );

    console.log(group, rows);

    return rows.map(({ person_id }) => person_id);
  }

  /**
   * @param {GroupModel} group
   * @param {number} personId
   */
  addMemberToGroup(group, personId) {
    console.log('addMemberToGroup', group.id, personId);
    SQL`
      insert into group_members (group_id, person_id)
      values (${group.id}, ${personId})
      on conflict (group_id, person_id) do nothing
    `.run(database);
  }
}
