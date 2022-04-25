  [
    {
      name: 'Tax Act',
      spreadsheetId: '1wU0ve_ZN8l5ZJyZt8npzT5fyxtBH3PILlLTGZkv-pVA',
      reportConfigs: [
        {
          type: 'TTD Data',
          gmailSearchQuery: '"TaxAct - Daily Data Send" newer_than:1d in:inbox',
          destinationSheetName: 'TTDDataByCreative',
          dataBeginRowIndex: 1,
          dateColumnIndex: 1,
          advColumnIndex: 0
        },
        {
          type: '3P Data',
          gmailSearchQuery: '930293007 newer_than:1d',
          destinationSheetName: '3P Data',
          dataBeginRowIndex: 11,
          dateColumnIndex: 0,
          advColumnIndex: null
        }
      ]
    }
  ]