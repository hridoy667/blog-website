import { PrismaService } from './../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(createPostDto: CreatePostDto) {
    const post = await this.prismaService.post.create({
      data: {
        title: createPostDto.title,
        body: createPostDto.body,
        author: {
          connect: { id: createPostDto.authorId }, 
        },
      },
      include: {
        author: true,
      },
    });
    return post;
  }


  async findAll() {
    const posts = await this.prismaService.post.findMany({
    include: { author: true, comments: true }, 
  });
    return { success: true, data: posts };
  }

  async findOne(id: string) {
    const post = await this.prismaService.post.findUnique({ where: { id }, include: { author: true, comments: true } });
    return { success: true, data: post };
  }
  

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
