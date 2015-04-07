(function($) {
    "use strict";

    var saveNewBill = function() {
        var billAmt = Number( $('#billAmount').val() );
        var billDescription =  $('#billDescription').val();

        model.newBill(billAmt, billDescription);

        informFinishedTransaction();
        refreshAvailableBudget();
    };

    var generateBillsReport = function() {
        var allTheBills = model.getAllTheBills();
        clearExistingReport();

        for	(var index = 0; index < allTheBills.length; index++) {
            drawRow(allTheBills[index]);
        }
    };

    var clearExistingReport = function() {
        $('#monthlyBills').empty();
        refreshReport();
    }

    var resetBudget = function() {
        model.resetBudget();
        refreshAvailableBudget();
    }

    function drawRow(aBill) {
        $('#monthlyBills')
            .append($('<li/>')
                .append($('<div/>', { 'class': 'ui-grid-b' })
                    .append($('<div/>', { 'class': 'ui-block-a', 'style' : 'width:80%' })
                        .append($('<h2/>', { 'text': aBill.description }))
                        .append($('<p/>', { 'text': aBill.date })))
                    .append($('<div/>', { 'class': 'ui-block-b', 'style' : 'width:20%' })
                        .append($('<h1/>', { 'text': '$' + aBill.amount.toFixed(2) })))));

        refreshReport();
    }

    var refreshReport = function() {
        $('#monthlyBills').listview('refresh');
    }

    function informFinishedTransaction() {
        alert('El nuevo gasto se guardó con éxito :)'); //TODO change alert by feedback bar
        $('#billAmount').val('');
        $('#billDescription').val('');
    }
    function refreshAvailableBudget() {
        var budget = model.calculateBudget();

        $('#availableBudget').text('$' + budget.available.toFixed(2));
        $('#monthlyBudget').text('$' + budget.total.toFixed(2));
    }

    var saveSettings = function() {
        var newMonthlyBudget = parseFloat( $('#newMonthlyBudget').val() );
        model.saveMonthlyBudget(newMonthlyBudget);
        window.history.back();
       refreshAvailableBudget();
    };

    $( document ).on( "ready", function(){
        $('#saveNewBill').on('click', saveNewBill);
        $('#saveSettings').on('click', saveSettings);
        $('#generateBillsReport').on('click', generateBillsReport);
        $('#resetBudget').on('click', resetBudget);
        model.initialize();
        refreshAvailableBudget();
    });

    $( document ).on( "deviceready", function(){
        //StatusBar.overlaysWebView( false );
        //StatusBar.backgroundColorByName("gray");
    });

}
)(jQuery);

