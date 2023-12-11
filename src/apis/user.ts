import { faker } from '@faker-js/faker'
import SparkMd5 from 'spark-md5'
import type { LoginData, LoginRes} from '@/types/user'

export function userLogin(loginData:LoginData):Promise<LoginRes> {
    return new Promise((resolve)=> {
        if(loginData.email === 'xxx@qq.com' && SparkMd5.hash('xxx') === loginData.passwd) {
            setTimeout(()=> {
                resolve({
                    token:faker.person.jobDescriptor(),
                    userInfo:{
                        name:faker.person.firstName()
                    }
                })
            },1000)
        }
    })
}