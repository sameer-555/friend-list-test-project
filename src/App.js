import "./styles.css";
import AddFriend from "./AddFriend";
import { useState } from "react";
import FriendsList from "./Friends";
import Pagination from "./Pagination";

export default function App() {
  const [friendList, setFriendList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [friendsPerPage] = useState(4);

  const handleAdd = (event) => {
    if (event.key === "Enter") {
      if (inputValueVerification(event.target.value)) {
        const friendsListData = [...friendList];
        friendsListData.unshift({
          name: event.target.value,
          fav: false,
          id: event.target.value.toLowerCase()
        });
        setInputValue("");
        setFriendList(friendsListData);
      }
    }
  };

  const onInput = (event) => {
    setInputValue(event.target.value);
  };

  //removing friend from the list
  const deleteFriend = (friend) => {
    const updateList = friendList.filter((e) => e.name !== friend);
    setFriendList(updateList);
  };

  //updating fav friend status
  const favFriend = (id) => {
    const friendIndex = friendList.findIndex((friend) => friend.id === id);
    const currentList = [...friendList];
    const updatedValue = currentList[friendIndex];
    updatedValue.fav ? (updatedValue.fav = false) : (updatedValue.fav = true);
    setFriendList(currentList);
  };

  //validation for proper input on Enter
  const inputValueVerification = (name) => {
    //check if name is added by user
    if (name) {
      //checking special character and number in string
      const noSpecialchar = /[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]+/;
      const noNumber = /\d/;
      if (noSpecialchar.test(name) || noNumber.test(name)) {
        alert("Please make sure no special characters are used");
        return false;
      }
      //check if length of the friendlist less than 1
      if (friendList.length === 0) {
        return true;
      } else {
        //check if there is similar name present in the friendlist
        const friendListLowercase = friendList.map((friend) =>
          friend.name.toLowerCase()
        );
        if (friendListLowercase.includes(name.toLowerCase())) {
          alert("This person is already in the List");
          return false;
        }
        return true;
      }
    } else {
      alert("Please Enter name here");
      return false;
    }
  };

  const indexOfLastFriend = currentPage * friendsPerPage;
  const indexOfFirstFriend = indexOfLastFriend - friendsPerPage;
  let friendsData = friendList.slice(indexOfFirstFriend, indexOfLastFriend);

  const paginate = (number) => {
    setCurrentPage(number);
  };

  return (
    <div className="App">
      <div className="heading">Friends List</div>
      <AddFriend add={handleAdd} onInput={onInput} input={inputValue} />
      <div className="friend-list">
        <FriendsList
          friends={friendsData}
          clickFav={favFriend}
          clickDelete={deleteFriend}
        />
        {friendList.length > 0 ? (
          <Pagination
            friendsPerPage={friendsPerPage}
            totalFriends={friendList.length}
            currentData={friendsData.length}
            paginate={paginate}
          />
        ) : (
          <div className="no-friends">You have no friends yet.</div>
        )}
      </div>
    </div>
  );
}
