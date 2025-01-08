import React, { useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { USER_TYPE } from "./store/UserReducer";
import UserDisplay from "./UserDisplay";

function App() {
  const [userid, setUserid] = useState(0);
  const dispatch = useDispatch(); // ใช้ Redux Hook เพื่อรับฟังก์ชัน dispatch

  const onChangeUserId = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const useridFromInput = e.target.value ? Number(e.target.value) : 0;
    console.log("userid", e.target.value);
    setUserid(useridFromInput);

    // เรียก JSONPlaceholder API เพื่อนำข้อมูลผู้ใช้
    const userResponse = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );
    if (userResponse.ok) {
      const users = await userResponse.json();
      console.log("users", users);

      // หา user ที่มี id ตรงกับ useridFromInput
      const usr = users.find(
        (userItem: any) => userItem && userItem.id === useridFromInput
      );
      console.log(usr);

      if (usr) {
        // ใช้ dispatch เพื่อส่ง action เข้าไปใน Redux Store
        dispatch({
          type: USER_TYPE,
          payload: {
            id: usr.id,
            username: usr.username,
            email: usr.email,
            city: usr.address.city,
          },
        });
      }
    }
  };

  return (
    <React.Fragment>
      <div className="App">
        <label>user id</label>
        <input value={userid} onChange={onChangeUserId} placeholder="user id" />
      </div>
      <UserDisplay />
    </React.Fragment>
  );
}

export default App;
