import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";

class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []
  async findBySlug(slug: string): Promise<Question | null> {
    return this.items.find(q => q.slug.value == slug) ?? null
  }
  async create(question: Question): Promise<void> {
    this.items.push(question)
  }
  async findById(id: string): Promise<Question | null> {
    return this.items.find(q => q.id.toString() === id) ?? null
  }
  async delete(question: Question): Promise<void> {
    const itemIndex = this.items.findIndex(q => q.id === question.id)

    this.items.splice(itemIndex, 1)
  }
  async save(question: Question): Promise<void> {
    const itemIndex = this.items.findIndex(q => q.id === question.id)

    this.items[itemIndex] = question
  }

  async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
    return this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page-1)*20, page*20)
  }
}

export { InMemoryQuestionsRepository }
