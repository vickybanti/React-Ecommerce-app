import React from 'react'
import './TopBar.css'
import LanguageIcon from '@mui/icons-material/Language';
import AdminPanelSettingsIcon  from '@mui/icons-material/AdminPanelSettings';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
function TopBar() {
  return (
    <div className='topbar'>
      <div className='topbarwrapper'>
        <div className='topleft'>
          <span className='logo'>
          
          MoorePlaza</span>
        </div>
        <div className='topright'>
          <div className='topiconcontainer'>
          <NotificationsNoneIcon />
          <span className='badge'>2</span>

          </div>

          <div className='topiconcontainer'>
          <AdminPanelSettingsIcon />
          <span className='badge'>2</span>

          </div>

          <div className='topiconcontainer'>
          <LanguageIcon />
          <span className='badge'>2</span>

          </div>
          <img src="abt/abt1.png" alt="avatar" className="topavatar"/>
        </div>
      </div>
    </div>
  )
}

export default TopBar
