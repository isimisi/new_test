/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable consistent-return */
import Ws from "@adonisjs/websocket-client";

import { baseUrl } from "@api/constants";
import { AuthUser, getToken } from "@helpers/userInfo";
import { getSocketProtocol } from "./protocol";

export class SocketConnection {
  ws: any;

  subscribe: any;

  connect(user?: AuthUser) {
    this.ws = Ws(`${getSocketProtocol()}${baseUrl.split("//")[1]}`)
      .withJwtToken(getToken(user))
      .connect();

    this.ws.on("open", () => {
      console.log("Connection initialized");
      // start loading
    });

    this.ws.on("close", () => {
      console.log("Connection closed");
      // give message to user?
    });

    return this;
  }

  subscribeToWorkspace(channel, handleConnection) {
    if (!this.ws) {
      setTimeout(() => this.subscribe(channel), 1000);
    } else {
      const result = this.ws.subscribe(channel);

      result.on("connected", handleConnection);

      return result;
    }
  }

  subscribeToCvr(
    channel,
    handleCompleted,
    handleError?: () => void,
    handleUncertainCompanies?: (companies: any) => void
  ) {
    if (!this.ws) {
      setTimeout(() => this.subscribe(channel), 1000);
    } else {
      const result = this.ws.subscribe(channel);
      result.on("nonAutherized", () => {
        // handle unautherized situation
        console.log("non authenticated");
      });

      result.on("completed", (data) => {
        const { elements, uncertainCompanies } = data;

        if (uncertainCompanies && uncertainCompanies.length > 0) {
          handleUncertainCompanies && handleUncertainCompanies(uncertainCompanies);
        } else {
          handleCompleted(elements);
        }
      });

      result.on("error", () => {
        handleError && handleError();
      });

      return result;
    }
  }
}

export default new SocketConnection();
