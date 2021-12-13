import { ColumnInfo, ColumnType } from "../types.ts";

export default class Querries {
  private table: string;
  private names: string;
  private values: string;

  constructor(columns: Array<ColumnInfo>, table: string) {
    const names: string[] = [];
    const values: string[] = [];

    columns.forEach((column) => {
      const { title, type } = column;

      // We need to wrap the UUID in order to transform it back into a string
      values.push(
        type === ColumnType.UUIDColumn ? `UNHEX(REPLACE(?, '-', ''))` : `?`,
      );
      names.push(`\`${title}\``);
    });

    this.table = table;
    this.names = names.join(", ");
    this.values = values.join(", ");
  }

  getQuery() {
    return `SELECT ${this.names} FROM ${this.table} WHERE uuid = UNHEX(REPLACE(?, '-', ''))`;
  }

  countQuery() {
    return `SELECT COUNT(uuid) AS total FROM ${this.table}`;
  }

  fetchQuery() {
    return `SELECT ${this.names} FROM ${this.table} ORDER BY created DESC LIMIT ? OFFSET ?`;
  }

  removeQuery() {
    return `DELETE FROM ${this.table} WHERE uuid = UNHEX(REPLACE(?, '-', ''))`;
  }

  insertQuery() {
    return `INSERT INTO ${this.table} (${this.names}) VALUES (${this.values})`;
  }
}