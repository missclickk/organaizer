const moment = require('moment')
const getNumberOfDays = (currentDate = moment()) => currentDate.add(1, "M").date(1).subtract(1, 'd').date();

const getValueUpToDate=date=>moment([date.year(), date.month(), date.date()]);

const firstDateAreGreater = (date, secDate) => moment(date).valueOf() > moment(secDate).valueOf();
const datesAreEqual = (date, secDate) => moment(date).valueOf() === moment(secDate).valueOf();


compareParts=(fVal,sVal,mark)=>{
    //mark=[less,more,equal,lEqual,mEqual,not] 
    switch(mark){
            case "less":
            return fVal<sVal;
            case "more":
            return fVal>sVal;
            case "equal":
                return fVal===sVal;
            case "lEqual":
            return fVal<=sVal;
            case "mEqual":
                return fVal>=sVal;
            case "not":
            return fVal!==sVal;
            default:
                return false;
        }
}


const compareDate=(date,secDate,mark,partOfDate=[''],logicOperator='')=>{
//mark=[less,more,equal,lEqual,mEqual,not]
//partOfDate=[year,month,date,weekday,hour,minute,second,full]
//date[partOfDate]()
    const fDate=moment(date);
    const sDate=moment(secDate);
    if(partOfDate[0]==='full')
      return  compareParts(fDate.valueOf(),sDate.valueOf(),mark[0]);


    const resultArr=partOfDate.map((e,i)=>compareParts(fDate[e](),sDate[e](),mark[i]));
    switch (logicOperator){
        case 'and':
         return  resultArr.reduce((a,b)=>a&&b ,true);
        case 'or':
            return  resultArr.reduce((a,b)=>a||b ,false);
        default:
            return resultArr;
    }
   
}


const getWeekRange = (date, type = null) => {
    const clone = moment(date);
    const clone1 = moment(date);
    const range = date.weekday() === 0 ? { first: clone1.add(-6, "days"), last: clone } : { first: clone1.subtract(clone1.weekday() - 1, "days"), last: clone.add(7 - clone.weekday(), "days") }
    return type===Number?{...range,first:range.first.date(),last:range.last.date()}:range;
}


module.exports = {compareDate,datesAreEqual, getWeekRange, getNumberOfDays, firstDateAreGreater,getValueUpToDate };


