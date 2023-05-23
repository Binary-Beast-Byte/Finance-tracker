import { Card, Divider, Text, Badge, Button, Group } from '@mantine/core';


function Cards({ data }: any) { //!define type

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>

            <Divider my="sm" />

            <Group position="apart" className='text-xl'>
                <Text weight={500} >Inflow</Text>
                <Text c="blue" weight={500}> +{data? data?.inflow: 0}</Text>
            </Group>
            <Group position="apart" className='text-xl'>
                <Text weight={500}>Outflow</Text>
                <Text c="red" weight={500}>-{data? data?.outflow : 0}</Text>
            </Group>
            <Divider my="md" />
            <p className='text-end text-xl font-semibold text-gray-700'>
                {data? data?.total : 0}
            </p>

        </Card>
    );
}

export default Cards