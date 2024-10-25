sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "hpcl/libs/xlsx.full.min"
],
    function (Controller) {
        "use strict";

        return Controller.extend("hpcl.controller.View1", {
            onInit: function () {

            },

            onPress: function (oEvent) {
                var ExcelData = [];
                var oFileUploader = this.getView().byId("fileUploader");
                var oFile = oFileUploader.oFilePath.oParent.oFileUpload.files[0];
                var Data = this.getView().getModel();
                var serviceurl = this.getView().getModel().getServiceUrl();
                if (oFile) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        var data = new Uint8Array(e.target.result);
                        var workbook = XLSX.read(data, { type: 'array' });
                        var jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
                        jsonData.shift();

                        // ExcelData.push(jsonData);
                        var Payload = {
                            ExcelData : jsonData
                        };

                        $.ajax({
                            type: "POST",
                            contentType: "application/json",
                            url: serviceurl + 'calculatedata',
                            data: JSON.stringify(Payload),
                            success: function (response, statusText, xhrToken) {
                                Data.aBindings = response.value.ExcelData;
                                sap.m.MessageBox.success("File has been successfully uploaded");
                            },
                            error: function () {

                            }
                        });
                        var binary = '';
                        var bytes = new Uint8Array(e.target.result);
                        var len = bytes.byteLength;
                        for (var i = 0; i < len; i++) {
                            binary += String.fromCharCode(bytes[i]);
                        }
                        return window.btoa(binary);

                    };

                    reader.readAsArrayBuffer(oFile);
                    this.sValue = oFileUploader.mProperties.value;
                }

            },

            onDownload: function () {
var jsonData = this.getView().getModel().aBindings;

                // jsonData.shift();
                var worksheet = XLSX.utils.json_to_sheet(jsonData);
                var workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, "Partial Match");
                var wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
                var blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
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
