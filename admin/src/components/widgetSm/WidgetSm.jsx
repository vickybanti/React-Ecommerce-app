import { useEffect, useState } from "react";
import "./widgetSm.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
export default function WidgetSm() {

  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async() => {
      const res = await fetch(`http://localhost:5000/auth/users`,{
        method:"GET"
      })
      const all = await res.json()
      setUsers(all)
    }
    getUsers()
  },[])
  return (

    
    <div className="widgetSm">
    

    
      <><span className="widgetSmTitle">New Join Members</span><ul className="widgetSmList">
      {users.map(user => ( 
      <li className="widgetSmListItem" key={user.user_id}>
          <img
            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="widgetSmImg" />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.email}</span>
            <span className="widgetSmUserTitle">{user.isAdmin}</span>
          </div>
          <button className="widgetSmButton">
            <VisibilityIcon className="widgetSmIcon" />
            Display
          </button>
        </li>
        ))}
      </ul></>
      
          
    </div>
    
  );
}
