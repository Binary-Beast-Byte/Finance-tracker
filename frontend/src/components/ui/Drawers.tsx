import { Drawer, Group, Button, Text } from '@mantine/core';
interface Drawers {
    opened: boolean;
    open: () => void;
    close: () => void;
  }

function Drawers({opened, open, close }: Drawers) {

  return (
    <>
      <Drawer
       opened={opened}
       onClose={close}
       overlayProps={{ opacity: 0.6, blur: 1 }}
       position="right"
       size="70%"
        withCloseButton={true}>

        <Text weight={600} size="lg">
            Select one of these Options
        </Text>
      </Drawer>

      <Group position="center">
        <Button onClick={open}>Open Drawer</Button>
      </Group>
    </>
  );
}

export default Drawers