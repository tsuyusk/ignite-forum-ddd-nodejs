import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = []
  async create(answer: Answer): Promise<void> {
    this.items.push(answer)
  }
  async findById(id: string): Promise<Answer | null> {
    return this.items.find(q => q.id.toString() === id) ?? null
  }
  async delete(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex(q => q.id === answer.id)

    this.items.splice(itemIndex, 1)
  }
  async save(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex(q => q.id === answer.id)

    this.items[itemIndex] = answer
  }
  
  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const answers = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return answers
  }

}

export { InMemoryAnswersRepository }
