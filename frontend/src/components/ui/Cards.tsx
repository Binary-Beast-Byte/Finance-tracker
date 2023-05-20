import { Card, Divider, Text, Badge, Button, Group } from '@mantine/core';

function Cards() {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Divider my="sm" />

            <Group position="apart">
                <Text weight={500}>Inflow</Text>
                <Text c="blue" weight={500}>200</Text>
            </Group>
            <Group position="apart">
                <Text weight={500}>Outflow</Text>
                <Text c="red" weight={500}>200</Text>
            </Group>
            <Divider my="md" />
            <p className='text-end'>
                200
            </p>

        </Card>
    );
}

export default Cards