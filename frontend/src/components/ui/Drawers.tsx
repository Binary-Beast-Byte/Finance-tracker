import { Drawer, Group, Button, Text } from '@mantine/core';
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from '../../helpers/axios'
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

interface Drawers {
  opened: boolean;
  open: () => void;
  close: () => void;
  fetch: boolean;
  setFetch: any;
}

interface formValues {
  amount: string
  category: string
}


function Drawers({ opened, open, close, fetch, setFetch }: Drawers) {
  const initialValues = {
    'amount': '',
    'category': '',
  }

  const makeRequest = async (values: formValues) => {
    const response = await axios.post('/category/create', values);
    if (response && response.status === 201) {
      toast.success(response.data.message)
      setFetch(!fetch)
      setTimeout(() => {
        close()
      }, 2001);
      // close()
    } else {
      if(response.status === 500) {
        console.log(response.data.error)
      }
    }
  }

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
          Select one of these categorys
        </Text>
        <Formik
          initialValues={initialValues}
          onSubmit={makeRequest}
        >
          {({ values, errors, touched }: any) => ( //!define type
            <>
              <Form>
                <div className="mt-6">
                  <label htmlFor="amount" className="label">
                    Amount
                  </label>{" "}
                  <span className="text-red-500 font-bold">*</span>
                  <div className="mt-1">
                    <Field
                      id="amount"
                      name="amount"
                      type="text"
                      className={`${errors.name && touched.name
                        ? "border-red-500"
                        : "border-gray-300"
                        } appearance-none block w-full px-3 py-2 border rounded-md placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm`}
                      placeholder="Enter Amount "
                    />
                    {errors.name && touched.name && (
                      <div className="mt-2 text-sm text-red-500">
                        {errors.name}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col space-y-4 bg-white p-2 py-4">
                  <label htmlFor="category" className="label">
                    Select an category
                  </label>

                  <div className="flex space-x-8">
                    <div className="flex space-x-4 items-center">
                      <Field
                        type="radio"
                        required
                        autoComplete="off"
                        id="income"
                        name="category"
                        value="income"
                        className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                      />
                      <label className="inline-block text-gray-800 font-medium capitalize">
                        Income
                      </label>
                    </div>

                    <div className="flex space-x-4 items-center">
                      <Field
                        type="radio"
                        required
                        autoComplete="off"
                        id="expenseBudget"
                        name="category"
                        value="expenseBudget"
                        className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                      />
                      <label className="inline-block text-gray-800 font-medium capitalize">
                        Expense Budget
                      </label>
                    </div>

                    <div className="flex space-x-4 items-center">
                      <Field
                        type="radio"
                        required
                        autoComplete="off"
                        id="savings"
                        name="category"
                        value="savings"
                        className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                      />
                      <label className="inline-block text-gray-800 font-medium capitalize">
                        Savings
                      </label>
                    </div>

                    <div className="flex space-x-4 items-center">
                      <Field
                        type="radio"
                        required
                        autoComplete="off"
                        id="investment"
                        name="category"
                        value="investment"
                        className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                      />
                      <label className="inline-block text-gray-800 font-medium capitalize">
                        Investment
                      </label>
                    </div>
                  </div>
                </div>


                {/* submit button */}
                <div className="mt-6">
                  <button
                    type="submit"
                    className="py-2 px-6 border border-transparent bg-green-600 rounded-md shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save
                  </button>
                </div>
              </Form>
            </>
          )}
        </Formik>
        <ToastContainer
        autoClose={2000}
          position="bottom-center"
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Drawer>
    </>
  );
}

export default Drawers