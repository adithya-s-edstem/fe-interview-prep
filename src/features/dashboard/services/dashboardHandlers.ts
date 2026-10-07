import { delay, http, HttpResponse } from 'msw';
import { createRandomSnapshot } from './createRandomSnapshot';
import { dashboardUrl } from './dashboardUrl';

export const dashboardHandlers = [
  http.get(dashboardUrl, async () => {
    const snapshot = createRandomSnapshot(new Date());
    await delay();
    return HttpResponse.json(snapshot);
  }),
];
