import React, { useState, useContext } from 'react';
import './SideBar.css';
import { assets } from "../../assets/assets/assets";
import { Context } from '../../context/Context';

const SideBar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompt, recentPrompt,newChat } = useContext(Context);

  const loadRecent = async (prompt) => {
    // Only call onSent if the prompt is not already the recent one
    if (recentPrompt !== prompt) {
      await onSent(prompt);
    }
  };

  return (
    <div className='sidebar'>
      <div className='top'>
        <div className="menu">
          <img onClick={() => setExtended(prevState => !prevState)} src={assets.menu_icon} alt="Menu" />
        </div>

        <div onClick ={()=>newChat()}className="new-chat">
          <img src={assets.plus_icon} alt="New Chat" />
          {extended && <p>New Chat</p>}
        </div>

        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompt.map((item, index) => (
              <div key={index} onClick={() => loadRecent(item)} className="recent-entry">
                <img src={assets.message_icon} alt="Recent Message" />
                <p>{item.slice(0, 18)}...</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='bottom'>
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="Help" />
          {extended && <p>Help</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="Activity" />
          {extended && <p>Activity</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="Settings" />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
