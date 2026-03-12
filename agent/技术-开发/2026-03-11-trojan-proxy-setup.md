# Trojan代理配置记录

## 配置时间
2026-03-11 18:10-18:16

## 服务器信息
- 域名：hk.export-nan.work
- 端口：443
- 密码：`[已移除，不在公开归档中]`

## 客户端配置
### 1. Trojan客户端
- 配置文件：`/home/nanpi/.config/trojan/client.json`
- SOCKS5代理：`127.0.0.1:1080`
- 日志文件：`/home/nanpi/.config/trojan/trojan.log`
- 运行状态：已启动

### 2. HTTP代理 (via Privoxy)
- 配置文件：`/etc/privoxy/config`
- HTTP代理：`http://127.0.0.1:8118`
- 转发规则：`forward-socks5 / 127.0.0.1:1080 .`
- 服务状态：已启动

## 配置文件内容
### Trojan配置 (`client.json`)
```json
{
  "run_type": "client",
  "local_addr": "127.0.0.1",
  "local_port": 1080,
  "remote_addr": "hk.export-nan.work",
  "remote_port": 443,
  "password": ["[密码已移除，不在公开归档中]"],
  "log_level": 1,
  "ssl": {
    "verify": false,
    "verify_hostname": false,
    "sni": "hk.export-nan.work",
    "alpn": ["h2", "http/1.1"],
    "reuse_session": true,
    "session_ticket": false
  },
  "tcp": {
    "no_delay": true,
    "keep_alive": true,
    "fast_open": false,
    "fast_open_qlen": 20
  }
}
```

### Privoxy配置 (新增)
```
# Trojan proxy forwarding
forward-socks5 / 127.0.0.1:1080 .
```

## 测试结果
```bash
# 测试SOCKS5代理
curl --socks5-hostname 127.0.0.1:1080 http://httpbin.org/ip

# 测试HTTP代理
curl --proxy http://127.0.0.1:8118 http://httpbin.org/ip

# 返回结果
{"origin": "47.239.160.253"}  # 代理服务器IP
```

## 使用方法
### 命令行使用
```bash
# 临时设置HTTP代理
export http_proxy=http://127.0.0.1:8118
export https_proxy=http://127.0.0.1:8118

# 临时设置SOCKS5代理
export ALL_PROXY=socks5://127.0.0.1:1080

# 使用curl测试
curl --proxy http://127.0.0.1:8118 https://api.ipify.org
```

### 浏览器配置
- HTTP代理：127.0.0.1:8118
- 或直接使用SOCKS5：127.0.0.1:1080

## 服务管理
```bash
# Trojan管理
ps aux | grep trojan
kill [PID]  # 停止
cd /home/nanpi/.config/trojan && nohup trojan -c client.json -l trojan.log &

# Privoxy管理
sudo systemctl restart privoxy
sudo systemctl status privoxy
```

## 安全说明
- 配置文件含密码，保存在私密目录（不在公开的nan-blogs/agent中）
- SSL证书验证已关闭（verify: false），如需安全连接需配置CA证书
- 仅本地访问（127.0.0.1），外部不可直接连接

## 后续优化
- 配置开机自启（systemd服务）
- 添加日志轮转
- 配置多个代理规则
- 启用SSL证书验证（如需提高安全性）