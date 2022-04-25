const MILLIS_PER_DAY = 1000 * 60 * 60 * 24;

const lastMidnight = new Date( new Date().setHours(0, 0, 0, 0) );
const yesterday = new Date(lastMidnight.getTime() - MILLIS_PER_DAY);
const yesterdayMonth = (yesterday.getMonth() + 1) < 10 ? 
                        '0' + (yesterday.getMonth() + 1).toString() : 
                        (yesterday.getMonth() + 1).toString();
const yesterdayDate = yesterday.getDate() < 10 ? 
                      '0' + yesterday.getDate().toString() : 
                      yesterday.getDate().toString();

function yesterdayFormattedDate(dataSource) {
  if( dataSource === 'dcm' || dataSource === 'flashtalking' ) { 
    return `${yesterday.getFullYear()}-${yesterdayMonth}-${yesterdayDate}`;
  } else if ( dataSource === 'ttd' ) { 
    return `${yesterdayMonth}/${yesterdayDate}/${yesterday.getFullYear()}`;
  }                  
}

// folder id of where converted xlsx's are saved
const XLSX_FOLDER_ID = '1QIvKqge1IMZKoinez3uYt8VqX-zLKr1T';

const XLSX_FILETYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';