import clsx from 'clsx'
import React from 'react'
import { BoardMinimalView } from 'generated/views'
import { getSelectorHash } from 'utils/selectorHash'
import './CardBoard.scoped.css'

type Props = {
  board: BoardMinimalView
  className?: string
}

const CardBoard: React.FC<Props> = (props) => {
  const { board, className } = props
  return (
    <div
      className={clsx({ card: true, [className ?? '']: true })}
      {...getSelectorHash(props)}
    >
      <header className="card-header">
        <p className="card-header-title">{board.name}</p>
      </header>
    </div>
  )
}

export default CardBoard
