var persons = [];
var editId;

// TODO edit API url's & ACTION_METHODS
const API = {
    CREATE: "http://localhost:8090/customer",
    READ: "http://localhost:8090/customer",
    UPDATE: "http://localhost:8090/customer",
    DELETE: "http://localhost:8090/customer"
};
const ACTION_METHODS = {
    CREATE: "POST",
    READ: "GET",
    UPDATE: "PUT",
    DELETE: "DELETE"
};

window.iBook = {
    getRow: function(person) {
        // ES6 string template
        return `<tr>
            <td>${person.firstName}</td>
            <td>${person.lastName}</td>
            <td>${person.phone}</td>
            <td>${person.period}</td>
            <td>${person.price}</td>
            <td>
                <a href='#' data-id='${person.id}' class='delete'>&#10006;</a>
                <a href='#' data-id='${person.id}' class='edit'>&#9998;</a>
            </td>
        </tr>`;
    },

    load: function () {
        $.ajax({
            url: API.READ,
            method: ACTION_METHODS.READ
        }).done(function (persons) {
            console.info('done:', persons);
            iBookLocalActions.load(persons.content);
            iBook.display(persons.content);
        });
    },

    delete: function(id) {
        $.ajax({
            url: API.DELETE,
            method: ACTION_METHODS.DELETE,
            data: {
                id: id
            }
        }).done(function (response) {
            if (response.success) {
                iBookLocalActions.delete(id);
            }
        });
    },

    add: function(person) {
        $.ajax({
            url: API.CREATE,
            method: ACTION_METHODS.CREATE,
            contentType: "application/json",
            data: JSON.stringify(person)
        }).done(function (response) {
            if (response.success) {
                iBook.cancelEdit();
                iBookLocalActions.add(person);
            }
        });
    },

    update: function(person) {
        $.ajax({
            url: API.UPDATE,
            method: ACTION_METHODS.UPDATE,
            data: person
        }).done(function (response) {
            if (response.success) {
                iBook.cancelEdit();
                iBookLocalActions.update(person);
            }
        });
    },

    bindEvents: function() {
        $('#iBook tbody').delegate('a.edit', 'click', function () {
            var id = $(this).data('id');
            iBook.startEdit(id);
        });

        $('#iBook tbody').delegate('a.delete', 'click', function () {
            var id = $(this).data('id');
            console.info('click on ', this, id);
            iBook.delete(id);
        });

        $(".add-form").submit(function() {
            const person = {
                firstName: $('input[name=firstName]').val(),
                lastName: $('input[name=lastName]').val(),
                phone: $('input[name=phone]').val(),
                period: $('input[name=period]').val(),
                price: $('input[name=price]').val()
            };

            if (editId) {
                person.id = editId;
                iBook.update(person);
            } else {
                iBook.add(person);
            }
        });

        document.getElementById('search').addEventListener('input', function(ev) {
            //const value = document.getElementById('search').value;
            const value = this.value;
            iBook.search(value);
        });
        document.querySelector('.add-form').addEventListener('reset', function(ev) {
            iBook.search("");
        });
    },

    startEdit: function (id) {
        // ES5 function systax inside find
        var editPerson = persons.find(function (person) {
            console.log(person.firstName);
            return person.id == id;
        });
        console.debug('startEdit', editPerson);

        $('input[name=firstName]').val(editPerson.firstName);
        $('input[name=lastName]').val(editPerson.lastName);
        $('input[name=phone]').val(editPerson.phone);
        $('input[name=period]').val(editPerson.period);
        $('input[name=price]').val(editPerson.price);

        editId = id;
    },

    cancelEdit: function() {
        editId = '';
        document.querySelector(".add-form").reset();
    },

    display: function(persons) {
        var rows = '';

        // ES6 function systax inside forEach
        persons.forEach(person => rows += iBook.getRow(person));

        $('#iBook tbody').html(rows);
    },

    search: function (value) {
        value = value.toLowerCase();

        var filtered = persons.filter(function (person) {
            return person.firstName.toLowerCase().includes(value) ||
                person.lastName.toLowerCase().includes(value) ||
                person.phone.toLowerCase().includes(value);
        });

        iBook.display(filtered);
    }
};


// ES6 functions
window.iBookLocalActions = {
    load: (persons) => {
        // save in persons as global variable
        window.persons = persons;
    },
    // ES6 functions (one param - no need pharanteses for arguments)
    add: person => {
        person.id = new Date().getTime();
        persons.push(person);
        iBook.display(persons);
    },
    delete: id => {
        var remainingPersons = persons.filter(person => person.id !== id);
        window.persons = remainingPersons;
        iBook.display(remainingPersons);
    },
    update: person => {
        const id = person.id;
        var personToUpdate = persons.find(person => person.id === id);
        personToUpdate.firstName = person.firstName;
        personToUpdate.lastName = person.lastName;
        personToUpdate.phone = person.phone;
        personToUpdate.period = person.period;
        personToUpdate.price = person.price;
        iBook.display(persons);

    }
}

console.info('loading persons');
iBook.load();
iBook.bindEvents();