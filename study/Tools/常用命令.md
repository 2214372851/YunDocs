# 常用的一些命令

## ffmpeg ts视频转mp4视频

```bash
ffmpeg -i input.ts -c copy -map 0:v -map 0:a -bsf:a aac_adtstoasc .\output.mp4
```

## Linux统计文件夹及其子文件夹中文件个数

```bash
find /path/dir -type f | wc -l
```

## Linux把查询出来的进程全部杀死

```bash
ps -ef | grep workcommod | awk '{print $2}' | xargs kill -9
```

## Linux查看文件列表时排序

在n后面加上r可倒序

```bash
ll | awk '{print $9}' | sort -k1.1n
```

## ssh 端口转发至本地

这里是将服务器本地的9090端口转发到当前机器实现当前机器的`localhost:9090`访问远程主机的`9090`端口

```bash
ssh -CNgv -L 9090:127.0.0.1:9090 username@host -p port
```
