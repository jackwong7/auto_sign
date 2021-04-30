
/**
 * @fileoverview Template to compose HTTP reqeuest.
 * 
 */

const url = `https://kd.youth.cn/WebApi/NewTaskIos/sendTwentyScore?uuid=ac5bb049d93188b9d0dfa0aabffb7548&sign=67e536ec7b2f1837c22c7605ef24dfce&channel_code=80000000&uid=51753877&channel=80000000&access=WIfI&app_version=2.0.2&device_platform=iphone&cookie_id=9c614bdf2fd972959dcdf8d63d27d0be&openudid=ac5bb049d93188b9d0dfa0aabffb7548&device_type=1&device_brand=iphone&sm_device_id=20201127234421e77da5731661320917f2d478e5c13d3001979167dfd84b71&device_id=48514983&version_code=202&os_version=14.5&cookie=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualq2jmrCarWOwt5dqhLKcma_eqmqXr6NthJl7mI-shMmXeqDau4StacS3o7GFonqWr6m2qoKJeWmEY2Ft&device_model=iPhone_6_Plus&subv=1.5.1&&cookie=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualq2jmrCarWOwt5dqhLKcma_eqmqXr6NthJl7mI-shMmXeqDau4StacS3o7GFonqWr6m2qoKJeWmEY2Ft&cookie_id=9c614bdf2fd972959dcdf8d63d27d0be&action=watch_video_reward&uuid=ac5bb049d93188b9d0dfa0aabffb7548&sign=67e536ec7b2f1837c22c7605ef24dfce&channel_code=80000000&uid=51753877&channel=80000000&access=WIfI&app_version=2.0.2&device_platform=iphone&cookie_id=9c614bdf2fd972959dcdf8d63d27d0be&openudid=ac5bb049d93188b9d0dfa0aabffb7548&device_type=1&device_brand=iphone&sm_device_id=20201127234421e77da5731661320917f2d478e5c13d3001979167dfd84b71&device_id=48514983&version_code=202&os_version=14.5&cookie=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualq2jmrCarWOwt5dqhLKcma_eqmqXr6NthJl7mI-shMmXeqDau4StacS3o7GFonqWr6m2qoKJeWmEY2Ft&device_model=iPhone_6_Plus&subv=1.5.1&=undefined&request_time=1616560773`;
const method = `GET`;
const headers = {
'Accept-Encoding' : `gzip, deflate, br`,
'Cookie' : `Hm_lpvt_268f0a31fc0d047e5253dd69ad3a4775=1616560771; Hm_lvt_268f0a31fc0d047e5253dd69ad3a4775=1616342686,1616371086,1616415283,1616560741; sensorsdata2019jssdkcross=%7B%22distinct_id%22%3A%2251753877%22%2C%22%24device_id%22%3A%22177d1bdc523353-070bffc88f337e-754c1251-304500-177d1bdc524632%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_referrer_host%22%3A%22%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%7D%2C%22first_id%22%3A%22177d1bdc523353-070bffc88f337e-754c1251-304500-177d1bdc524632%22%7D; Hm_lpvt_6c30047a5b80400b0fd3f410638b8f0c=1616560741; Hm_lvt_6c30047a5b80400b0fd3f410638b8f0c=1614729542,1615509195,1616033986,1616560741`,
'Connection' : `keep-alive`,
'Content-Type' : ``,
'Accept' : `*/*`,
'Host' : `kd.youth.cn`,
'User-Agent' : `Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148`,
'Referer' : `https://kd.youth.cn/h5/20190301taskcenter/ios/index.html?uuid=ac5bb049d93188b9d0dfa0aabffb7548&sign=67e536ec7b2f1837c22c7605ef24dfce&channel_code=80000000&uid=51753877&channel=80000000&access=WIfI&app_version=2.0.2&device_platform=iphone&cookie_id=9c614bdf2fd972959dcdf8d63d27d0be&openudid=ac5bb049d93188b9d0dfa0aabffb7548&device_type=1&device_brand=iphone&sm_device_id=20201127234421e77da5731661320917f2d478e5c13d3001979167dfd84b71&device_id=48514983&version_code=202&os_version=14.5&cookie=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualq2jmrCarWOwt5dqhLKcma_eqmqXr6NthJl7mI-shMmXeqDau4StacS3o7GFonqWr6m2qoKJeWmEY2Ft&device_model=iPhone_6_Plus&subv=1.5.1&&cookie=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualq2jmrCarWOwt5dqhLKcma_eqmqXr6NthJl7mI-shMmXeqDau4StacS3o7GFonqWr6m2qoKJeWmEY2Ft&cookie_id=9c614bdf2fd972959dcdf8d63d27d0be`,
'Accept-Language' : `zh-cn`,
'X-Requested-With' : `XMLHttpRequest`
};
const body = ``;

const myRequest = {
    url: url,
    method: method,
    headers: headers,
    body: body
};

$task.fetch(myRequest).then(response => {
    console.log(response.statusCode + "\n\n" + response.body);
    $done();
}, reason => {
    console.log(reason.error);
    $done();
});
