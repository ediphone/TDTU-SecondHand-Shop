import clsx from "clsx";
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_messages } from "../../redux/selector";
import styles from "./Messages.module.css";
import { io } from "socket.io-client";
// import { HomeSlide } from "../Home/Home.slide";
import { HomeSlide } from "../Home/HomeSlider";
import axios from "axios";
import ScrollButton from "./ScrollBottom";

const socket = io("http://localhost:4000");

export default function Messages({ from, to }) {
  const messageEndRef = useRef(null);
  const messages = useSelector(get_messages);
  const [mess, setMess] = useState("");
  const dispatch = useDispatch();
  // console.log(from, to)

  useEffect(() => {
    get_message(from, to)
    socket.on("connect", () => {
      console.log("connected socket");
    });

    socket.on("disconnect", () => {
      console.log("discconnected socket");
    });

    socket.on("get_messages", (value) => {
      const message_send = value.message_send;
      const message_receive = value.message_receive;
      const data_mess = message_send.concat(message_receive);
      const sort_mess_by_created = data_mess.sort((p1, p2) =>
        p1.createdAt > p2.createdAt ? 1 : p1.createdAt < p2.createdAt ? -1 : 0
      );
      dispatch(HomeSlide.actions.changeMessage(sort_mess_by_created));
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("get_messages");
      
    };
  }, []);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({behavior: 'smooth'});
  },[messages])

  const get_message = async (cur_user, user) => {
    try {
      const message = await axios
        .post(`http://localhost:4000/messages`, {
          from: cur_user,
          to: user,
        })
        .then((result) => result.data);
      const message_send = message.message_send;
      const message_receive = message.message_receive;
      const data_mess = message_send.concat(message_receive);
      const sort_mess_by_created = data_mess.sort((p1, p2) =>
        p1.createdAt > p2.createdAt ? 1 : p1.createdAt < p2.createdAt ? -1 : 0
      );
      dispatch(HomeSlide.actions.changeMessage(sort_mess_by_created));
      window.scrollTo({ 
      top: document.documentElement.scrollHeight, 
      behavior: 'smooth'
      /* you can also use 'auto' behaviour 
         in place of 'smooth' */
    }); 
    } catch (error) {
      console.log(error);
    }
  };

  const send_message = (e) => {
    e.preventDefault();
    socket.emit("add_message", {
      from: from,
      to: to,
      message: mess,
    });
    setMess("");
  };
  const get_message_to_set = (e) => {
    setMess(e.target.value);
  };

  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.messages)}>
        {messages.map((message, index) => {
          return (
            <div className={clsx(styles.message)} key={index}>
              <div
                className={clsx(
                  (message.from.email === from.email ) ? styles.right : styles.left
                )}
              >
                {message.message}
              </div>
            </div>
          );
        })}
        <div ref={messageEndRef} />
      </div>
      <form className={clsx(styles.input)} onSubmit={send_message}>
        <input
          className={clsx(styles.input_message)}
          type="text"
          placeholder="Type your message....."
          value={mess}
          onChange={get_message_to_set}
        />
        <ScrollButton>
          <button type="submit" className={clsx(styles.btn_send)}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </ScrollButton>
      </form>
    </div>
  );
}
