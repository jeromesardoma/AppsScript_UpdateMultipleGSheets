// keep adv name as general as possible to match reporting names, if needed
// set 'adv col index' to be the index at which advertiser name is present

advertisers = [
  {
    name: 'Postmates',
    spreadsheetId: '1fi9V2Gfamqil1oQNGTwGZzhutuChlCjbE1UEg9gnvs4',
    reportConfigs: [
      {
        type: 'TTD Data',
        gmailSearchQuery: '"Postmates - Daily Data Send" newer_than:1d in:inbox',
        destinationSheetName: 'TTDDataByCreative',
        dataBeginRowIndex: 1,
        dateColumnIndex: 1,
        advColumnIndex: 0
      },
      {
        type: '3P Data',
        gmailSearchQuery: '934846192 newer_than:1d',
        destinationSheetName: '3P Data',
        dataBeginRowIndex: 19,
        dateColumnIndex: 0,
        advColumnIndex: 2
      }
    ]
  },
  {
    name: 'Visa',
    spreadsheetId: '1VqYnJJbfMYcPjRb-yEmKViAET3zBheQ57R7wV7JHciQ',
    reportConfigs: [
      {
        type: 'TTD Data',
        gmailSearchQuery: '"Visa Q3 2022 - TTD Daily Data Send" newer_than:1d in:inbox',
        destinationSheetName: 'TTDDataByCreative',
        dataBeginRowIndex: 1,
        dateColumnIndex: 1,
        advColumnIndex: 0
      },
      {
        type: '3P Data',
        gmailSearchQuery: '940409501 newer_than:1d',
        destinationSheetName: '3P Data',
        dataBeginRowIndex: 14,
        dateColumnIndex: 0,
        advColumnIndex: null
      }
    ]
  },
  {
    name: 'Adobe',
    spreadsheetId: '1da5jL4mhGLIIbuF2C9Op5Y9cqwuBDFY5KBunfY-QdVw',
    reportConfigs: [
      {
        type: 'TTD Data',
        gmailSearchQuery: '"Adobe - Daily Data Send" newer_than:1d in:inbox',
        destinationSheetName: 'TTDDataByCreative',
        dataBeginRowIndex: 1,
        dateColumnIndex: 1,
        advColumnIndex: 0
      },
      {
        type: '3P Data',
        gmailSearchQuery: 'Flashtalking Adobe newer_than:1d',
        destinationSheetName: '3P Data',
        dataBeginRowIndex: 1,
        dateColumnIndex: 0,
        advColumnIndex: 1
      }
    ]
  },
  {
    name: 'Corona',
    spreadsheetId: '1mLr3A2pGfzqDZgsD1hbkFwwKwGqxVm5X4bcjTaDWKE0',
    reportConfigs: [
      {
        type: 'TTD Data',
        gmailSearchQuery: '"Corona | Yesterday | Corona - Daily Performance" newer_than:1d in:inbox',
        destinationSheetName: 'TTDDataByCreative',
        dataBeginRowIndex: 1,
        dateColumnIndex: 1,
        advColumnIndex: 0
      },
      {
        type: '3P Data',
        gmailSearchQuery: 'flashtalking corona newer_than:1d',
        destinationSheetName: '3P Data',
        dataBeginRowIndex: 1,
        dateColumnIndex: 0,
        advColumnIndex: 4
      }
    ]
  },
  {
    name: 'Square',
    spreadsheetId: '1cYKfcW5WXO-19ii0FK7crD-M47CftR_weS5gcXyRNFI',
    reportConfigs: [
      {
        type: 'TTD Data',
        gmailSearchQuery: 'Square - Daily Performance - Square | Yesterday | Square - Daily Performance newer_than:1d in:inbox',
        destinationSheetName: 'TTDDataByCreative',
        dataBeginRowIndex: 1,
        dateColumnIndex: 1,
        advColumnIndex: 0
      },
      {
        type: '3P Data',
        gmailSearchQuery: '935616547 newer_than:1d',
        destinationSheetName: 'US_RST_RTL_CM_Data',
        dataBeginRowIndex: 245,
        dateColumnIndex: 4,
        advColumnIndex: 0
      }
    ]
  }
]

