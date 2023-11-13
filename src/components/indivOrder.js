import React, { useState } from "react";
import Item1 from "../imgs/Item1.png";
import "../App.css";
import { Link } from "react-router-dom";

function Product() {

  return (
    <div className="flex flex-col items-center pt-[4rem] h-screen border-2 border-green-900">
      <div className="flex flex-row justify-center pt-[4rem]">
        <div className="flex flex-row space-x-[10rem]">
          <div className="flex flex-col w-[50rem]">
            <div className="border-x-8 bg-gray-200 text-xl font-bold px-2 h-[3.4375rem] flex items-center">
              <div>
                Ordered items
              </div>
            </div>
            <div className="flex flex-col pt-4 space-y-[2rem]">
              <table className="table-fixed w-full bg-gray-200">
                <tbody>
                  <tr>
                    <td className="p-2">
                      <div className="flex justify-center">
                        <img
                          src={Item1}
                          className="object-scale-down rounded-md w-full h-36"
                          alt="Item1"
                        />
                      </div>
                    </td>
                    <td className="">
                      <div className="flex flex-col justify-center items-center ">
                        <div>
                          <div className="flex justify-start text-xl font-bold pt-0 pb-2  ">
                            name
                          </div>
                          <div className="flex justify-start font-normal text-sm ">
                            $100.00
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="table-fixed w-full bg-gray-200">
                <tbody>
                  <tr>
                    <td className="p-2">
                      <div className="flex justify-center">
                        <img
                          src={Item1}
                          className="object-scale-down rounded-md w-full h-36"
                          alt="Item1"
                        />
                      </div>
                    </td>
                    <td className="">
                      <div className="flex flex-col justify-center items-center ">
                        <div>
                          <div className="flex justify-start text-xl font-bold pt-0 pb-2  ">
                            name
                          </div>
                          <div className="flex justify-start font-normal text-sm ">
                            $100.00
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>


            </div>
          </div>
          <div className="flex flex-col space-y-10 w-[32rem]">
            <div className="">
              <div className="border-x-8 bg-gray-200 text-xl font-bold px-2 h-[3.4375rem] flex items-center">
                <div>
                  Order Total
                </div>
              </div>
              <div className="p-3 bg-slate-100">
                test
              </div>
            </div>
            <div className="">
              <div className="bg-gray-200 text-xl font-bold px-2 h-[3.4375rem] flex items-center">
                <div>
                  Shipping Info
                </div>
              </div>
              <div className="p-3 bg-slate-100">
                test
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );

};

export default Product;
