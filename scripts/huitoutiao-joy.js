
//2020.12.05 移除报错模块 时段奖励、视频签到奖励，阅读时长奖励请自行点击领取

//


const Notice=1;//设置运行多少次才通知。
const log=1;//设置0关闭日志,1开启日志



//====================================

const $iosrule = iosrule();//声明必须
const httid="A";
const huitoutiao="惠头条";
const $=new Env("惠头条")

//++++++++++++++++++++++++++++++++-

const htt_videoname="htt_videoname"+httid;
const htt_video=$iosrule.read(htt_videoname);

const htt_dongfangname="htt_dongfangname"+httid;
const htt_dongfang=$iosrule.read(htt_dongfangname);
const htt_smvideoname="htt_smvideoname"+httid;
const htt_smvideo=$iosrule.read(htt_smvideoname);


const htt_signurlckname="htt_signurlckname"+httid;
const htt_signurlck=$iosrule.read(htt_signurlckname);


const htt_signbdname="htt_signbdname"+httid;
const htt_signbd=$iosrule.read(htt_signbdname)
const htt_cashinfoname="htt_cashinfo"+httid;
const htt_cashinfo=$iosrule.read(htt_cashinfoname)
const htt_cash_amount=$iosrule.read('htt_cash_amount') || 5;



var htt_num=0;var htt_result="";

//++++++++++++++++++++++++++++++++












//++++++++++++++++++++++++++++++++

//3.需要执行的函数都写这里
function main()
{



htt_main();



}

function htt_main()
{


htt_coinall();


}



//main()


//++++++++++++++++++++++++++++++++++++
//4.基础模板




//目前每日阅读奖励 请求body失效
/*
function htt_taskread5()
  {
   var result1="【每日任务阅读奖励】";var result2="";
var tt=huitoutiao;
var htt_signbd_task=JSON.parse(htt_signbd);
htt_signbd_task.taskId=5;
    const llUrl1 = {url:"https://api.cashtoutiao.com/frontend/daily/task/revision/draw?"+htt_signurlck,headers:{"Content-Type":"application/json","User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"},body:htt_signbd_task,timeout:60};
 $iosrule.post(llUrl1, function(error, response, data) {
         if(log==1) console.log(data)
    var obj=JSON.parse(data);
   if(obj.statusCode==200)
result2="💰[金币]"+obj.reward;

else   if(obj.statusCode==-50)
result2="重复领取.🐜";

   htt_msg(result1+"\n"+result2+"\n");
   })
 }
*/

async function htt_daysign_check()
  {
      return new Promise((resolve) => {
          const llUrl1 = {url:"https://api.cashtoutiao.com/frontend/sign/record?"+htt_signurlck,headers:{"Content-Type":"application/json","User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"},body:htt_signbd,timeout:60};
          $.post(llUrl1, async (err, resp, data) => {
              try {
                  var obj=JSON.parse(data)
                  if(obj.statusCode==200)
                  {
                      if (obj.state == 0){
                          console.log('您今日还未签到,去签到');
                          await htt_daysign(obj.day,obj.signDailyRewards[obj.day+1])
                      }else{
                          console.log('您今日已签到');
                      }
                  } else{
                      console.log('获取签到状态失败'+obj.msg)
                  }
              } catch (e) {
                  //$.logErr(e, resp);
              } finally {
                  resolve()
              }
          })
      })
  }
async function htt_daysign(day,reward)
  {
      return new Promise((resolve) => {
          const llUrl1 = {url:"https://api.cashtoutiao.com/frontend/sign?"+htt_signurlck,headers:{"Content-Type":"application/json","User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"},body:htt_signbd,timeout:60};
          console.log("🔔开始签到")
          $.post(llUrl1, async (err, resp, data) => {
              try {
                  var obj=JSON.parse(data)
                  if(obj.statusCode==200)
                  {
                      console.log('签到成功🎉,今天是第'+day+'天签到,💰[金币]'+reward);
                  } else{
                      console.log('签到失败,原因:'+obj.msg)
                  }
                  console.log('签到结束')
              } catch (e) {
                  //$.logErr(e, resp);
              } finally {
                  resolve()
              }
          })
      })
  }

async function htt_hoursign()
  {
      return new Promise((resolve) => {
          const llUrl1 = {url:"https://api.cashtoutiao.com/frontend/credit/sych/reward/per/hour?"+htt_signurlck,headers:{"Content-Type":"application/json","User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"},body:htt_signbd,timeout:60};
          console.log("🔔开始领取时段奖励")
          $.post(llUrl1, async (err, resp, data) => {
              try {
                  var obj=JSON.parse(data)
                  if(obj.statusCode==200)
                  {
                      console.log('领取时段奖励成功🎉,💰[金币]'+obj.multipleInfo.credit);
                  } else{
                      console.log('领取时段奖励成功失败,原因:'+obj.msg)
                  }
                  console.log('领取时段奖励结束')
              } catch (e) {
                  //$.logErr(e, resp);
              } finally {
                  resolve()
              }
          })
      })
  }
async function htt_rerwad_statistics()
  {
      return new Promise((resolve) => {
          const llUrl1 = {url:"https://api.cashtoutiao.com/frontend/credit/summary?"+htt_signurlck,headers:{"Content-Type":"application/json","User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"},body:htt_signbd,timeout:60};
          console.log("")
          $.post(llUrl1, async (err, resp, data) => {
              try {
                  var obj=JSON.parse(data)
                  if(obj.statusCode==200)
                  {
                      console.log('🔔统计收益\n今日收益💰[金币]'+obj.userCreditSummary.todayIncome+'\n可提现余额💰[金币]'+obj.userCreditSummary.withDrawRemaining);
                  } else{
                      console.log('领取时段奖励成功失败,原因:'+obj.msg)
                  }
                  console.log('领取时段奖励结束')
              } catch (e) {
                  //$.logErr(e, resp);
              } finally {
                  resolve()
              }
          })
      })
  }

async function htt_withdraw(htt_cash_id)
  {
      return new Promise((resolve) => {
          let withdrawurl = {url:"https://api.cashtoutiao.com/frontend/product/purchase?"+htt_signurlck,headers:{"Content-Type":"application/json","User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"},body:htt_cashinfo,timeout:60};
          withdrawurl.body = JSON.parse(withdrawurl.body)
          withdrawurl.body['productId'] = htt_cash_id
          console.log("🔔开始提现"+htt_cash_amount+'元')
          $.post(withdrawurl, async (err, resp, data) => {
              try {
                  var obj=JSON.parse(data)

                  if(obj.statusCode==200 && obj.state == 0)
                  {
                      console.log('提现成功'+htt_cash_amount+'元🎉');
                      $.msg('🎉惠头条提现成功,'+htt_cash_amount+'元！！');

                  } else{
                      console.log('提现失败,原因:'+obj.msg)
                  }

                  console.log('提现结束')

              } catch (e) {
                  //$.logErr(e, resp);
              } finally {
                  resolve()
              }
          })
      })
  }


async function htt_check_withdraw() {
    if (!htt_cashinfo){
        console.log("您还未获取提现cookie")
        return;
    }
    return new Promise((resolve) => {
        let cateurl = {
            url: "https://api.cashtoutiao.com/frontend/product/list/by/category?" + htt_signurlck,
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
            },
            body:JSON.parse(htt_signbd),
            timeout: 60
        };
        cateurl.body['category'] = 1002002;
        console.log("🔔开始获取提现列表")
        $.post(cateurl, async (err, resp, data) => {
            htt_cash_id=33;
            try {
                var obj = JSON.parse(data)
                if (obj.statusCode == 200) {
                    for (key in obj.productOutlineList) {

                        valObj = obj.productOutlineList[key]
                        if (valObj.originalPrice == htt_cash_amount * 100) {
                            if (valObj.withdrawLimitProductInfo){
                                console.log('您暂时还不能提现,原因:'+valObj.withdrawLimitProductInfo.errMsg)
                            }else{
                                //可以匹配上
                                await htt_withdraw(valObj.id)
                            }
                        }
                    }
                } else {
                    console.log('获取提现列表失败,原因:' + obj.msg)
                }

                console.log('获取提现列表结束')

            } catch (e) {
                //$.logErr(e, resp);
            } finally {
                resolve()
            }
        })
    })
}



/*
function htt_signday(res)
  {
   var result1="【签到奖励】";var result2="";
var tt=huitoutiao;
    const llUrl1 = {url:"https://api.cashtoutiao.com/frontend/sign/record?"+htt_signurlck,headers:{"Content-Type":"application/json","User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"},body:htt_signbd,timeout:60};

 $iosrule.post(llUrl1, function(error, response, data) {

    if(log==1) console.log(data)
    var obj=JSON.parse(data)

   if(obj.statusCode==200)
result2=res+"  ✍🏻️[签到天数]"+obj.day;

   htt_msg(result1+"\n"+result2+"\n");
   })
 }
*/



async function htt_read_article()
  {

      return new Promise((resolve) => {

          const llUrl1 = {url:"https://api.cashtoutiao.com/frontend/read/sych/duration?"+htt_signurlck,headers:{"Content-Type":"application/json","User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"},body:htt_find(htt_dongfang),timeout:60};
          console.log("🔔开始阅读")

          $.post(llUrl1, async (err, resp, data) => {

              try {

                  var obj=JSON.parse(data)

                  if(obj.statusCode==200)
                  {
                      if (obj.state == 0){
                          console.log('阅读成功🎉,💰[金币]'+obj.incCredit+" [今日阅读时长]"+formatSeconds(obj.todayDuration));
                      }else{
                          console.log('阅读失败,原因:'+obj.msg)
                      }
                  } else{
                      console.log('看视频请求失败🌚')
                  }

          console.log('阅读结束')

              } catch (e) {
                  //$.logErr(e, resp);
              } finally {
                  resolve()
              }
          })
      })
  }




async function htt_read_video()
  {

      return new Promise((resolve) => {



          const llUrl1 = {url:"https://api.cashtoutiao.com/frontend/read/sych/duration?"+htt_signurlck,headers:{"Content-Type":"application/json","User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"},body:htt_find(htt_video),timeout:60};
          console.log('🔔开始看视频')

          $.post(llUrl1, async (err, resp, data) => {

              try {
                  var obj=JSON.parse(data)

                  if(obj.statusCode==200)
                  {
                      if (obj.state == 0){
                          console.log('看视频成功🎉,💰[金币]'+obj.incCredit+" [今日看视频时长]"+formatSeconds(obj.todayDuration));
                      }else{
                          console.log('看视频失败,原因:'+obj.msg)
                      }

                  }
                  else{
                      console.log('看视频请求失败🌚')

                  }

                  console.log('看视频结束')

              } catch (e) {
                  //$.logErr(e, resp);
              } finally {
                  resolve()
              }
          })
      })
  }


async function htt_read_smvideo()
  {


      console.log('🔔开始看小视频')

      return new Promise((resolve) => {


          const llUrl1 = {url:"https://api.cashtoutiao.com/frontend/scholarship/video/sych/duration?"+htt_signurlck,headers:{"Content-Type":"application/json","User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"},body:htt_find(htt_smvideo),timeout:60};


          $.post(llUrl1, async (err, resp, data) => {

              try {
                  var obj=JSON.parse(data)

                  if(obj.statusCode==200){
                      console.log("看小视频成功🎉");
                  }
                  else {
                      console.log('看小视频请求失败🌚')

                  }
                  console.log('看小视频结束')

              } catch (e) {
                  //$.logErr(e, resp);
              } finally {
                  resolve()
              }
          })
      })
  }


async function htt_video_reward_recive() {
    return new Promise((resolve) => {


        console.log('🔔开始获取视频任务奖励列表')
        let infourl = {
            url: "https://api.cashtoutiao.com/frontend/scholarship/video/task/info?" + htt_signurlck,
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
            },
            timeout: 60
        };

        $.post(infourl, async (err, resp, data) => {

            try {

                var info = JSON.parse(data)

                if (info.statusCode == 200) {
                    for (var key in info.taskList){
                        valObj = info.taskList[key]
                        if (valObj.state == 2){
                            //可以收取
                            await htt_draw_video(valObj.taskId)
                        }
                    }
                } else {
                    console.log('获取视频任务奖励列表失败🌚')
                }
                console.log('获取视频任务奖励列表结束')

            } catch (e) {
                //$.logErr(e, resp);
            } finally {
                resolve()
            }
        })
    })
}

async function htt_daily_task() {
    return new Promise((resolve) => {


        console.log('🔔开始获取每日任务奖励列表')
        let infourl = {
            url: "https://api.cashtoutiao.com/frontend/daily/task/revision/list?" + htt_signurlck,
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
            },
            body: htt_signbd,
            timeout: 60
        };

        $.post(infourl, async (err, resp, data) => {

            try {

                var lists = JSON.parse(data)

                if (lists.statusCode == 200) {
                    for (var key in lists.furtherTaskList){
                        valObj = lists.furtherTaskList[key]
                        if (valObj.state == 1){
                            //可以领取
                            await htt_draw_daily(valObj.taskId,valObj.title)
                        }
                    }
                    for (var key in lists.normalTaskList){
                        valObj = lists.normalTaskList[key]
                        if (valObj.state == 1){
                            //可以领取
                            await htt_draw_daily(valObj.taskId,valObj.title)
                        }
                    }
                } else {
                    console.log('获取每日任务奖励列表失败🌚')
                }
                console.log('获取每日任务奖励列表结束')

            } catch (e) {
                //$.logErr(e, resp);
            } finally {
                resolve()
            }
        })
    })
}

async function htt_draw_video(taskId){
    return new Promise((resolve) => {


        console.log('🔔开始领取视频奖励')
        let drawurl = {
            url: "https://api.cashtoutiao.com/frontend/scholarship/video/task/draw?" + htt_signurlck,
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
            },
            body: JSON.parse(htt_signbd),
            timeout: 60
        };

        drawurl.body['taskId'] = taskId;

        $.post(drawurl, async (err, resp, data) => {

            try {

                var draw = JSON.parse(data)

                if (draw.statusCode == 200) {
                    console.log('领取视频奖励成功🎉,数量:'+draw.credit)
                } else {
                    console.log('领取视频奖励失败🌚')
                }

            } catch (e) {
                //$.logErr(e, resp);
            } finally {
                resolve()
            }
        })
    })
}


async function htt_draw_daily(taskId,title){
    return new Promise((resolve) => {


        console.log('🔔开始领取'+title+'奖励')
        let drawurl = {
            url: "https://api.cashtoutiao.com/frontend/daily/task/revision/draw?" + htt_signurlck,
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
            },
            body: JSON.parse(htt_signbd),
            timeout: 60
        };

        drawurl.body['taskId'] = taskId;
        $.post(drawurl, async (err, resp, data) => {

            try {
                var draw = JSON.parse(data)
                if (draw.statusCode == 200) {
                    console.log('领取'+title+'奖励成功🎉,数量:'+draw.reward)
                } else {
                    console.log('领取'+title+'奖励失败🌚,原因:'+draw.msg)
                }
            } catch (e) {
                //$.logErr(e, resp);
            } finally {
                resolve()
            }
        })
    })
}






function htt_readtotal()
  {
   var result1="【收益统计】";var result2="";
var tt=huitoutiao;
    const llUrl1 = {url:"https://api.cashtoutiao.com/frontend/read/detail/today?"+htt_signurlck,headers:{"Content-Type":"application/json","User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"},body:htt_signbd,timeout:60};

 $iosrule.post(llUrl1, function(error, response, data) {

    var obj=JSON.parse(data)

   if(obj.statusCode==200)
   {result2=
 "[总金币]"+obj.userDailyReadRecord.durationCredit+"💰 "+formatSeconds(obj.userDailyReadRecord.totalDuration)+"\n"+
 "[观看视频]"+obj.userDailyReadRecord.videoDurationCredit+"💰"+formatSeconds(obj.userDailyReadRecord.videoDuration)+"\n"+
"[观看小视频]"+obj.userDailyReadRecord.smallVideoDurationCredit+"💰"+formatSeconds(obj.userDailyReadRecord.smallVideoDuration)+" "
+"\n"+
 "[分享收益]"+obj.userDailyReadRecord.shareClickCredit+"💰";
   htt_msg(result1+"\n"+result2+"\n");
;}})
}




function htt_msg(r)
{
    return true;
    var tt=huitoutiao;
  htt_num++;htt_result+=r;
  if(log==1)console.log(htt_num)
 if(htt_num==7)
  {var loon= $iosrule.read("iosrule");
 if (typeof(loon) !="undefined")
    {loon=loon.substring(7,loon.length);
 loon++;
console.log("惠头条第"+loon+"次运行");$iosrule.write("iosrule"+loon,"iosrule");}else{loon=1;
$iosrule.write("iosrule"+loon,"iosrule")
}     if (loon%Notice==0)
    {papa(tt,"[签到-时段-视频-阅读]"+"当前运行"+loon+"次",htt_result);loon=0;$iosrule.write("iosrule"+loon,"iosrule");loon=0; htt_result ="";$iosrule.write("iosrule"+loon,"iosrule");


    }
  }
}

function rand(min, max) {
    return parseInt(Math.random() * (max - min + 1) + min, 10);
}

!(async () => {
    if (rand(1,2) === 1){
        $.done()
    }
    randMs = rand(10000, 100000)
    console.log('休息' + randMs + '毫秒');
    await $.wait(randMs);
    await htt_check_withdraw();//获取提现列表,去提现
    await htt_daily_task();//日常任务
    await htt_daysign_check();//签到检查,去签到
    await htt_hoursign();//时段奖励
    await htt_video_reward_recive();//视频奖励收取
    let randMs = rand(10000, 12000)
    console.log('休息' + randMs + '毫秒');
    await $.wait(randMs);
    await htt_read_article();//读文章
    randMs = rand(60000, 70000)
    console.log('休息' + randMs + '毫秒');
    await $.wait(randMs);
    await htt_read_video();//看视频
    randMs = rand(60000, 70000)
    console.log('休息' + randMs + '毫秒');
    await $.wait(randMs);

    await htt_read_smvideo();//看小视频

    await htt_rerwad_statistics();//收益统计
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())






function htt_coinall()

 {

//setTimeout(function(){
   //htt_daysign();
 //}, 1* 100);

 //setTimeout(function(){
   //htt_hoursign();
   //htt_taskread5();
 //}, 5* 100);

 setTimeout(function(){
   htt_read_dongfang();
 }, 6* 100);

setTimeout(function(){
   htt_read_video();
 }, 32* 1000);

setTimeout(function(){
   htt_read_smvideo();
 }, 63* 1000);


//$done()
}




function htt_find(bd) {
if(JSON.parse(bd).hasOwnProperty("token"))
  {bd=JSON.parse(bd);delete bd["token"];bd=JSON.stringify(bd);
return bd;}
else
return bd;
}





function
formatSeconds(value) {
    let result = parseInt(value)
    let h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600);
    let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
    let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));

    let res = '';
    if(h !== '00') res += `${h}小时`;
    if(m !== '00') res += `${m}分`;
    res += `${s}秒`;
    return res;
  }






function papa(x,y,z){

 $iosrule.notify(x,y,z);}

function sign(code)
{
   code=unescape(code);
   var c=String.fromCharCode(code.charCodeAt(0)-code.length);
   for(var i=1;i<code.length;i++){
       c+=String.fromCharCode(code.charCodeAt(i)-c.charCodeAt(i-1));
   }
   return c;
}



function iosrule() {
    const isRequest = typeof $request != "undefined"
    const isSurge = typeof $httpClient != "undefined"
    const isQuanX = typeof $task != "undefined"
    const notify = (title, subtitle, message) => {
        if (isQuanX) $notify(title, subtitle, message)
        if (isSurge) $notification.post(title, subtitle, message)
    }
    const write = (value, key) => {
        $.setdata(value,key);
        if (isQuanX) return $prefs.setValueForKey(value, key)
        if (isSurge) return $persistentStore.write(value, key)
    }
    const read = (key) => {
        return $.getdata(key);
        if (isQuanX) return $prefs.valueForKey(key)
        if (isSurge) return $persistentStore.read(key)
    }
    const get = (options, callback) => {
        if (isQuanX) {
            if (typeof options == "string") options = { url: options }
            options["method"] = "GET"
            $task.fetch(options).then(response => {
                response["status"] = response.statusCode
                callback(null, response, response.body)
            }, reason => callback(reason.error, null, null))
        }
        if (isSurge) $httpClient.get(options, callback)
    }
    const post = (options, callback) => {
        if (isQuanX) {
            if (typeof options == "string") options = { url: options }
            options["method"] = "POST"
            $task.fetch(options).then(response => {
                response["status"] = response.statusCode
                callback(null, response, response.body)
            }, reason => callback(reason.error, null, null))
        }
        if (isSurge) $httpClient.post(options, callback)
    }
    const end = () => {
        if (isQuanX) isRequest ? $done({}) : ""
        if (isSurge) isRequest ? $done({}) : $done()
    }
    return { isRequest, isQuanX, isSurge, notify, write, read, get, post, end }
};



function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
