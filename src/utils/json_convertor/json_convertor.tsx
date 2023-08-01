type JsonType = {
  [key: string]: any;
};
export type Data = {
  className: string | undefined;
  json: string;
  result: string;
  copyWith: boolean;
  toJson: boolean;
  fromJson: boolean;
  toString: boolean;
  equatable: boolean;
};

function convertToUnderscore(str: string): string {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    if (i === 0) {
      result += str[i].toLowerCase();
    } else if (str[i] === str[i].toUpperCase()) {
      result += "_" + str[i].toLowerCase();
    } else {
      result += str[i];
    }
  }
  return result;
}

function getDartType(value: any, key: string): string {
  switch (typeof value) {
    case "number":
      return value % 1 === 0 ? "int" : "double";
    case "boolean":
      return "bool";
    case "string":
      return "String";
    case "object":
      if (Array.isArray(value)) {
        const innerType = getDartType(value[0], key);
        return `List<${innerType}>`;
      } else {
        return key.charAt(0).toUpperCase() + key.slice(1);
      }
    default:
      return "dynamic";
  }
}

// function normalType (type: string) {
//   return type === "number" || type === "bool" || type === "String" || type.startsWith("List") || type === "number" ||
// }

export default function jsonToDartClass(data: Data) {
  const json: JsonType = JSON.parse(data.json);
  const classType = data.className === undefined ? "Response" : data.className;

  let dartClass = `part '${convertToUnderscore(
    classType
  )}.g.dart';\n\n@JsonSerializable()\nimport 'package:equatable/equatable.dart';\nclass ${classType} with EquatableMixin {\n`;

  let jsonDartType: JsonType = {};
  for (let key in json) {
    const type = getDartType(json[key], key);
    // Attributes
    dartClass += `\t${type}? ${key};\n`;
    // Save jsonDartType
    jsonDartType[key] = type;
  }

  // Constructor
  dartClass += `\n\t${classType}({\n`;
  for (let key in json) {
    dartClass += `\t\tthis.${key},\n`;
  }

  dartClass += "\t});\n";

  // CopyWith
  if (data.copyWith) {
    dartClass += `\n\t${classType} copyWith({\n`;
    for (let key in json) {
      dartClass += `\t\t${jsonDartType[key]}? ${key},\n`;
    }
    dartClass += `\t}) {\n\t\treturn ${classType}(\n`;
    for (let key in json) {
      dartClass += `\t\t\t${key}: ${key} ?? this.${key},\n`;
    }
    dartClass += `\t);\n}\n`;
  }

  // toString
  if (data.toString) {
    dartClass += generateDartToString(json, classType);
  }

  // get Props
  if (data.equatable) {
    dartClass += getProps(json);
  }

  // toJson Serializable
  dartClass += `\tMap<String, dynamic> toJson() => _$${classType}ToJson(this);\n\n`;

  // fromJson Serializable
  dartClass += `\tfactory ${classType}.fromJson(Map<String, dynamic> json) => _\$${classType}FromJson(json);\n\n`;

  // END
  dartClass += "}";

  console.log(dartClass);

  return dartClass;
}

/* Without Jsonserialzable */

// toJson
// if (data.toJson) {
//   dartClass += `\tMap<String, dynamic> toJson() {\n\t\treturn{\n`;
// }
// for (let key in json) {
//   dartClass += `\t\t\t'${key}': ${key},\n`;
// }
// dartClass += `\t\t};\n\t}\n`;

// fromJson
// if (data.fromJson) {
//   dartClass += `\tfactory ${classType}.fromJson(Map<String, dynamic> json) {\n\t\treturn ${classType}(\n`;
// }

// fromJson
// for (let key in json) {
//   // if (jsonDartType[key] !== )
//   dartClass += `\t\t\t'${key}': json['${key}'] as ${jsonDartType[key]}?,\n`;
// }
// dartClass += `\t\t};\n\t}\n`;

function generateDartToString(json: any, className: string): string {
  let result = "";

  // Generate the method signature
  result += `\t@override\n\tString toString() => `;

  // Generate the method body
  result += `'${className}(`;
  for (let key in json) {
    result += `${key}: \$${key},`;
  }
  result = result.substring(0, result.length - 1);
  result += `)';\n\n`;

  return result;
}

function getProps(json: any): string {
  let result = "";

  result += `\t@override\n`;
  result += `\tList<Object?> get props => [\n`;

  for (let key in json) {
    result += `\t\t${key},\n`;
  }

  result += `\t];\n\n`;

  return result;
}
