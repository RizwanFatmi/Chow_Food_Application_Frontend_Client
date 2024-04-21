import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

export default function Order() {
  const [orderData, setOrderData] = useState([]);
  const { user } = useSelector((state) => state.user);
  const [mainLoading, setMainLoading] = useState(true);
  const navigate = useNavigate();

  const fetchOrder = async () => {
    setMainLoading(true);
    const res = await fetch("/api/auth/orderlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentPage,
        pageSize: 10, 
      }),
    });
    const data = await res.json();
    if (data.order.length > 0) {
      setOrderData(data.order);
      setTotalPages(data.totalPages);
      setTotalItem(data.totalItems);
      const timeoutId = setTimeout(() => {
        setMainLoading(false);
      }, 3000);
    } else {
      // If no data is fetched, immediately set loading to false
      setMainLoading(false);
    }
  };


  const userRole = localStorage.getItem("UserType");
  useEffect(() => {
    if (userRole == "Admin") {
      fetchOrder();
    } else {
      navigate("/login");
    }
  }, [user]);



  // DATE FORMAT FUNCTION:

  const formatDate = (inputDate) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const date = new Date(inputDate);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear().toString().substr(-2);
    return `${day} ${months[monthIndex]}' ${year}`;
  };

  // Handle paginations:

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItem, setTotalItem] = useState(0);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  
  useEffect(() => {
    fetchOrder();
}, [currentPage]);

  return (
    <>
      {mainLoading && orderData.length === 0 ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          {orderData && orderData.length > 0 ? (
            <>
              <div className="ud px-4">
                <p
                  style={{
                    fontSize: "22px",
                    fontWeight: "500",
                    color: "#2980B9",
                    textAlign: "center",
                  }}
                >
                  Order List
                </p>
                <div
                  className="container-lg lg2 mt-1"
                  style={{ overflowX: "auto" }}
                >
                  <table
                    className="table m-0"
                    style={{ backgroundColor: "white" }}
                  >
                    <thead
                      style={{
                        backgroundColor: "#2980B9",
                        color: "white",
                        position: "sticky",
                        top: 0,
                        zIndex: 1,
                      }}
                    >
                      <tr>
                        <th scope="col">Order Number</th>
                        <th scope="col">Order Date</th>
                        <th scope="col">User Name</th>
                        <th scope="col">Mobile</th>
                        <th scope="col">Email ID</th>
                        <th scope="col" style={{ textAlign: "center" }}>
                          Item
                        </th>
                        <th scope="col" style={{ textAlign: "center" }}>
                          Order Value
                        </th>
                      </tr>
                    </thead>
                    <tbody style={{ fontSize: "14px", color: "#626262" }}>
                      {orderData.map((orderData, index) => (
                        <tr key={index}>
                          <td style={{ fontWeight: "500" }}>
                            {orderData.orderNumber}
                          </td>
                          <td>{formatDate(orderData.orderDate)}</td>
                          <td>
                            {orderData.username.slice(0, 25)} <br />
                            {orderData.username.slice(25, 50)}
                          </td>
                          <td>+91 {orderData.mobile.slice(0, 10)}</td>
                          <td>
                            {orderData.email.slice(0, 30)} <br />{" "}
                            {orderData.email.slice(30, 60)}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {orderData.products.length}
                          </td>
                          <td
                            style={{ textAlign: "center", minWidth: "120px" }}
                          >
                            ₹ {orderData.totalValue}.00
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/*Pagination*/}
                {totalPages > 1? (<>
                <div className="pagination" style={{marginTop: "-40px", justifyContent: "center"}}>
                  <p
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <IoIosArrowBack
                      className={
                        currentPage === 1
                          ? "paginationBtndisabled"
                          : "paginationBtn"
                      }
                    />
                  </p>
                  <span style={{ fontSize: "16px", letterSpacing: "2px" }}>
                    {currentPage}/{totalPages}
                  </span>
                  <p
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <IoIosArrowForward
                      className={
                        currentPage === totalPages
                          ? "paginationBtndisabled"
                          : "paginationBtn"
                      }      
                    />
                  </p>
                </div>
                </>):(<></>)}
              </div>
            </>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <img
                    src={require("./Images/NoDataHome.png")}
                    className="img-fluid"
                    alt="..."
                    style={{ width: "90vw", height: "auto", maxWidth: "600px" }}
                  />
                  <p
                    style={{
                      fontSize: "25px",
                      fontWeight: "500",
                      color: "#A6A6A6",
                      marginTop: "-70px",
                    }}
                  >
                    Order not found
                  </p>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
