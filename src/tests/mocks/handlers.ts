import { rest } from 'msw';
import words from './words.json';

export const handlers = [
    rest.get('http://localhost:5173/words.json', async (_, res, ctx) => {
        return res(ctx.status(200), ctx.json(words));
    }),
];
