const moment=require('moment')
 const getNumberOfDays = (currentDate = moment()) =>currentDate.add(1,"M").date(1).subtract(1,'d').date();


const getNextDate=(date,num,type)=>{
    return date.add(num,type);
}

const getPrevDate=(date,num,type)=>{
    return date.subtract(num,type);
}
const firstDateAreGreater = (date, secDate) =>moment([date.year(),date.month(),date.date()]).valueOf()>moment([secDate.year(),secDate.month(),secDate.date()]).valueOf();

 const changeMonthWithFlag = (flag, date) => {
    return    flag === "next" ?getNextDate(date,1,'M').date(1) : getPrevDate(date,1,'M').date(1);
}
 const changeWeekWithFlag = (flag, date) => {
    return    flag === "next" ? getNextDate(date,7,'d') : getPrevDate(date,7,'d');
}

 const getWeekRange=(date,type=null)=>{
    const clone=moment(date);
    const clone1=moment(date);
            if(date.weekday()===0){
                return type===Number?{
                    first: clone1.add(-6, "days").date(),
                    last: clone.date()
                }:
                {
                    first: clone1.add(-6, "days"),
                    last: clone
                }
            }
            return type===Number?{
                first: clone1.subtract(clone1.weekday() - 1, "days").date(),
                last: clone.add(7 - clone.weekday(), "days").date()
            }:
            {
                first: clone1.subtract(clone1.weekday() - 1, "days"),
                last: clone.add(7 - clone.weekday(), "days")
            }

}
module.exports={getWeekRange,changeWeekWithFlag,changeMonthWithFlag,getNumberOfDays,firstDateAreGreater };
/*   if(flag==='next'){
        console.log(date.format());
    return  mode === "CALENDAR" ? date.add(1, "M") : date.add(7, "d");}
    return  mode === "CALENDAR" ? date.subtract(1, "M") : date.subtract(7, "d");*/ 