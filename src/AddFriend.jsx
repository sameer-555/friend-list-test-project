import "./styles.css";

const AddFriend = ({ add, onInput, input }) => {
  return (
    <input
      className="add-friend-bar"
      placeholder="Enter your friend's Name"
      type="text"
      value={input}
      onChange={onInput}
      onKeyDown={add}
    />
  );
};

export default AddFriend;
