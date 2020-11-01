import fetch from 'node-fetch';
import AbortController from 'abort-controller';

globalThis.fetch = fetch as any;
globalThis.AbortController = AbortController as any;
