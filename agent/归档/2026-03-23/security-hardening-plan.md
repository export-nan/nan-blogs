# Raspberry Pi CM5 Security Hardening Plan
## Date: 2026-03-13
## System: epxortnanpi (Debian on ARM64)

## Current Assessment:
1. OS: Debian on Raspberry Pi CM5 (ARM64), kernel 6.12.62
2. Listening services:
   - SSH (22) - exposed
   - SMB (139, 445) - exposed (likely not needed)
   - OpenClaw gateway (18789, 18791, 18792) - localhost only
   - Trojan proxy (1080) - localhost only
   - Polipo proxy (8118) - localhost only
3. No firewall installed
4. No automatic security updates
5. Disk not encrypted
6. Sudo with NOPASSWD: ALL (should be restricted)
7. OpenClaw security warnings about proxy trust

## Hardening Steps:

### Phase 1: Basic Security
1. Install and configure firewall (ufw)
2. Harden SSH configuration
3. Disable unnecessary services (SMB if not needed)
4. Set up automatic security updates
5. Configure fail2ban for SSH protection

### Phase 2: System Hardening
6. Restrict sudo privileges
7. Enable auditd logging
8. Set up intrusion detection (aide or similar)
9. Configure system-wide security settings

### Phase 3: Application Security
10. Secure OpenClaw configuration
11. Review and secure any other applications
12. Set up backup strategy

### Phase 4: Monitoring
13. Set up log monitoring
14. Configure alerting for security events

## Notes:
- Machine will be exposed via 内网穿透 (internal network penetration)
- Need to balance security with usability
- Focus on preventing unauthorized access while maintaining functionality