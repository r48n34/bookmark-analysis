import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';

import { MantineProvider } from "@mantine/core"
import { ModalsProvider } from '@mantine/modals';

import ScrolltoTopComp from './components/common/ScrolltoTopComp';
import { Toaster } from 'react-hot-toast';
import { Main } from './components/main';

function IndexSidePanel() {
    return (
        <MantineProvider
            defaultColorScheme="dark"
        >
            <Toaster  position="top-right"/>
            <ModalsProvider>
                <ScrolltoTopComp />
                <Main />
            </ModalsProvider>
        </MantineProvider>
    )
}

export default IndexSidePanel
