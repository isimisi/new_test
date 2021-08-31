/* eslint-disable import/prefer-default-export */
export function getSocketProtocol() {
  return window.location.hostname === 'localhost' ? 'ws://' : 'wss://';
}
