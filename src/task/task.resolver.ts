import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Task } from './task.model';
import { TaskService } from './task.service';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { Int } from '@nestjs/graphql';
import { CurrentUserType } from '../types/user';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Task])
  tasks(@CurrentUser() user: CurrentUserType) {
    return this.taskService.findAll(user.userId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Task)
  createTask(
    @CurrentUser() user: CurrentUserType,
    @Args('title') title: string,
    @Args('description', { nullable: true }) description?: string,
    @Args('status', { nullable: true }) status?: string,
  ) {
    console.log('WIP', user);
    return this.taskService.create({
      title,
      description,
      status,

      userId: user.userId,
    });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Task)
  updateTask(
    @CurrentUser() user: CurrentUserType,
    @Args('id', { type: () => Int }) id: number,
    @Args('title', { nullable: true }) title?: string,
    @Args('description', { nullable: true }) description?: string,
    @Args('status', { nullable: true }) status?: string,
  ) {
    return this.taskService.update(
      id,
      { title, description, status },
      { userId: user.userId },
    );
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Task)
  deleteTask(
    @CurrentUser() user: CurrentUserType,
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.taskService.delete(id, user.userId);
  }
}
