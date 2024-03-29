import React from 'react'
import * as Types from './types'
import { Box, Gap, Item, LineBreak } from '@avsync.live/formation'

interface Props {
  peopleAlsoAsk: Types.PeopleAlsoAsk,
  onSearch: (searchTerm: string) => void
}

export const PeopleAlsoAsk = ({ peopleAlsoAsk, onSearch }: Props) => {
  return (<Box width='100%' py={.5} wrap>
    <Gap gap={.25}>
      {
        peopleAlsoAsk.map(question => 
          <Item
            subtitle={question}
            icon='search'
            iconPrefix='fas'
            onClick={() => onSearch(question)}
          />
        )
      }
    </Gap>
  </Box>)
}