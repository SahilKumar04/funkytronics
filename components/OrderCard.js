import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const OrderCard = (props) => {
  const currentDate = new Date();
  const previousDate = new Date(props.order.orderDate);
  const diffDays = Math.floor(
    (currentDate - previousDate) / (1000 * 60 * 60 * 24)
  );
  const diffHours = Math.floor((currentDate - previousDate) / (1000 * 60 * 60));
  const diffMinutes = Math.floor((currentDate - previousDate) / (1000 * 60));
  const router = useRouter()

  const colors = {
    a: { color: "red", hue: 0 },
    b: { color: "orange", hue: 30 },
    c: { color: "yellow", hue: 60 },
    d: { color: "green", hue: 120 },
    e: { color: "cyan", hue: 180 },
    f: { color: "blue", hue: 240 },
    g: { color: "violet", hue: 270 },
    h: { color: "pink", hue: 300 },
    i: { color: "lightpink", hue: 330 },
    j: { color: "moccasin", hue: 38 },
    k: { color: "lawngreen", hue: 90 },
    l: { color: "saddlebrown", hue: 25 },
    m: { color: "gray", hue: 0 },
    n: { color: "white", hue: 0 },
    o: { color: "black", hue: 0 },
    p: { color: "darkorchid", hue: 280 },
    q: { color: "orange", hue: 30 },
    r: { color: "darkgreen", hue: 120 },
    s: { color: "salmon", hue: 6 },
    t: { color: "pink", hue: 300 },
    u: { color: "gold", hue: 51 },
    v: { color: "springgreen", hue: 150 },
    w: { color: "paleturquoise", hue: 175 },
    x: { color: "tan", hue: 34 },
    y: { color: "lightblue", hue: 195 },
    z: { color: "darkorange", hue: 33 },
  };
  
  const letter = props.order.sellerBusinessName[0].toLowerCase();
  const bgColorHueValue = colors[letter].hue;
  const colorName = colors[letter].color;

  return (
    <div className="bg-gray w-full pr-4 pl-4 m-2 border rounded border-grey w-full shadow-sm cursor-pointer hover:bg-gray-200" onClick={()=>{router.push(`orderDetails?storeOrderId=${props.order.buyerOrderId}&sellerOrderId=${props.order.sellerOrderId}`)}}>
      <div className="flex m-auto pt-1 text-start md:w-full md:text-left ">
        {!(props.index > 0) && (
          <p className="font-bold w-full text-sm md:grow md:text-xl">
            Order ID: {props.order.buyerOrderId}
          </p>
        )}
        {!(props.index > 0) && (
          <p className="w-36 text-xs text-slate-300 ml-4 md:grow-0 md:text-sm">
            {diffDays >= 1
              ? `${diffDays} days ago`
              : diffMinutes >= 60
              ? `${diffHours} hours ago`
              : `${diffMinutes} mins ago`}
          </p>
        )}
      </div>
      <div
        className={`flex m-auto w-96 pl-3 md:w-full ${
          props.index === props.length - 1 ? "border-b-2" : ""
        }`}
      >
        <div className="mr-1 flex -space-x-2 grow-0">
          <div
            className={`h-16 w-16 md:h-24 md:w-24 rounded-full ring-2 ring-white bg-${colorName} text-white border text-center items-center text-5xl md:text-7xl`} 
            style={{backgroundColor: `hsl(${bgColorHueValue}, 100%, 80%)`}}
          >
            <span className={`inline-block mt-2 text-${colorName}-500`}>
              {props.order.sellerBusinessName[0]}
            </span>
          </div>
        </div>
        <div className="mr-8 grow pl-2">
          <p className="text-sm md:text-base w-max">
            Seller : {props.order.sellerBusinessName}
          </p>
          <div className="flex text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3359/3359235.png"
              className="h-3 w-3 mt-1"
            ></img>
            <p className="text-xs ml-1 md:text-base">
              {props.order.quantity} Products - ₹{props.order.totalAmount}
            </p>
          </div>
          <div className="flex text-center align-top">
            <Image
              src={"/stop-watch2x.png"}
              className="h-3 w-3 mt-1"
              alt="stop-watch"
              width={14}
              height={14}
            ></Image>

            {props.order.status === "CONFIRMED" ? (
              <p className="text-xs ml-1 text-left md:text-base text-green-400">
                {" "}
                Status: Cofirmed
              </p>
            ) : (
              ""
            )}
            {props.order.status === "PENDING" ? (
              <p className="text-xs ml-1 text-left md:text-base text-blue-400">
                {" "}
                Status: Pending
              </p>
            ) : (
              ""
            )}
            {props.order.status === "DELIVERED" ? (
              <p className="text-xs ml-1 text-left md:text-base text-green-400">
                {" "}
                Status: Delivered
              </p>
            ) : (
              ""
            )}
            {props.order.status !== "PENDING" &&
            props.order.status !== "DELIVERED" &&
            props.order.status !== "CONFIRMED" ? (
              <p className="text-xs ml-1 text-left md:text-base">
                Payment due date-
                {new Date(props.order.paymentDueDate).toDateString()}{" "}
              </p>
            ) : (
              ""
            )}
          </div>
        </div>

        {props.order.status !== "PENDING" &&
        props.order.status !== "DELIVERED" &&
        props.order.status !== "CONFIRMED" ? (
          <button className="grow-0 w-28 text-xs text-red-600 font-bold mt-5 md:font-light md:w-40 md:h-10 md:mr-5 md:p-1 md:border md:bg-red-600 md:text-white md:text-center  md:text-xl">
            Pay Now
          </button>
        ) : (
          ""
        )}

        {props.order.status === "CONFIRMED" && (
          <button onClick={()=>{router.push(`orderDetails?storeOrderId=${props.order.buyerOrderId}&sellerOrderId=${props.order.sellerOrderId}`)}} className="grow-0 w-28 text-xs text-red-600 font-bold mt-5 md:font-light md:w-40 md:h-10 md:mr-5 md:p-1 md:border md:bg-red-600 md:text-white md:text-center  md:text-xl">
            Accept Delivery
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
