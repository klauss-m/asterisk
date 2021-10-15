/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content*/

import { Card, CardHolder, CardList, Heading } from './components'
import { randomCardGenerator } from '../../../utils'

export default function Cards() {
  const NUMBER_OF_CARDS = 10
  const cards = []
  for (let index = 0; index < NUMBER_OF_CARDS; index += 1) {
    cards.push(randomCardGenerator())
  }

  return (
    <>
      <a id='landing-cards' />
      <CardHolder>
        <Heading>SUA RENDA, SUA VIDA</Heading>
        <CardList>
          {cards.map((card, index) => (
            <Card key={index} img={card.img} label={card.label} text={card.info} path={card.path} />
          ))}
        </CardList>
      </CardHolder>
    </>
  )
}
