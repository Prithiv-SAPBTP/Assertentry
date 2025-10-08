sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",        
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"
], (Controller,MessageToast,MessageBox,JSONModel) => {
    "use strict";

    return Controller.extend("assertentry.controller.PostPage", {
        onInit: function() {
            // this.getView().setModel(this.getOwnerComponent().getModel("odata"));
const oEmptyModel = new JSONModel([]);
            this.getView().setModel(oEmptyModel, "oModel");
        },
    //     onPressGo: function(){
    //         var oView = this.getView();
    //         var oDataModel = this.getOwnerComponent().getModel();
    //         var ojsonModel = new sap.ui.model.json.JSONModel();
    //         var oPersonId = oView.byId("PersonId").getValue();

    //         var sPath = "/per_pay_dataSet('" + oPersonId + "')";

    // oDataModel.read(sPath, {
    //     success: function (oData) {
    //         ojsonModel.setData(oData);
    //         this.getView().setModel(ojsonModel, "oModel");

    //         sap.m.MessageToast.show("Data loaded for Person ID: " + oPersonId);
    //     }.bind(this),
    //     error: function (oError) {
    //         sap.m.MessageToast.show("Error fetching data for Person ID: " + oPersonId);
    //         console.error(oError);
    //     }.bind(this)
    // });

            
    //     }

      onPressGo: function () {
            const oView = this.getView();
            const oDataModel = this.getOwnerComponent().getModel(); 
            const oPersonId = oView.byId("PersonId").getValue();

            // const sPath = "/per_pay_dataSet";
            const oJSONModel = new JSONModel();

            const ofilter = `Pernr  eq '${oPersonId}'`; 

            oDataModel.read("/per_pay_dataSet", {

                urlParameters: {"$filter" : ofilter},
                // filters: [
                //     new sap.ui.model.Filter("Pernr", sap.ui.model.FilterOperator.EQ, oPersonId)
                // ],
                success: function (oData) {
                    // if (oData && oData.results && oData.results.length > 0) {
                        oJSONModel.setData(oData.results);
                        this.getView().setModel(oJSONModel, "oModel");
                        MessageToast.show("Data loaded successfully for Person ID: " + oPersonId);
                    // } else {
                    //     MessageBox.information("No data found for Personnel Number: " + oPersonId);
                    // }
                }.bind(this),
                error: function (oError) {
                    MessageBox.error("Error fetching data for Person ID: " + oPersonId);
                    console.error(oError);
                }.bind(this)
            });
        },
onPressGetapprove:function(){

},

//     onPressGo: function () {
//     const oView = this.getView();
//     const oDataModel = this.getOwnerComponent().getModel();
//     const oPersonId = oView.byId("PersonId").getValue();

//     if (!oPersonId) {
//       var sPath = "/per_pay_dataSet"; 
//     }
//     else{
//         var sPath = "/per_pay_dataSet('" + oPersonId + "')";
//     }
    

//     const oJSONModel = new sap.ui.model.json.JSONModel();

//     // let aFilters = [];

//     // if (oPersonId) {
//     //     aFilters.push(new sap.ui.model.Filter("Pernr", sap.ui.model.FilterOperator.EQ, oPersonId));
//     // }

//     oDataModel.read(sPath, {
//         success: function (oData) {
//             // if (oData && oData.results && oData.results.length > 0) {
//                 oJSONModel.setData(oData.results);
//                 this.getView().setModel(oJSONModel, "oModel");
//                 MessageToast.show("Data loaded successfully" + (oPersonId ? " for Person ID: " + oPersonId : ""));
//             // } else {
//             //     MessageBox.information(
//             //         oPersonId 
//             //             ? "No data found for Personnel Number: " + oPersonId 
//             //             : "No data available."
//             //     );
//             // }
//         }.bind(this),
//         error: function (oError) {
//             MessageBox.error("Error fetching data" + (oPersonId ? " for Person ID: " + oPersonId : ""));
//             console.error(oError);
//         }.bind(this)
       
//     });
// }

    });
});