import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);
  const { user } = useSelector((state) => state.user);
  const [mainLoading, setMainLoading] = useState(true);
  const navigate = useNavigate();

  const fetchOrder = async () => {
    setMainLoading(true);
    const userEmail = user && user.email;
    const res = await fetch("/api/auth/myorder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail,
      }),
    });
    const data = await res.json();
    if (data.length > 0) {
      setOrderData(data);
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
    if (user && user.role == "User") {
      fetchOrder();
    } else {
      if (userRole && userRole == "User") {
      } else {
        navigate("/login");
      }
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
                  Order History
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
                        <th scope="col"></th>
                        <th
                          scope="col"
                          style={{ minWidth: "150px", textAlign: "center" }}
                        >
                          Date
                        </th>
                        <th scope="col">Order No.</th>
                        <th
                          scope="col"
                          style={{ width: "200px", minWidth: "200px" }}
                        >
                          Food Name
                        </th>
                        <th scope="col" style={{ textAlign: "center" }}>
                          Qty
                        </th>
                        <th scope="col" style={{ textAlign: "center" }}>
                          Price
                        </th>
                        <th scope="col" style={{ textAlign: "center" }}>
                          Value
                        </th>
                      </tr>
                    </thead>
                    <tbody style={{ fontSize: "14px", color: "#626262" }}>
                      {orderData.map((order, index) =>
                        order.products.map((data, dataIndex) => (
                          <tr key={index + "-" + dataIndex}>
                            <td>
                              <img
                                src={data.image}
                                className="img-thumbnail"
                                alt="..."
                                style={{ height: "100px", width: "150px" }}
                              />
                            </td>
                            <td
                              style={{ minWidth: "150px", textAlign: "center" }}
                            >
                              {formatDate(order.orderDate)}
                            </td>
                            <td style={{ fontWeight: "500" }}>
                              {order.orderNumber}
                            </td>
                            <td>
                              <div
                                style={{ height: "100px", overflow: "hidden" }}
                              >
                                <b
                                  style={{
                                    color: "#464646",
                                    width: "200px",
                                    minWidth: "200px",
                                  }}
                                >
                                  {data.productname}
                                </b>
                                <br />
                                {data.description}
                              </div>
                            </td>

                            <td style={{ textAlign: "center" }}>
                              {data.quantity}
                            </td>
                            <td
                              style={{ textAlign: "center", minWidth: "120px" }}
                            >
                              ₹ {data.price}.00
                            </td>
                            <td
                              style={{ textAlign: "center", minWidth: "120px" }}
                            >
                              ₹ {data.value}.00
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
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
