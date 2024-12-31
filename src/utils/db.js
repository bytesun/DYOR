const DB_NAME = 'cryptoEvaluatorDB';
const DB_VERSION = 1;
const STORE_NAME = 'projects';

export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      const store = db.createObjectStore(STORE_NAME, { 
        keyPath: 'id',
        autoIncrement: true 
      });
      
      store.createIndex('name', 'name', { unique: true });
    };
  });
};
