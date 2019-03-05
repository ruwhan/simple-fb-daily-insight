import React from "react";
import "./AccountItem.css";

export const AccountItem = ({account, onClick}) => (
  <a href className="account-item" onClick={() => onClick(account)} alt="click to select">
    <span>{account.id}</span>
    <span>&nbsp;({account.name})</span>
    <span className="amount-spent">{account.amount_spent}</span>
  </a>
)

export default AccountItem;
