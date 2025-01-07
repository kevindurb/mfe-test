export class PersonRef {
  id;

  /**
   * @param {number} id
   */
  constructor(id) {
    this.id = id;
  }

  /**
   * @param {number} id
   */
  static fromId(id) {
    return new PersonRef(id);
  }
}
