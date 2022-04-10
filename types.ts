export enum ColumnType {
  IntColumn = "IntColumn",
  TimestampColumn = "TimestampColumn",
  UUIDColumn = "UUIDColumn",
  TimeColumn = "TimeColumn",
  IPv64Column = "IPv64Column",
  TinyColumn = "TinyColumn",
  SmallColumn = "SmallColumn",
  EmailColumn = "EmailColumn",
  StringColumn = "StringColumn",
  LargeColumn = "LargeColumn",
  NumberColumn = "NumberColumn",
  VarcharColumn = "VarcharColumn",
  BooleanColumn = "BooleanColumn",
  UnknownColumn = "UnknownColumn",
}

export interface ColumnInfo {
  type: ColumnType;
  title: string;
}
