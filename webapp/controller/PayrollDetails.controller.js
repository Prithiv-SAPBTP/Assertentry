sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], (Controller,MessageToast,MessageBox) => {
    "use strict";

    return Controller.extend("assertentry.controller.PayrollDetails", {
        onInit: function() {
        },
        handleUploadPress: function () {
            var that = this;
            var oFileUploader = this.byId("fileUploader");
            var oFile = oFileUploader.oFileUpload.files[0];

            if (!oFile) {
                sap.m.MessageToast.show("Choose a file first");
                return;
            }
            if (!oFile.name.toLowerCase().endsWith(".xlsx")) {
                sap.m.MessageToast.show("Please upload only Excel (.xlsx) file");
                return;
            }

            this.readExcelFile(oFile).then(function (aExcelData) {
                if (aExcelData.length === 0) {
                    sap.m.MessageBox.error("Excel file is empty or invalid");
                    return;
                }

                // var url = that.getOwnerComponent().getModel().sServiceUrl;
                // var oDataModel = new sap.ui.model.odata.ODataModel(url, true); // enable batch
                // oDataModel.setUseBatch(true);

                // var uPath = "/ZPAYROLL_DATASet";
                // var batchChanges = [];

                aExcelData.forEach(function (oRow) {
                    delete oRow.visible;
                    batchChanges.push(oDataModel.createBatchOperation(uPath, "POST", oRow));
                });

                oDataModel.addBatchChangeOperations(batchChanges);
                oDataModel.submitBatch(
                    function (oData, oResponse) {
                        if (oResponse.statusCode === "202" || oResponse.statusCode === 202) {
                            sap.m.MessageBox.success("Records Created Successfully");
                            that.tableRead();
                        } else {
                            sap.m.MessageBox.error("Some issue in batch response");
                        }
                    },
                    function (oError) {
                        sap.m.MessageBox.error("Batch upload failed");
                        console.error("Batch error:", oError);
                    }
                );
            });
},


//         readExcelFile: function (oFile) {
//             return new Promise(function (resolve, reject) {
//                 var reader = new FileReader();
//                 reader.onload = function (e) {
//                     try {
//                         var data = new Uint8Array(e.target.result);
//                         var workbook = XLSX.read(data, { type: "array" });
//                         var sheetName = workbook.SheetNames[0];
//                         var sheet = workbook.Sheets[sheetName];
//                         var jsonData = XLSX.utils.sheet_to_json(sheet);

//                         resolve(jsonData); // return Excel JSON rows
//                     } catch (err) {
//                         reject(err);
//                     }
//                 };
//                 reader.onerror = reject;
//                 reader.readAsArrayBuffer(oFile);
//             });
// },

readExcelFile: function (oFile) {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.onload = (e) => {
            try {
                var data = new Uint8Array(e.target.result);
                var workbook = XLSX.read(data, { type: "array" });
                var sheetName = workbook.SheetNames[0];
                var sheet = workbook.Sheets[sheetName];
                var jsonData = XLSX.utils.sheet_to_json(sheet);

                var oModel = new sap.ui.model.json.JSONModel({ FileDetails: jsonData });
                this.getView().setModel(oModel,"payrollData");  // ✅ works with arrow function

                resolve(jsonData);
            } catch (err) {
                reject(err);
            }
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(oFile);
    });
},

    });
});