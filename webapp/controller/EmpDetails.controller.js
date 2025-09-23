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

        handleUploadPress: function () {
            var oFileUploader = this.byId("fileUploader");
            var oFile = oFileUploader.oFileUpload.files[0];

            if (!oFile) {
                MessageToast.show("Choose a file first");
                return;
            }

            if (!oFile.name.endsWith(".xlsx")) {
                MessageBox.error("Please upload only Excel (.xlsx) files");
                return;
            }
            // Process Excel
            this.oReadExcelFile(oFile);
        },

        // Read Excel file and convert to JSON
        oReadExcelFile: function (oFile) {
            var reader = new FileReader();

            reader.onload = function (e) {
                var data = new Uint8Array(e.target.result);
                var workbook = XLSX.read(data, { type: "array" });

                var sheetName = workbook.SheetNames[0];
                var sheet = workbook.Sheets[sheetName];
                var jsonData = XLSX.utils.sheet_to_json(sheet);

                if (jsonData.length === 0) {
                    MessageBox.error("Excel file is empty or invalid");
                    return;
                }
                var aMappedData = jsonData.map(function (row) {
                    return {
                        Pernr: row.PERNR,
                        // Endda: row.ENDDA,
                        // Begda: row.BEGDA,
                        Seqnr: row.SEQNR,
                        Username: row.USERNAME,
                        MailId: row.MAIL_ID
                    };
                });
                this._uploadToOData(aMappedData, oFile);

            }.bind(this);

            reader.readAsArrayBuffer(oFile);
        },

        // _uploadToOData: function (aData, oFile) {
        //     var oODataModel = this.getView().getModel();
        //     var that = this;

        //     aData.forEach(function (oEntry) {
        //         // Step 1: Create entry in MEDIASet
        //         oODataModel.create("/PERSON_DATASet", oEntry, {
        //             success: function () {
        //                 // Step 2: Update PERSON_DATASet with binary file
        //                 var sKey = oODataModel.createKey("/PERSON_DATASet", {
        //                     Pernr: oEntry.Pernr
        //                 });

        //                 var sUrl = oODataModel.sServiceUrl + sKey + "/$value";
        //                 var sToken = oODataModel.getHeaders()["x-csrf-token"];

        //                 jQuery.ajax({
        //                     url: sUrl,
        //                     method: "PUT",
        //                     headers: {
        //                         "Content-Type": oFile.type,
        //                         "x-csrf-token": sToken
        //                     },
        //                     data: oFile,
        //                     processData: false,
        //                     success: function () {
        //                         MessageToast.show("File uploaded successfully for Pernr: " + oEntry.Pernr);
        //                     },
        //                     error: function (oErr) {
        //                         MessageBox.error("Upload failed for Pernr " + oEntry.Pernr + ": " + oErr.responseText);
        //                     }
        //                 });
        //             },
        //             error: function (oError) {
        //                 MessageBox.error("Metadata creation failed for Pernr " + oEntry.Pernr + ": " + oError.message);
        //             }
        //         });
        //     });
        // },

        _uploadToOData: function (aData) {
    var oODataModel = this.getView().getModel();

    aData.forEach(function (oEntry) {
        oODataModel.create("/PERSON_DATASet", oEntry, {
            success: function () {
                MessageToast.show("Data uploaded successfully for Pernr: " + oEntry.Pernr);
            },
            error: function (oError) {
                var sMsg = oError && oError.message ? oError.message : "Unknown error";
                MessageBox.error("Upload failed for Pernr " + oEntry.Pernr + ": " + sMsg);
            }
        });
    });
},
        // oCreateDynamicTable: function(oRowData) {
        //     var oTable = this.byId("detailsTable");

        //     oTable.destroyColumns();
        //     oTable.destroyItems();

        //     Object.keys(oRowData).forEach(function(sKey) {
        //         oTable.addColumn(new sap.m.Column({
        //             header: new sap.m.Text({ text: sKey })
        //         }));
        //     });

        //     var oTemplate = new sap.m.ColumnListItem();
        //     Object.keys(oRowData).forEach(function(sKey) {
        //         oTemplate.addCell(new sap.m.Text({ text: "{" + sKey + "}" }));
        //     });

        //     oTable.bindItems({
        //         path: "/FileDetails",
        //         template: oTemplate
        //     });
        // },

        // handleDownloadPress: function () {
        //     var oODataModel = this.getView().getModel();

        //     var sKey = oODataModel.createKey("/MEDIASet", {
        //         Filename: "itemdata" 
        //     });

        //     var sUrl = oODataModel.sServiceUrl + sKey + "/$value";

        //     sap.m.URLHelper.redirect(sUrl, true);
        // },

        // handleDownloadPress: function () {
        //     var oODataModel = this.getView().getModel();
        //     var sFilename = "itemdata"; 

        //     var sKey = oODataModel.createKey("MEDIASet", { Filename: sFilename });
        //     var sServiceUrl = oODataModel.sServiceUrl || oODataModel.sServiceUrl; 
        //     var sUrl = sServiceUrl + "/" + sKey + "/$value";

        //     console.log("Download URL:", sUrl);
        //     try {
        //         window.open(sUrl, "_blank");
        //     } catch (e) {
        //         console.warn("window.open failed:", e);
        //     }

        //     // Fallback: fetch the binary and force download (more reliable)
        //     fetch(sUrl, {
        //         // include credentials if same-origin session cookies are used for auth
        //         credentials: 'same-origin'
        //         // If your OData is on another host and uses cookies, try: credentials: 'include'
        //     })
        //     .then(function (response) {
        //         if (!response.ok) {
        //             throw new Error("HTTP " + response.status + " - " + response.statusText);
        //         }
        //         return response.blob();
        //     })
        //     .then(function (blob) {
        //         // Create temporary link to trigger download
        //         var downloadUrl = window.URL.createObjectURL(blob);
        //         var a = document.createElement("a");
        //         a.href = downloadUrl;
        //         // set desired download filename (add extension if necessary)
        //         a.download = sFilename.indexOf(".") === -1 ? (sFilename + ".xlsx") : sFilename;
        //         document.body.appendChild(a);
        //         a.click();
        //         a.remove();
        //         window.URL.revokeObjectURL(downloadUrl);
        //         sap.m.MessageToast.show("Download started");
        //     })
        //     .catch(function (err) {
        //         sap.m.MessageBox.error("Download failed: " + err.message);
        //         console.error("Download error:", err);
        //     });
        // },

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