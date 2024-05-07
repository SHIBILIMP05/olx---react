import React, { useContext, useEffect, useState } from "react";
import "./View.css";
import { PostContext } from "../../store/postContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { fireStore } from "../../firebase/config";
function View() {
  const [userDetail, setUserDetails] = useState('');
  const { postDetails } = useContext(PostContext);
  useEffect(() => {
    const { userId } = postDetails;
    getDocs(query(collection(fireStore, "users"), where("id", "==", userId))).then((result) => {
      result.forEach((doc) => {
        setUserDetails(doc.data());
      });
    }).catch((err)=>{
      alert(err.message)
    })
  },[]);
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails.url} alt={postDetails.name} />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.date}</span>
        </div>
        {userDetail && (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetail.name}</p>
            <p>{userDetail.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default View;
