import { Slug } from './value-objects/slug'
import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface QuestionProps {
  slug: Slug
  authorId: UniqueEntityId
  title: string
  content: string
  bestAnswerId?: UniqueEntityId
  createdAt: Date
  updatedAt?: Date
}

class Question extends Entity<QuestionProps> {
  get slug() {
    return this.props.slug
  }

  get authorId() {
    return this.props.authorId
  }

  get title() {
    return this.props.title
  }

  get content() {
    return this.props.content
  }

  get bestAnswerId() {
    return this.props.bestAnswerId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get excerpt() {
    return this.content.substring(0, 120).trim().concat('...')
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set content(value: string) {
    this.props.content = value
    this.touch()
  }

  set bestAnswerId(value: UniqueEntityId | undefined) {
    this.props.bestAnswerId = value
    this.touch()
  }

  set title(value: string) {
    this.props.title = value
    this.props.slug = Slug.createFromText(value)
    this.touch()
  }

  static create(
    props: Optional<QuestionProps, 'createdAt' | 'slug'>,
    id?: UniqueEntityId,
  ) {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return question
  }
}

export { Question }
