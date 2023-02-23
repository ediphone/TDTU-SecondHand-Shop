import React, { useState, useEffect } from "react";
import clsx from "clsx";
import styles from "./Chat.module.css";
import { useSelector } from "react-redux";
import { current_user, get_messages, get_contacts } from "~/redux/selector";
// import Messages from "../Messages/Messages";
import Messages from "~/pages/Messages/Messages";
import axios from "axios";
import { useDispatch } from "react-redux";
import { HomeSlide } from "../Home/HomeSlider";
import { async } from "@firebase/util";

export default function Chat() {
  const [user, setUser] = useState({});
  const [active, setActive] = useState(false);
  const [contacts, setContacts] = useState([])
  const dispatch = useDispatch();

  // const users = [
  //   { id: 1, name: "Bao", email: "51900725@student.tdtu.edu.vn" },
  //   { id: 2, name: "Hoang", email: "51900743@student.tdtu.edu.vn" },
  // ];
  const cur_user = useSelector(current_user);
  // const contacts = useSelector(get_contacts)
  // const get_messaged_user = useSelector(get_messages)
  const handleToggle = () => {
    setActive(!active);
  };

  // const get_message = async (u) => {
  //   try {
  //     const message = await axios
  //       .post(`http://localhost:4000/messages`, {
  //         from: cur_user,
  //         to: u,
  //       })
  //       .then((result) => result.data);
  //     const message_send = message.message_send;
  //     const message_receive = message.message_receive;
  //     const data_mess = message_send.concat(message_receive);
  //     const sort_mess_by_created = data_mess.sort((p1, p2) =>
  //       p1.createdAt > p2.createdAt ? 1 : p1.createdAt < p2.createdAt ? -1 : 0
  //     );
  //     dispatch(HomeSlide.actions.changeMessage(sort_mess_by_created));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const get_contacts_user = async() => {
    try {
      const get_contacts = await axios.get(`http://localhost:4000/contacts/${cur_user.email}`).then(res => res.data.contact)
      setContacts(get_contacts)
      // console.log(contacts)
      dispatch(HomeSlide.actions.contactList(get_contacts))
      // console.log(get_contacts)
    } catch (error) {
      console.log(error)
    }
  }

  // console.log(contacts)
  // const contacts = new Array(useSelector(get_contacts))
  useEffect(() => {
    // get_message(user);
    setInterval(() => {
      get_contacts_user();
    }, 1000);
  }, []);
  // get_contacts_user()
  const handle_click = (u) => {
    setUser(u);
    // console.log(u)
    handleToggle();
  };

  // console.log(contacts)
  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.box)}>
        <div className={clsx(styles.contacts)}>
          {contacts.map((u, index) => {
            return (
              <div
                key={index}
                className={clsx(styles.user, user.id === u.id && styles.active)}
                onClick={() => handle_click(u)}
              >
                <img
                  className={clsx(styles.logo)}
                  src="https://images.pexels.com/photos/1632790/pexels-photo-1632790.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                />
                <div className={clsx(styles.name_user)}>{u.name}</div>
              </div>
            );
          })}
        </div>
        <div className={clsx(styles.messages)}>
          {user && <Messages from={cur_user} to={user} />}
        </div>
      </div>
    </div>
  );
}
