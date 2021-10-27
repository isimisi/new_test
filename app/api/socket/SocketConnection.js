/* eslint-disable consistent-return */
import Ws from '@adonisjs/websocket-client';

import { baseUrl, getToken } from '@api/constants';
import { getSocketProtocol } from './protocol';


export class SocketConnection {
  connect() {
    this.ws = Ws(`${getSocketProtocol()}${baseUrl.split('//')[1]}`)
      .withJwtToken(getToken())
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

  subscribeToCvr(channel, handleCompleted, handleError, handleUncertainCompanies) {
    if (!this.ws) {
      setTimeout(() => this.subscribe(channel), 1000);
    } else {
      const result = this.ws.subscribe(channel);
      result.on('nonAutherized', () => {
        // handle unautherized situation
        console.log('non authenticated');
      });

      result.on('completed', (data) => {
        const { elements, uncertainCompanies } = data;

        if (uncertainCompanies && uncertainCompanies.length > 0) {
          handleUncertainCompanies(uncertainCompanies);
        } else {
          handleCompleted(elements);
        }
      });

      result.on('error', (error) => {
        handleError();
      });

      return result;
    }
  }
}

export default new SocketConnection();
