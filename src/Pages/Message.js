import React, { useEffect, useMemo, useState } from 'react';
import MessageComponent from '../Component/MessagePage/Message';
import SearchUserIcon from "../Component/Images/SearchUser.svg";
import { useSelector } from 'react-redux';
import { userfriend } from '../AllApi/Integrateapi';
import Button from '../Component/Button/Button';
import PageLoder from '../Component/LoderComponent/PageLoder';
import { useNavigate, useParams } from 'react-router-dom';
import UserCards from '../Component/NoUserList/UserCards';

export default function Message({ socket }) {
  let { id } = useParams();
  const navigator = useNavigate();
  const userId = useSelector((state) => state.myReducer.data);
  const usermemberslist = useSelector((state) => state.MessageReducer.data);
  const [memberslist, setMemberlist] = useState(usermemberslist);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);
        const response = await userfriend(userId.message_id);
        if (response && Array.isArray(response.data.data)) {
          setMemberlist(response.data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoader(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId,id]);

  const content = useMemo(() => (
    <div>
      {loader ? (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "180px" }}>
          <PageLoder />
        </div>
      ) : (
        <>
          {Array.isArray(memberslist) && memberslist.length !== 0 ? (
            <MessageComponent socket={socket} />
          ) : (
            <>
              <div style={{ justifyContent: "center", display: "flex", marginTop: "43px", flexDirection: "column", alignItems: "center" }}>
                <UserCards />
              </div>
              <div className="line-container">
                <div className="line"></div>
                <span className="center-text">End to end encryption</span>
                <div className="line"></div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  ), [loader, memberslist, socket]);

  return (
    <>
      {content}
    </>
  );
}
