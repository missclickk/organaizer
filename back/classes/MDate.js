const moment = require("moment");

class MDate {
    #date;
    constructor(date) {
         this.#date=moment(date);
    }
    
    get NumberOfDays() {
        return this.#date.add(1, "M").date(1).subtract(1, 'd').date();
    }
    compareDate = (mdate, mark, partOfDate = [''], logicOperator = '') => {
        //mark=[less,more,equal,lEqual,mEqual,not]
        //partOfDate=[year,month,date,weekday,hour,minute,second,full]
        //date[partOfDate]()
      
      const  date = moment(mdate);
        if (partOfDate[0] === 'full')
            return this.#compareParts(this.#date.valueOf(), date.valueOf(), mark[0]);


        const resultArr = partOfDate.map((e, i) => this.#compareParts(this.#date[e](), date[e](), mark[i]));
        switch (logicOperator) {
            case 'and':
                return resultArr.reduce((a, b) => a && b, true);
            case 'or':
                return resultArr.reduce((a, b) => a || b, false);
            default:
                return resultArr;
        }

    }
    getWeekRange = (returnVal=null) => {
        const date=this.#date;
        const clone = moment(date);
        const clone1 = moment(date);
        const range = date.weekday() === 0 ? { first: clone1.add(-6, "days"), last: clone } : { first: clone1.subtract(clone1.weekday() - 1, "days"), last: clone.add(7 - clone.weekday(), "days") }
        return returnVal === Number ? { ...range, first: range.first.date(), last: range.last.date() } : range;
    }
    #compareParts = (fVal, sVal, mark) => {
        //mark=[less,more,equal,lEqual,mEqual,not] 
        switch (mark) {
            case "less":
                return fVal < sVal;
            case "more":
                return fVal > sVal;
            case "equal":
                return fVal === sVal;
            case "lEqual":
                return fVal <= sVal;
            case "mEqual":
                return fVal >= sVal;
            case "not":
                return fVal !== sVal;
            default:
                return false;
        }
    }
    static #getMinVal = function (dateParam) {
        switch (dateParam) {
            case 'date':
                return 1;
            default:
                return 0;
        }
    }
    static getMDateWithMinVal(date, params = []) {
        params.forEach(e => date[e]((this.#getMinVal(e))));
        return new MDate(date);
    }
}
/*
const test2 = new MDate(moment().format());
const test=moment().date(11).year(2020).month(1);

console.log(test2.compareDate(test,['mEqual'],['full'],'and'));
*/



module.exports={MDate};





