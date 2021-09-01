/* eslint-disable import/prefer-default-export */
export function getSocketProtocol() {
  return ['production', 'staging'].includes(process.env.NODE_ENV) ? 'wss://' : 'ws://';
}
