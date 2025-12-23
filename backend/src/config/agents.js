// Agent and group configuration
const agents = [
  // Single-Topic Agents
  {
    id: 'nps-agent',
    name: 'Net Promoter Score',
    description: 'Track and analyze customer satisfaction metrics',
    groups: ['Sales', 'Marketing', 'Customer Success', 'Product & Engineering', 'Executive'],
    apiEndpoint: 'https://api.unity-ai.enverus.com/agents/nps',
    category: 'Analytics',
    isMultiAgent: false
  },
  {
    id: 'product-release-agent',
    name: 'Product Release Notes',
    description: 'Manage and communicate product updates',
    groups: ['Sales', 'Marketing', 'Customer Success', 'Product & Engineering', 'Executive'],
    apiEndpoint: 'https://api.unity-ai.enverus.com/agents/product-release',
    category: 'Documentation',
    isMultiAgent: false
  },
  {
    id: 'clari-calls-agent',
    name: 'Clari Calls',
    description: 'Analyze and transcribe sales calls',
    groups: ['Sales', 'Customer Success', 'Product & Engineering', 'Executive'],
    apiEndpoint: 'https://api.unity-ai.enverus.com/agents/clari-calls',
    category: 'Sales',
    isMultiAgent: false
  },
  {
    id: 'third-party-stories-agent',
    name: 'Third Party Stories',
    description: 'Collect and analyze customer success stories',
    groups: ['Sales', 'Marketing', 'Customer Success', 'Product & Engineering', 'Executive'],
    apiEndpoint: 'https://api.unity-ai.enverus.com/agents/third-party-stories',
    category: 'Customer Success',
    isMultiAgent: false
  }
];

const groups = [
  'Sales',
  'Marketing',
  'Customer Success',
  'Product & Engineering',
  'HR',
  'Finance',
  'Operations',
  'Executive'
];

module.exports = {
  agents,
  groups
};
