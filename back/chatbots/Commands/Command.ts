export interface Command{
  execute():void|Command|Function|Promise<void|Command|Function>
}
