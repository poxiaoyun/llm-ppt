## API Key管理
API Key 是访问 AI Portal 服务的认证凭证。每个 API Key 关联到一个用户组，继承该用户组的访问权限。

1. 成本计算
LLM 服务按 Token 数量计费：
- 输入 Token：您发送给模型的文本
- 输出 Token：模型返回的文本
- 输入和输出通常有不同的单价

2. 模型限制
每个模型都有 Token 数量限制：
- 上下文窗口：单次对话支持的最大 Token 数
- 超过限制会导致调用失败
- 需要合理控制输入长度

常见模型的上下文窗口：
- GPT-3.5-turbo：4K 或 16K Token
- GPT-4：8K、32K 或 128K Token
- Claude：100K 或 200K Token
3. 性能优化
Token 数量影响响应速度：
- Token 越多，处理时间越长
- 优化 Prompt 可以减少 Token 消耗
- 提高响应速度，降低成本
