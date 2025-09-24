sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], (Controller,MessageToast,MessageBox) => {
    "use strict";

    return Controller.extend("assertentry.controller.EmpDetails", {
        onInit() {
        },
        
handleUploadComplete: function(oEvent) {
			var sResponse = oEvent.getParameter("response"),
				iHttpStatusCode = parseInt(/\d{3}/.exec(sResponse)[0]),
				sMessage;

			if (sResponse) {
				sMessage = iHttpStatusCode === 200 ? sResponse + " (Upload Success)" : sResponse + " (Upload Error)";
				MessageToast.show(sMessage);
			}
		},

//     handleUploadPress: function () {
//     var oFileUploader = this.byId("fileUploader");
//     var oFile = oFileUploader.oFileUpload.files[0];

//     // 🔹 Validate file
//     if (!oFile) {
//         MessageToast.show("Choose a file first");
//         return;
//     }
//     if (!oFile.name.toLowerCase().endsWith(".xlsx")) {
//         MessageToast.show("Please upload only Excel (.xlsx) file");
//         return;
//     }

//     var oODataModel = this.getView().getModel();

//     // 🔹 Create entry in OData first
//     var oEntry = {
//         Filename: oFile.name,
//         Mimetype: oFile.type || "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//     };

//     oODataModel.create("/FILESet", oEntry, {
//         headers: { "Slug": oFile.name },
//         success: function () {
//             var sKey = oODataModel.createKey("/FILESet", { Filename: oFile.name });
//             var sUrl = oODataModel.sServiceUrl + sKey + "/$value";

//             // 🔹 Fetch CSRF token safely
//             oODataModel.refreshSecurityToken();
//             var sToken = oODataModel.getHeaders()["x-csrf-token"];

//             var reader = new FileReader();
//             reader.onload = function (e) {
//                 var arrayBuffer = e.target.result;
//                 var blob = new Blob([arrayBuffer], { type: oFile.type });

//              jQuery.ajax({
//                     url: sUrl,
//                     type: "PUT",
//                     headers: {
//                         "x-csrf-token": sToken,
//                         "Content-Type": oFile.type || 
//                             "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" // ✅ Force Excel MIME
//                     },
//                     data: blob,
//                     processData: false,
//                     contentType: false,
//                     success: function () {
//                         MessageToast.show("File uploaded successfully!");
//                     },
//                     error: function (oErr) {
//                         MessageBox.error("Upload failed: " + (oErr.responseText || oErr.statusText));
//                     }
//                 });
//             };
//             reader.readAsArrayBuffer(oFile);
//         },
//         error: function (oError) {
//             MessageBox.error("Creation failed: " + (oError.message || "Unknown error"));
//         }
//     });
// },

// handleUploadPress: function () {
//     var oFileUploader = this.byId("fileUploader");
//     var oFile = oFileUploader.oFileUpload.files[0];

//     // 🔹 Validate file
//     if (!oFile) {
//         MessageToast.show("Choose a file first");
//         return;
//     }
//     if (!oFile.name.toLowerCase().endsWith(".xlsx")) {
//         MessageToast.show("Please upload only Excel (.xlsx) file");
//         return;
//     }

//     var oODataModel = this.getView().getModel();
//     var that = this;

//     var reader = new FileReader();
//     reader.onload = function (e) {
//         // 🔹 Convert file to Base64 for OData upload
//         var sBase64 = btoa(
//             new Uint8Array(e.target.result)
//                 .reduce((data, byte) => data + String.fromCharCode(byte), "")
//         );

//         var oEntry = {
//             Filename: oFile.name,
//             Mimetype: oFile.type || 
//                 "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//             Value: sBase64
//         };

//         // 🔹 POST file as Base64
//         oODataModel.create("/FILESet", oEntry, {
//             success: function () {
//                 MessageToast.show("File uploaded successfully!");
//             },
//             error: function (oError) {
//                 MessageBox.error("Upload failed: " + (oError.message || "Unknown error"));
//             }
//         });

//         // 🔹 Parse Excel file into JSON for row-wise processing
//         var data = new Uint8Array(e.target.result);
//         var workbook = XLSX.read(data, { type: "array" });
//         that.excelSheetsData = []; // Reset previous data

//         workbook.SheetNames.forEach(function (sheetName) {
//             var sheet = workbook.Sheets[sheetName];
//             var jsonData = XLSX.utils.sheet_to_json(sheet);
//             if (jsonData.length > 0) {
//                 that.excelSheetsData.push(jsonData);
//             }
//         });

//         if (that.excelSheetsData.length === 0) {
//             MessageBox.error("Excel file is empty or invalid");
//             return;
//         }

//         // 🔹 Set JSON model to view
//         var oModel = new sap.ui.model.json.JSONModel({ FileDetails: that.excelSheetsData[0] });
//         that.getView().setModel(oModel);

//         MessageToast.show("Excel file loaded successfully!");
//     };

//     reader.readAsArrayBuffer(oFile);
// },


// handleUploadPress: function () {
//     var oFileUploader = this.byId("fileUploader");
//     var oFile = oFileUploader.oFileUpload.files[0];

//     // 🔹 Validate file
//     if (!oFile) {
//         MessageToast.show("Choose a file first");
//         return;
//     }
//     if (!oFile.name.toLowerCase().endsWith(".xlsx")) {
//         MessageToast.show("Please upload only Excel (.xlsx) file");
//         return;
//     }

//     var oODataModel = this.getView().getModel();

//     var reader = new FileReader();
//     reader.onload = function (e) {
//         // 🔹 Convert to Base64 string
//         var sBase64 = btoa(
//             new Uint8Array(e.target.result)
//                 .reduce((data, byte) => data + String.fromCharCode(byte), "")
//         );

//         // 🔹 Prepare payload for OData
//         var oEntry = {
//             Filename: oFile.name,
//             Mimetype: oFile.type || 
//                 "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//             Value: sBase64   // <-- send file as Base64 string
//         };

//         // 🔹 POST file as Base64
//         oODataModel.create("/FILESet", oEntry, {
//             success: function () {
//                 MessageToast.show("File uploaded successfully!");
//             },
//             error: function (oError) {
//                 MessageBox.error("Upload failed: " + (oError.message || "Unknown error"));
//             }
//         });
//     };

//     reader.readAsArrayBuffer(oFile);
// },


handleUploadPress: function () {
    var oFileUploader = this.byId("fileUploader");
    var oFile = oFileUploader.oFileUpload.files[0];

    // 🔹 Validate file
    if (!oFile) {
        MessageToast.show("Choose a file first");
        return;
    }
    if (!oFile.name.toLowerCase().endsWith(".xlsx")) {
        MessageToast.show("Please upload only Excel (.xlsx) file");
        return;
    }

    var oODataModel = this.getView().getModel();

    // 🔹 Create entry in OData
    var oEntry = {
        Filename: oFile.name,
        Mimetype: oFile.type || 
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    };

    oODataModel.create("/FILESet", oEntry, {
        headers: { "Slug": oFile.name },
        error: function (oError) {
            MessageBox.error("Creation failed: " + (oError.message || "Unknown error"));
        }
    });

    // 🔹 Build upload URL
    var sKey = oODataModel.createKey("/FILESet", { Filename: oFile.name });
    var sUrl = oODataModel.sServiceUrl + sKey + "/$value";

    // 🔹 Fetch CSRF token
    oODataModel.refreshSecurityToken();
    var sToken = oODataModel.getHeaders()["x-csrf-token"];

    // 🔹 Read file and upload
    var reader = new FileReader();
    reader.onload = function (e) {
        var arrayBuffer = e.target.result;
        var blob = new Blob([arrayBuffer], { type: oFile.type });

        jQuery.ajax({
            url: sUrl,
            type: "POST",
            headers: {
                "x-csrf-token": sToken,
                "Content-Type": oFile.type ||
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            },
            data: blob,
            processData: false,
            contentType: false,
            success: function () {
                MessageToast.show("File uploaded successfully!");
            },
            error: function (oErr) {
                MessageBox.error("Upload failed: " + (oErr.responseText || oErr.statusText));
            }
        });
    };
    reader.readAsArrayBuffer(oFile);
},
  



        oReadExcelFile: function(oFile) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    
                var data = new Uint8Array(e.target.result);
                var workbook = XLSX.read(data, { type: "array" });

                var sheetName = workbook.SheetNames[0];
                var sheet = workbook.Sheets[sheetName];
                var jsonData = XLSX.utils.sheet_to_json(sheet);

                if (jsonData.length === 0) {
                    MessageBox.error("Excel file is empty or invalid");
                    return;
                }

                var oModel = new sap.ui.model.json.JSONModel({ FileDetails: jsonData });
                this.getView().setModel(oModel);

            }.bind(this);

            reader.readAsArrayBuffer(oFile);
        },


		handleTypeMissmatch: function(oEvent) {
			var aFileTypes = oEvent.getSource().getFileType();
			aFileTypes.map(function(sType) {
				return "*." + sType;
			});
			MessageToast.show("The file type *." + oEvent.getParameter("fileType") +
									" is not supported. Choose one of the following types: " +
									aFileTypes.join(", "));
		},

		handleValueChange: function(oEvent) {
			MessageToast.show("Press 'Upload File' to upload file '" +
									oEvent.getParameter("newValue") + "'");
		}
    });
});