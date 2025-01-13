import type { WebSummary } from "../main";
import { Group, Text } from '@mantine/core';
import { PieChart } from '@mantine/charts';
import { getRandomColor } from "../../utilis/utilis";


type PieChartFreqPlotProps = {
    data: WebSummary[];
}

function PieChartFreqPlot({ data }: PieChartFreqPlotProps) {
    return (
        <>
            <Text c="dimmed" fz={12} ta="center" mt={14}>
                Top 6 occur frequency website
            </Text>

            <Group justify="center">
                <PieChart
                    withTooltip
                    data={
                        data.slice(0, 6)
                            .map(v => ({ 
                                name: v.domain,
                                value: v.urlList.length,
                                color: getRandomColor()
                            }))
                    }
                    withLabelsLine
                    labelsPosition="outside"
                    labelsType="value"
                    withLabels
                />
            </Group>
        </>
    )
}

export default PieChartFreqPlot
