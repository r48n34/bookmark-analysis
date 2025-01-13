import { Text, ActionIcon, Tooltip } from "@mantine/core";

import { modals } from "@mantine/modals";
import { IconTrash } from "@tabler/icons-react";
import toast from "react-hot-toast";

type DeleteBookmarkBtnProps = {
    id: string;
}

function DeleteBookmarkBtn({ id }: DeleteBookmarkBtnProps){
    const openRemoveModal = () => modals.openConfirmModal({
        title: 'Confirm delete message',
        children: (
            <Text size="sm">
                Are you sure to delete this bookmark? This action can not be reverse.
            </Text>
        ),
        labels: { confirm: 'Confirm', cancel: 'Cancel' },
        onCancel: () => {},
        onConfirm: () => {
            chrome.bookmarks.remove(id, () => {
                toast.success("Bookmark deleted.")
            })
        },
    });

    return (
        <Tooltip label="Delete this bookmark">
            <ActionIcon
                variant="light"
                color="red"
                aria-label="Delete this bookmark"
                onClick={() => openRemoveModal()}
            >
                <IconTrash
                    style={{ width: '70%', height: '70%' }}
                    stroke={1.5}
                />
            </ActionIcon>
        </Tooltip>
    )
}
    
export default DeleteBookmarkBtn
