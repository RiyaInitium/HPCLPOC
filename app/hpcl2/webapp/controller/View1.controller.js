sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    function (Controller) {
        "use strict";

        return Controller.extend("hpcl2.controller.View1", {
            onInit: function () {
                var oModel = new sap.ui.model.json.JSONModel({
                    isVisible: false
                });
                this.getView().setModel(oModel, "productsModel");
            },

            onPress: function (oEvent) {
                var oFileUploader = this.getView().byId("fileUploader");
                var oFile = oFileUploader.oFilePath.oParent.oFileUpload.files[0];
                var Data = this.getView().getModel();
                var serviceurl = this.getView().getModel().getServiceUrl();

                if (oFile == undefined) {
                    sap.m.MessageBox.warning("Please upload the file");
                }
                else {
                    if (oFile) {
                        var reader = new FileReader();
                        reader.onload = (e) => {
                            // Get the ArrayBuffer from the file

                            var arrayBuffer = e.target.result;
                            // Convert ArrayBuffer to binary string
                            var oView = this.getView().getModel("productsModel");
                            var uint8Array = new Uint8Array(arrayBuffer);
                            var binaryString = '';
                            uint8Array.forEach(function (byte) {
                                binaryString += String.fromCharCode(byte);
                            });
                            // Convert binary string to Base64
                            var base64String = btoa(binaryString);
                            var Payload = {
                                Excelbase64: base64String
                            };

                            $.ajax({
                                type: "POST",
                                contentType: "application/json",
                                url: serviceurl + 'excelExtract',
                                data: JSON.stringify(Payload),
                                success: function (response, statusText, xhrToken) {
                                    Data.aBindings = response.value;
                                    // sap.m.MessageBox.success("Processed successfully, download the excel file");
                                    sap.m.MessageBox.success(`Processed successfully, download the excel file.`, {
                                        onClose: function (ok) {
                                            if (ok === 'OK') {
                                                oView.setProperty("/isVisible", true);
                                            }
                                        }
                                    });
                                },
                                error: function () {

                                }
                            });


                            // Output Base64 String (for example, set it to a model or log it)
                            console.log("Base64 String:", base64String);
                        };

                        // Read the file as an ArrayBuffer
                        reader.readAsArrayBuffer(oFile);
                        this.sValue = oFileUploader.mProperties.value;

                    }
                }



            },






            // onPress: function (oEvent) {
            //     var ExcelData = [];
            //     var oFileUploader = this.getView().byId("fileUploader");
            //     var oFile = oFileUploader.oFilePath.oParent.oFileUpload.files[0];
            //     var Data = this.getView().getModel();
            //     var serviceurl = this.getView().getModel().getServiceUrl();
            //     if (oFile) {
            //         var reader = new FileReader();
            //         reader.onload = function (e) {
            //             var data = new Uint8Array(e.target.result);
            //             var blob = new Blob([data], { type: 'text/csv' });
            //             var link = document.createElement('a');
            //             link.href = URL.createObjectURL(blob);
            //         };
            //         reader.readAsArrayBuffer(oFile);
            //         this.sValue = oFileUploader.mProperties.value;
            //     }

            // },

            onDownload: function () {
                var Data = this.getView().getModel().aBindings;
                var binaryString = window.atob(Data);
                var len = binaryString.length;
                var bytes = new Uint8Array(len);

                // Fill the array buffer with binary data
                for (let i = 0; i < len; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                }


                var blob = new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                var a = document.createElement("a");
                var url = URL.createObjectURL(blob);
                a.href = url;
                a.download = this.sValue;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);

            },
        });
    });
