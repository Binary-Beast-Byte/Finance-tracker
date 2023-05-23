import { useEffect, useState } from "react"
import Example from "../../components/ui/Table"
import axios from '../../helpers/axios'
import PieChart from '../../components/ui/PieChart'

const Index = () => {
    const [tableData, setTableData] = useState();
    const fetchTableData = async() => {
        const response = await axios.get('/category/sample-data');
        if(response?.data) {
            setTableData(response.data)
        }
    }

    useEffect(() => {
        fetchTableData();
    }, [])
    
  return (
    <div className="w-full flex flex-col space-y-6">
    <PieChart />
    <Example tableData={tableData} />
    </div>
  )
}

export default Index