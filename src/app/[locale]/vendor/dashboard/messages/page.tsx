"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { 
  MessageSquare,
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  Check,
  CheckCheck,
  Clock,
  ChevronLeft,
  Image as ImageIcon,
  Smile,
  Bell,
  BellOff,
  Pin,
  Archive,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  status: 'sent' | 'delivered' | 'read';
  attachments?: { type: 'image' | 'file'; url: string; name: string }[];
}

interface Conversation {
  id: string;
  participant: {
    id: string;
    name: string;
    avatar?: string;
    isOnline: boolean;
    lastSeen?: string;
  };
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isPinned: boolean;
  isMuted: boolean;
  messages: Message[];
  type: 'customer' | 'support' | 'partner';
}

// Mock data
const mockConversations: Conversation[] = [
  {
    id: '1',
    participant: {
      id: 'c1',
      name: 'Sarah Johnson',
      isOnline: true
    },
    lastMessage: 'Thank you for the quick response! I\'ll place the order now.',
    lastMessageTime: '2026-03-12T14:30:00Z',
    unreadCount: 2,
    isPinned: true,
    isMuted: false,
    type: 'customer',
    messages: [
      { id: 'm1', content: 'Hi, I\'m interested in the Kente cloth collection. Do you ship to the US?', timestamp: '2026-03-12T14:00:00Z', isOwn: false, status: 'read' },
      { id: 'm2', content: 'Hello Sarah! Yes, we ship worldwide. Delivery to the US typically takes 7-10 business days.', timestamp: '2026-03-12T14:15:00Z', isOwn: true, status: 'read' },
      { id: 'm3', content: 'That\'s great! What are the shipping costs?', timestamp: '2026-03-12T14:20:00Z', isOwn: false, status: 'read' },
      { id: 'm4', content: 'For orders over $100, shipping is free! Otherwise, it\'s a flat $15 for US deliveries.', timestamp: '2026-03-12T14:25:00Z', isOwn: true, status: 'read' },
      { id: 'm5', content: 'Thank you for the quick response! I\'ll place the order now.', timestamp: '2026-03-12T14:30:00Z', isOwn: false, status: 'delivered' }
    ]
  },
  {
    id: '2',
    participant: {
      id: 'c2',
      name: 'Michael Chen',
      isOnline: false,
      lastSeen: '2026-03-12T10:00:00Z'
    },
    lastMessage: 'Can you provide a bulk discount for 50 units?',
    lastMessageTime: '2026-03-12T10:45:00Z',
    unreadCount: 1,
    isPinned: false,
    isMuted: false,
    type: 'customer',
    messages: [
      { id: 'm6', content: 'Hello, I represent a retail chain in the UK. We\'re interested in your wooden masks.', timestamp: '2026-03-12T10:30:00Z', isOwn: false, status: 'read' },
      { id: 'm7', content: 'Hi Michael! Thank you for reaching out. We\'d be happy to discuss wholesale options.', timestamp: '2026-03-12T10:35:00Z', isOwn: true, status: 'read' },
      { id: 'm8', content: 'Can you provide a bulk discount for 50 units?', timestamp: '2026-03-12T10:45:00Z', isOwn: false, status: 'delivered' }
    ]
  },
  {
    id: '3',
    participant: {
      id: 's1',
      name: 'BFA Support',
      avatar: '/logo.png',
      isOnline: true
    },
    lastMessage: 'Your verification has been approved! You now have Gold Vendor status.',
    lastMessageTime: '2026-03-11T16:00:00Z',
    unreadCount: 0,
    isPinned: false,
    isMuted: false,
    type: 'support',
    messages: [
      { id: 'm9', content: 'Hello! Your verification documents have been received and are under review.', timestamp: '2026-03-11T14:00:00Z', isOwn: false, status: 'read' },
      { id: 'm10', content: 'Thank you! How long does the review process take?', timestamp: '2026-03-11T14:30:00Z', isOwn: true, status: 'read' },
      { id: 'm11', content: 'Typically 24-48 hours. We\'ll notify you once complete.', timestamp: '2026-03-11T14:35:00Z', isOwn: false, status: 'read' },
      { id: 'm12', content: 'Your verification has been approved! You now have Gold Vendor status.', timestamp: '2026-03-11T16:00:00Z', isOwn: false, status: 'read' }
    ]
  },
  {
    id: '4',
    participant: {
      id: 'c3',
      name: 'Amara Okonkwo',
      isOnline: true
    },
    lastMessage: 'The package arrived safely. Beautiful craftsmanship!',
    lastMessageTime: '2026-03-10T18:00:00Z',
    unreadCount: 0,
    isPinned: false,
    isMuted: true,
    type: 'customer',
    messages: [
      { id: 'm13', content: 'Hi! Just wanted to let you know the package arrived safely. Beautiful craftsmanship!', timestamp: '2026-03-10T18:00:00Z', isOwn: false, status: 'read' },
      { id: 'm14', content: 'Thank you so much for the kind words, Amara! We\'re glad you love it. 🙏', timestamp: '2026-03-10T18:15:00Z', isOwn: true, status: 'read' }
    ]
  }
];

export default function VendorMessagesPage() {
  const t = useTranslations('VendorDashboard.messages');
  const searchParams = useSearchParams();
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [showMobileList, setShowMobileList] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-select conversation from URL params
  useEffect(() => {
    const customerId = searchParams.get('customer');
    const orderId = searchParams.get('order');
    if (customerId || orderId) {
      const conv = conversations[0]; // In real app, find by customer/order ID
      setSelectedConversation(conv);
      setShowMobileList(false);
    }
  }, [searchParams, conversations]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedConversation?.messages]);

  // Filter conversations
  const filteredConversations = conversations
    .filter(conv => {
      const matchesSearch = conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterType === 'all' || 
                          (filterType === 'unread' && conv.unreadCount > 0) ||
                          (filterType === 'pinned' && conv.isPinned) ||
                          conv.type === filterType;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime();
    });

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const newMsg: Message = {
      id: `m${Date.now()}`,
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
      isOwn: true,
      status: 'sent'
    };

    setConversations(prev => prev.map(conv => 
      conv.id === selectedConversation.id
        ? { 
            ...conv, 
            messages: [...conv.messages, newMsg],
            lastMessage: newMessage.trim(),
            lastMessageTime: new Date().toISOString()
          }
        : conv
    ));

    setSelectedConversation(prev => prev ? {
      ...prev,
      messages: [...prev.messages, newMsg],
      lastMessage: newMessage.trim(),
      lastMessageTime: new Date().toISOString()
    } : null);

    setNewMessage('');
    inputRef.current?.focus();
  };
  
  const handleArchiveConversation = (id: string) => {
    setConversations(prev => prev.filter(c => c.id !== id));
    if (selectedConversation?.id === id) setSelectedConversation(null);
    setShowOptions(false);
  };

  const handleDeleteConversation = (id: string) => {
    if (confirm(t('purgeConfirm'))) {
      setConversations(prev => prev.filter(c => c.id !== id));
      if (selectedConversation?.id === id) setSelectedConversation(null);
      setShowOptions(false);
    }
  };

  const handleActionStub = (action: string) => {
    alert(t('demoMode', { action }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const togglePin = (convId: string) => {
    setConversations(prev => prev.map(conv =>
      conv.id === convId ? { ...conv, isPinned: !conv.isPinned } : conv
    ));
  };

  const toggleMute = (convId: string) => {
    setConversations(prev => prev.map(conv =>
      conv.id === convId ? { ...conv, isMuted: !conv.isMuted } : conv
    ));
  };

  const markAsRead = (convId: string) => {
    setConversations(prev => prev.map(conv =>
      conv.id === convId ? { ...conv, unreadCount: 0 } : conv
    ));
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
      return t('yesterday');
    } else if (days < 7) {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const getMessageStatus = (status: string) => {
    switch (status) {
      case 'sent':
        return <Check className="w-3 h-3 text-zinc-400" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-zinc-400" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-blue-500" />;
      default:
        return <Clock className="w-3 h-3 text-zinc-400" />;
    }
  };

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

  return (
    <div className="relative min-h-screen font-sans overflow-hidden">
      {/* Dynamic Animated Background */}
      <div className="fixed inset-0 -z-10 bg-[#f8f9fa]">
        <motion.div 
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-br from-yellow-200/20 to-amber-200/20 rounded-full blur-[120px] pointer-events-none"
        />
        <motion.div 
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-tr from-orange-200/10 to-yellow-100/20 rounded-full blur-[120px] pointer-events-none"
        />
        <div className="absolute top-1/4 left-1/3 w-[30%] h-[30%] bg-amber-100/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      </div>

      <div className="relative z-10 p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-black text-[#D9A606] uppercase tracking-[0.4em] italic">{t('subtitle')}</span>
            {totalUnread > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-bold">
                {t('newMessages', { count: totalUnread })}
              </span>
            )}
          </div>
          <h1 className="text-4xl font-black text-zinc-900 tracking-tighter">{t('title')}.</h1>
        </div>
      </div>

      {/* Main Chat Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] shadow-2xl shadow-yellow-900/5 overflow-hidden h-[calc(100vh-280px)] min-h-[600px] flex"
      >
        {/* Conversations List */}
        <div className={`w-full md:w-96 border-r border-gray-200 flex flex-col ${!showMobileList && selectedConversation ? 'hidden md:flex' : 'flex'}`}>
          {/* Search and Filter */}
          <div className="p-4 border-b border-gray-100 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl pl-10 pr-4 py-3 text-sm font-medium text-zinc-900 focus:outline-none focus:bg-white/60 focus:border-[#D9A606] focus:ring-4 focus:ring-[#D9A606]/10 transition-all placeholder:text-zinc-400 shadow-sm"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {[
                { value: 'all', label: 'All' },
                { value: 'unread', label: 'Unread' },
                { value: 'customer', label: 'Customers' },
                { value: 'support', label: 'Support' }
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setFilterType(filter.value)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all cursor-pointer shadow-sm ${
                    filterType === filter.value
                      ? 'bg-[#D9A606] text-white shadow-[#D9A606]/30'
                      : 'bg-white/40 backdrop-blur-md border border-white/60 text-zinc-600 hover:bg-white/60 hover:text-[#D9A606]'
                  }`}
                >
                  {t(`filters.${filter.value}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length > 0 ? (
              filteredConversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => {
                    setSelectedConversation(conv);
                    setShowMobileList(false);
                    markAsRead(conv.id);
                  }}
                  className={`p-5 mx-2 rounded-2xl cursor-pointer transition-all duration-300 group ${
                    selectedConversation?.id === conv.id 
                      ? 'bg-white/60 shadow-lg border border-white/60' 
                      : 'hover:bg-white/40 border border-transparent hover:border-white/40'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      {conv.participant.avatar ? (
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <Image 
                            src={conv.participant.avatar} 
                            alt={conv.participant.name}
                            width={48}
                            height={48}
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D9A606] to-[#F2B705] flex items-center justify-center text-white font-bold">
                          {conv.participant.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      )}
                      {conv.participant.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-zinc-900 truncate">{conv.participant.name}</span>
                          {conv.isPinned && <Pin className="w-3 h-3 text-[#D9A606]" />}
                          {conv.isMuted && <BellOff className="w-3 h-3 text-zinc-400" />}
                        </div>
                        <span className="text-[10px] text-zinc-400 font-medium flex-shrink-0">
                          {formatTime(conv.lastMessageTime)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-zinc-500 truncate pr-2">{conv.lastMessage}</p>
                        {conv.unreadCount > 0 && (
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#D9A606] text-white text-[10px] font-bold flex items-center justify-center">
                            {conv.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <MessageSquare className="w-12 h-12 text-zinc-300 mb-4" />
                <p className="text-zinc-500 font-medium">{t('noConversations')}</p>
              </div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        {selectedConversation ? (
          <div className={`flex-1 flex flex-col ${showMobileList ? 'hidden md:flex' : 'flex'}`}>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowMobileList(true)}
                  className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-zinc-600 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <div className="relative">
                  {selectedConversation.participant.avatar ? (
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image 
                        src={selectedConversation.participant.avatar} 
                        alt={selectedConversation.participant.name}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D9A606] to-[#F2B705] flex items-center justify-center text-white font-black text-xs shadow-lg shadow-yellow-600/20">
                      {selectedConversation.participant.name.split(' ').map(n => n?.[0]).join('')}
                    </div>
                  )}
                  {selectedConversation.participant.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>

                <div>
                  <h3 className="font-extrabold text-zinc-900 tracking-tight">{selectedConversation.participant.name}</h3>
                  <p className="text-[10px] font-black uppercase tracking-wider text-[#D9A606]">
                    {selectedConversation.participant.isOnline 
                      ? t('status.online') 
                      : selectedConversation.participant.lastSeen 
                        ? t('status.seen', { time: formatTime(selectedConversation.participant.lastSeen) })
                        : t('status.offline')
                    }
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleActionStub(t('actions.voiceCall'))}
                  className="p-2 rounded-lg hover:bg-white/60 text-zinc-500 hover:text-[#D9A606] transition-all cursor-pointer" 
                  title={t('actions.voiceCall')}
                >
                  <Phone className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleActionStub(t('actions.videoCall'))}
                  className="p-2 rounded-lg hover:bg-white/60 text-zinc-500 hover:text-[#D9A606] transition-all cursor-pointer" 
                  title={t('actions.videoCall')}
                >
                  <Video className="w-5 h-5" />
                </button>
                <div className="relative">
                  <button 
                    onClick={() => setShowOptions(!showOptions)}
                    className="p-2 rounded-lg hover:bg-gray-100 text-zinc-500 hover:text-zinc-700 transition-all cursor-pointer"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>
                  
                  {showOptions && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setShowOptions(false)}></div>
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-20 overflow-hidden">
                        <button
                           onClick={() => {
                            if (selectedConversation) togglePin(selectedConversation.id);
                            setShowOptions(false);
                          }}
                          className="w-full px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:bg-[#D9A606]/10 hover:text-[#D9A606] flex items-center gap-3 cursor-pointer transition-colors"
                        >
                          <Pin className="w-4 h-4" />
                          {selectedConversation.isPinned ? t('actions.unpin') : t('actions.pin')}
                        </button>
                        <button
                          onClick={() => {
                            if (selectedConversation) toggleMute(selectedConversation.id);
                            setShowOptions(false);
                          }}
                          className="w-full px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:bg-[#D9A606]/10 hover:text-[#D9A606] flex items-center gap-3 cursor-pointer transition-colors"
                        >
                          {selectedConversation.isMuted ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                          {selectedConversation.isMuted ? t('actions.unmute') : t('actions.mute')}
                        </button>
                        <button 
                          onClick={() => selectedConversation && handleArchiveConversation(selectedConversation.id)}
                          className="w-full px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:bg-emerald-50 hover:text-emerald-600 flex items-center gap-3 cursor-pointer transition-colors"
                        >
                          <Archive className="w-4 h-4" />
                          {t('actions.archive')}
                        </button>
                        <div className="h-[1px] bg-zinc-100 my-1" />
                        <button 
                          onClick={() => selectedConversation && handleDeleteConversation(selectedConversation.id)}
                          className="w-full px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-red-600 hover:bg-red-50 flex items-center gap-3 cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          {t('actions.purge')}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-zinc-900/5 custom-scrollbar">
              <AnimatePresence initial={false}>
                {selectedConversation.messages.map((message, index) => {
                  const showDate = index === 0 || 
                    new Date(message.timestamp).toDateString() !== 
                    new Date(selectedConversation.messages[index - 1].timestamp).toDateString();

                  return (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      {showDate && (
                        <div className="flex justify-center my-8">
                          <span className="px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-white/60 text-[10px] font-black uppercase tracking-widest text-zinc-500 shadow-sm">
                            {new Date(message.timestamp).toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </span>
                        </div>
                      )}
                      
                      <div className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[70%] ${message.isOwn ? 'order-2' : 'order-1'}`}>
                          <div
                            className={`px-5 py-3.5 rounded-[1.5rem] shadow-sm relative group/msg transition-all ${
                              message.isOwn
                                ? 'bg-zinc-900 text-white rounded-br-none shadow-zinc-900/10 hover:bg-zinc-800'
                                : 'bg-white/80 backdrop-blur-md border border-white/60 text-zinc-900 rounded-bl-none hover:bg-white'
                            }`}
                          >
                            <p className="text-sm font-medium leading-relaxed">{message.content}</p>
                          </div>
                          <div className={`flex items-center gap-1.5 mt-1.5 ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
                            <span className="text-[10px] font-bold text-zinc-400">
                              {new Date(message.timestamp).toLocaleTimeString('en-US', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </span>
                            {message.isOwn && getMessageStatus(message.status)}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => handleActionStub(t('actions.attachFile'))}
                  className="p-2 rounded-lg hover:bg-zinc-100 text-zinc-500 hover:text-[#D9A606] transition-all cursor-pointer" 
                  title={t('actions.attachFile')}
                >
                  <Paperclip className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleActionStub(t('actions.sendImage'))}
                  className="p-2 rounded-lg hover:bg-zinc-100 text-zinc-500 hover:text-[#D9A606] transition-all cursor-pointer" 
                  title={t('actions.sendImage')}
                >
                  <ImageIcon className="w-5 h-5" />
                </button>
                
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder={t('typePlaceholder')}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:border-[#D9A606] transition-all"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 cursor-pointer" title={t('actions.emoji')}>
                    <Smile className="w-5 h-5" />
                  </button>
                </div>

                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="p-3 rounded-xl bg-[#D9A606] text-white hover:bg-[#C49505] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-10 h-10 text-zinc-300" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 mb-2">{t('selectConversation')}</h3>
              <p className="text-sm text-zinc-500">{t('selectConversationDesc')}</p>
            </div>
          </div>
        )}
      </motion.div>
      </div>
    </div>
  );
}
