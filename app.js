// Book Class: Rep a Book

class Contact {
  constructor(first, last, digits) {
    this.first = first;
    this.last = last;
    this.digits = digits;
  }
}

//UI Class: HAndle UI Tasks
class UI {
  static displayContacts() {
    const contacts = Store.getContacts();

    contacts.forEach(contact => UI.addContactToList(contact));
  }
  static addContactToList(contact) {
    const list = document.querySelector("#contact-list");
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${contact.first}</td>
          <td>${contact.last}</td>
          <td>${contact.digits}</td>
          <td><a href="#" class= "btn btn-danger btn-sm delete"></a></td>
          `;

    list.appendChild(row);
  }
  static deleteContact(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);

    //Vanish
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  static clearFields() {
    document.querySelector("#first").value = "";
    document.querySelector("#last").value = "";
    document.querySelector("#digits").value = "";
  }
}

//Storeage Class
class Store {
  static getContacts() {
    let contacts;
    if (localStorage.getItem("contacts") === null) {
      contacts = [];
    } else {
      contacts = JSON.parse(localStorage.getItem("contacts"));
    }

    return contacts;
  }

  static addContact(contact) {
    const contacts = Store.getContacts();
    contacts.push(contact);
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }

  static removeContact(digits) {
    const contacts = Store.getContacts();

    contacts.forEach((contact, index) => {
      if (contact.digits === digits) {
        contacts.splice(index, 1);
      }
    });

    localStorage.setItem("contacts", JSON.stringify(contacts));
  }
}

//Event: Display
document.addEventListener("DOMContentLoaded", UI.displayContacts);
// Event: Add Book
document.querySelector("#book-form").addEventListener("submit", e => {
  //Prevent actyal submit

  e.preventDefault();

  // Get form values
  const first = document.querySelector("#first").value;
  const last = document.querySelector("#last").value;
  const digits = document.querySelector("#digits").value;

  //Validate
  if (first === "" || last === "" || digits === "") {
    UI.showAlert("Please fill in all fileds", "danger");
  } else {
    // Instatiate
    const contact = new Contact(first, last, digits);

    // Add to UI
    UI.addContactToList(contact);

    // Add  to store
    Store.addContact(contact);

    // Success Message

    UI.showAlert("Phone Number Added", "success");

    // Cear fields
    UI.clearFields();
  }
});

//Event: Remove Contact
document.querySelector("#contact-list").addEventListener("click", e => {
  UI.deleteContact(e.target);

  // Remove contact frm store
  Store.removeContact(
    e.target.parentElement.previousElementSibling.textContent
  );

  //Success message
  UI.showAlert("Phone Number Erased", "success");
});
