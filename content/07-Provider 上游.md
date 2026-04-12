## Provider 上游
APortal 支持主流的 LLM 服务提供商，统一把不同模型接入封装成 Provider 资源。

### OpenAI
- GPT 系列模型（GPT-5.2、GPT-5.1 等）
- 支持自定义 API 端点
- 支持 Azure OpenAI Service
### Claude (Anthropic)
- Claude 系列模型（Opus、Sonnet、Haiku）
- 支持 Thinking 系列模型
- 原生协议支持
### 通义千问 (Qwen)
- 阿里云通义千问系列
- Qwen-turbo、Qwen-plus、Qwen-max
- 国内访问速度快
### 豆包 (Doubao)
- 字节跳动豆包系列
- 多种模型规格
### Gemini (Google)
- Google Gemini 系列
- 多模态能力
- 原生协议支持
### Kimi (Moonshot AI)
- 月之暗面 Kimi 系列
- 超长上下文支持
- 中文优化

### 管理原则
- 统一配置 Provider 的类型、认证和 endpoint
- 通过 Router、API Key 和业务空间完成治理
- 对多个 Provider 做切换、回退和成本控制

### 上游提供商分组

#### 国际主流
- OpenAI
- Claude
- 适合通用能力和推理场景

#### 国内主流
- Qwen
- Doubao
- 适合中文体验和本地化部署

#### 多模态与长上下文
- Gemini
- Kimi
- 适合知识密集和长文本场景

#### 私有化与自建
- 企业自建模型
- 专属 endpoint
- 适合内网和定制协议接入

### 卡片展示
- 1. OpenAI / Claude
- 2. Qwen / Doubao
- 3. Gemini / Kimi
- 4. 私有化 / 自建模型
