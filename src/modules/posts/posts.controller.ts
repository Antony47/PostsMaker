import {PostService} from "./post.service";
import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from "@nestjs/common";
import {CreatePostDto} from "./dto/create-post.dto";
import {GetManyPostsQueryDto} from "./dto/get-many-posts-query.dto";
import {UpdatePostDto} from "./dto/update-post.dto";


@Controller('posts')
export class PostsController {

    constructor(private readonly postService: PostService) {}

    @Post()
    create(@Body() dto: CreatePostDto){
        return this.postService.create(dto)
    }

    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id:number){
        return this.postService.getOne(id);
    }

    @Get()
    getMany(@Query() query: GetManyPostsQueryDto){//query
        return this.postService.getMany(query.offset, query.limit, query.search);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePostDto){//-param
        return this.postService.update(id, dto)
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number){///-param
        return this.postService.delete(id)
    }
}

