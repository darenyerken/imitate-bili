import { faker } from '@faker-js/faker'


export interface Video {
    key:number,
    text:string,
    name:string,
    image:string
}

export async function getIndexList(page:number = 0, offset:number= 20):Promise<Video[]> {
    const data:Video[] = Array.from({length:20},(_,key)=>{
        return {
            key: key+page*offset,
            text:faker.lorem.paragraph(1),
            name:faker.internet.displayName(),
            image:faker.image.urlLoremFlickr({
                category:'StarWars',
                width:640,
                height:480
            })
        }
    })

    return new Promise((resolve)=> {
        setTimeout(()=>{
            resolve(data)
        },500)
    })
}

export async function getMainList():Promise<Video[]> {
    const data:Video[] = Array.from({length:3},(_,key)=>{
        return {
            key: key,
            text:faker.lorem.paragraph(1),
            name:faker.internet.displayName(),
            image:faker.image.urlLoremFlickr({
                category:'cartoon',
                width:640,
                height:480
            })
        }
    })

    return new Promise((resolve)=> {
        setTimeout(()=>{
            resolve(data)
        },500)
    })
}