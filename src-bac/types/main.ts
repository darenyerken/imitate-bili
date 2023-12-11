type Course = {
    name:string,
    price:number,
    isOnline:boolean,
    students:string[],
    discrip?:string   // 可选属性
}

export type {Course}