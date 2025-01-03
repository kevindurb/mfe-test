/** @typedef {import("better-sqlite3").Database} Database */

class SQLStatement {
  template;
  substitutions;

  /**
   * @param {TemplateStringsArray} template
   * @param {unknown[]} substitutions
   */
  constructor(template, substitutions) {
    this.template = template;
    this.substitutions = substitutions;
  }

  _getSQL() {
    return this.template.join('?');
  }

  _log() {
    console.log('[SQL]', this._getSQL().trim(), this.substitutions);
  }

  /**
   * @param {Database} db
   */
  run(db) {
    this._log();
    const stmt = db.prepare(this._getSQL());
    return stmt.run(this.substitutions);
  }

  /**
   * @param {Database} db
   */
  get(db) {
    this._log();
    const stmt = db.prepare(this._getSQL());
    return stmt.get(this.substitutions);
  }

  /**
   * @param {Database} db
   */
  all(db) {
    this._log();
    const stmt = db.prepare(this._getSQL());
    return stmt.all(this.substitutions);
  }
}

/**
 * @param {TemplateStringsArray} template
 * @param {unknown[]} substitutions
 */
export function SQL(template, ...substitutions) {
  return new SQLStatement(template, substitutions);
}
