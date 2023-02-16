import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService){}

    select = {
        id: true,
        email: true,
        username: true,
        todos: true,
        tags: true,
        createdAt: true,
        updatedAt: true
    }
 
    // GET ALL USERS IN DB
    async getAllUsers(){
        try {
            const users = await this.prisma.user.findMany({
                select: this.select
            })
            
            users.forEach(user => {
                user['todos'] = user['todos'].length as any
                user['tags'] = user['tags'].length as any
            });
            

            return users
        } catch (error) {
            console.log(error.message)
            throw new HttpException('An error occured', HttpStatus.INTERNAL_SERVER_ERROR, {cause: new Error(error.message)})
        }
    }

    // GET A SINGLE USER DETAIL
    async getUser(id:number, userId:number, res){
        if(id != userId) return res.status(401).json({message: "Unauthorized"})
        
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    id: id
                },
                select: this.select
            })

            // if(!user) return res.status(400).json({message: "User does not exist"})

            return res.status(200).json({user})
        } catch (error) {
            console.log(error.message)
            throw new HttpException('An error occured', HttpStatus.INTERNAL_SERVER_ERROR, {cause: new Error(error.message)})
        }
    }

    // DELETE A USER DATA
    async deleteMe(id:number, userId:number, res){
        if(id != userId) return res.status(401).json({message: "Unauthorized"})
        
        try {
            await this.prisma.user.delete({
                where: {
                    id: id
                }
            })

            return res.status(204).json()
        } catch (error) {
            console.log(error.message)
            throw new HttpException('An error occured', HttpStatus.INTERNAL_SERVER_ERROR, {cause: new Error(error.message)})
        }
    }
}