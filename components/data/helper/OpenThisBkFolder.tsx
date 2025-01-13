import { ActionIcon, Anchor, Tooltip } from "@mantine/core";
import { IconFolders } from "@tabler/icons-react";

type OpenThisBkFolderProps = {
    folderId: string
}

function OpenThisBkFolder({ folderId }: OpenThisBkFolderProps) {

    function openFolderLocation(){
        // chrome.tabs.update(undefined, { url: `chrome://bookmarks/?q=%${title}` });
        chrome.tabs.update(undefined, { url: `chrome://bookmarks/?id=${folderId}` });
    }

    return (
        <Tooltip label="Open Folder Locations">
            <ActionIcon
                variant="light"
                aria-label="Open Folder Locations"
                onClick={() => openFolderLocation()}
            >
                <IconFolders
                    style={{ width: '70%', height: '70%' }}
                    stroke={1.5}
                />
            </ActionIcon>
        </Tooltip>
    )
}

export default OpenThisBkFolder
