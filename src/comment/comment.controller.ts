import { Body, Param, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import { BasePath } from 'src/decorators/base-path.decorator';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto';

@BasePath('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService){}

    @Post('todo/:id')
    createComment(@Body() dto: CreateCommentDto, @Param('id', ParseIntPipe) id:number, @Request() req){
        return this.commentService.createComment(id, dto.text, req.user.email)
    }
}
