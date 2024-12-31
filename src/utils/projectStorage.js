import { initDB } from './db';
const STORE_NAME = 'projects';

export const saveProject = async (projectData) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  
  return store.put({
    name: projectData.name,
    factors: projectData.factors,
    totalScore: projectData.totalScore,
    timestamp: new Date().toISOString()
  });
};

export const getProjects = async () => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};
