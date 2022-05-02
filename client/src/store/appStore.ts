import { makeObservable, observable, action } from 'mobx';
import { io, Socket } from 'socket.io-client';
import { WEB_SOCKET_HOST } from '@shared/utils/config';
import { Message } from '@shared/utils/interfaces';

class Store {
  socket: Socket = io(WEB_SOCKET_HOST);
  name: string = '';
  room: string = '';
  isLoggedIn: boolean = false;
  messages: Message[] = [];
  currentMessage: string = '';

  constructor() {
    makeObservable(this, {
      name: observable,
      room: observable,
      isLoggedIn: observable,
      messages: observable,
      currentMessage: observable,
      setName: action,
      setRoom: action,
      setIsLoggedIn: action,
      setMessages: action,
      setCurrentMessage: action,
      joinRoom: action,
      sendMessage: action,
      updateMessagesOnReceive: action,
    });
  }

  setName = (value: string) => {
    this.name = value;
  };

  setRoom = (value: string) => {
    this.room = value;
  };

  setIsLoggedIn = (value: boolean) => {
    this.isLoggedIn = value;
  };

  setMessages = (value: Message[]) => {
    this.messages = value;
  };

  setCurrentMessage = (value: string) => {
    this.currentMessage = value;
  };

  joinRoom = () => {
    if (this.name !== '' && this.room !== '') {
      this.socket.emit('join room', this.room);
      this.setIsLoggedIn(true);
    }
  };

  sendMessage = async () => {
    if (this.currentMessage !== '') {
      const message = {
        author: this.name,
        text: this.currentMessage,
        room: this.room,
        time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
      };
      await this.socket.emit('send message', message);
      this.setMessages([...this.messages, message]);
      this.setCurrentMessage('');
    }
  };

  updateMessagesOnReceive = () => {
    this.socket.on('receive message', (message: Message) => {
      this.setMessages([...this.messages, message]);
    });
  };
}

export default new Store();
