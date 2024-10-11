import fs from 'fs';
import path from 'path';

const logFilePath = path.join('C:', 'Temp', 'statdash', 'statdash1.0', 'logs', 'metrics.log');

// Log to a file
export const logToFile = (message) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  fs.appendFileSync(logFilePath, logMessage, 'utf8');
};
