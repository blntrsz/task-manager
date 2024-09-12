import type { TaskRepository } from "../domain/task.repository.js"

type Dependencies = {
  taskRepository: TaskRepository
}

type Props = {
  id: string
}

export class FindOneTaskUseCase {
  constructor(private readonly deps: Dependencies) { }

  execute(props: Props) {
    return this.deps.taskRepository.findOne(props.id)
  }
}
