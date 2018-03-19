import { LogParams as Params } from '../types';

export default (params: Params) => console.log(`
Event Type: ${params.eventType}
File: ${params.fileName}
`);