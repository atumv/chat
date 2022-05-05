import React, { useRef, useEffect } from 'react';
import { Card, Form, Input, Button, Space } from 'antd';
import { Message } from '@shared/types';
import { observer } from 'mobx-react-lite';
import appStore from '@/store/appStore';
import styles from './styles.module.css';

export const Chat: React.FC = observer(() => {
  const {
    socket,
    name,
    messages,
    currentMessage,
    setCurrentMessage,
    sendMessage,
    updateMessagesOnReceive,
  } = appStore;

  const chatBody = useRef<HTMLDivElement>(null);

  const scrollMessagesToBottom = () => {
    if (chatBody.current) {
      chatBody.current.scrollTop = chatBody.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollMessagesToBottom();
  });

  useEffect(() => {
    updateMessagesOnReceive();
  }, [socket]);

  return (
    <div className={styles.chatWindow}>
      <div className={styles.chatBody} ref={chatBody}>
        <div className={styles.messageContainer}>
          {messages.map((message: Message, idx) => (
            <Card
              className={
                name === message.author
                  ? `${styles.message} ${styles.sentMessage}`
                  : `${styles.message} ${styles.receivedMessage}`
              }
              key={idx}
              size="small"
              title={message.author}
              extra={message.time}
            >
              <p className={styles.messageText}>{message.text}</p>
            </Card>
          ))}
        </div>
      </div>

      <div className={styles.chatFooter}>
        <Form className={styles.sendForm} layout="inline" name="basic" onFinish={sendMessage}>
          <Space size="small">
            <Form.Item noStyle>
              <Input
                className={styles.messageInput}
                type="text"
                size="large"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                autoFocus
              />
            </Form.Item>
            <Form.Item noStyle>
              <Button className={styles.sendBtn} size="large" htmlType="submit">
                Send
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </div>
    </div>
  );
});
