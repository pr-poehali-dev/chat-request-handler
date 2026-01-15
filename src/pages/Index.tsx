import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Screen = 'chat' | 'inbox' | 'client' | 'booking' | 'result';
type BookingStatus = 'pending' | 'offered' | 'confirmed' | 'declined';

interface Client {
  id: string;
  name: string;
  isNew: boolean;
  lastMessage: string;
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('chat');
  const [bookingStatus, setBookingStatus] = useState<BookingStatus>('pending');
  const [bookingData, setBookingData] = useState({
    service: '',
    master: '',
    date: '',
    time: '',
  });

  const mockClient: Client = {
    id: '456',
    name: 'Анна Петрова',
    isNew: true,
    lastMessage: 'Можно завтра?',
  };

  const handleOfferBooking = () => {
    setBookingStatus('offered');
    setCurrentScreen('result');
    setTimeout(() => {
      setCurrentScreen('chat');
    }, 2500);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'chat':
        return <ChatScreen client={mockClient} status={bookingStatus} onAction={() => setCurrentScreen('booking')} onClientCard={() => setCurrentScreen('client')} />;
      case 'inbox':
        return <InboxScreen client={mockClient} onAction={() => setCurrentScreen('booking')} />;
      case 'client':
        return <ClientCardScreen client={mockClient} onBack={() => setCurrentScreen('chat')} onBooking={() => setCurrentScreen('booking')} />;
      case 'booking':
        return <BookingScreen data={bookingData} onChange={setBookingData} onSubmit={handleOfferBooking} onBack={() => setCurrentScreen('chat')} />;
      case 'result':
        return <ResultScreen />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md h-[700px] bg-white rounded-2xl shadow-sm overflow-hidden">
        {renderScreen()}
      </div>
    </div>
  );
};

const ChatScreen = ({ client, status, onAction, onClientCard }: { client: Client; status: BookingStatus; onAction: () => void; onClientCard: () => void }) => {
  const statusConfig = {
    pending: { text: 'Ожидает решения', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
    offered: { text: 'Предложено клиенту', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    confirmed: { text: 'Подтверждено', color: 'bg-green-50 text-green-700 border-green-200' },
    declined: { text: 'Отклонено', color: 'bg-gray-50 text-gray-700 border-gray-200' },
  };

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary">{client.name[0]}</span>
          </div>
          <div>
            <div className="font-semibold text-[15px]">{client.name}</div>
            <div className="text-xs text-muted-foreground">онлайн</div>
          </div>
        </div>
        <button className="text-muted-foreground hover:text-foreground">
          <Icon name="MoreVertical" size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        <div className="flex justify-start">
          <div className="max-w-[75%] bg-card rounded-2xl rounded-tl-md px-4 py-2.5 shadow-sm">
            <p className="text-[15px]">{client.lastMessage}</p>
            <span className="text-xs text-muted-foreground mt-1 block">14:32</span>
          </div>
        </div>

        <div className={`rounded-xl border px-4 py-3 ${statusConfig[status].color}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Clock" size={16} />
              <span className="text-sm font-medium">{statusConfig[status].text}</span>
            </div>
            <Icon name="ChevronRight" size={16} />
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-border space-y-2">
        <Button onClick={onAction} className="w-full h-11 text-[15px] font-semibold rounded-xl">
          <Icon name="Calendar" size={18} />
          Предложить время
        </Button>
        <Button onClick={onClientCard} variant="ghost" className="w-full h-11 text-[15px] font-medium">
          Карточка клиента
        </Button>
      </div>
    </div>
  );
};

const InboxScreen = ({ client, onAction }: { client: Client; onAction: () => void }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-4 border-b border-border">
        <h1 className="text-[17px] font-semibold">Входящие</h1>
        <p className="text-sm text-muted-foreground mt-1">Неразобрано: 1</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="bg-card rounded-xl border border-border p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-[15px]">{client.name}</h3>
              {client.isNew && (
                <Badge variant="secondary" className="mt-1 text-xs">
                  Новый
                </Badge>
              )}
            </div>
            <span className="text-xs text-muted-foreground">14:32</span>
          </div>
          <p className="text-sm text-muted-foreground">{client.lastMessage}</p>
        </div>
      </div>

      <div className="p-4 border-t border-border">
        <Button onClick={onAction} className="w-full h-11 text-[15px] font-semibold rounded-xl">
          <Icon name="Calendar" size={18} />
          Предложить время
        </Button>
      </div>
    </div>
  );
};

const ClientCardScreen = ({ client, onBack, onBooking }: { client: Client; onBack: () => void; onBooking: () => void }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-4 border-b border-border flex items-center gap-3">
        <button onClick={onBack} className="text-muted-foreground hover:text-foreground">
          <Icon name="ArrowLeft" size={20} />
        </button>
        <h1 className="text-[17px] font-semibold">Карточка клиента</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="text-[16px] font-semibold">{client.name}</h2>
              {client.isNew && (
                <Badge variant="secondary" className="mt-1.5 text-xs">
                  Новый клиент
                </Badge>
              )}
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-lg font-semibold text-primary">{client.name[0]}</span>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon name="Phone" size={14} />
              <span>+7 (999) 123-45-67</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon name="Mail" size={14} />
              <span>anna@example.com</span>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
          <h3 className="text-sm font-semibold mb-2">Последнее сообщение</h3>
          <p className="text-sm text-muted-foreground">{client.lastMessage}</p>
          <span className="text-xs text-muted-foreground mt-2 block">14:32</span>
        </div>
      </div>

      <div className="p-4 border-t border-border space-y-2">
        <Button onClick={onBooking} className="w-full h-11 text-[15px] font-semibold rounded-xl">
          <Icon name="Calendar" size={18} />
          Записать
        </Button>
        <Button onClick={onBack} variant="ghost" className="w-full h-11 text-[15px] font-medium">
          Назад
        </Button>
      </div>
    </div>
  );
};

const BookingScreen = ({ data, onChange, onSubmit, onBack }: { data: any; onChange: (data: any) => void; onSubmit: () => void; onBack: () => void }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-4 border-b border-border flex items-center gap-3">
        <button onClick={onBack} className="text-muted-foreground hover:text-foreground">
          <Icon name="ArrowLeft" size={20} />
        </button>
        <h1 className="text-[17px] font-semibold">Запись клиента</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="service" className="text-sm font-medium">
            Что?
          </Label>
          <Input
            id="service"
            placeholder="Услуга"
            value={data.service}
            onChange={(e) => onChange({ ...data, service: e.target.value })}
            className="h-11 text-[15px] rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="master" className="text-sm font-medium">
            Кто?
          </Label>
          <Input
            id="master"
            placeholder="Мастер"
            value={data.master}
            onChange={(e) => onChange({ ...data, master: e.target.value })}
            className="h-11 text-[15px] rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date" className="text-sm font-medium">
            Когда?
          </Label>
          <div className="grid grid-cols-2 gap-3">
            <Input
              id="date"
              type="date"
              value={data.date}
              onChange={(e) => onChange({ ...data, date: e.target.value })}
              className="h-11 text-[15px] rounded-xl"
            />
            <Input
              id="time"
              type="time"
              value={data.time}
              onChange={(e) => onChange({ ...data, time: e.target.value })}
              className="h-11 text-[15px] rounded-xl"
            />
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-border">
        <Button onClick={onSubmit} className="w-full h-11 text-[15px] font-semibold rounded-xl">
          <Icon name="Send" size={18} />
          Предложить клиенту
        </Button>
      </div>
    </div>
  );
};

const ResultScreen = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
        <Icon name="Check" size={32} className="text-green-600" />
      </div>
      <h2 className="text-[17px] font-semibold mb-2">Запись предложена</h2>
      <p className="text-sm text-muted-foreground">Клиент ожидает подтверждения</p>
    </div>
  );
};

export default Index;
