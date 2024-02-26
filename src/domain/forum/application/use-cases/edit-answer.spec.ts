import { InMemoryAnswersRepository } from 'test/repositories/in-memory-repositories/answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { EditAnswerUseCase } from './edit-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('edit answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to edit a answer', async () => {
    const answer = makeAnswer({
      authorId: new UniqueEntityId('author-1')
    })
    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      authorId: 'author-1',
      answerId: answer.id.toString(),
      content: 'conteudo teste',
    })
  
    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'conteudo teste'
    })
  })

  it('should not be able to edit a answer from another user', async () => {
    const answer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1')
      },
      new UniqueEntityId('answer-1')
    )
    await inMemoryAnswersRepository.create(answer)

    expect(() => {
      return sut.execute({
        authorId: 'author-2',
        answerId: 'answer-1',
        content: '',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})

