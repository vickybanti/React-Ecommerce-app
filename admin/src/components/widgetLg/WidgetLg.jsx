import { useEffect, useState } from "react";
import "./widgetLg.css";

export default function WidgetLg() {

  const [orders, setOrders] = useState([])

  useEffect(() => {
    const getOrders = async() => {
      const res = await fetch(`http://localhost:5000/order`,{
        method:"GET"
      })
      const all = await res.json()
      console.log(all)
      setOrders(all)
    }
    getOrders()
  },[])
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {orders.map(order => (

        
        <tr className="widgetLgTr" key={order.order_id}>
          <td className="widgetLgUser">
           
            <span className="widgetLgName">{order.user_id}</span>
          </td>
          <td className="widgetLgDate">{order.transaction_id}</td>
          <td className="widgetLgAmount">{order.amount}</td>
          <td className="widgetLgStatus">
            <Button type={order.status} />
          </td>
        </tr>

        ))}
        
      </table>
    </div>
  );
}
