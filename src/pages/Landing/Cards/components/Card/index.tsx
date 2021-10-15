import styled from '@emotion/styled'
import { useHistory } from 'react-router'

import { CardFigure } from './CardFigure'
import { CardImg } from './CardImg'
import { CardInfo } from './CardInfo'
import { CardLink } from './CardLink'

const CardStyle = styled.li`
  margin: 0 1rem;
  border-radius: 10px;
  width: 300px;
  margin-bottom: 2rem;
  list-style: none;
`

interface CardProps {
  path: string
  text: string
  img: string
  label: string
}

export function Card({ path, text, img, label }: CardProps) {
  const history = useHistory()

  return (
    <CardStyle>
      <CardLink onClick={() => history.push(path)}>
        <CardFigure data-category={label}>
          <CardImg src={img}></CardImg>
        </CardFigure>
        <CardInfo>{text}</CardInfo>
      </CardLink>
    </CardStyle>
  )
}
