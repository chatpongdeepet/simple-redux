import React, { useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { USER_TYPE } from "./store/UserReducer";
import UserDisplay from "./UserDisplay";
import { log } from "console";
import { POST_TYPE } from "./store/PostReducer";
import PostDisplay from "./PostDisplay";

function App() {
  const [userid, setUserid] = useState(0);
  const dispatch = useDispatch(); // ใช้ Redux Hook เพื่อรับฟังก์ชัน dispatch
  const [postid, setPostid] = useState(0);

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

  const onChangePostId = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const postIdFromInput = e.target.value ? Number(e.target.value) : 0;
    setPostid(postIdFromInput);

    const postResponse = await fetch(
      "https://jsonplaceholder.typicode.com/posts/" + postIdFromInput
    );

    if (postResponse.ok) {
      const post = await postResponse.json();
      console.log(post);
      dispatch({
        type: POST_TYPE,
        payload: {
          id: post.id,
          title: post.titile,
          body: post.body,
        },
      });
    }
  };

  return (
    <React.Fragment>
      <div style={{ width: "300px" }}>
        <div className="App">
          <label>user id</label>
          <input
            value={userid}
            onChange={onChangeUserId}
            placeholder="user id"
          />
        </div>
        <UserDisplay />
      </div>
      <br />
      <div style={{ width: "300px" }}>
        <div className="App">
          <label>post id</label>
          <input
            value={postid}
            onChange={onChangePostId}
            placeholder="input id"
          />
        </div>
        <PostDisplay />
      </div>
    </React.Fragment>
  );
}

export default App;
