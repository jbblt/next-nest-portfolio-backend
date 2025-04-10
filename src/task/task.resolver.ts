import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Task } from './task.model';
import { TaskService } from './task.service';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Mutation(() => Task)
  createTask(
    @Args('title') title: string,
    @Args('description', { nullable: true }) description?: string,
    @Args('status', { nullable: true }) status?: string,
  ) {
    return this.taskService.create({ title, description, status });
  }

  @Query(() => [Task])
  tasks() {
    return this.taskService.findAll();
  }
  @Mutation(() => Task)
  updateTask(
      @Args('id') id: number,
      @Args('title', { nullable: true }) title?: string,
      @Args('description', { nullable: true }) description?: string,
      @Args('status', { nullable: true }) status?: string,
  ) {
    return this.taskService.update(id, { title, description, status });
  }

  @Mutation(() => Task)
  deleteTask(@Args('id') id: number) {
    return this.taskService.delete(id);
  }

}
