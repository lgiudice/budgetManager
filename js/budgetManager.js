var model;
model = {

    newBill: function (amount, description) {
        repository.saveBill(new Bill(amount, description));
    },

    getAllTheBills: function () {
        return repository.getBills();
    },

    resetBudget: function () {
        repository.cleanBills();
    },

    totalSpent: function () {
        var totalSpent = 0;
        var bills = repository.getBills();

        if (bills) {
            for (var index = 0; index < bills.length; index++) {
                totalSpent += bills[index].amount;
            }
        }
        return totalSpent;
    },

    calculateBudget: function () {
        var totalSpent = model.totalSpent();
        var totalBudget = model.monthlyBudget();

        var budget = {};
        budget.available = totalBudget - totalSpent;
        budget.total = totalBudget;

        return budget;
    },

    monthlyBudget: function() {
        return repository.getMonthlyBudget();
    },

    saveMonthlyBudget: function(aValue) {
        if (isNaN(aValue)) {
            alert('El presupuesto mensual debe ser numérico'); //TODO change alert by feedback bar
            return;
        }

        repository.saveMonthlyBudget(aValue);
    },

    initialize: function() {
        if (isNaN(model.monthlyBudget())) {
            model.saveMonthlyBudget(800);
        }
        repository.initializeBills();
    }


};

// Bill constructor
function Bill(amount, description) {
    this.amount = amount;
    this.description = description;
    this.date = new Date();
}