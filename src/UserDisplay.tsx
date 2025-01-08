import React from "react";
import { AppState } from "./store/AppState"; // นำเข้า AppState เพื่อใช้ระบุรูปแบบสถานะ
import { useSelector } from "react-redux"; // Hook สำหรับดึงข้อมูลจาก Redux Store

const UserDisplay = () => {
  // ใช้ useSelector เพื่อดึงข้อมูล 'user' จาก Redux Store
  const user = useSelector((state: AppState) => state.user);

  // หากมีข้อมูล user ให้แสดงผล ถ้าไม่มีให้ return null
  if (user) {
    console.log("user", user); // ตรวจสอบข้อมูลใน console
    return (
      <React.Fragment>
        <div>
          <label>Username:</label> &nbsp;
          {user.username}
        </div>
        <div>
          <label>Email:</label> &nbsp;
          {user.email}
        </div>
        <div>
          <label>City:</label> &nbsp;
          {user.city}
        </div>
      </React.Fragment>
    );
  } else {
    return null; // ถ้าไม่มีข้อมูล user ไม่ต้องแสดงอะไร
  }
};

export default UserDisplay;
