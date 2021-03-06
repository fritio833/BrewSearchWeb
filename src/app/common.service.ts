import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {

  constructor() { }

  showHalfStar(rating) {
    //console.log(rating);
    if((rating % 1) > 0.4)
      return true;
    else
      return false;
  }

  paramCleanup(paramName) {
    let param = paramName.replace(/\s+/g,"-");
    return param;
  }

  dateFriendly(dateStr) {
    var dateTemp = dateStr.split(" ");
    var dateFormat = dateTemp[0].split("-");
    return dateFormat[1]+'/'+dateFormat[2]+'/'+dateFormat[0];
  }
  
  timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = a.getMonth()+1;
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time =  month + '/'+date + '/' + year;
    return time;
  }   

  timeDifference(previous, short?) {

    
    if (previous == null)
      return '';

    let current = new Date().getTime();

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;
    var checkOne;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {

        if (short)
          return Math.round(elapsed/1000) + 's';
        else {
         checkOne = Math.round(elapsed/1000);
         if (checkOne == 1)
           return Math.round(elapsed/1000) + ' second ago';
         else
           return Math.round(elapsed/1000) + ' seconds ago';
        }  
    }

    else if (elapsed < msPerHour) {

         if (short)
           return Math.round(elapsed/msPerMinute) + 'm';
         else {
          checkOne = Math.round(elapsed/msPerMinute) ;
          if (checkOne == 1)
            return Math.round(elapsed/msPerMinute)  + ' minute ago';
          else
            return Math.round(elapsed/msPerMinute) + ' minutes ago';           
         }              
    }

    else if (elapsed < msPerDay ) {

         if (short)
           return Math.round(elapsed/msPerHour ) + 'h';
        else {
          checkOne = Math.round(elapsed/msPerHour) ;
          if (checkOne == 1)
            return Math.round(elapsed/msPerHour )  + ' hour ago';
          else
            return Math.round(elapsed/msPerHour ) + ' hours ago';            
        }
              
    }

    else if (elapsed < msPerMonth) {
        if (short)
          return Math.round(elapsed/msPerDay) + 'd';
        else {
          checkOne = Math.round(elapsed/msPerDay) ;
          if (checkOne == 1)
            return Math.round(elapsed/msPerDay)  + ' day ago';
          else
            return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';
        } 
    }

    else if (elapsed < msPerYear) {
        if (short)
          return Math.round(elapsed/msPerMonth) + 'mo';
        else {
          checkOne = Math.round(elapsed/msPerMonth) ;
          if (checkOne == 1)
            return Math.round(elapsed/msPerMonth)  + ' month ago';
          else
            return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';           
        }
            
    }

    else {
        if (short)
          return Math.round(elapsed/msPerYear ) + 'yr';
        else {
          checkOne = Math.round(elapsed/msPerYear) ;
          if (checkOne == 1)
            return Math.round(elapsed/msPerYear)  + ' year ago';
          else
            return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';           
        }
            
    }
  }  

}
