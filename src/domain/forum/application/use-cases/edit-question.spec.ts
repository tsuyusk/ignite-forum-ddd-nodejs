import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-repositories/questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { EditQuestionUseCase } from './edit-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('edit question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question', async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityId('author-1')
    })
    await inMemoryQuestionsRepository.create(question)

    await sut.execute({
      authorId: 'author-1',
      questionId: question.id.toString(),
      content: 'conteudo teste',
      title: 'pergunta teste',
    })
  
    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'pergunta teste',
      content: 'conteudo teste'
    })
  })

  it('should not be able to edit a question from another user', async () => {
    const question = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1')
      },
      new UniqueEntityId('question-1')
    )
    await inMemoryQuestionsRepository.create(question)

    const result = await sut.execute({
      authorId: 'author-2',
      questionId: 'question-1',
      content: '',
      title: ''
    })

    expect(result.isLeft()).toBe(true)
  })
})

