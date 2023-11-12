import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUTTING IN DATABASE');
  const db = await openDB('jate', 1);
  const transaction = db.transaction('jate', 'readwrite');
  const store = transaction.objectStore('jate');
  await store.put({ id: 1, value: content });
  console.log('PUTTING IN DATABASE DONE');
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GETTING FROM DATABASE');
  const db = await openDB('jate', 1);
  const transaction = db.transaction('jate', 'readonly');
  const store = transaction.objectStore('jate');
  const content = await store.get(1);
  const result = await content;
  if (result) {
    console.log('DATA RECIEVED FROM DATABASE', result.value);
    return result?.value;
  } else {
    console.log('NO DATA RECIEVED FROM DATABASE');
  }
}

initdb();