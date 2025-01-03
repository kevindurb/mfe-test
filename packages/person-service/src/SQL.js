class SQLStatement {
  template;
  substitutions;

  constructor(template, substitutions) {
    this.template = template;
    this.substitutions = substitutions;
  }

  _getSQL() {
    return this.template.join('?');
  }

  run(db) {
    const stmt = db.prepare(this._getSQL());
    return stmt.run(this.substitutions);
  }

  get(db) {
    const stmt = db.prepare(this._getSQL());
    return stmt.get(this.substitutions);
  }

  all(db) {
    const stmt = db.prepare(this._getSQL());
    return stmt.all(this.substitutions);
  }
}

export function SQL(template, ...substitutions) {
  return new SQLStatement(template, substitutions);
}
