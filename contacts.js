const fs = require('fs');
const path = require('path');
const { uuid } = require('uuidv4');

const contactsPath = path.resolve('./db/contacts.json/');

// TODO: задокументировать каждую функцию
function listContacts() {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.error(err);
    }
    const content = data.toString();
    if (!content) {
      process.exit(1);
    }
    const contacts = JSON.parse(content);
    console.table(contacts);
  });
}
function getContactById(contactId) {
  contactId = Number(contactId);
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.error(err);
    }
    const content = data.toString();
    if (!content) {
      process.exit(1);
    }
    const contacts = JSON.parse(content);
    contacts.forEach(contact => {
      if (contact.id === contactId) {
        return console.table(contact);
      }
    });
  });
}

function removeContact(contactId) {
  contactId = toString(contactId);
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.error(err);
    }
    const content = data.toString();
    if (!content) {
      process.exit(1);
    }
    const contacts = JSON.parse(content);

    const filteredContacts = contacts.filter(
      contact => contact.id !== contactId,
    );
    if (filteredContacts.length !== contacts.length) {
      fs.writeFile(contactsPath, JSON.stringify(filteredContacts), err => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      });
    }
    console.log('The contact was removed');
    console.table(contacts);
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.error(err);
    }
    const id = uuid();
    const content = data.toString();
    if (!content) {
      process.exit(1);
    }
    const contacts = JSON.parse(content);
    contacts.push({ id, name, email, phone });
    fs.writeFile(contactsPath, JSON.stringify(contacts), err => {
      if (err) {
        console.error(err);
      }
    });
    console.log('The contact was added');
    console.table(contacts);
  });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
