import fs from 'node:fs/promises';

// ✅ Утиліта -> скрипт для автоматичного створення директорій, якщо вона не існує
export const createDirIfNotExists = async (dirPath) => {
  try {
    await fs.access(dirPath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.mkdir(dirPath);
    }
  }
};
