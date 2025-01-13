import { useWindowScroll } from '@mantine/hooks';
import { Affix, Transition, Box, ActionIcon, Tooltip } from '@mantine/core';
import { IconArrowUp } from '@tabler/icons-react';

function ScrolltoTopComp() {
    const [scroll, scrollTo] = useWindowScroll();

    return (
        <>
            <Affix position={{ bottom: 20, right: 20 }}>
                <Transition transition="slide-up" mounted={scroll.y > 100}>
                    {(transitionStyles) => (
                        <Box style={transitionStyles}>
                            <Tooltip label="Scroll to top">
                                <ActionIcon size="md" onClick={() => scrollTo({ y: 0 })} variant="light">
                                    <IconArrowUp size="1rem" />
                                </ActionIcon>
                            </Tooltip>
                        </Box>
                    )}
                </Transition>
            </Affix>
        </>
    );
}

export default ScrolltoTopComp