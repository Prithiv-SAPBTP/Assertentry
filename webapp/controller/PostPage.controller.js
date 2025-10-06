sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",        
    "sap/m/MessageBox"
], (Controller,MessageToast,MessageBox) => {
    "use strict";

    return Controller.extend("assertentry.controller.PostPage", {
        onInit: function() {
            this.getView().setModel(this.getOwnerComponent().getModel("odata"));
        },
        onPressGo: function(){
            var oView = this.getView();
            var oDataModel = this.getOwnerComponent().getModel();
            var ojsonModel = new sap.ui.model.json.JSONModel();
            var oPersonId = oView.byId("PersonId").getValue();

            var sPath = "/per_pay_dataSet('" + oPersonId + "')";

    oDataModel.read(sPath, {
        success: function (oData) {
            ojsonModel.setData(oData);
            this.getView().setModel(ojsonModel, "oModel");

            sap.m.MessageToast.show("Data loaded for Person ID: " + oPersonId);
        }.bind(this),
        error: function (oError) {
            sap.m.MessageToast.show("Error fetching data for Person ID: " + oPersonId);
            console.error(oError);
        }.bind(this)
    });

            
        }

    });
});