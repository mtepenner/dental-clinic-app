// Validates that all required environment variables are present before the app starts
export const validateEnv = () => {
  const requiredVariables = ['NODE_ENV', 'PORT', 'MONGO_URI', 'JWT_SECRET'];
  const missingVariables = [];

  requiredVariables.forEach((variable) => {
    if (!process.env[variable]) {
      missingVariables.push(variable);
    }
  });

  if (missingVariables.length > 0) {
    console.error('CRITICAL ERROR: Missing required environment variables:');
    console.error(missingVariables.join(', '));
    process.exit(1); // Force the server to crash so the deployment doesn't silently fail
  }

  console.log('Environment variables validated successfully.');
};
