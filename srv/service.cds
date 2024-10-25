using {GSTP as my} from '../db/schema';


service GST @(path: '/browse') {


     //action excelExtract(Excelbase64 : LargeString, Sheet1 : array of tempdata1) returns String; 
     action excelExtract(Excelbase64 : LargeString) returns String; 

     action calculatedata(ExcelData : array of tempdata) returns String;
     action Getdata() returns String;

}

// type tempdata1{
//         OrderNumber: String;
//         OrderAmount:Decimal;
//         OrderDate: Decimal;
//         ShippingCountry: String;
//         ExpDelDate: Decimal;
//         OrderStat: String
// }
 type tempdata{
        ReconciliationType: String;
        ReconciliationSubType: String;
        Errors: String;
        Action: String;
        ITCAcceptedPeriod: String;
        DocumentType: String;
        TaxpayerGSTIN: String;
        PRFP: String;
        GSTR2BFP: String;
        GSTR2BStmtperiod: String;
        FiscalYear: String;
        CounterpartyGSTIN: String;
        __EMPTY: String;
        CounterpartyName: String;
        SuppliereInvoiceEligibility: String;
        PRIN: String;
        GSTR2BIN: String;
        EInvoiceNumber: String;
        EInvoiceDate:String;
        InternalInvNumber: String;
        PRIT: String;
        GSTR2BIT: String;
        PRID: String;
        GSTR2BID: String;
        RevCharge: String;
        PRPOS: String;
        GSTR2BPOS: String;
        PRIA: Decimal;
        GSTR2BIA: Decimal;
        BusinessArea: String;
        AccountingDocNumber: String;
        VendorCategory: String;
        VendorCode: String;
        AdditionalField1: String;
        AdditionalField2: String;
        AdditionalField3: String;
        AdditionalField4: String;
        AdditionalField5: String;
        AdditionalField6: String;
        RemainingITC: Decimal;
        PRTA: Decimal;
        GSTR2BTA: Decimal;
        PRIGSTA: Decimal;
        GSTR2BIGSTA: Decimal;
        EligibleITCIGST: Decimal;
        IneligibleITCIGST: Decimal;
        TotalITCIGST: Decimal;
        PRCGSTA: Decimal;
        GSTR2BCGSTA: Decimal;
        EligibleITCCGST: Decimal;
        IneligibleITCCGST: Decimal;
        TotalITCCGST: Decimal;
        PRSGSTA: Decimal;
        GSTR2BSGSTA: Decimal;
        EligibleITCSGST: Decimal;
        IneligibleITCSGST: Decimal;
        TotalITCSGST: Decimal;
        PRCESSA: Decimal;
        GSTR2BCESSA: Decimal;
        EligibleITCCESS: Decimal;
        IneligibleITCCESS: Decimal;
        TotalITCCESS: Decimal;
        PRTT: Decimal;
        GSTR2BTT: Decimal;
        TotalITC: Decimal;
        CPGSTINStatus: String;
        GSTR1FilingStatus: String;
        GSTR1FilingDate: String;
        ToleranceTaxValUpLimit: Decimal;
        ToleranceTaxValLowLimit: Decimal;
        Score: Decimal;
        INVOICE_NUM: String;
        CTIN: String;
        INVOICE_DATE: String;
        POS: String;
        INVOICE_AMT: String;
        TAXABLE_AMT: String;
        IGST_AMT: String;
        CGST_AMT: String;
        SGST_AMT: String;
        CESS_AMT: String;
        RATE: String;
        REVERSE_CHARGE: String;
        INV_NUM_SPECIAL_CHAR: String;
        DOCUMENT_TYPE_MISMATCH: String
 }

 
 


