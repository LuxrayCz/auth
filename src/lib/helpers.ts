type EnvVariableKey = "NEXT_PUBLIC_MONGO_URI" | "JWT_KEY";

export function getEnvVariable(key: EnvVariableKey) {
  const value = process.env[key];

  if (!value || value.length === 0) {
    console.log(`The env variable ${key} is not set.`);
    throw new Error(`The env variable ${key} is not set.`);
  }
  return value;
}
