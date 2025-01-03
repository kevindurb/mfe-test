export class GroupModel {
  /** @type {number | null} */
  _id;

  /** @type string */
  _name;

  /**
   *  @param {number | null} id
   *  @param {string} name
   */
  constructor(id, name) {
    this._id = id;
    this._name = name;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }
}
