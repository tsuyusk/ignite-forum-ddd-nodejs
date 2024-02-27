import { InMemoryAnswersRepository } from 'test/repositories/in-memory-repositories/answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

let inMemoryAnswersRepositorypository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('answer question', () => {
  beforeEach(() => {
    inMemoryAnswersRepositorypository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepositorypository)
  })

  it('should be able to answer a question', async () => {
    const result = await sut.execute({
      content: 'Nova resposta',
      questionId: '1',
      instructorId: '1',
    })
  
    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswersRepositorypository.items[0].id).toEqual(result.value?.answer.id)
  })
})
