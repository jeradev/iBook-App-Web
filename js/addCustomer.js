const API_URL = "http://localhost:8090";

window.addCustomer = {
    getCustomer: function(){
        $.ajax({
            url: API_URL + "/customer",
            method: "GET"

        }).done(function (response) {
            console.log(response);
            addCustomer.displayCustomers(response.content)
        });
    },
}
addCustomer.getCustomer();