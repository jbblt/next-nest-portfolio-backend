import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Task } from "./task.model";
import { TaskService } from "./task.service";
import {GqlAuthGuard} from "../auth/gql-auth.guard";
import {CurrentUser} from "../auth/current-user.decorator";

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Task])
  tasks(@CurrentUser() user: any) {
    return this.taskService.findAll(user.userId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Task)
  createTask(
      @CurrentUser() user: any,
      @Args("title") title: string,
      @Args("description", { nullable: true }) description?: string,
      @Args("status", { nullable: true }) status?: string,
  ) {
    return this.taskService.create({ title, description, status,userId:  user.userId});
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Task)
  updateTask(
      @CurrentUser() user: any,
      @Args("id") id: number,
      @Args("title", { nullable: true }) title?: string,
      @Args("description", { nullable: true }) description?: string,
      @Args("status", { nullable: true }) status?: string,
  ) {
    return this.taskService.update(id, { title, description, status }, user.userId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Task)
  deleteTask(
      @CurrentUser() user: any,
      @Args("id") id: number,
  ) {
    return this.taskService.delete(id, user.userId);
  }
}
