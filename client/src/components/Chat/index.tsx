import React, { useRef, useEffect } from 'react';
import { Card, Form, Input, Button, Space } from 'antd';
import { Message } from '@shared/utils/interfaces';
import { observer } from 'mobx-react-lite';
import appStore from '@/store/appStore';
import './styles.css';

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
    <div className="chat-window">
      <div className="chat-body" ref={chatBody}>
        <div className="message-container">
          {messages.map((message: Message, idx) => (
            <Card
              className={
                name === message.author ? 'message sent-message' : 'message received-message'
              }
              key={idx}
              size="small"
              title={message.author}
              extra={message.time}
            >
              <p className="message-text">{message.text}</p>
            </Card>
          ))}
        </div>
      </div>

      <div className="chat-footer">
        <Form className="send-form" layout="inline" name="basic" onFinish={sendMessage}>
          <Space size="small">
            <Form.Item noStyle>
              <Input
                className="msg-input"
                type="text"
                size="large"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                autoFocus
              />
            </Form.Item>
            <Form.Item noStyle>
              <Button className="send-btn" size="large" htmlType="submit">
                Send
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </div>
    </div>
  );
});
