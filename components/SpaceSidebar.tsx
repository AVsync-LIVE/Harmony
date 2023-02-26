import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { Groups } from 'components/Groups'
import { AspectRatio, Box, SpacesSidebar, generateUUID, Item, LineBreak, Dropdown, TextInput, Icon, Button, Gap } from '@avsync.live/formation'
import { useSpaces } from 'redux-tk/spaces/hook'
import { useRouter } from 'next/router'

interface Props {
  
}

export const SpaceSidebar = ({ }: Props) => {
  const router = useRouter()
  const { spacesInfo, addSpace, setActiveSpaceGuid, spaceGuids, activeSpace, removeSpace, activeSpaceGuid, addGroup, addGroupToSpace } = useSpaces()

  const [activeSpaceIndex, set_activeSpaceIndex] = useState(0)

  const [newSpaceName, set_newSpaceName] = useState(activeSpace?.name || '')


  useEffect(() => {
    if (spacesInfo.length > 0) {
      setActiveSpaceGuid(spaceGuids[activeSpaceIndex])
    }
  }, [activeSpaceIndex])

  const [newDescription, set_newDescription] = useState('')
  const [newGroupName, set_newGroupName] = useState('')

  useEffect(() => {
    if (activeSpace?.name) {
      set_newSpaceName(activeSpace.name)
    }
    if (activeSpace?.description) {
      set_newDescription(activeSpace.description)
    }
  }, [activeSpace?.name]) 

  return (<S.GroupsSidebar>
    <SpacesSidebar 
      activeSpaceIndex={activeSpaceIndex}
      onClickIndex={(index : number) => set_activeSpaceIndex(index)}
      spaces={[
        ...spacesInfo.map(space => (
          {
            name: space.name,
            src: space.previewSrc
          }
        )),
        {
          icon: 'plus',
          iconPrefix: 'fas',
          href: '/spaces/add'
        }
      ]}
    />
    <Box wrap width='100%'>
      {
        activeSpace?.previewSrc &&
          <AspectRatio
            ratio={2}
            backgroundSrc={activeSpace.previewSrc}
            coverBackground
          />
      }
        {
          activeSpace?.name
            ? <>
            <Item
                pageTitle={activeSpace?.name}
              >
                <Dropdown
                  icon='plus'
                  iconPrefix='fas'
                  minimal
                  circle
                  items={[
                    {
                      children: <div onClick={e => e.stopPropagation()}>
                      <Box minWidth={13.5} py={.25}>  
                        <TextInput
                          value={newGroupName}
                          onChange={newValue => set_newGroupName(newValue)}
                          iconPrefix='fas'
                          compact
                          autoFocus
                          canClear={newGroupName !== ''}
                          placeholder='New Group name'
                          buttons={[
                            {
                              icon: 'plus',
                              iconPrefix: 'fas',
                              minimal: true,
                              onClick: () => {
                                set_newGroupName('')
                                if (activeSpace?.guid) {
                                  const guid = generateUUID()
                                  addGroup({
                                    guid,
                                    group: {
                                      guid,
                                      name: newGroupName,
                                      channelGuids: []
                                    }
                                  })
                                  addGroupToSpace({
                                    spaceGuid: activeSpace.guid,
                                    groupGuid: guid
                                  })
                                }
                              }
                            }
                          ]}
                        />
                        </Box>
                      </div>
                    },
                  ]}
                />
                <Dropdown
                  icon='ellipsis-vertical'
                  iconPrefix='fas'
                  minimal
                  circle
                  items={[
                    {
                      text: 'Edit',
                      icon: 'edit',
                      iconPrefix: 'fas',
                      href: '/spaces/edit'
                    },
                    {
                      text: 'Delete',
                      icon: 'trash-alt',
                      iconPrefix: 'fas',
                      onClick: () => {
                        if (activeSpaceGuid) {
                          removeSpace(activeSpaceGuid)
                          router.push('/spaces')
                        }
      
                      }
                    }
                  ]}
                />
              </Item>
              <LineBreak />
              </>
            : <Box py={.75}>
                <Gap gap={.75}>
               
                <Item
                  title='Create a Space'
                  subtitle='Spaces organize your work into groups of channels.'
                />
                <Item
                  text='Templates'
                  subtitle='Choose from Templates like Business, Personal, Event, and more.'
                />
                 <Item
                  text="Let's Work Together"
                  subtitle='Hi, my name is Lexi. I can help you with any project. Think of me as your virtual coworker.'
                />
                </Gap>
              </Box>
        }
        
        
      
      <Groups />
    </Box>
  </S.GroupsSidebar>)
}

const S = {
  GroupsSidebar: styled.div`
    display: flex;
    height: calc(100% - var(--F_Header_Height));
    align-items: flex-start;
  `
}