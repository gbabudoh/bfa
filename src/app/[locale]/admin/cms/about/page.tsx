"use client";

import React, { useState, useEffect } from 'react';
import { 
  Save, 
  Plus, 
  Trash2, 
  Loader2, 
  CheckCircle, 
  AlertCircle,
  Users,
  Briefcase,
  Globe,
  TrendingUp,
  Layout,
  Image as ImageIcon
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface MissionPoint {
  icon: string;
  title: string;
  description: string;
}

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

interface Partner {
  name: string;
  logo: string;
}

interface ImpactStat {
  value: string;
  label: string;
}

interface AboutPageData {
  heroTitle: string;
  heroDescription: string;
  heroCTA: string;
  storyTitle: string;
  storyContent: string;
  storyImage: string | null;
  missionTitle: string;
  missionDescription: string;
  missionPoints: MissionPoint[];
  teamDescription: string;
  teamMembers: TeamMember[];
  partnersDescription: string;
  partners: Partner[];
  impactTitle: string;
  impactDescription: string;
  impactStats: ImpactStat[];
  countriesTitle: string;
  countriesDescription: string;
  countries: string[];
}

export default function AdminAboutCMS() {
  const [data, setData] = useState<AboutPageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [activeTab, setActiveTab] = useState('HERO_STORY');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/about');
      const result = await res.json();
      
      // Check if we got valid data (has heroTitle field)
      if (result && result.heroTitle) {
        setData(result);
      } else if (result.error) {
        throw new Error(result.error);
      } else {
        throw new Error('Invalid data received');
      }
    } catch (error) {
      console.error('Error fetching about page data:', error);
      setFeedback({ type: 'error', message: 'Failed to load About page data. Please refresh.' });
      // Set default data so page can still render
      setData({
        heroTitle: 'About Buy from Africa',
        heroDescription: 'Connecting African businesses to global markets.',
        heroCTA: 'Explore Our Vendors',
        storyTitle: 'Our Story',
        storyContent: '',
        storyImage: null,
        missionTitle: 'Our Mission',
        missionDescription: '',
        missionPoints: [],
        teamDescription: '',
        teamMembers: [],
        partnersDescription: '',
        partners: [],
        impactTitle: 'Our Impact',
        impactDescription: '',
        impactStats: [],
        countriesTitle: 'Where We Work',
        countriesDescription: '',
        countries: []
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!data) return;
    setIsSaving(true);
    setFeedback(null);
    try {
      const res = await fetch('/api/admin/about', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setFeedback({ type: 'success', message: 'About page updated successfully' });
      } else {
        throw new Error('Failed to update data');
      }
    } catch (error) {
      console.error('Error saving about page data:', error);
      setFeedback({ type: 'error', message: 'Failed to save changes' });
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = <K extends keyof AboutPageData>(field: K, value: AboutPageData[K]) => {
    if (!data) return;
    setData({ ...data, [field]: value });
  };

  const addListItem = <K extends 'missionPoints' | 'teamMembers' | 'partners' | 'impactStats' | 'countries'>(
    field: K, 
    defaultItem: AboutPageData[K] extends (infer U)[] ? U : never
  ) => {
    if (!data) return;
    const currentList = Array.isArray(data[field]) ? data[field] : [];
    setData({ ...data, [field]: [...currentList, defaultItem] as AboutPageData[K] });
  };

  const removeListItem = (field: 'missionPoints' | 'teamMembers' | 'partners' | 'impactStats' | 'countries', index: number) => {
    if (!data) return;
    const currentList = Array.isArray(data[field]) ? [...data[field]] : [];
    currentList.splice(index, 1);
    setData({ ...data, [field]: currentList });
  };

  const updateListItem = <K extends 'missionPoints' | 'teamMembers' | 'partners' | 'impactStats'>(
    field: K, 
    index: number, 
    subfield: string, 
    value: string
  ) => {
    if (!data) return;
    const currentList = Array.isArray(data[field]) ? [...data[field]] : [];
    currentList[index] = { ...currentList[index], [subfield]: value };
    setData({ ...data, [field]: currentList as AboutPageData[K] });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 text-yellow-600 animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Loading About page content...</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 flex items-center">
            <Layout className="mr-3 h-8 w-8 text-yellow-600" />
            Manage About Page
          </h1>
          <p className="text-gray-500 font-medium mt-1">
            Dynamic management of your marketplace story and team.
          </p>
        </div>
        <div className="flex space-x-3">
          <Link 
            href="/about" 
            target="_blank"
            className="bg-white border border-gray-200 px-5 py-2.5 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition flex items-center shadow-sm"
          >
            Preview Page
          </Link>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-yellow-600 text-white px-6 py-2.5 rounded-xl text-sm font-black hover:bg-yellow-700 transition flex items-center shadow-lg shadow-yellow-100 disabled:opacity-50 active:scale-95 cursor-pointer"
          >
            {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            Save Changes
          </button>
        </div>
      </div>

      {feedback && (
        <div className={`mb-8 p-4 rounded-xl flex items-center animate-in fade-in duration-300 ${feedback.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
          {feedback.type === 'success' ? <CheckCircle className="h-5 w-5 mr-3" /> : <AlertCircle className="h-5 w-5 mr-3" />}
          <span className="font-bold">{feedback.message}</span>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 sticky top-24">
            {[
              { id: 'HERO_STORY', label: 'Hero & Story', icon: <ImageIcon className="h-4 w-4" /> },
              { id: 'MISSION_IMPACT', label: 'Mission & Impact', icon: <TrendingUp className="h-4 w-4" /> },
              { id: 'TEAM', label: 'Team Members', icon: <Users className="h-4 w-4" /> },
              { id: 'PARTNERS', label: 'Partners', icon: <Briefcase className="h-4 w-4" /> },
              { id: 'COUNTRIES', label: 'Countries & SEO', icon: <Globe className="h-4 w-4" /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-bold transition mb-1 cursor-pointer ${activeTab === tab.id ? 'bg-yellow-50 text-yellow-700 shadow-sm border border-yellow-100' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                <span className={`p-1.5 rounded-lg mr-3 ${activeTab === tab.id ? 'bg-yellow-200 text-yellow-800' : 'bg-gray-100 text-gray-500'}`}>
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:w-3/4 space-y-6">
          {activeTab === 'HERO_STORY' && (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
               <div className="p-8 border-b border-gray-50 bg-gradient-to-r from-gray-50 to-white">
                 <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Hero &amp; Founder&apos;s Story</h2>
               </div>
               <div className="p-8 space-y-8">
                 {/* Hero Section */}
                 <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Hero Title</label>
                      <input 
                        type="text" 
                        value={data.heroTitle}
                        onChange={(e) => updateField('heroTitle', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 outline-none transition font-bold text-gray-900" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Hero Description</label>
                      <textarea 
                        rows={3}
                        value={data.heroDescription}
                        onChange={(e) => updateField('heroDescription', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 outline-none transition font-medium text-gray-800"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">CTA Button Text</label>
                      <input 
                        type="text" 
                        value={data.heroCTA}
                        onChange={(e) => updateField('heroCTA', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 outline-none transition font-bold text-gray-900" 
                      />
                    </div>
                 </div>

                 {/* Story Section */}
                 <div className="pt-8 border-t border-gray-50 space-y-6">
                    <div>
                      <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Story Title</label>
                      <input 
                        type="text" 
                        value={data.storyTitle}
                        onChange={(e) => updateField('storyTitle', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 outline-none transition font-bold text-gray-900" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Detailed Story Content</label>
                      <textarea 
                        rows={10}
                        value={data.storyContent}
                        onChange={(e) => updateField('storyContent', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 outline-none transition font-medium text-gray-800 leading-relaxed"
                      />
                      <p className="mt-2 text-xs text-gray-400 italic">Use newlines to separate paragraphs in the story.</p>
                    </div>
                 </div>
               </div>
            </div>
          )}

          {activeTab === 'MISSION_IMPACT' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-50 bg-gradient-to-r from-gray-50 to-white">
                  <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Mission & Objectives</h2>
                </div>
                <div className="p-8 space-y-6">
                  <div>
                    <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Mission Title</label>
                    <input 
                      type="text" 
                      value={data.missionTitle}
                      onChange={(e) => updateField('missionTitle', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 outline-none transition font-bold" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Base Description</label>
                    <textarea 
                      rows={3}
                      value={data.missionDescription}
                      onChange={(e) => updateField('missionDescription', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 outline-none transition"
                    />
                  </div>

                  <div className="pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-sm font-black text-gray-700 uppercase tracking-widest">Key Pillars</label>
                      <button 
                        onClick={() => addListItem('missionPoints', { icon: 'Star', title: 'New Pillar', description: '' })}
                        className="text-xs font-bold text-yellow-600 flex items-center hover:underline cursor-pointer"
                      >
                        <Plus className="h-3 w-3 mr-1" /> Add Pillar
                      </button>
                    </div>
                    <div className="space-y-4">
                      {data.missionPoints.map((point, index) => (
                        <div key={index} className="flex gap-4 p-4 border border-gray-100 rounded-2xl bg-gray-50/50 relative group">
                          <div className="flex-1 space-y-3">
                            <div className="grid grid-cols-2 gap-4">
                              <input 
                                placeholder="Icon (Globe, Heart, TrendingUp...)"
                                value={point.icon}
                                onChange={(e) => updateListItem('missionPoints', index, 'icon', e.target.value)}
                                className="px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-yellow-500 text-sm font-bold"
                              />
                              <input 
                                placeholder="Pillar Title"
                                value={point.title}
                                onChange={(e) => updateListItem('missionPoints', index, 'title', e.target.value)}
                                className="px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-yellow-500 text-sm font-bold"
                              />
                            </div>
                            <textarea 
                              placeholder="Pillar Description"
                              value={point.description}
                              onChange={(e) => updateListItem('missionPoints', index, 'description', e.target.value)}
                              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-yellow-500 text-sm"
                              rows={2}
                            />
                          </div>
                          <button 
                            onClick={() => removeListItem('missionPoints', index)}
                            className="text-gray-300 hover:text-red-500 transition cursor-pointer self-start"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-50 bg-gradient-to-r from-gray-50 to-white">
                  <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Impact Stats</h2>
                </div>
                <div className="p-8 space-y-6">
                   <div className="grid grid-cols-2 gap-4">
                      {data.impactStats.map((stat, index) => (
                        <div key={index} className="flex gap-4 p-4 border border-gray-100 rounded-2xl bg-gray-50 relative group">
                          <div className="flex-1 grid grid-cols-2 gap-2">
                             <input 
                                value={stat.value}
                                onChange={(e) => updateListItem('impactStats', index, 'value', e.target.value)}
                                className="px-3 py-2 rounded-lg border border-gray-200 font-black text-lg text-yellow-600"
                             />
                             <input 
                                value={stat.label}
                                onChange={(e) => updateListItem('impactStats', index, 'label', e.target.value)}
                                className="px-3 py-2 rounded-lg border border-gray-200 font-bold text-gray-500"
                             />
                          </div>
                          <button 
                            onClick={() => removeListItem('impactStats', index)}
                            className="text-gray-300 hover:text-red-500 transition cursor-pointer self-center"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                   </div>
                   <button 
                    onClick={() => addListItem('impactStats', { value: '0', label: 'New Metric' })}
                    className="w-full py-3 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 hover:border-yellow-400 hover:text-yellow-600 transition font-bold flex items-center justify-center cursor-pointer"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Stat Metric
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'TEAM' && (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-8 border-b border-gray-50 bg-gradient-to-r from-gray-50 to-white">
                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">The Executive Team</h2>
              </div>
              <div className="p-8 space-y-6">
                <div>
                  <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Team Section Intro</label>
                  <textarea 
                    rows={3}
                    value={data.teamDescription}
                    onChange={(e) => updateField('teamDescription', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 outline-none transition font-medium"
                  />
                </div>

                <div className="space-y-6 pt-6">
                  {data.teamMembers.map((member, index) => (
                    <div key={index} className="flex flex-col md:flex-row gap-6 p-6 border border-gray-100 rounded-3xl bg-gray-50/30 relative group">
                      <div className="md:w-1/4">
                         <div className="aspect-square rounded-2xl bg-gray-200 overflow-hidden relative">
                            {member.image ? (
                              <Image src={member.image} alt={member.name} fill className="object-cover" unoptimized />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <ImageIcon className="h-10 w-10" />
                              </div>
                            )}
                         </div>
                         <input 
                           type="text"
                           placeholder="Image URL"
                           value={member.image}
                           onChange={(e) => updateListItem('teamMembers', index, 'image', e.target.value)}
                           className="w-full mt-2 px-3 py-2 rounded-lg border border-gray-200 text-[10px] font-mono"
                         />
                      </div>
                      <div className="md:w-3/4 space-y-4">
                         <div className="grid grid-cols-2 gap-4">
                            <div>
                               <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Name</label>
                               <input 
                                 value={member.name}
                                 onChange={(e) => updateListItem('teamMembers', index, 'name', e.target.value)}
                                 className="w-full px-3 py-2 rounded-lg border border-gray-200 font-bold"
                               />
                            </div>
                            <div>
                               <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Role</label>
                               <input 
                                 value={member.role}
                                 onChange={(e) => updateListItem('teamMembers', index, 'role', e.target.value)}
                                 className="w-full px-3 py-2 rounded-lg border border-gray-200 font-bold text-yellow-600"
                               />
                            </div>
                         </div>
                         <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Brief Bio</label>
                            <textarea 
                               rows={3}
                               value={member.bio}
                               onChange={(e) => updateListItem('teamMembers', index, 'bio', e.target.value)}
                               className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm italic"
                            />
                         </div>
                      </div>
                      <button 
                        onClick={() => removeListItem('teamMembers', index)}
                        className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition cursor-pointer"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                  <button 
                    onClick={() => addListItem('teamMembers', { name: 'Full Name', role: 'Role/Position', bio: '', image: '' })}
                    className="w-full py-4 border-2 border-dashed border-gray-200 rounded-3xl text-gray-400 hover:border-yellow-400 hover:text-yellow-600 transition font-black flex items-center justify-center cursor-pointer"
                  >
                    <Plus className="h-5 w-5 mr-3" /> Recruit New Member
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'PARTNERS' && (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-8 border-b border-gray-50 bg-gradient-to-r from-gray-50 to-white">
                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Our Global Partners</h2>
              </div>
              <div className="p-8 space-y-6">
                 <div>
                  <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Partners Intro</label>
                  <textarea 
                    rows={3}
                    value={data.partnersDescription}
                    onChange={(e) => updateField('partnersDescription', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 outline-none transition font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6">
                   {data.partners.map((partner, index) => (
                     <div key={index} className="px-4 py-6 border border-gray-100 rounded-2xl bg-gray-50 flex flex-col items-center relative group">
                        <div className="h-12 w-full flex items-center justify-center mb-3 relative">
                           {partner.logo ? (
                             <Image 
                               src={partner.logo} 
                               alt={partner.name} 
                               fill
                               className="object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition duration-300" 
                             />
                           ) : (
                             <Briefcase className="h-8 w-8 text-gray-300" />
                           )}
                        </div>
                        <input 
                           value={partner.name}
                           onChange={(e) => updateListItem('partners', index, 'name', e.target.value)}
                           className="w-full bg-transparent text-center text-xs font-black text-gray-600 outline-none"
                        />
                        <input 
                           placeholder="Logo URL"
                           value={partner.logo}
                           onChange={(e) => updateListItem('partners', index, 'logo', e.target.value)}
                           className="w-full bg-transparent text-center text-[8px] text-gray-400 outline-none mt-1"
                        />
                        <button 
                          onClick={() => removeListItem('partners', index)}
                          className="absolute -top-2 -right-2 bg-white rounded-full p-1 border border-gray-100 shadow-sm text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                     </div>
                   ))}
                   <button 
                    onClick={() => addListItem('partners', { name: 'Partner Name', logo: '' })}
                    className="border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 hover:border-yellow-400 hover:text-yellow-600 transition font-black flex flex-col items-center justify-center cursor-pointer min-h-[120px]"
                  >
                    <Plus className="h-5 w-5 mb-2" />
                    <span className="text-xs">Add Partner</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'COUNTRIES' && (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-8 border-b border-gray-50 bg-gradient-to-r from-gray-50 to-white">
                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Geo-Presence & Countries</h2>
              </div>
              <div className="p-8 space-y-6">
                <div>
                  <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Section Title</label>
                  <input 
                    type="text" 
                    value={data.countriesTitle}
                    onChange={(e) => updateField('countriesTitle', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 font-bold" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Coverage Summary</label>
                  <textarea 
                    rows={3}
                    value={data.countriesDescription}
                    onChange={(e) => updateField('countriesDescription', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200"
                  />
                </div>

                <div className="pt-6">
                  <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-4">Countries Served (as list)</label>
                  <div className="flex flex-wrap gap-2 mb-4 p-4 border border-gray-100 rounded-2xl bg-gray-50/50">
                    {data.countries.map((country, index) => (
                      <div key={index} className="flex items-center bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-xs group">
                        <span className="text-sm font-bold text-gray-700 mr-2">{country}</span>
                        <button 
                           onClick={() => removeListItem('countries', index)}
                           className="text-gray-300 hover:text-red-500 transition cursor-pointer"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input 
                      id="new-country"
                      type="text" 
                      placeholder="Add another country..."
                      className="flex-1 px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-yellow-500 font-medium"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const val = (e.target as HTMLInputElement).value;
                          if (val) {
                            addListItem('countries', val);
                            (e.target as HTMLInputElement).value = '';
                          }
                        }
                      }}
                    />
                    <button 
                      onClick={() => {
                        const input = document.getElementById('new-country') as HTMLInputElement;
                        if (input.value) {
                          addListItem('countries', input.value);
                          input.value = '';
                        }
                      }}
                      className="bg-gray-100 px-4 py-2 rounded-xl font-bold text-gray-600 hover:bg-gray-200 transition cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
