function dataIsInvalid(advName, incomingData, destinationData, reportConfig) {
  let lastDateInDestinationData = destinationData[destinationData.length - 1][reportConfig.dateColumnIndex];
  let advertiserInIncomingData = incomingData[reportConfig.dataBeginRowIndex][reportConfig.advColumnIndex];

  if( advName === 'Visa' ) {
    // added this, since none of the columns have the advertiser name in it
    let campaignInIncomingData = incomingData[0][1];
    if ( reportConfig.type === '3P Data' ) {
      if( visaValidateCorrectCampaign( campaignInIncomingData ) ) { return true; }; 
    } else {
      if( defaultValidateCorrectAdvertiser( advertiserInIncomingData, advName ) ) {
        return true; 
      }
    }
  } else {
    defaultValidateCorrectAdvertiser( advertiserInIncomingData, advName ); 
  }
  
  if( lastDateInDestinationData > yesterday ) {
    Logger.log(`'${reportConfig.destinationSheetName}' already contains yesterday's data. Aborting.`);
    return true; 
  }

  return false;
}

// function taxActValidateCorrectCampaign( campaignInIncomingData ) {
//   if( campaignInIncomingData === 'TY21_SMB_Digital_Yelp' ) {
//     Logger.log('Incoming and Destination campaigns match in advertiser.')
//   } else {
//     Logger.log(`Incoming and Destination campaigns don't match. Aborting.`);
//     return true; 
//   }
// }

function visaValidateCorrectCampaign( campaignInIncomingData ) {
  if( campaignInIncomingData === 'MK~US_CN~Ecomm FY22 Q3_CM~NA_YQ~22Q3_CP~PO43049_MT~142127_AC~EC' ) {
    Logger.log('Incoming and Destination campaigns match in advertiser.')
  } else {
    Logger.log(`Incoming and Destination campaigns don't match. Aborting.`);
    return true; 
  }
}

function defaultValidateCorrectAdvertiser( advertiserInIncomingData, advName ) {
  if( advertiserInIncomingData.toLowerCase().match( new RegExp( `${advName}`, 'i' ) ) ) {
    Logger.log('Incoming and Destination Data match in advertiser.')
  } else {
    Logger.log(`Data pulled for ${advertiserInIncomingData} but should be for ${advName}. Aborting.`);
    return true; 
  }
}

