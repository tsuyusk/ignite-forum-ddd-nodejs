import { faker } from '@faker-js/faker'

import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Question, QuestionProps } from "@/domain/forum/enterprise/entities/question";

function makeQuestion(override: Partial<QuestionProps> = {}, id?: UniqueEntityId) {
  const newQuestion = Question.create({
    title: faker.lorem.sentence(),
    authorId: new UniqueEntityId(),
    content: faker.lorem.text(),
    ...override,
  }, id)
  return newQuestion;
}

export { makeQuestion }
