import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  
  const [userState, setUserState] = useState([])
  
  const MONTHS = useMemo(
    ()=> [
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
      "Dec"
    ]
  )
  useEffect(()=>{
    
      const active = async()=>{
        try {
      const res = await fetch(`http://localhost:5000/auth/stats`,{
        method:"GET"
      })
      const getActiveUser =await res.json()
      const currentMonth = getActiveUser.current_month
      const activeUser = getActiveUser.active_users
      setUserState([
        
        {name:currentMonth, "Active User":activeUser}
      ])
    } catch (err) {
      console.error(err.message)
    }
  }
  active()

  },[])

  console.log(userState)
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userState} title="User Analytics" grid dataKey="Active User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
