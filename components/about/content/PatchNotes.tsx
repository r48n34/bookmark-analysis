import { Text, Divider } from "@mantine/core";
import { IconClipboard } from "@tabler/icons-react";
import Markdown from 'markdown-to-jsx'

const contentOne = `

## v0.0.1

### Features
- Init Projects.

_Release date: 10/01/2025_

`

function PatchNotes() {
    return (
        <>
            <Text fz={32} fw={600} ta="left" mb={8}>
                <IconClipboard /> Patch Notes
            </Text>

            <Divider my="md" />

            <Markdown>
                {contentOne}
            </Markdown>
        </>
    )
}

export default PatchNotes
