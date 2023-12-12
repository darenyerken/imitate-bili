import { faker } from '@faker-js/faker'


export interface Comments {
    key:number
    author:string
    content:string
    position?:number
}

export async function getCommentList():Promise<Comments[]> {
    const data:Comments[] = Array.from({length:10000},(_,key)=>{
        return {
            key: key,
            author:faker.person.firstName(),
            content:faker.lorem.paragraph(1),
        }
    })

    return new Promise((resolve)=> {
        setTimeout(()=>{
            resolve(data)
        },200)
    })
}