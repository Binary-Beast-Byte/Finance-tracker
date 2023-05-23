
const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 className="text-4xl font-bold mb-8">Welcome to Finance Tracker</h1>

    <div className="max-w-xl bg-white rounded-lg shadow-lg p-8 mb-8">
      <h2 className="text-2xl font-bold mb-4">How to Use Finance Tracker:</h2>

      <ol className="list-decimal ml-6">
        <li className="mb-4">
         Login with your google account 
        </li>
        <li className="mb-4">
          Click on Add transcation button 
        </li>
        <li className="mb-4">
          Add your income, expenses, savings, and investment details.
        </li>
        <li className="mb-4">
         Expense budget is deducted from the income and other categories add to the income.
        </li>
        <li className="mb-4">
        Click on View Reports button and you can view all the details
        </li>
        <li className="mb-4">
        You can view the table with date filter wise and also category Wise 
        </li>
        <li className="mb-4">
        If Income is less than 100, an email is sent to you with your logged in email !
        </li>
        <li>
          Analyze your financial data using charts and reports for better
          insights.
        </li>

      </ol>
    </div>

    <p className="text-xl text-gray-600">
      Start managing your finances effectively with Finance Tracker today!
    </p>
  </div>
  )
}

export default Index