var repository;
repository = {

    saveBill: function (bill) {
        var bills = this.getBills();
        bills[bills.length] = bill;
        repository.saveBills(bills);
    },

    saveBills: function (someBills) {
        var savable = repository.getSavable(someBills);
        localStorage.setItem('bills', savable);
    },

    getBills: function () {
        var savableBills = localStorage.getItem('bills');
        return repository.getUsable(savableBills);
    },

    cleanBills: function () {
        repository.saveBills([]);
    },

    saveMonthlyBudget: function (aBudget) {
        var savableBudget = repository.getSavable(aBudget);
        localStorage.setItem('monthlyBudget', savableBudget);
    },

    getMonthlyBudget: function() {
        var savableBdgt = localStorage.getItem('monthlyBudget');
        return parseFloat(savableBdgt);
    },

    getUsable: function (someOtherThing) {
        try {
            var parsed = JSON.parse(someOtherThing);

        } catch (ex) {
            alert(ex.message);
        }
        return parsed;
    },

    getSavable: function (something) {
        return JSON.stringify(something);
    },

    initializeBills: function () {
        var allTheBills = repository.getBills();
        if (!allTheBills) {
            repository.cleanBills;
        }
    }
};
