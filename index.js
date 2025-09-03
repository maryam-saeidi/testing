import http from 'k6/http';

export let options = {
  vus: 100,        // concurrent users
  iterations: 200, // total requests
};

export default function () {
  let id = __VU * 1000 + __ITER; // unique id per user+iteration
  http.get(`http://elastic:changeme@localhost:5601/kibana/api/observability/slos?param=${id}`);
}
