import Image from "next/image";
import { useEffect, useState } from "react";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import { en, formFieldName } from "../component/common";
import Pichart from "../component/chart/Pichart";
import { filteredValue } from "../component/utility";

//firebase
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../firebase/firebaseApp";

export default function form() {
  const [tasks, setTasks] = useState<any>([]);
  const [task, setTask] = useState<any>();
  const [storedData, setStoredData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPercentage, setTotalPercentage] = useState([])
  const options = [
    { value: "entertainment", label: "Entertainment" },
    { value: "mandatory", label: "Mandatory" },
    { value: "home", label: "Home" },
    { value: "emi", label: "Emi" },
  ];
  const getDataFromStore = async () => {
    setLoading(true);
    const userData = JSON.parse(sessionStorage.user);
    const querySnapshot = await getDocs(collection(db, "expenses"));
    const querySalaryDetails = await getDocs(collection(db, "estimateData"));
    const docList: any = [];
    const salaryDetails: any = [];
    querySalaryDetails.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      salaryDetails.push(doc.data());
    });
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const docs = doc.data();
      docList.push(docs);
    });
    const list = docList.filter((item: any) => {
      if (item.userId == userData.uid) {
        return item;
      }
    });
    const entertaimentSum = filteredValue(
      docList,
      "entertainment",
      salaryDetails[0]?.monthlySalary
    );
    const homeSum = filteredValue(
      docList,
      "home",
      salaryDetails[0]?.monthlySalary
    );
    const mandatorySum = filteredValue(
      docList,
      "mandatory",
      salaryDetails[0]?.monthlySalary
    );
    const emiSum = filteredValue(
      docList,
      "emi",
      salaryDetails[0]?.monthlySalary
    );
    const percentageList: any = [Number(salaryDetails[0]?.monthlySalary), Number(entertaimentSum), Number(mandatorySum), Number(homeSum), Number(emiSum)];
    setTotalPercentage(percentageList)
    setStoredData(salaryDetails);
    const listTupple = [...tasks, list];
    console.log(listTupple)
    setTasks(listTupple[0]);
    setLoading(false);
  };
  const addTasks = () => {
    if (task !== "") {
      const array = [...tasks, task]
      setTasks(array);
      setTask("");
    }
  };

  const deleteTasks = (index: any) => {
    const updatedList = [...tasks];
    // delete updatedList[index];
    updatedList.splice(index, 1);
    setTasks(updatedList);
  };
  const saveUserDetails = () => {
    const userData = JSON.parse(sessionStorage.user);
    console.log(tasks)
    tasks.map((data: any) => {
      const uniqueId = uuidv4();
      const docRef = doc(db, "expenses", uniqueId);
      const payload = {
        ...data,
        active: true,
        userId: userData.uid,
      };
      setDoc(docRef, payload)
        .then((docRef) => {
          toast.success("Entire Document has been updated successfully", {
            position: "top-right",
            autoClose: 5000,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
  const typeImage = (type: any) => {
    if (type == "entertainment") {
      return "/entertainment.png";
    } else if (type == "home") {
      return "/home.svg";
    } else if (type == "emi") {
      return "/pay.png";
    } else {
      return "/mandatory.png";
    }
  };

  useEffect(() => {
    getDataFromStore();
  }, []);
  console.log(tasks)
  return (
    <div className="h-screen bg-white flex flex-col w-full px-12">
      <div>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl m-16 font-bold">Daily Expenses</h1>
          </div>
          <div className="flex gap-5">
            <button
              onClick={saveUserDetails}
              className="bg-green-500 text-white w-28 h-12 rounded-md font-bold hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={getDataFromStore}
              className="bg-green-500 text-white w-28 h-12 rounded-md font-bold hover:bg-green-600"
            >
              Get
            </button>
          </div>
        </div>
        <div className="mixed-chart">
          <Pichart totalPercentage={totalPercentage}/>
        </div>

        <div>
          <p className="text-2xl text-green-600">{`Balance: ${en.indianRupee} ${
            storedData[0]?.monthlySalary || 0
          }`}</p>
          <div className="p-6 flex items-center">
            <input
              className=" bg-slate-100 rounded-md p-4 m-4"
              type="text"
              name="product"
              value={task?.product}
              onChange={(item) => {
                setTask({ ...task, [item.target.name]: item.target.value });
              }}
              placeholder="Name"
            />
            <div>
              <Select
                options={options}
                styles={{
                  control: (baseStyles: any, state: any) => ({
                    ...baseStyles,
                    backgroundColor: "rgb(241 245 249)",
                    border: "none",
                    height: "60px",
                    width: "250px",
                  }),
                }}
                placeholder="Select Type"
                name="type"
                value={task?.type}
                onChange={(item: any) => {
                  setTask({ ...task, type: item });
                }}
              />
            </div>
            <input
              className=" bg-slate-100 rounded-md p-4 m-4"
              type="text"
              value={task?.price}
              name="price"
              onChange={(item) => {
                setTask({ ...task, [item.target.name]: item.target.value });
              }}
              placeholder="Price"
            />
            <button
              onClick={addTasks}
              className=" bg-green-500 text-white p-3 m-3 rounded-md font-bold hover:bg-green-600"
            >
              Add Expenses
            </button>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="w-56 h-56">
              <Image
                className="w-full"
                src={"/loading.gif"}
                alt="Icon by Icon8"
                width={130}
                height={127}
                priority
              />
              <p className="text-2xl font-bold">Getting Data.....</p>
            </div>
          </div>
        ) : (
          <div>
            {tasks?.length > 0 ? (
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3"></th>
                      <th scope="col" className="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((item: any, index: number) => (
                      <tr className="bg-white dark:bg-gray-800">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {console.log(item)}
                          <div className="round-full w-12 h-12">
                            <Image
                              className="w-full"
                              src={typeImage(item?.type?.value ?? '')}
                              alt="Icon by Icon8"
                              width={30}
                              height={27}
                              priority
                            />
                          </div>
                        </th>
                        <td className="px-6 py-4 capitalize text-lg font-bold">
                          {item.product}
                        </td>
                        <td className="px-6 py-4 capitalize text-lg font-bold">
                          {item?.type?.value || ''}
                        </td>
                        <td className="px-6 py-4 capitalize text-lg font-bold">
                          {item.price}
                        </td>
                        <td className="px-6 py-4 capitalize text-lg font-bold">
                          <button
                            className="text-red-500 border-1 p-5"
                            onClick={() => {
                              deleteTasks(index);
                            }}
                          >
                            {" "}
                            Delete{" "}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div>
                <p>No Task Found</p>
              </div>
            )}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
