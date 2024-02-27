import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-repositories/questions-repository'
import { CreateQuestionUseCase } from './create-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('create question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to create a question', async () => {
    const result = await sut.execute({
      content: 'Nova resposta',
      title: 'Nova pergunta',
      authorId: '1',
    })
  
    expect(result.isRight()).toBe(true)
  })
})

