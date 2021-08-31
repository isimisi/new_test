/* eslint-disable consistent-return */
import Ws from '@adonisjs/websocket-client';

import { baseUrl } from '@api/constants';
import { getSocketProtocol } from './protocol';

export class SocketConnection {
  connect() {
    this.ws = Ws(`${getSocketProtocol()}${baseUrl.split('//')[1]}`)
      .withJwtToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIsImlhdCI6MTYyODY4MzE2MX0.yuiq3etX9IKwmavvR5x8Ymu3xyHocNfhHtICJhQN3FY')
      .connect();

    this.ws.on('open', () => {
      console.log('Connection initialized');
      // start loading
    });

    this.ws.on('close', () => {
      console.log('Connection closed');
      // give message to user?
    });

    return this;
  }

  subscribe(channel, handler) {
    if (!this.ws) {
      setTimeout(() => this.subscribe(channel), 1000);
    } else {
      const result = this.ws.subscribe(channel);

      result.emit('cvr', {
        cvr: '42353639',
        erstTypes: {
          nodes: {
            VIRKSOMHED: 'Selskab',
            PERSON: 'Person'
          },
          edges: {
            EJERSKAB: 'Ejerskab'
          }
        },
        workspaceId: 358
      });

      result.on('active', (data) => {
        console.log('bull is active', data);
      });

      result.on('completed', (data) => {
        console.log('i got data', data);
      });

      result.on('error', (error) => {
        console.error(error);
        // give message to user?
      });

      return result;
    }
  }
}

export default new SocketConnection();
