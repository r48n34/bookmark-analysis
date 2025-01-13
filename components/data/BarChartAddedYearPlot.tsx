import { Group, Text } from '@mantine/core';
import { BarChart } from '@mantine/charts';
import type { WebSummary } from "../main";

type BarChartAddedYearPlotProps = {
    data: WebSummary[];
}

function BarChartAddedYearPlot({ data }: BarChartAddedYearPlotProps) {

    const mapSet = new Map();
    const arr = data.flatMap(v => v.urlList.map(k => k.dateAdded));

    for (let v of arr) {
        const years = v.getFullYear();
        mapSet.has(years) 
            ? mapSet.set(years, mapSet.get(years) + 1) 
            : mapSet.set(years, 1);
    }

    const finalYearCount = Array.from(mapSet).sort((a, b) => a[0] - b[0]);

    return (
        <>
            <Text c="dimmed" fz={12} ta="center" mt={14} mb={14}>
                Bookmark Added By Years
            </Text>

            <Group justify="center">
                <BarChart
                    h={150}
                    data={finalYearCount.map(v => ({
                        year: v[0],
                        count: v[1]
                    }))}
                    dataKey="year"
                    series={[
                        { name: 'count', color: 'violet.6' },
                    ]}
                    tickLine="y"
                />
            </Group>
        </>
    )
}

export default BarChartAddedYearPlot
