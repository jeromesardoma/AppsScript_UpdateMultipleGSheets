function fillFormulasInAllDocs() {
  advertisers.forEach( adv => {
    Logger.log('------------------------------------------');
    Logger.log(`==> Filling right-hand formulas in doc for ${adv.name}...`);
    Logger.log('------------------------------------------');
    fillFormulasOnAllSheets( adv );
  })
}

function fillFormulasOnAllSheets( adv ) {
  let reportConfigs = adv.reportConfigs;
  let ss = SpreadsheetApp.openById( adv.spreadsheetId );
  reportConfigs.forEach( config => {
    let sheet = ss.getSheetByName( config.destinationSheetName ); 
    let allDataRangeValues = sheet.getRange("A1").getDataRegion().getValues();
    getRangeExtensionParams(sheet, allDataRangeValues);
  })
}

function getRangeExtensionParams(sheet, values) {
  // if last value of last row of values is full (i.e. formula is filled in already), abort 
  let lastRow = values[values.length - 1];

  if( lastRow[lastRow.length - 1] ) {
    Logger.log(`Formulas in '${sheet.getSheetName()}' are extended through end of data. Aborting.`);
    return;
  }

  let rite;
  let cite;
  let ncte;

  for( let ri = 0; ri < values.length - 1; ri++ ) {
    let currentRowLength = countFilledCells(values[ri]);
    let nextRowLength = countFilledCells(values[ri+1]);
    if( nextRowLength < currentRowLength ) {
      rite = ri + 1; // row references are 1-indexed
      ncte = currentRowLength - nextRowLength; 
      cite = nextRowLength + 1;
      break;
    } 
  }
  
  return fillFormulasForSingleSheet(sheet, rite, cite, ncte);
}

function fillFormulasForSingleSheet(sheet, rowIndexToExtend, colIndexToExtend, numColsToExtend) {
  let rangeToExtend = sheet.getRange(rowIndexToExtend, colIndexToExtend, 1, numColsToExtend);
  rangeToExtend.autoFillToNeighbor(SpreadsheetApp.AutoFillSeries.DEFAULT_SERIES);
  Logger.log(`Formulas successfully extended in ${sheet.getSheetName()}.`);
}

function countFilledCells(row) {
  // calling .getValue() on an empty cell returns '' as its value (falsy)
  return row.filter( e => e !== '' ).length;
}


