import { Button, TextInput, generateUUID, Gap, AspectRatio, Box, Item, RichTextEditor, ItemProps } from '@avsync.live/formation';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useSpaces_activeSpace, useSpaces_updateSpace } from 'redux-tk/spaces/hook';

interface Channel {
  name: string;
  description: string;
}

interface Group {
  name: string;
  description: string;
  channels: Channel[];
}

interface Suggested {
  groups: Group[];
}

export interface ExpandableListProps {
  value: {
    item: ItemProps;
    list: ItemProps[];
  };
  expanded?: boolean;
  onExpand?: (newExpanded: boolean) => void;
  onReorder?: (newList: ItemProps[]) => void;
  reorderId: string;
}

interface Props {}

export const EditSpace = React.memo(({}: Props) => {
  const router = useRouter();

  const updateSpace = useSpaces_updateSpace()
  const activeSpace = useSpaces_activeSpace()

  const [name, set_name] = useState(activeSpace?.name || '');
  const [description, set_description] = useState(activeSpace?.description || '');
  const [prompt, set_prompt] = useState(decodeURI(activeSpace?.previewSrc?.match(/[^/]*$/)?.[0] ?? ""));
  const [url, set_url] = useState<string | undefined>(activeSpace?.previewSrc);
  
  return (
    <Box wrap>
      <Box my={0.25} width='100%'>
        <Item icon='chevron-left' pageTitle='Edit space' href={`/spaces/${activeSpace?.guid}`} />
      </Box>
      <Box px={0.75} wrap>
        <Gap gap={0.75}>
          {url && (
            <AspectRatio ratio={2} backgroundSrc={url} coverBackground borderRadius={.75} />
          )}
         
          <TextInput
            label='Name'
            value={name}
            onChange={(newValue) => set_name(newValue)}
            autoFocus
          />
          <TextInput
            label='Poster prompt'
            value={prompt}
            canClear={!!prompt}
            onChange={(newValue) => set_prompt(newValue)}
            buttons={[
              {
                icon: 'lightbulb',
                iconPrefix: 'fas',
                secondary: true,
                circle: true,
                minimal: true,
                disabled: prompt === '',
                blink: !!prompt && !url,
                onClick: () => set_url(`/image/prompt/${encodeURIComponent(prompt)}`),
              },
            ]}
          />
          <RichTextEditor
            placeholder='Description'
            value={description}
            onChange={(newValue) => set_description(newValue)}
          >
           
          </RichTextEditor>
         
          <Button
            hero
            expand
            primary={name !== ''}
            disabled={name === ''}
            onClick={() => {
              if (name && activeSpace?.guid) {
                updateSpace({
                  guid: activeSpace.guid,
                  space: {
                    guid: activeSpace.guid,
                    groupGuids: activeSpace.groupGuids,
                    name,
                    previewSrc: url,
                    description,
                  },
                });
                setTimeout(() => {
                  router.push(`/spaces/${activeSpace.guid}`);
                }, 1);
              }
            }}
            text='Save'
            icon='save'
            iconPrefix='fas'
          />
          <Box height={4} width='100%' />
        </Gap>
      </Box>
    </Box>
  );
});