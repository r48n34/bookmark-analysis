import { Box, Group, Loader, Text } from "@mantine/core"

function CenterLoading() {
    return (
        <Box style={{ height: "100vh" }}>
            <Box style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Box>
                    <Group justify="center">
                        <Loader color="indigo" type="dots" />
                    </Group>

                    <Text ta="center" mt={8} c="dimmed" fz={16} fw={400}>
                        Loading ...
                    </Text>
                </Box>
            </Box>
        </Box>
    )
}

export default CenterLoading
