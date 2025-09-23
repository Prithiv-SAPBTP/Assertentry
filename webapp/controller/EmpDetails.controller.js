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


        handleUploadPress: function() {
            var oFileUploader = this.byId("fileUploader");
            var oFile = oFileUploader.oFileUpload.files[0]; 

            if (!oFile) {
                MessageToast.show("Choose a file first");
                return;
            }
            if (oFile.name.endsWith(".xlsx")) {
                        this.oReadExcelFile(oFile);
                    }

            var oODataModel = this.getView().getModel();

            var oEntry = {
                Filename: oFile.name,
                Mimetype: oFile.type,
                Value: oFile.Value
            };

            oODataModel.create("/FILESet", oEntry, {
                headers: {
                    "Slug": oFile.name
                },
                success: function () {
                    var sKey = oODataModel.createKey("/FILESet", { Filename: oFile.name });
                    var sUrl = oODataModel.sServiceUrl + sKey + "/$value";
                    var sToken = oODataModel.getHeaders()["x-csrf-token"];

                jQuery.ajax({
                    url: sUrl,
                    method: "PUT",
                    headers: {
                        "Content-Type": oFile.type,
                        "x-csrf-token": sToken
                    },
                    data: oFile,
                    processData: false,
                    success: function () {
                        MessageToast.show("File uploaded successfully!");
                    },
                    error: function (oErr) {
                        MessageBox.error("Upload failed: " + oErr.responseText);
                    }
                });
            },
            error: function (oError) {
                MessageBox.error("Metadata creation failed: " + oError.message);
                }
            });
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