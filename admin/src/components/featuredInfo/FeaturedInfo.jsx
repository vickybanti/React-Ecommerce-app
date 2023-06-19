import "./featuredInfo.css";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useEffect, useState } from "react";
export default function FeaturedInfo() {

  const [incomes, setIncomes] = useState([])
  const [perc, setPerc] = useState([])

  useEffect(() => {
    const getIncome = async()=>{
      try {
        const res = await fetch(`http://localhost:5000/order/month`, {
          method:"GET"
        })
        console.log("res=",res)
        const allincome = await res.json()
        console.log(allincome)
        setIncomes(allincome[0].sum)
        setPerc((allincome[0].sum *100 / allincome[1].sum - 100).toFixed(2))
        console.log(perc)
      
      } catch (err) {
        console.error(err.message)
    }
  }
  getIncome()

}
,[])
  
  console.log(incomes)
  return (
    
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revanue</span>
        
        <><div className="featuredMoneyContainer">
            <span className="featuredMoney">${incomes}</span>
            <span className="featuredMoneyRate">
              %{perc}
              {perc < 0 ? 
              <ArrowDownwardIcon className="featuredIcon negative" />
              : 
              <ArrowDownwardIcon className="featuredIcon positive" />

              }</span>
          </div><span className="featuredSub">Compared to last month</span></>
    
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownwardIcon className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpwardIcon className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
