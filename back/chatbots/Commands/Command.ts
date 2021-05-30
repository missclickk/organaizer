export interface Command{
  execute():void|{wrapper:Function,commandType:string}|Promise<void|{wrapper:Function,commandType:string}>
}
