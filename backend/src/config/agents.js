// Agent and group configuration
const agents = [
  // Sales Agents
  {
    id: 'sales-1',
    name: 'Lead Qualifier',
    description: 'AI agent that qualifies leads and prioritizes opportunities',
    groups: ['Sales', 'Executive'],
    apiEndpoint: 'https://api.unity-ai.enverus.com/agents/lead-qualifier',
    category: 'Sales'
  },
  {
    id: 'sales-2',
    name: 'Deal Analyzer',
    description: 'Analyzes deal potential and provides insights',
    groups: ['Sales', 'Executive'],
    apiEndpoint: 'https://api.unity-ai.enverus.com/agents/deal-analyzer',
    category: 'Sales'
  },
  {
    id: 'sales-3',
    name: 'Pipeline Manager',
    description: 'Manages and optimizes sales pipeline',
    groups: ['Sales', 'Executive'],
    apiEndpoint: 'https://api.unity-ai.enverus.com/agents/pipeline-manager',
    category: 'Sales'
  },
  
  // Marketing Agents
  {
    id: 'marketing-1',
    name: 'Campaign Optimizer',
    description: 'Optimizes marketing campaigns using AI',
    groups: ['Marketing', 'Executive'],
    apiEndpoint: 'https://api.unity-ai.enverus.com/agents/campaign-optimizer',
    category: 'Marketing'
  },
  {
    id: 'marketing-2',
    name: 'Content Generator',
    description: 'Generates marketing content and copy',
    groups: ['Marketing', 'Executive'],
    apiEndpoint: 'https://api.unity-ai.enverus.com/agents/content-generator',
    category: 'Marketing'
  },
  {
    id: 'marketing-3',
    name: 'Audience Insights',
    description: 'Provides deep audience analysis and insights',
    groups: ['Marketing', 'Executive'],
    apiEndpoint: 'https://api.unity-ai.enverus.com/agents/audience-insights',
    category: 'Marketing'
  },
  
  // Customer Success Agents
  {
    id: 'cs-1',
    name: 'Churn Predictor',
    description: 'Predicts customer churn risk',
    groups: ['Customer Success', 'Executive'],
    apiEndpoint: 'https://api.unity-ai.enverus.com/agents/churn-predictor',
    category: 'Customer Success'
  },
  {
    id: 'cs-2',
    name: 'Health Score Monitor',
    description: 'Monitors customer health scores',
    groups: ['Customer Success', 'Executive'],
    apiEndpoint: 'https://api.unity-ai.enverus.com/agents/health-monitor',
    category: 'Customer Success'
  },
  {
    id: 'cs-3',
    name: 'Support Assistant',
    description: 'AI-powered customer support assistant',
    groups: ['Customer Success', 'Executive'],
    apiEndpoint: 'https://api.unity-ai.enverus.com/agents/support-assistant',
    category: 'Customer Success'
  },
  
  // Product & Engineering Agents
  {
    id: 'eng-1',
    name: 'Code Reviewer',
    description: 'Automated code review and suggestions',
    groups: ['Product & Engineering', 'Executive'],
    apiEndpoint: 'https://api.unity-ai.enverus.com/agents/code-reviewer',
    category: 'Product & Engineering'
  },
  {
    id: 'eng-2',
    name: 'Bug Analyzer',
    description: 'Analyzes bugs and suggests fixes',
    groups: ['Product & Engineering', 'Executive'],
    apiEndpoint: 'https://api.unity-ai.enverus.com/agents/bug-analyzer',
    category: 'Product & Engineering'
  },
  {
    id: 'eng-3',
    name: 'Feature Prioritizer',
    description: 'Helps prioritize product features',
    groups: ['Product & Engineering', 'Executive'],
    apiEndpoint: 'https://api.unity-ai.enverus.com/agents/feature-prioritizer',
    category: 'Product & Engineering'
  },
  
  // Finance Agents
  {
    id: 'finance-1',
    name: 'Forecast Analyzer',
    description: 'Financial forecasting and analysis',
    groups: ['Finance', 'Executive'],
    apiEndpoint: 'https://api.unity-ai.enverus.com/agents/forecast-analyzer',
    category: 'Finance'
  },
  {
    id: 'finance-2',
    name: 'Expense Optimizer',
    description: 'Optimizes expenses and identifies savings',
    groups: ['Finance', 'Executive'],
    apiEndpoint: 'https://api.unity-ai.enverus.com/agents/expense-optimizer',
    category: 'Finance'
  },
  {
    id: 'finance-3',
    name: 'Risk Assessor',
    description: 'Assesses financial risks',
    groups: ['Finance', 'Executive'],
    apiEndpoint: 'https://api.unity-ai.enverus.com/agents/risk-assessor',
    category: 'Finance'
  },
  
  // Operations Agents
  {
    id: 'ops-1',
    name: 'Process Optimizer',
    description: 'Optimizes operational processes',
    groups: ['Operations', 'Executive'],
    apiEndpoint: 'https://api.unity-ai.enverus.com/agents/process-optimizer',
    category: 'Operations'
  },
  {
    id: 'ops-2',
    name: 'Resource Allocator',
    description: 'Optimizes resource allocation',
    groups: ['Operations', 'Executive'],
    apiEndpoint: 'https://api.unity-ai.enverus.com/agents/resource-allocator',
    category: 'Operations'
  },
  {
    id: 'ops-3',
    name: 'Workflow Analyzer',
    description: 'Analyzes and improves workflows',
    groups: ['Operations', 'Executive'],
    apiEndpoint: 'https://api.unity-ai.enverus.com/agents/workflow-analyzer',
    category: 'Operations'
  },
  
  // Executive Agents (All executives have access to all agents)
  {
    id: 'exec-1',
    name: 'Strategic Advisor',
    description: 'High-level strategic insights and recommendations',
    groups: ['Executive'],
    apiEndpoint: 'https://api.unity-ai.enverus.com/agents/strategic-advisor',
    category: 'Executive'
  },
  {
    id: 'exec-2',
    name: 'Performance Dashboard',
    description: 'Company-wide performance metrics and insights',
    groups: ['Executive'],
    apiEndpoint: 'https://api.unity-ai.enverus.com/agents/performance-dashboard',
    category: 'Executive'
  }
];

const groups = [
  'Sales',
  'Marketing',
  'Customer Success',
  'Product & Engineering',
  'Finance',
  'Operations',
  'Executive'
];

module.exports = {
  agents,
  groups
};
