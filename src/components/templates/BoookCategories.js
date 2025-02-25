"use client"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { PropagateLoader } from "react-spinners"
import { GoTrash } from "react-icons/go"
import { CiEdit } from "react-icons/ci"
import { CiSearch } from "react-icons/ci"

import toast from "react-hot-toast"
import Layout from "@/app/layout/Layout"
import Sidebar from "../module/Sidebar"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Pagination from "../module/Pagination"

function BookCategories() {
  const [info, setInfo] = useState([])
  const [products, setProducts] = useState([])

  const fetchData = async () => {
    try {
      const token = Cookies.get("authToken")

      if (!token) {
        toast.error("You're not logged in")
        return
      }

      const res = await fetch(
        "https://stg-core.bpapp.net/api/BookCategory/GetAllBookCategories",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await res.json()
      setInfo(data.data) // ✅ Fix: Set info directly to data.data
      setProducts(data.data)
      console.log(data.data) // ✅ Fix: Log the new data instead of `info`
    } catch (error) {
      toast.error("Error fetching data")
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Layout>
      <div className="flex justify-self-start">
        <Sidebar />
        <div className="lg:min-w-[900] md:min-w-max max-w-[800] mx-auto w-screen">
          <div className="relative flex flex-col h-full min-h-screen text-slate-700 bg-white shadow-md rounded-xl">
            <div className="relative mx-4 mt-4 text-slate-700 rounded-none bg-clip-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-800">
                  Book Categories
                </h3>
              </div>
            </div>

            <div className="p-0">
              {info.length > 0 ? (
                <table className="w-full mt-4 text-left table-auto min-w-max">
                  <thead>
                    <tr>
                      <th className="flex p-4 border-y border-slate-200 ">
                        <div className="flex border-2 border-solid border-slate-200 p-2 rounded">
                          <CiSearch size={30}/>
                          <input
                            placeholder="search categories"
                            className="pl-2 focus:outline-none"
                          />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {info.map((item, index) => (
                      <tr key={index} className="border-b border-slate-200">
                        <td className="p-4 flex justify-between">
                          {item.title}
                          <div className="flex">
                            <button className="px-2 pt-1 flex hover:bg-blue-100 rounded">
                              <CiEdit size={20} className="m-1" />
                              edit
                            </button>
                            <button className="px-3 py-1 flex hover:bg-red-100 rounded">
                              <GoTrash className="m-1" />
                              delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="flex justify-center items-center h-64">
                  <PropagateLoader size={40} color="#023047" />
                </div>
              )}
            </div>
            <Pagination/>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default BookCategories
