import http from 'k6/http';
import { check, sleep } from 'k6';


export let options = {
  vus: 100,
  duration: '30s',
};

export default function () {
  const review_id = Math.floor(Math.random() * 10000000) + 1
  const res  = http.put(`http://localhost:3001/api/reviews/${review_id}/unhelpful/5`);
  for (let i = 0; i < 10; i++) {
    check(res, {
      'response code was 200': (res) => res.status === 200,
      'transaction time < 2000ms': r => r.timings.duration < 2000,
      'no errors': (r) => !r.error
    });
  }
 sleep(0.01)
}
