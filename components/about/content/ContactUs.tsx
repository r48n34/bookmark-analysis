import { Text, Divider } from "@mantine/core";
import { IconMail } from "@tabler/icons-react";
import Markdown from 'markdown-to-jsx'

const contentOne = `
If you experience any further issues reemo github.
`

function ContactUs() {
    return (
        <>
            <Text fz={32} fw={600} ta="left" mb={8}>
                <IconMail /> Contact Us
            </Text>

            <Divider my="md" />

            <Markdown>
                {contentOne}
            </Markdown>
        </>
    )
}

export default ContactUs
