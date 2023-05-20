import Cards from '../../components/ui/Cards'
import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Drawers from '../../components/ui/Drawers';


const Index = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className='p-36 flex flex-col'>
      <Cards />
      <Drawers opened={opened} open={open} close={close} />
      <Button color='green' className='bg-green-600' onClick={open}>
        Add Transaction
      </Button>
    </div>
  )
}

export default Index