function updateAllPacingDocs() {
  advertisers.forEach( adv => {
    Logger.log('------------------------------------------');
    Logger.log(`==> Updating Pacing Doc for ${adv.name}...`);
    Logger.log('------------------------------------------');
    updateAllPacingDocData( adv );
  })
}

function updateAllPacingDocData( adv ) {
  const { name, spreadsheetId, reportConfigs } = adv; 
  reportConfigs.forEach( config => {
    Logger.log(`Pulling ${config.type}...`)
    Logger.log('--------------------');
    updateSingleDataSource( name, spreadsheetId, config );
  })
}

function updateSingleDataSource(advName, spreadsheetId, reportConfig) {
  let ss = SpreadsheetApp.openById(spreadsheetId);
  let destinationSheetName = reportConfig.destinationSheetName;
  let destinationSheet = ss.getSheetByName(destinationSheetName);

  // get (single, typically) attachment, if present
  let attachment = getAttachment(reportConfig);
  let ydData = getYesterdayData(attachment);
  let destinationData = getDestinationData(ss, destinationSheetName); 

  // validate data
  if( dataIsInvalid(advName, ydData, destinationData, reportConfig) ) return; 

  // add data to destination sheet, adding data below existing data
  destinationSheet
    .getRange(destinationSheet.getLastRow() + 1, 1, ydData.length, ydData[0].length)
    .setValues(ydData); 

  Logger.log(`${advName} pacing doc updated.`)
  Logger.log(`${ydData.length} rows added to ${destinationSheetName}.`)
}

// helper functions for updateSingleDataSource

function getAttachment(reportConfig) {
  let lastMessage = getLastMessage(reportConfig);
  let attachment = lastMessage.getAttachments()[0];
  return attachment; 
}

function getLastMessage(reportConfig) {
  let gmailSearchQuery = reportConfig.gmailSearchQuery;
  let threads = GmailApp.search(gmailSearchQuery);   

  // assumes there is only one suitable thread returned above
  let firstThread = threads[0];
  let firstThreadMessages = firstThread.getMessages();
  let lastMessage = firstThreadMessages[firstThreadMessages.length - 1];
  return lastMessage;   
}

function getYesterdayData(attachment, reportConfig) {
  let incomingData;
  let ydFormattedDate = getYesterdayFormattedDate(attachment); 
  let csvString = convertBlobToCsvString(attachment);
  if( attachment && attachment.getContentType() === XLSX_FILETYPE ) {
    incomingData = getDataFromXlsx( attachment, reportConfig.dataBeginRowIndex );
  } else {
    incomingData = Utilities.parseCsv(csvString, ",").slice(1); 
  }
  return incomingData.filter( r => r[reportConfig.dateColumnIndex] === ydFormattedDate );
}

function getYesterdayFormattedDate(attachment) {
  if( attachment ) {
    return yesterdayFormattedDate('dcm');
  } else {
    let dataSource = 'ttd'; // ttd by default
    let dataURL = getDataUrl(lastMessage); 
    let blob = UrlFetchApp.fetch(dataURL).getBlob();
    if( blob.getContentType() === 'application/zip' ) dataSource = 'flashtalking'; 
    return yesterdayFormattedDate(dataSource);
  }
}

function convertBlobToCsvString(attachment) {
  let lastMessage = getLastMessage(reportConfig);
  let dataURL = getDataUrl(lastMessage); 
  let blob = attachment || UrlFetchApp.fetch(dataURL).getBlob();
  if( blob.getContentType() === 'application/zip' ) blob = Utilities.unzip(blob)[0]; 
  return blob.getDataAsString();
}

function getDestinationData( spreadsheet, destinationSheetName ) {
  return spreadsheet.getSheetByName(destinationSheetName)
    .getRange("A1")
    .getDataRegion()
    .getValues();
}

function getDataUrl(message) {
  let subject = message.getSubject();
  let flashtalkingRegex = /flashtalking/i;

  if( subject.match(flashtalkingRegex) ) {
    return message.getPlainBody().split("\n")
      .filter( e => e.startsWith('https://download.flashtalking.com') )[0].trim();
  } else {
    return message.getPlainBody().split("below:")[1].trim();
  }
}
