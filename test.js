import http from 'k6/http';
import { check, sleep } from 'k6';


export let options = {
  vus: 100,
  duration: '30s',
};

export default function () {
  const product_id = Math.floor(Math.random() * 10000000) + 1
  const res  = http.get(`http://3.134.99.115:3001/api/reviews/${product_id}/`);
  for (let i = 0; i < 10; i++) {
    check(res, {
      'response code was 200': (res) => res.status === 200,
      'transaction time < 2000ms': r => r.timings.duration < 2000,
      'no errors': (r) => !r.error
    });
  }
 sleep(0.01)
}
