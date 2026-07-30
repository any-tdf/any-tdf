export type ConfigProviderMode = 'primary' | 'dark' | string;

// 输入配置模式，返回框架无关的根节点 class。
// Consume config mode and return framework-agnostic root classes.
export const resolveConfigProviderModeClass = (mode: ConfigProviderMode = 'primary') => (mode === 'dark' ? 'dark' : '');
