import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { QuestionsRepository } from '../repositories/questions-repository'
import { Question } from '../../enterprise/entities/question'

interface GetQuestionBySlugUseCaseRequest {
  slug: string
}
interface GetQuestionBySlugUseCaseResponse {
  question: Question | null
}

class GetQuestionBySlugUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    slug
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug)

    return {
      question,
    }
  }
}

export { GetQuestionBySlugUseCase }
