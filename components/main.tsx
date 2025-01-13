import type { PlasmoCSConfig } from "plasmo";
import React, { useEffect, useState } from "react"
import { Box, Container, Group, Space, Text, } from '@mantine/core';

import LearnMore from "./about/LearnMore";
import BarChartAddedYearPlot from "./data/BarChartAddedYearPlot";
import PieChartFreqPlot from "./data/PieChartFreqPlot";
import FreqDataTable from "./data/FreqDataTable";
import CenterLoading from "./common/CenterLoading";
import toast from "react-hot-toast";

export const config: PlasmoCSConfig = {
    matches: ["<all_urls>"],
    world: "MAIN",
};

export interface WebLink {
    id: string
    folderId: string
    title: string
    url: string
    dateAdded: Date
    dateLastUsed: Date | null
}

export interface WebSummary {
    domain: string
    urlList: WebLink[]
}

export function Main() {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [webSummaryList, setWebSummaryList] = useState<WebSummary[]>([]);

    if (typeof window === 'undefined') {
        return (<></>)
    }

    function webMapFreqSortForTable(webLinkArray: WebLink[]): WebSummary[] {

        const webMap = new Map();

        for (const v of webLinkArray) {
            const domain = new URL(v.url);

            webMap.set(
                domain.hostname,
                !webMap.has(domain.hostname)
                    ? [v]
                    : [...webMap.get(domain.hostname), v]
            )
        }

        return Array.from(webMap)
            .sort((a, b) => b[1].length - a[1].length)
            .map((v) => ({
                domain: v[0],
                urlList: v[1],
            }));

    }

    function flattenTree(tree: chrome.bookmarks.BookmarkTreeNode[]) {
        const finalList = [];

        function recrusiveNavTree(item: chrome.bookmarks.BookmarkTreeNode[]) {
            for (let i = 0; i < item.length; i++) {
                const currentItem = item[i];

                if (currentItem.children) {
                    recrusiveNavTree(currentItem.children);
                }
                else {

                    finalList.push({
                        id: currentItem.id,
                        folderId: currentItem.parentId,
                        title: currentItem.title,
                        url: currentItem.url,
                        dateAdded: new Date(currentItem.dateAdded),
                        dateLastUsed: (currentItem as any).dateLastUsed ? new Date((currentItem as any).dateLastUsed) : null
                    })
                }
            }
        }

        recrusiveNavTree(tree);
        setWebSummaryList(
            webMapFreqSortForTable(finalList)
        );
        setIsLoading(false);
    }

    useEffect(() => {
        chrome.bookmarks.getTree((tree) => {
            flattenTree(tree);
        })

        chrome.bookmarks.onRemoved.addListener(() => {
            toast.success("Bookmark delete detected, updating summary")
            chrome.bookmarks.getTree((tree) => {
                flattenTree(tree);
            })
        })

        chrome.bookmarks.onChanged.addListener(() => {
            toast.success("Bookmark update detected, updating summary")
            chrome.bookmarks.getTree((tree) => {
                flattenTree(tree);
            })
        })
    }, [chrome])

    return (
        <Box style={{ padding: 8 }}>
            <Container mt={4}>
                <Text ta="center" fw={300} fz={22}>
                    🔖 Bookmarks Analysis
                </Text>

                <Text ta="center" mb={2} fw={300} fz={12} c="dimmed">
                    Your Bookmarks Analysis
                </Text>

                {isLoading && (<CenterLoading />)}

                {webSummaryList.length <= 0 && (
                    <Text c="dimmed" ta="center" fz="md" mt={32}>
                        You have no bookmarks :(
                    </Text>
                )}

                {webSummaryList.length >= 1 && (
                    <>
                        <PieChartFreqPlot data={webSummaryList} />
                        <BarChartAddedYearPlot data={webSummaryList} />
                        <Space h="lg" />
                        <FreqDataTable data={webSummaryList} />
                    </>
                )}

                <Group mt={6}>
                    <LearnMore />
                </Group>
            </Container>
        </Box>
    )
}
