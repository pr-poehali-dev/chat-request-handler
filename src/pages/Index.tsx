import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type ActionStatus = 'active' | 'pending' | 'completed';

interface Action {
  id: string;
  title: string;
  description: string;
  icon: string;
  status: ActionStatus;
}

interface ActionGroup {
  title: string;
  subtitle?: string;
  color: 'teal' | 'red' | 'gray';
  actions: Action[];
}

const Index = () => {
  const [loadProgress] = useState(44);

  const actionGroups: ActionGroup[] = [
    {
      title: 'Действия',
      color: 'red',
      actions: [
        {
          id: '1',
          title: 'No-show алерты',
          description: 'Пинг опаздывающим / уточнить статус',
          icon: 'AlertTriangle',
          status: 'active',
        },
      ],
    },
    {
      title: 'Окна',
      subtitle: 'Заполнить экспресс-услугами',
      color: 'teal',
      actions: [
        {
          id: '2',
          title: 'Запись быстрых услуг...',
          description: '',
          icon: 'Zap',
          status: 'active',
        },
        {
          id: '3',
          title: 'Передвижка встреч...',
          description: '',
          icon: 'MoveHorizontal',
          status: 'pending',
        },
        {
          id: '4',
          title: 'Назначение клиентов...',
          description: '',
          icon: 'Send',
          status: 'pending',
        },
      ],
    },
    {
      title: 'События (inbox)',
      color: 'gray',
      actions: [
        {
          id: '5',
          title: 'Клиент пришел',
          description: '',
          icon: 'UserCheck',
          status: 'completed',
        },
        {
          id: '6',
          title: 'Перенос',
          description: '',
          icon: 'Calendar',
          status: 'completed',
        },
        {
          id: '7',
          title: 'Риск no-show',
          description: '',
          icon: 'AlertCircle',
          status: 'completed',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6 overflow-y-auto">
      <div className="max-w-3xl mx-auto space-y-6">
        <LoadingCard progress={loadProgress} />

        {actionGroups.map((group, index) => (
          <ActionGroupCard key={index} group={group} />
        ))}

        <div className="flex items-center justify-center gap-2 py-8 text-muted-foreground text-sm">
          <div className="h-px bg-border flex-1 max-w-[100px]" />
          <span>вернуться в calm</span>
          <Icon name="ArrowRight" size={16} />
        </div>
      </div>
    </div>
  );
};

const LoadingCard = ({ progress }: { progress: number }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-900/30 to-teal-950/30 backdrop-blur-xl border border-teal-700/30 p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent" />
      
      <div className="relative flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Загрузка</h2>
          <p className="text-sm text-muted-foreground">orb + решения по контексту</p>
        </div>
        
        <div className="relative w-24 h-24">
          <svg className="transform -rotate-90 w-24 h-24">
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="6"
              fill="none"
              className="text-teal-950/50"
            />
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="6"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 40}`}
              strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
              className="text-teal-400 transition-all duration-300"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs text-muted-foreground">load</span>
            <span className="text-xl font-semibold text-teal-400">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActionGroupCard = ({ group }: { group: ActionGroup }) => {
  const colorConfig = {
    teal: {
      gradient: 'from-teal-900/30 to-teal-950/30',
      border: 'border-teal-700/30',
      glow: 'from-teal-500/5',
      actionBg: 'bg-teal-900/40',
      actionBorder: 'border-teal-600/40',
      actionHover: 'hover:bg-teal-800/50',
      badge: 'bg-teal-900/50 text-teal-300 border-teal-600/40',
    },
    red: {
      gradient: 'from-red-900/30 to-red-950/30',
      border: 'border-red-700/30',
      glow: 'from-red-500/5',
      actionBg: 'bg-red-900/40',
      actionBorder: 'border-red-600/40',
      actionHover: 'hover:bg-red-800/50',
      badge: 'bg-red-900/50 text-red-300 border-red-600/40',
    },
    gray: {
      gradient: 'from-gray-800/30 to-gray-900/30',
      border: 'border-gray-700/30',
      glow: 'from-gray-500/5',
      actionBg: 'bg-gray-800/40',
      actionBorder: 'border-gray-600/40',
      actionHover: 'hover:bg-gray-700/50',
      badge: 'bg-gray-800/50 text-gray-300 border-gray-600/40',
    },
  };

  const config = colorConfig[group.color];

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${config.gradient} backdrop-blur-xl border ${config.border} p-6 animate-fade-in`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${config.glow} to-transparent`} />

      <div className="relative">
        <h2 className="text-lg font-semibold text-foreground mb-1">{group.title}</h2>
        {group.subtitle && (
          <p className="text-sm text-muted-foreground mb-4">{group.subtitle}</p>
        )}

        <div className="space-y-3">
          {group.actions.map((action) => (
            <ActionButton
              key={action.id}
              action={action}
              bgClass={config.actionBg}
              borderClass={config.actionBorder}
              hoverClass={config.actionHover}
              badgeClass={config.badge}
            />
          ))}
        </div>

        {group.actions.length > 3 && (
          <button className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
            <span>Смахните справа для полного inbox</span>
            <div className="flex gap-0.5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-current opacity-30" />
              ))}
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

const ActionButton = ({
  action,
  bgClass,
  borderClass,
  hoverClass,
  badgeClass,
}: {
  action: Action;
  bgClass: string;
  borderClass: string;
  hoverClass: string;
  badgeClass: string;
}) => {
  return (
    <button
      className={`w-full rounded-xl ${bgClass} border ${borderClass} ${hoverClass} p-4 transition-all text-left group`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 rounded-lg bg-yellow-400/90 flex items-center justify-center flex-shrink-0">
            <Icon name={action.icon as any} size={20} className="text-yellow-900" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium text-foreground truncate">
                {action.title}
              </h3>
              {action.status === 'pending' && (
                <Icon name="Info" size={14} className="text-primary flex-shrink-0" />
              )}
            </div>
            {action.description && (
              <p className="text-xs text-muted-foreground mt-0.5">{action.description}</p>
            )}
          </div>
        </div>

        <Badge className={`${badgeClass} border text-xs ml-3 flex-shrink-0`}>
          Авто-правило
        </Badge>
      </div>

      {action.status === 'pending' && (
        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 rounded-full bg-primary/50"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      )}
    </button>
  );
};

export default Index;
