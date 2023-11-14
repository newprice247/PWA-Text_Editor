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

  // Function that stores the text from the editor in the database when called
export const putDb = async (content) => {
  console.log('PUTTING IN DATABASE');

  // Pulls the database from the indexedDB
  const db = await openDB('jate', 1);

  // Creates a transaction to the database, allowing us to read and write to it
  const transaction = db.transaction('jate', 'readwrite');

  // Creates a store to the database, allowing us to store data in it
  const store = transaction.objectStore('jate');

  // Adds the text from the editor to the database, based on the keypath. Will overwrite any existing data
  await store.put({ id: 1, value: content });
  
  console.log('PUTTING IN DATABASE DONE');
}

// Function that gets the text from the editor from the database when called
export const getDb = async () => {
  console.log('GETTING FROM DATABASE');

  // Pulls the database from the indexedDB
  const db = await openDB('jate', 1);

  // Creates a transaction to the database, allowing us to read and write to it
  const transaction = db.transaction('jate', 'readonly');

  // Creates a store to the database, allowing us to store data in it
  const store = transaction.objectStore('jate');

  // Gets the text from the editor from the database, based on the keypath
  const content = await store.get(1);

  // Awaits the result of the transaction, and stores it in a variable
  const result = await content;

  // If there is data in the database, it is logged to the console and returned to the editor, allowing it to be displayed
  if (result) {
    console.log('DATA RECIEVED FROM DATABASE', result.value);
    return result?.value;
  } else {
    console.log('NO DATA RECIEVED FROM DATABASE');
  }
}

initdb();