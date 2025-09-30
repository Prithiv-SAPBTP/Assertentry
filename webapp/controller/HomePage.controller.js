sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("assertentry.controller.HomePage", {
        onInit() {
        },
        FirstTilePress(){
            this.getOwnerComponent().getRouter().navTo("EmpDetails")
        },
        SecondTilePress(){
           this.getOwnerComponent().getRouter().navTo("PayrollDetails") 
        },
        ThirdTilePress(){
           this.getOwnerComponent().getRouter().navTo("PostPage") 
        }
    });
});