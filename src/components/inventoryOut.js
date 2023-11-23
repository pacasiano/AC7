import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import "../App.css";
import { myContext } from "../context/adminContext";

export default function InventoryOut() {

  //GET ACCOUNT_ID COOKIE
  const cookie = document.cookie;
  function getAcctIdFromCookie (cookieStr) {
    //if browser has more than one cookie, the if statement will run
    if (cookieStr.indexOf(';') > 0) {
        //document.cookie is a string. We use .split() to convert it to an array with each cookie being an element
        const cookiesArray = cookieStr.split(';');
        for(let i = 0; i < cookiesArray.length; i++) {
            if (cookiesArray[i].indexOf('account_id') > 0) {
                //find the cookie with 'account_id' substring
                const id = cookiesArray[i].replace('account_id=', '').trim();
                // console.log(id)
                return id;
            }
        }
    }
    else {
        const id = cookie.slice(cookie.indexOf('=')+1);
        // console.log(id)
        return id;
    }
  }

  const accountId = getAcctIdFromCookie(cookie);

  const [numbersToBeDelivered, setNumbersToBeDelivered] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [employee, setEmployee] = useState("obe");
  const [productsLength, setProductsLength] = useState([]);
  const { setPage } = useContext(myContext);

  useEffect(() => {
    fetch(`/api/employee/${accountId}`)
      .then((res) => res.json())
      .then((employee) => {
        setEmployee(`${employee[0].first_name} ${employee[0].last_name}`);
      });
  }, []);

  useEffect(() => {
    fetch('/api/product')
      .then((res) => res.json())
      .then((products) => {
        setProductsLength(products.length);
      });
  }, []);


  const options2 = [
    // iterates values from 1 to productsLength
    ...Array.from({ length: productsLength }, (_, index) => ({
      value: index + 1,
      label: index + 1,
    })),
  ];

  const [general_comment, setGen_comment] = useState('');
  useEffect(() => {
    setGen_comment(general_comment);
  }, [general_comment]);
  
  function handleGeneralComment(event) {
    setGen_comment(event.target.value)
  }    

  return (
    <div className=" px-8 py-8 ">
      <div className="flex flex-col gap-5 ">
        <div id="header" className="flex flex-row justify-between">
          <span className="text-xl font-bold">Inventory Out</span>
          <button
            onClick={() => setPage("inventory")}
            className="bg-gray-200 px-2 py-1 rounded-md font-medium"
          >
            Back
          </button>
        </div>
        <form action="/api/inventory_out" method="POST" className="flex flex-col gap-3">
          <input value={accountId} name="account_id" className="hidden"></input>
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-400">
                <th className="text-md font-bold border p-2 text-white" required>
                  Employee Name
                </th>
                <th className="text-md font-bold border p-2 text-white w-1/2" required>
                  Comments
                </th>
                <th className="text-md font-bold border p-2 text-white w-44" required>
                  Number of Items
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-300">
                <td className="text-sm font-semibold border p-2">
                  <input value={employee} name="employee_name" className="w-full text-center h-10 " readonly required/>
                </td>
                <td className="text-sm font-semibold border p-2">
                  <input onChange={handleGeneralComment} name="comments" type="text" className="w-full h-10 text-center" />
                </td>
                <td className="text-sm font-semibold border p-2">
                  <Select options={options2} onChange={(opt) => setNumbersToBeDelivered(opt.value)} className=" w-full text-center" required/>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex flex-col gap-3">
            <span className="text-xl font-bold ">Items</span>
            <table className="w-full">
              <thead className="bg-gray-400">
                <tr>
                  <th className="text-sm font-semibold border p-2 text-white">Item Name</th>
                  <th className="text-sm font-semibold border p-2 text-white w-1/6">Batch no.</th>
                  <th className="text-sm font-semibold border p-2 w-1/2 text-white">Comments</th>
                  <th className="text-sm w-44 font-semibold border p-2 text-white">Quantity</th>
                </tr>
              </thead>
              {Array.from({ length: numbersToBeDelivered }, (_, index) => (
                <Items key={index} selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />
              ))}
            </table>
            <table className="w-full border-0 border-collapse">
              <thead>
                <tr>
                  <th className="text-sm font-semibold p-2"></th>
                  <th className="text-sm w-44 font-semibold p-2">
                    <button className="bg-green-600 p-3 w-full rounded-xl text-white">SUBMIT</button>
                  </th>
                </tr>
              </thead>
            </table>
          </div>
        </form>
      </div>
    </div>
  );
}

function Items({ selectedProducts, setSelectedProducts }) {
  const [products, setProducts] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [batch, setBatch] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);

  useEffect(() => {
    fetch("/api/product")
      .then((res) => res.json())
      .then((products) => {
        setProducts(products);
      });
  }, []);

  useEffect(() => {
    fetch(`/api/stock/`)
      .then((res) => res.json())
      .then((batch) => {
        console.log(batch)
        setBatch(batch);
      });
  }, []);

  const options = products.map((product) => ({
    value: `${product.name}`,
    label: `${product.name}`,
    isDisabled: selectedProducts.includes(product.name),
  }));

  const handleProductChange = (option) => {
    let updatedProducts = [...selectedProducts];
    if (selectedOption) {
      updatedProducts = updatedProducts.filter((product) => product !== selectedOption.value);
    }
    if (option) {
      updatedProducts = [...updatedProducts, option.value];
    }
    setSelectedProducts(updatedProducts);
    setSelectedOption(option);
  };

  const batchesSet = new Set(batch.map((stock) => stock.batch_no));
  const batches = Array.from(batchesSet).map((batch_no) => ({
    value: batch_no,
    label: batch_no,
  }));

  const handleBatchChange = (option) => {
    setSelectedBatch(option);
  }

  return (
    <tbody className="bg-gray-300">
      <tr>
        <td className="text-sm font-semibold border p-2">
          <Select
            options={options}
            name="product_name"
            className="h-10 w-full text-center"
            onChange={handleProductChange}
            required
          />
        </td>
        <td className="text-sm font-semibold border p-2">
          <Select
            options={batches}
            name="batch_no"
            className="h-10 w-full text-center"
            onChange={handleBatchChange}
            required
          />
        </td>
        <td className="text-sm font-semibold border p-2">
          <input name="comments" type="text" className="h-10 w-full text-center"/>
        </td>
        <td className="text-sm font-semibold border p-2">
          <input name="quantity" type="number" className="h-10 w-full text-center pl-1" required></input>
        </td>
      </tr>
    </tbody>
  );
}
