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
removeLeadingZeros: function (value) {
    if (!value) return value;
    return value.replace(/^0+/, ''); 
},

onPressGetapprove: async function () {
    // const oTable = this.getView().byId("personnelTable");
    // const aSelectedItems = oTable.getSelectedItems();

    // if (aSelectedItems.length === 0) {
    //     sap.m.MessageBox.warning("Please select at least one record to get approval.");
    //     return;
    // }

    // const oCtx = aSelectedItems[0].getBindingContext("oModel").getObject();

    // //  const oPayload = {
    // //     Pernr: oCtx.Pernr,
    // //     Username: oCtx.Username,
    // //     MailId: oCtx.MailId,
    // //     StartDate: oCtx.Begda,
    // //     EndDate: oCtx.Endda
    // // };

    // try {
    //     const sUrl = "https://spa-api-gateway-bpi-us-prod.cfapps.us10.hana.ondemand.com/workflow/rest/v1/workflow-instances?environmentId=tutorial";

    //     const response = await fetch(sUrl, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": "Bearer " + "eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYjc0NDlmZTR0cmlhbC5hdXRoZW50aWNhdGlvbi51czEwLmhhbmEub25kZW1hbmQuY29tL3Rva2VuX2tleXMiLCJraWQiOiJkZWZhdWx0LWp3dC1rZXktZmEwY2M1YjNmMyIsInR5cCI6IkpXVCIsImppZCI6ICJtVmJPWEY4OFI1QjEzem1sTDliUzFQOXVuOXJKR1BBRnJORkxkTkdaQUw4PSJ9.eyJqdGkiOiIyNjAyMGQ2YmE4MTU0ZDZjOWY0Y2QyZWE3ZGJkMTRjYSIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzdWJhY2NvdW50aWQiOiI4ZDVkOWQzOS0yYzIxLTQzNjMtYTZlOC1kMTU2NzNhMGQ0YjMiLCJ6ZG4iOiJiNzQ0OWZlNHRyaWFsIiwic2VydmljZWluc3RhbmNlaWQiOiJiOWY1N2Q4My1jMDM0LTRhNmUtYTE5MS1jNmQ3YTIyOTgwNjUifSwic3ViIjoic2ItYjlmNTdkODMtYzAzNC00YTZlLWExOTEtYzZkN2EyMjk4MDY1IWI0OTU1Mzd8eHN1YWEhYjQ5MzkwIiwiYXV0aG9yaXRpZXMiOlsidWFhLnJlc291cmNlIl0sInNjb3BlIjpbInVhYS5yZXNvdXJjZSJdLCJjbGllbnRfaWQiOiJzYi1iOWY1N2Q4My1jMDM0LTRhNmUtYTE5MS1jNmQ3YTIyOTgwNjUhYjQ5NTUzN3x4c3VhYSFiNDkzOTAiLCJjaWQiOiJzYi1iOWY1N2Q4My1jMDM0LTRhNmUtYTE5MS1jNmQ3YTIyOTgwNjUhYjQ5NTUzN3x4c3VhYSFiNDkzOTAiLCJhenAiOiJzYi1iOWY1N2Q4My1jMDM0LTRhNmUtYTE5MS1jNmQ3YTIyOTgwNjUhYjQ5NTUzN3x4c3VhYSFiNDkzOTAiLCJncmFudF90eXBlIjoiY2xpZW50X2NyZWRlbnRpYWxzIiwicmV2X3NpZyI6IjhjMjk1MjQ5IiwiaWF0IjoxNzYwMDAyODQ3LCJleHAiOjE3NjAwNDYwNDcsImlzcyI6Imh0dHBzOi8vYjc0NDlmZTR0cmlhbC5hdXRoZW50aWNhdGlvbi51czEwLmhhbmEub25kZW1hbmQuY29tL29hdXRoL3Rva2VuIiwiemlkIjoiOGQ1ZDlkMzktMmMyMS00MzYzLWE2ZTgtZDE1NjczYTBkNGIzIiwiYXVkIjpbInVhYSIsInNiLWI5ZjU3ZDgzLWMwMzQtNGE2ZS1hMTkxLWM2ZDdhMjI5ODA2NSFiNDk1NTM3fHhzdWFhIWI0OTM5MCJdfQ.O9e6MsEpj5Q13D3x0ZkDhnSf-lrAyfOlwfnI2tY5AJGF40Awe8ikILUZ1yMLjd4xM18krQdhnUInip6k1bBDqjZKgUo3vOVN-nI8bW4uajrie59VHmSKW1heEoVz4H4RAnSFUJfF9XRvhAJk9VukAUtiLILAMeJKH8ROi9hncRv1l3-_C-wTJh4cFEfywMDer0VPHhs7L-Ul7YZEdg0iKFjzm4_XwIj-lg1IM85gITZTTtqfMKc6dzKNTZqCljwRfrrvCuuiH8PYLd-moI32K37xu9OqkMgir-732wmqzDWQVUsxPGreXEoVT7Cp03b5_Ty5sZApBJCFK3UhmcLP0Q"   
    //         },
    //     body: JSON.stringify({
    //         "definitionId": "us10.b7449fe4trial.postingtofateam.api_trigger",
    //         "context": {
    //             "pernr":oCtx.Pernr ,
    //             "username": oCtx.Username,
    //             "mailid": oCtx.MailId
    //     }
    //         })
    //     });

    //     if (response.ok) {
    //         sap.m.MessageToast.show("Approval workflow triggered successfully!");
    //     } else {
    //         const errText = await response.text();
    //         sap.m.MessageBox.error("Failed to trigger workflow: " + errText);
    //     }
    // } catch (err) {
    //     console.log(err);
    //     sap.m.MessageBox.error("Error calling workflow API: " + err.message);
    // }

     const oTable = this.getView().byId("personnelTable");
            const aSelectedItems = oTable.getSelectedItems();

            if (aSelectedItems.length === 0) {
                MessageBox.warning("Please select at least one record to get approval.");
                return;
            }

            const oCtx = aSelectedItems[0].getBindingContext("oModel").getObject();

            try {
                const sUrl = "/workflow-api/workflow/rest/v1/workflow-instances?environmentId=tutorial";

                const oPayload = {
                    definitionId: "us10.b7449fe4trial.postingtofateam.api_trigger",
                    context: {
                        pernr: oCtx.Pernr,
                        username: oCtx.Username,
                        mailid: oCtx.MailId
                    }
                };

                const response = await fetch(sUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(oPayload)
                });

                if (response.ok) {
                    MessageToast.show("Approval workflow triggered successfully!");
                } else {
                    const errText = await response.text();
                    MessageBox.error("Failed to trigger workflow: " + errText);
                }

            } catch (err) {
                console.error("Workflow API error:", err);
                MessageBox.error("Error calling workflow API: " + err.message);
            }
        
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