import Ajv2020 from "ajv/dist/2020";
import addFormats from "ajv-formats";
import profile from "../src/data/profile.json";
import schema from "../schema/me.schema.json";

const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);

const validate = ajv.compile(schema);

if (!validate(profile)) {
  console.error("Profile validation failed:");
  for (const error of validate.errors ?? []) {
    console.error(`- ${error.instancePath || "/"} ${error.message}`);
  }
  process.exit(1);
}

console.log("Profile JSON is valid.");
