import React from 'react';
import { Row, Col, Typography, Form, Input, Button } from 'antd';
import { observer } from 'mobx-react-lite';
import appStore from '@/store/appStore';
import styles from './styles.module.css';

export const Login: React.FC = observer(() => {
  const { joinRoom, setName, setRoom } = appStore;

  return (
    <Row justify="center" align="middle">
      <Col xs={18} md={12} lg={4}>
        <Typography.Title className={styles.header}>Chat</Typography.Title>
        <Form className={styles.joinForm} onFinish={joinRoom}>
          <Form.Item name="name">
            <Input
              className={styles.joinInput}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              autoFocus
            />
          </Form.Item>
          <Form.Item name="room">
            <Input
              className={styles.joinInput}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="Room title"
            />
          </Form.Item>
          <Form.Item>
            <Button className={styles.joinBtn} type="primary" htmlType="submit">
              Join
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
});
