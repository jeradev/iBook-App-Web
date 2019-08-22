const API_URL = "http://localhost:8090";

window.addCustomer = {
    getCustomer: function () {
        $.ajax({
            url: API_URL + "/customer",
            method: "GET"

        }).done(function (response) {
            console.log(response);
            addCustomer.displayCustomers(response.content)
        });
    },

    getCustomerHtml: function(customer){
        return ``
    },

    displayCustomers: function (customer) {
        let customersHTML = "";
        customer.forEach(customer=>customersHTML += addCustomer.getCustomerHtml(customer));


    }
}
addCustomer.getCustomer();