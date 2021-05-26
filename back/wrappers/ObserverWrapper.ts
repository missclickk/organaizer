export interface Observer{
    update(args:Array<any>):void
}




export   class ObservableWrapper{
    private observers:Array<Observer>;
    
    constructor(){
        this.observers=[];
    }
    
    registrObserver(observer:Observer):void{
        this.observers.push(observer);
    }
    delteObserver(observer:Observer):void{
        this.observers.splice(this.observers.indexOf(observer),1);
    }
 protected notifyObservers(args:Array<any>){

    this.observers.forEach((e,i)=>{
        console.log("is : "+i);
        e.update(args)});
    }
}