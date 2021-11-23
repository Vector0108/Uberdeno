// deno-lint-ignore-file valid-typeof

// TODO: ^ Fix this linting error

import { InvalidProperty, MissingProperty } from "./errors.ts";

type literals =
  | "undefined"
  | "object"
  | "boolean"
  | "number"
  | "string"
  | "function"
  | "symbol"
  | "bigint";

type inputs = null | string | number | boolean;

export function validateDefined(
  input: inputs,
  property: string,
  optional: boolean,
): boolean {
  if (typeof input === "undefined" || input === null) {
    // If the property isn't required return true and "escape" the parent function
    if (optional) return true;
    throw new MissingProperty(property);
  }

  return false;
}

export function validateDatatype(input: inputs, property: string, datatype: literals) {
  if (typeof input !== datatype) {
    throw new InvalidProperty(property, datatype);
  }
}

export function validateDate(
  input: string | null,
  property: string,
  optional = false,
): void {
  if (validateDefined(input, property, optional)) return;
  validateDatatype(input, property, "string");

  // Copied and modified RegExp from https://stackoverflow.com/a/58878432/9615506
  const regex = new RegExp(
    /^[0-9]{4}-((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01])|(0[469]|11)-(0[1-9]|[12][0-9]|30)|(02)-(0[1-9]|[12][0-9]))T(0[0-9]|1[0-9]|2[0-3]):(0[0-9]|[1-5][0-9]):(0[0-9]|[1-5][0-9])\.[0-9]{3}Z$/,
  );

  if (!regex.test(input!)) {
    throw new InvalidProperty(property, "date");
  }
}

export function validateUUID(
  input: string | null,
  property: string,
  optional = false,
): void {
  if (validateDefined(input, property, optional)) return;
  validateDatatype(input, property, "string");

  // Copied RegExp from https://melvingeorge.me/blog/check-if-string-valid-uuid-regex-javascript
  const regex = new RegExp(
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi,
  );

  if (!regex.test(input!)) {
    throw new InvalidProperty(property, "uuidv4");
  }
}

export function validateEmail(
  input: string | null,
  property: string,
  optional = false,
): void {
  if (validateDefined(input, property, optional)) return;
  validateDatatype(input, property, "string");

  // Copied RegExp from https://deno.land/x/validasaur@v0.15.0/src/rules/is_email.ts
  const regex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi,
  );

  if (!regex.test(input!)) {
    throw new InvalidProperty(property, "email");
  }
}

export function validateTime(
  input: string | null,
  property: string,
  optional = false,
): void {
  if (validateDefined(input, property, optional)) return;
  validateDatatype(input, property, "string");

  // Copied RegExp from https://stackoverflow.com/a/5563222/9615506
  const regex = new RegExp(
    /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/gi,
  );

  if (!regex.test(input!)) {
    throw new InvalidProperty(property, "time");
  }
}

export function validateBoolean(
  input: boolean | null,
  property: string,
  optional = false,
): void {
  if (validateDefined(input, property, optional)) return;
  validateDatatype(input, property, "boolean");
}

export function validateVarchar(
  input: string | null,
  property: string,
  optional = false,
): void {
  if (validateDefined(input, property, optional)) return;
  validateDatatype(input, property, "string");

  // Make sure the string is a correct length
  if (input!.length < 3 || input!.length > 255) {
    throw new InvalidProperty(property, "length");
  }
}

export function validateNumber(
  input: number | null,
  property: string,
  optional = false,
): void {
  if (validateDefined(input, property, optional)) return;

  validateDatatype(input, property, "number");
}

export function validateTinyint(
  input: number | null,
  property: string,
  optional = false,
): void {
  if (validateDefined(input, property, optional)) return;

  validateDatatype(input, property, "number");

  if (input! < -128 || input! > 127) {
    throw new InvalidProperty(property, "tinyint");
  }
}

export function validateSmallint(
  input: number | null,
  property: string,
  optional = false,
): void {
  if (validateDefined(input, property, optional)) return;

  validateDatatype(input, property, "number");

  if (input! < -32768 || input! > 32767) {
    throw new InvalidProperty(property, "smallint");
  }
}

export function validateInt(
  input: number | null,
  property: string,
  optional = false,
): void {
  if (validateDefined(input, property, optional)) return;

  validateDatatype(input, property, "number");

  if (input! < -2147483648 || input! > 2147483647) {
    throw new InvalidProperty(property, "int");
  }
}

export function validateBigint(
  input: number | null,
  property: string,
  optional = false,
): void {
  if (validateDefined(input, property, optional)) return;

  validateDatatype(input, property, "number");

  if (input! < -9223372036854775808 || input! > 9223372036854775807) {
    throw new InvalidProperty(property, "bigint");
  }
}
