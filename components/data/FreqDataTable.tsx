import { Badge, Text, Anchor, Group, Image, Tooltip, Box, TextInput } from "@mantine/core";
import type { WebLink, WebSummary } from "../main";
import DataTable, { type ExpanderComponentProps, type TableColumn } from "react-data-table-component";
// import Moment from "react-moment";
import CopyBtn from "../common/CopyBtn";

import dayjs from "dayjs"
import DeleteBookmarkBtn from "./helper/DeleteBookmarkBtn";
import OpenThisBkFolder from "./helper/OpenThisBkFolder";
import { useMemo, useState } from "react";
import { IconSearch } from "@tabler/icons-react";

type FreqDataTableProps = {
    data: WebSummary[];
}

function FreqDataTable({ data }: FreqDataTableProps) {

    const ExpandedComponent: React.FC<ExpanderComponentProps<WebSummary>> = ({ data }) => {

        const [filterText, setFilterText] = useState<string>('');
        const filteredItems = data.urlList.filter((item: WebLink) => {
            return (item.title).toLowerCase().includes(filterText.toLowerCase())
        });

        const subHeaderComponentMemo = useMemo(() => {
            return (
                <Group>
                    <TextInput
                        placeholder="Search"
                        label="Search By Title"
                        leftSection={<IconSearch />}
                        onChange={e => setFilterText(e.currentTarget.value)}
                        value={filterText}
                    />
                </Group>
            )
        }, [filterText]);

        const columns: TableColumn<WebLink>[] = [
            {
                name: '',
                selector: (row: WebLink) => (
                    <CopyBtn value={row.url} showFullText={true} />
                ) as any,
                minWidth: "60px",
                maxWidth: "60px"
            },
            {
                name: 'Title',
                selector: (row: WebLink) => <Box mb={2}>
                    <Tooltip label={row.title && row.title !== "" ? row.title : "No Title"}>
                        <Anchor href={row.url} target="_blank" rel="noreferrer">
                            <Text mt={4} fz="sm" truncate="end">
                                {row.title && row.title !== "" ? row.title : "No Title"}
                            </Text>
                        </Anchor>
                    </Tooltip>

                    <Tooltip label={"Created At"}>
                        <Text fz="xs" c="dimmed">
                            Created At: {dayjs(row.dateAdded).format("YYYY/MM/DD")}
                        </Text>
                    </Tooltip>
                </Box> as any,
                sortable: true,
                maxWidth: "14rem"
            },
            {
                name: 'Action',
                selector: (row: WebLink) =>
                    <Group>
                        <OpenThisBkFolder folderId={row.folderId} />
                        <DeleteBookmarkBtn id={row.id} />
                    </Group> as any,
                width: "110px"
            },
            {
                name: 'Create Date',
                selector: (row: WebLink) =>
                    <Tooltip label={dayjs(row.dateAdded).format("YYYY/MM/DD hh:mm")}>
                        <Text fz="xs">
                            {dayjs(row.dateAdded).format("YYYY/MM/DD")}
                        </Text> 
                    </Tooltip> as any,
                sortable: true,
                sortFunction: (rowA: WebLink, rowB: WebLink) => rowA.dateAdded.getTime() - rowB.dateAdded.getTime(),
                width: "120px"
            },
            {
                name: 'Last Used',
                selector: (row: WebLink) =>
                    <Tooltip label={row.dateLastUsed ? dayjs(row.dateLastUsed).format("YYYY/MM/DD hh:mm") : ""}>
                    <Text fz="xs">
                        {row.dateLastUsed ? dayjs(row.dateLastUsed).format("YYYY/MM/DD") : ""}
                    </Text>
                    </Tooltip> as any,
                sortable: true,
                sortFunction: (rowA: WebLink, rowB: WebLink) => {
                    const aTime = rowA.dateLastUsed ? rowA.dateLastUsed.getTime() : 0;
                    const bTime = rowB.dateLastUsed ? rowB.dateLastUsed.getTime() : 0;

                    return aTime - bTime
                },
                width: "130px"
            },
           
        ];

        return (
            <>
                <Group justify="space-between" mb={6} ml={12} mt={12}>
                    {subHeaderComponentMemo}
                </Group>

                <DataTable
                    defaultSortFieldId={"dateAdded"}
                    defaultSortAsc={false}
                    columns={columns}
                    data={filteredItems}
                    pagination
                    theme="dark"
                />
            </>
        );
    };

    return (
        <Box >
            <DataTable
                customStyles={{
                    header: {
                        style: {
                            borderRadius: "16px 16px 0px 0px"
                        }
                    },
                    pagination: {
                        style: {
                            borderRadius: "0px 0px 16px 16px "
                        }
                    }
                }}
                title={
                    <>
                        <Text mt={16}>
                            <Badge size="md" radius={"sm"} variant="light">
                                Unique Domains: {data.length}
                            </Badge>
                        </Text>

                        <Text>
                            <Badge size="md" radius={"sm"} variant="light">
                                All URLs: {data.map(v => v.urlList).flat().length}
                            </Badge>
                        </Text>
                    </>
                }
                columns={[
                    {
                        name: '',
                        selector: (row: WebSummary) => (
                            <Group>
                                <Image
                                    w={14}
                                    h={14}
                                    radius="md"
                                    src={`https://www.google.com/s2/favicons?domain=https://${row.domain}`}
                                />
                            </Group>
                        ) as any,
                        minWidth: "50px",
                        maxWidth: "50px",
                        sortable: true,
                    },
                    {
                        name: 'Domain',
                        selector: (row: WebSummary) => (
                            <Group>
                                <Tooltip label={row.domain}>
                                    <Anchor
                                        href={row.domain}
                                        target="_blank" rel="noreferrer"
                                        fz={12}
                                        truncate="end"
                                    >
                                        {row.domain}
                                    </Anchor>
                                </Tooltip>
                            </Group>
                        ) as any,
                        sortable: true,
                        maxWidth: "9rem"
                    },
                    {
                        name: 'Count',
                        selector: (row: WebSummary) => row.urlList.length,
                        sortable: true,
                        maxWidth: "4rem"
                    },
                ]}
                data={data}
                pagination
                expandableRows
                expandableRowsComponent={ExpandedComponent}
                highlightOnHover
                pointerOnHover
                theme="dark"
                paginationRowsPerPageOptions={[10, 20, 50, 100, 200, 500, 1000, 2000]}
            />
        </Box>
    )
}

export default FreqDataTable
