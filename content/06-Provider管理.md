## Provider 管理
Provider 是上游模型服务的配置资源，用来统一接入不同的 AI 模型供应商、认证方式和接口协议。

### Provider 负责什么
它把供应商差异封装成标准化配置，平台只需要管理 Provider 级别的能力、成本、可用性和访问边界。

- 模型供应商：OpenAI、Claude、Qwen、Doubao、Gemini、Kimi，或企业自建模型服务
- 认证信息：API Key、Token 等凭证配置
- 接口地址：自定义 base URL、区域 endpoint、企业内网地址
- 协议兼容：OpenAI 风格、Anthropic 风格与平台自定义协议接入

### Provider 的管理价值

#### 自定义配置
在业务空间中使用自己的 API Key 和服务端点：

- 按业务线配置不同模型和不同成本策略
- 将上游接入与下游使用解耦
- 完全控制成本和配额

#### 多提供商管理
统一管理多个 Provider：

- 一个界面管理所有 API Key、协议和 endpoint
- 方便切换、对比、灰度和统一统计
- 支持按模型能力和成本做资源分层

#### 负载均衡与故障转移

- 配置多个 Provider 自动分配请求
- 主 Provider 不可用时自动切换到备用供应商
- 提高服务可用性并降低单点故障影响

### 结论
Provider 是网关治理上游模型的第一层抽象，也是 Router、API Key、计费与安全管理的前置基础。
