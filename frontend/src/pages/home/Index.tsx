import Cards from '../../components/ui/Cards'
import { Button, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Drawers from '../../components/ui/Drawers';
import useCheckAuth from '../../hooks/UseAuth';
import axios from '../../helpers/axios.tsx'
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Index = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [incomeFlow, setIncomeFlow] = useState('');
  const [fetch, setFetch] = useState(false)
  const { user } = useCheckAuth()
  const inflowAndOutFlowFetch = async () => {
    const response = await axios.get('/category/cashflow');
    setIncomeFlow(response?.data)
  }

  useEffect(() => {
    inflowAndOutFlowFetch()
  }, [fetch])


  return (
    <div className='p-36 flex flex-col'>
      <Text weight={600} className='text-xl text-center pb-4'>
        Hi, {user?.name}
      </Text>
      <Cards data={incomeFlow} />
      <Drawers opened={opened} open={open} close={close} fetch={fetch} setFetch={setFetch} />
      <div className="flex mt-5 justify-around">
        <Button color='green' className='bg-green-600' onClick={open}>
          Add Transaction
        </Button>
        <NavLink to='reports' className='p-2 font-semibold border border-green-500 text-green-500 hover:bg-green-500 hover:text-white'>
          Show Reports      </NavLink>
      </div>


    </div>
  )
}

export default Index