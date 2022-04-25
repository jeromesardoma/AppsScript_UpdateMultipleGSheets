function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Scripts")
    .addItem("Update All Pacing Docs", "updateAll")
    .addToUi();
}

function updateAll() {
  updateAllPacingDocs();
  fillFormulasInAllDocs();
  printLogToDoc();
}

function printLogToDoc() {
  let log = Logger.getLog();
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Log');
  sheet.getRange("A1").setValue(log); 
}
