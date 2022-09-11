<h3 align="center">公告</h3>
由于百度网盘API的限制，下载较大的文件（目测>20M）需要携带header："User-Agent":"pan.baidu.com"，所以在下载大于20M的文件时，需要自行设置请求头，如使用curl：

```
curl -L -X GET 'YOUR_LINK' -H 'User-Agent: pan.baidu.com' 
```