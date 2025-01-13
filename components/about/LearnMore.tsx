import { useDisclosure } from '@mantine/hooks';
import { Modal, ActionIcon, Tooltip, Group, Text } from '@mantine/core';
import { IconNotebook } from '@tabler/icons-react';
import LearnMoreContent from './LearnMoreContent';

function LearnMore() {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal opened={opened} onClose={close} title="📝 Learn More" size="85%"
                removeScrollProps={{
                    allowPinchZoom: true, // Allow pinch to zoom on mobile devices
                }}
            >
                <LearnMoreContent />
            </Modal>

            <Group justify="space-between">
                <Text c="dimmed" fz={8}>
                    Version: 0.0.1
                </Text>

                <Tooltip label="Learn More">
                    <ActionIcon variant="light" aria-label="Learn More" onClick={open} size={16}>
                        <IconNotebook style={{ width: '85%', height: '85%' }} stroke={1.5} />
                    </ActionIcon>
                </Tooltip>
            </Group>
        </>
    );
}

export default LearnMore
