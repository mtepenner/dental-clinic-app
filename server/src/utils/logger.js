// A simple custom logger utility
export const logger = {
  info: (message) => {
    const timestamp = new Date().toISOString();
    console.log(`[INFO]  [${timestamp}] - ${message}`);
  },
  
  warn: (message) => {
    const timestamp = new Date().toISOString();
    console.warn(`[WARN]  [${timestamp}] - ${message}`);
  },
  
  error: (message, errorObj = null) => {
    const timestamp = new Date().toISOString();
    console.error(`[ERROR] [${timestamp}] - ${message}`);
    if (errorObj) {
      // Print the stack trace if an actual error object was passed
      console.error(errorObj.stack || errorObj);
    }
  }
};

/* Usage Example anywhere in your backend:
import { logger } from '../utils/logger.js';

logger.info('New patient registered successfully.');
logger.error('Database connection dropped', err);
*/
