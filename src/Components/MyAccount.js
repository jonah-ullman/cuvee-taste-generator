import React from 'react';
import firebase from 'firebase';

const MyAccount = (props) => {
  return (
    <div>
      <div>>Welcome, {props.user.displayName}</div>
      <button onClick={() => firebase.auth().signOut()}>Sign Out</button>
    </div>
  );
};

export default MyAccount;
