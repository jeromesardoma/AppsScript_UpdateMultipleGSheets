function getDataFromXlsx( attachment, dataBeginRowIndex ) {
  let ss = saveXlsxAsSheets(attachment); 
  return getDataFromConvertedXlsx( ss, dataBeginRowIndex ); 
}

function saveXlsxAsSheets(attachment) {
  let name = attachment.getName();
  let schema = {
    title: name,
    parents: [{
      id: XLSX_FOLDER_ID
    }]
  };
  let gSpreadsheet = Drive.Files.insert(schema, attachment, { convert: true });
  return gSpreadsheet;
}

function getDataFromConvertedXlsx(spreadsheet, dataBeginRowIndex) {
  let sheet = SpreadsheetApp.openById(spreadsheet.getId())
    .getSheets()[0];
  let startingCellString = "A" + dataBeginRowIndex.toString();
  let values = sheet.getRange(startingCellString).getDataRegion().getValues();
  return values;
}


