import "./styles.css";
import { ReactComponent as EmptyStar } from "../assets/bx-star.svg";
import { ReactComponent as TrashBin } from "../assets/bx-trash.svg";
import { ReactComponent as FilledStarr } from "../assets/bx-filledstar.svg";
import { confirm } from "react-confirm-box";

const FriendsList = ({ friends, clickFav, clickDelete }) => {
  const deleteOptionLable = {
    labels: {
      confirmable: "Confirm",
      cancellable: "Cancel"
    }
  };

  const clickDeleteConfirmation = async (optionLable, id) => {
    const result = await confirm("Are you sure?", optionLable);
    if (result) {
      clickDelete(id);
      return;
    }
  };

  return (
    <div>
      {friends.map((friend) => (
        <div className="friend" key={friend.id}>
          <div className="friend-text">
            <div className="friend-name">{friend.name}</div>
            <div className="your-friend">is your Friend</div>
          </div>

          <span className="star" onClick={() => clickFav(friend.id)}>
            {friend.fav ? <FilledStarr /> : <EmptyStar />}
          </span>

          <TrashBin
            className="trash"
            onClick={() =>
              clickDeleteConfirmation(deleteOptionLable, friend.id)
            }
          />
        </div>
      ))}
    </div>
  );
};

export default FriendsList;
