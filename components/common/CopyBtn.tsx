import { CopyButton, ActionIcon, Tooltip, rem } from '@mantine/core';
import { IconCopy, IconCheck } from '@tabler/icons-react';

type CopyBtnProps = {
    value: string | number;
    showFullText?: boolean;
}

function CopyBtn({ value, showFullText = false }: CopyBtnProps) {

    return (
        <CopyButton value={value+""} timeout={2500}>
            {({ copied, copy }) => (
                <Tooltip 
                label={
                    copied 
                    ? 'Copied'
                    : showFullText
                    ?  `Copy ${value}`
                    : `Copy value`
                } 
                withArrow
                position="right"
                >
                    <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy} >
                        {copied ? (
                            <IconCheck style={{ width: rem(16) }} />
                        ) : (
                            <IconCopy style={{ width: rem(16) }} />
                        )}
                    </ActionIcon>
                </Tooltip>
            )}
        </CopyButton>
    )
}

export default CopyBtn
