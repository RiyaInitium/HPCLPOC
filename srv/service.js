const cds = require("@sap/cds");
const XLSX = require('xlsx');
const { Buffer } = require('buffer');

async function base64ToJson(base64String) {
  // Step 1: Decode Base64 string to binary data
  const binaryData = Buffer.from(base64String, 'base64');
  
  // Step 2: Convert binary data to a workbook object
  const workbook = XLSX.read(binaryData, { type: 'buffer' });
  
  // Step 3: Convert workbook data to JSON
  const jsonData = {};
  workbook.SheetNames.forEach(sheetName => {
      const sheet = workbook.Sheets[sheetName];
      jsonData[sheetName] = XLSX.utils.sheet_to_json(sheet);
  });
  
  return jsonData;
}

// Function to convert JSON to Base64
async function jsonToBase64(jsonData) {
  // Create a new workbook and add JSON data as a sheet
  const workbook = XLSX.utils.book_new();
  Object.keys(jsonData).forEach(sheetName => {
      const worksheet = XLSX.utils.json_to_sheet(jsonData[sheetName]);
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  });

  // Write the workbook to a binary buffer
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

  // Encode binary buffer to Base64
  const base64String = Buffer.from(excelBuffer).toString('base64');

  return base64String;
}

class GST extends cds.ApplicationService {

  init() {

    // this.on("calculatedata", async (req) => {
    //   try {
    //     const base64String = req.data.Excelbase64;
    //     const jsonData = base64ToJson(base64String);
    //     return jsonData;
    //   } catch (error) {
    //     console.error(error);
    //     return {};
    //   }
    // });

    // this.on("Getdata", async (req) => {
    //   try {  
       
    //     const ExcelData = jsonToBase64(jsonData);

    //     return {ExcelData};

    //   } catch (error) {
    //     console.error(error);
    //     return {};
    //   }
    // });

    this.on("calculatedata", async (req) => {
      try { 

       
        var Data = new Array();
        Data = req.data;
        //console.log(Data.ExcelData.length);

         for(var i=0;i<Data.ExcelData.length;i++){

          var limit = Data.ExcelData[i].GSTR2BTT - Data.ExcelData[i].PRTT;
          if(limit >= -1000  && limit <= 100){
            Data.ExcelData[i].Action = 'Active';
          }else{
            Data.ExcelData[i].Action = 'None';
          }
      
        //   console.log(Data.ExcelData[i]);
          
         }
        return Data;

      } catch (error) {
        console.error(error);
        return {};
      }
    });

    return super.init();
  }
}



module.exports = { GST };
