import React, { useState } from 'react';
import { X, Save, RefreshCw, Check, Image as ImageIcon, Settings, Phone, Mail, Lock, LogOut, BookOpen, AlertCircle, Plus, Trash2 } from 'lucide-react';
import { ServiceItem, CatalogueItem, StoryItem } from '../types';
import { motion } from 'motion/react';

interface ArtisanalAdminProps {
  isOpen: boolean;
  onClose: () => void;
  serviceItems: ServiceItem[];
  onSaveItems: (updatedItems: ServiceItem[]) => void;
  onResetDefaults: () => void;
  catalogueItems?: CatalogueItem[];
  onSaveCatalogueItems?: (updatedCats: CatalogueItem[]) => void;
  onResetCatalogueItems?: () => void;
  stories?: StoryItem[];
  onSaveStories?: (updatedStories: StoryItem[]) => void;
  onResetStories?: () => void;
}

export default function ArtisanalAdmin({
  isOpen,
  onClose,
  serviceItems,
  onSaveItems,
  onResetDefaults,
  catalogueItems = [],
  onSaveCatalogueItems,
  onResetCatalogueItems,
  stories = [],
  onSaveStories,
  onResetStories,
}: ArtisanalAdminProps) {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Default to Categories tab
  const [adminTab, setAdminTab] = useState<'categories' | 'catalogue' | 'stories' | 'contact'>('categories');

  // Security Credentials state
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('hampers_admin_auth') === 'true';
    }
    return false;
  });
  const [authError, setAuthError] = useState<string | null>(null);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'hamper@123321') {
      setIsAuthenticated(true);
      setAuthError(null);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('hampers_admin_auth', 'true');
      }
    } else {
      setAuthError('Access Denied: Incorrect password.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    setAuthError(null);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('hampers_admin_auth');
      sessionStorage.clear();
      localStorage.removeItem('hampers_admin_auth');
    }
  };

  const handleClose = () => {
    setPassword('');
    setAuthError(null);
    // Lock on close for maximum security
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('hampers_admin_auth');
    }
    onClose();
  };

  const [phone, setPhone] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('hampers_phone_number') || "+1 (800) 555-4420";
    }
    return "+1 (800) 555-4420";
  });

  const [contactEmail, setContactEmail] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('hampers_contact_email') || "concierge@hampers4you.com";
    }
    return "concierge@hampers4you.com";
  });

  const activeItem = (serviceItems && serviceItems.length > 0) 
    ? (serviceItems[activeCategoryIndex] || serviceItems[0]) 
    : null;
  
  const [formData, setFormData] = useState({
    title: activeItem?.title || '',
    subtitle: activeItem?.subtitle || '',
    accentTitle: activeItem?.accentTitle || '',
    description: activeItem?.description || '',
    longCopy: activeItem?.longCopy || '',
    mainImage: activeItem?.mainImage || '',
    features: activeItem?.features?.join('\n') || '',
  });

  React.useEffect(() => {
    if (activeItem) {
      setFormData({
        title: activeItem.title || '',
        subtitle: activeItem.subtitle || '',
        accentTitle: activeItem.accentTitle || '',
        description: activeItem.description || '',
        longCopy: activeItem.longCopy || '',
        mainImage: activeItem.mainImage || '',
        features: activeItem.features?.join('\n') || '',
      });
    }
  }, [activeCategoryIndex, serviceItems, activeItem]);

  const [activeCatalogueIndex, setActiveCatalogueIndex] = useState<number>(0);
  const activeCatItem = (catalogueItems && catalogueItems.length > 0)
    ? (catalogueItems[activeCatalogueIndex] || catalogueItems[0])
    : null;

  const [catFormData, setCatFormData] = useState({
    title: activeCatItem?.title || '',
    subtitle: activeCatItem?.subtitle || '',
    description: activeCatItem?.description || '',
    image: activeCatItem?.image || '',
    tag: activeCatItem?.tag || '',
    dimensions: activeCatItem?.dimensions || '',
    medium: activeCatItem?.medium || '',
  });

  React.useEffect(() => {
    if (activeCatItem) {
      setCatFormData({
        title: activeCatItem.title || '',
        subtitle: activeCatItem.subtitle || '',
        description: activeCatItem.description || '',
        image: activeCatItem.image || '',
        tag: activeCatItem.tag || '',
        dimensions: activeCatItem.dimensions || '',
        medium: activeCatItem.medium || '',
      });
    }
  }, [activeCatalogueIndex, catalogueItems, activeCatItem]);

  const [activeStoryIndex, setActiveStoryIndex] = useState<number>(0);
  const activeStoryItem = (stories && stories.length > 0)
    ? (stories[activeStoryIndex] || stories[0])
    : null;

  const [storyFormData, setStoryFormData] = useState({
    title: activeStoryItem?.title || '',
    storyImage: activeStoryItem?.storyImage || '',
    text: activeStoryItem?.text || '',
  });

  React.useEffect(() => {
    if (activeStoryItem) {
      setStoryFormData({
        title: activeStoryItem.title || '',
        storyImage: activeStoryItem.storyImage || '',
        text: activeStoryItem.text || '',
      });
    }
  }, [activeStoryIndex, stories, activeStoryItem]);

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCatFieldChange = (field: string, value: string) => {
    setCatFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleStoryFieldChange = (field: string, value: string) => {
    setStoryFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Save changes block-by-block
  const handleSaveCollectionChanges = () => {
    const updatedFeatures = formData.features
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const updatedList = serviceItems.map((item, idx) => {
      if (idx === activeCategoryIndex) {
        return {
          ...item,
          title: formData.title,
          subtitle: formData.subtitle,
          accentTitle: formData.accentTitle,
          description: formData.description,
          longCopy: formData.longCopy,
          mainImage: formData.mainImage,
          features: updatedFeatures,
        };
      }
      return item;
    });

    onSaveItems(updatedList);
    setSuccessMsg("Collection modifications saved! Applying live...");
    setTimeout(() => setSuccessMsg(null), 2500);
  };

  const handleSaveCatalogueChanges = () => {
    if (!onSaveCatalogueItems || !activeCatItem) return;
    const updated = catalogueItems.map((item, idx) => {
      if (idx === activeCatalogueIndex) {
        return {
          ...item,
          title: catFormData.title,
          subtitle: catFormData.subtitle,
          description: catFormData.description,
          image: catFormData.image,
          tag: catFormData.tag,
          dimensions: catFormData.dimensions,
          medium: catFormData.medium,
        };
      }
      return item;
    });
    onSaveCatalogueItems(updated);
    setSuccessMsg("Catalog product details updated! Applying live...");
    setTimeout(() => setSuccessMsg(null), 2500);
  };

  const handleAddNewCatalogueItem = () => {
    if (!onSaveCatalogueItems) return;
    const newItem: CatalogueItem = {
      id: "cat_" + Date.now(),
      title: "New Catalog Product",
      subtitle: "Elegantly Crafted Collection",
      description: "Enter descriptions detailing the beauty and design elements of this custom creation",
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=500&auto=format&fit=crop",
      tag: "Traditional Gifts",
      dimensions: "Custom Spec Size",
      medium: "Velvet, Silk, Acrylic, Calligraphy Paper"
    };
    const updated = [...catalogueItems, newItem];
    onSaveCatalogueItems(updated);
    setActiveCatalogueIndex(updated.length - 1);
    setSuccessMsg("Added brand new catalog product! Edit details below.");
    setTimeout(() => setSuccessMsg(null), 2500);
  };

  const handleDeleteCatalogueItem = (indexToDelete: number) => {
    if (!onSaveCatalogueItems) return;
    if (catalogueItems.length <= 1) {
      alert("At least one product is required on your website catalog.");
      return;
    }
    if (window.confirm(`Are you sure you want to delete "${catalogueItems[indexToDelete]?.title}" from the catalog?`)) {
      const updated = catalogueItems.filter((_, idx) => idx !== indexToDelete);
      onSaveCatalogueItems(updated);
      setActiveCatalogueIndex(0);
      setSuccessMsg("Product deleted successfully.");
      setTimeout(() => setSuccessMsg(null), 2500);
    }
  };

  const handleSaveStoryChanges = () => {
    if (!onSaveStories || !activeStoryItem) return;
    const updated = stories.map((item, idx) => {
      if (idx === activeStoryIndex) {
        return {
          ...item,
          title: storyFormData.title,
          storyImage: storyFormData.storyImage,
          text: storyFormData.text,
        };
      }
      return item;
    });
    onSaveStories(updated);
    setSuccessMsg("Atelier story narrative updated! Applying live...");
    setTimeout(() => setSuccessMsg(null), 2500);
  };

  const handleAddNewStoryItem = () => {
    if (!onSaveStories) return;
    const newItem: StoryItem = {
      id: "story_" + Date.now(),
      title: "New Behind-the-Scenes Story",
      storyImage: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=600&auto=format&fit=crop",
      text: "A beautiful description detailing our crafting method, raw materials, or creative choices.",
    };
    const updated = [...stories, newItem];
    onSaveStories(updated);
    setActiveStoryIndex(updated.length - 1);
    setSuccessMsg("Added a new Behind-the-Scenes story! Configure details below.");
    setTimeout(() => setSuccessMsg(null), 2500);
  };

  const handleDeleteStoryItem = (indexToDelete: number) => {
    if (!onSaveStories) return;
    if (stories.length <= 1) {
      alert("At least one backstage story is required.");
      return;
    }
    if (window.confirm(`Are you sure you want to delete "${stories[indexToDelete]?.title}" from the atelier backstage?`)) {
      const updated = stories.filter((_, idx) => idx !== indexToDelete);
      onSaveStories(updated);
      setActiveStoryIndex(0);
      setSuccessMsg("Story deleted successfully.");
      setTimeout(() => setSuccessMsg(null), 2500);
    }
  };

  const handleSaveAllChanges = () => {
    // Save Category Info
    const updatedFeatures = formData.features
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const updatedList = serviceItems.map((item, idx) => {
      if (idx === activeCategoryIndex) {
        return {
          ...item,
          title: formData.title,
          subtitle: formData.subtitle,
          accentTitle: formData.accentTitle,
          description: formData.description,
          longCopy: formData.longCopy,
          mainImage: formData.mainImage,
          features: updatedFeatures,
        };
      }
      return item;
    });
    onSaveItems(updatedList);

    // Save Catalogue Item
    if (onSaveCatalogueItems && activeCatItem) {
      const updatedCats = catalogueItems.map((cat, idx) => {
        if (idx === activeCatalogueIndex) {
          return {
            ...cat,
            title: catFormData.title,
            subtitle: catFormData.subtitle,
            description: catFormData.description,
            image: catFormData.image,
            tag: catFormData.tag,
            dimensions: catFormData.dimensions,
            medium: catFormData.medium,
          };
        }
        return cat;
      });
      onSaveCatalogueItems(updatedCats);
    }

    // Save Story Item
    if (onSaveStories && activeStoryItem) {
      const updatedStr = stories.map((st, idx) => {
        if (idx === activeStoryIndex) {
          return {
            ...st,
            title: storyFormData.title,
            storyImage: storyFormData.storyImage,
            text: storyFormData.text,
          };
        }
        return st;
      });
      onSaveStories(updatedStr);
    }

    // Save contact details
    localStorage.setItem('hampers_phone_number', phone);
    localStorage.setItem('hampers_contact_email', contactEmail);

    setSuccessMsg("All changes live! Publishing website details...");
    setTimeout(() => {
      setSuccessMsg(null);
      window.location.reload();
    }, 1200);
  };

  const handleResetToOriginal = () => {
    if (window.confirm("Do you want to reset all website configurations? This reverts all customized text, products, and backstage stories back to the original studio defaults.")) {
      onResetDefaults();
      if (onResetCatalogueItems) {
        onResetCatalogueItems();
      }
      if (onResetStories) {
        onResetStories();
      }
      localStorage.removeItem('hampers_phone_number');
      localStorage.removeItem('hampers_contact_email');
      localStorage.removeItem('hampers_catalogue_items');
      localStorage.removeItem('hampers_curated_stories');
      setPhone("+1 (800) 555-4420");
      setContactEmail("concierge@hampers4you.com");
      setSuccessMsg("Original studio defaults restored! Updating page...");
      setTimeout(() => {
        setSuccessMsg(null);
        window.location.reload();
      }, 1200);
    }
  };

  if (!isOpen) return null;

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 bg-[#2D2A26]/85 backdrop-blur-xs" id="artisanal-admin-overlay">
        <div 
          className="absolute inset-0 cursor-pointer"
          onClick={handleClose}
        />

        <motion.div 
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative w-full max-w-sm bg-[#FAF8F5] p-8 rounded border border-[#EADFC9] z-10 shadow-2xl text-center flex flex-col items-center"
        >
          <div className="p-3 bg-[#AF9467]/15 text-[#AF9467] rounded-full mb-4">
            <Lock className="h-6 w-6" />
          </div>
          
          <h2 className="font-serif text-lg font-bold tracking-[0.1em] text-[#2D2A26] uppercase mb-1">
            Website Manager Login
          </h2>
          <p className="text-[10px] font-sans text-[#8C8377] uppercase tracking-wider mb-6">
            Enter password to unlock editor panel
          </p>

          <form onSubmit={handleAuthSubmit} className="w-full space-y-4">
            <div className="space-y-1.5 text-left">
              <label className="text-[10px] uppercase font-sans tracking-widest font-bold text-[#544F49] block">
                Editor Password
              </label>
              <input
                type="password"
                required
                value={password}
                autoComplete="new-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setAuthError(null);
                }}
                className="w-full text-sm font-sans px-4 py-3 bg-white border border-[#DECCB2]/80 focus:border-[#AF9467] focus:outline-hidden text-[#2D2A26] rounded-sm text-center tracking-widest font-mono font-bold"
                placeholder="••••••••••••"
                autoFocus
              />
            </div>

            {authError && (
              <p className="text-[11px] font-sans font-semibold text-red-600 text-center">
                {authError}
              </p>
            )}

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 py-2.5 px-4 bg-white hover:bg-[#FAF8F5] text-[#2D2A26] border border-[#DECCB2] text-[10px] font-sans font-bold tracking-widest uppercase transition-all duration-300 rounded-sm cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 px-4 bg-[#2D2A26] hover:bg-[#AF9467] text-white text-[10px] font-sans font-bold tracking-widest uppercase transition-all duration-300 rounded-sm shadow-md cursor-pointer"
              >
                Unlock
              </button>
            </div>
          </form>

          <div className="mt-5 text-[8px] font-sans tracking-widest text-[#8C8377]/80 uppercase">
            Passkey: hamper@123321
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end" id="artisanal-admin-overlay">
      
      {/* Dark backdrop */}
      <div 
        className="absolute inset-0 bg-[#2D2A26]/80 backdrop-blur-xs transition-opacity duration-300"
        onClick={handleClose}
      />

      <div className="relative w-full max-w-2xl bg-[#FAF8F5] h-full shadow-2xl flex flex-col z-10 border-l border-[#EADFC9]/50 overflow-hidden">
        
        {/* Simple Header */}
        <div className="bg-[#2D2A26] text-white px-6 py-4 flex items-center justify-between border-b border-[#AF9467]/20 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-1.5 bg-[#AF9467]/20 text-[#AF9467] rounded">
              <Settings className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-serif text-base font-bold tracking-wider uppercase">
                Atelier Website Editor
              </h2>
              <p className="text-[10px] text-gray-300 font-sans tracking-wide">Change shop info, photos, and stories easily</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleLogout}
              className="p-1.5 text-gray-400 hover:text-red-400 transition-colors rounded hover:bg-white/5 flex items-center space-x-1 py-1 px-2.5 text-[9px] uppercase tracking-wider font-sans font-bold border border-red-500/20 cursor-pointer"
              title="Lock website console"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Lock / Exit</span>
            </button>
            <button 
              onClick={handleClose}
              className="p-1 text-gray-400 hover:text-[#AF9467] transition-colors rounded hover:bg-white/5 cursor-pointer"
              id="admin-close-btn"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Master Navigation Tabs keeping it extremely simple and intuitive */}
        <div className="bg-[#F3EDE4]/60 border-b border-[#EADFC9]/40 px-6 py-3 flex space-x-2 overflow-x-auto shrink-0">
          {[
            { id: 'contact', title: '📞 Contact Details' },
            { id: 'categories', title: '🌸 Main Categories' },
            { id: 'catalogue', title: '🛍️ Carousel Products' },
            { id: 'stories', title: '📝 Backstage Stories' },
          ].map((tab) => {
            const isSelected = adminTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setAdminTab(tab.id as any)}
                className={`px-3.5 py-1.5 text-[11px] font-sans font-bold uppercase tracking-wider rounded transition-all cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-[#2D2A26] text-white shadow-xs'
                    : 'bg-white hover:bg-gray-100 text-[#544F49] border border-gray-200'
                }`}
              >
                {tab.title}
              </button>
            );
          })}
        </div>

        {/* Form Panel Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          
          {/* Notifications Success Toast */}
          {successMsg && (
            <div className="bg-[#AF9467]/15 border border-[#AF9467]/40 p-3 rounded text-xs text-[#8C7A5C] font-sans font-semibold flex items-center space-x-2 sticky top-0 bg-white z-10 shadow-xs">
              <Check className="h-4 w-4 text-[#AF9467]" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* TAB 1: CONTACT DETAILS */}
          {adminTab === 'contact' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded border border-gray-200 shadow-xs text-left space-y-4">
                <div>
                  <h3 className="text-xs font-sans uppercase font-bold text-[#2D2A26] border-b border-gray-100 pb-2 flex items-center space-x-1.5">
                    <Phone className="h-3.5 w-3.5 text-[#AF9467]" />
                    <span>Manage Shop Contact Details</span>
                  </h3>
                  <p className="text-[10px] text-[#8C8377] font-sans mt-1 leading-relaxed">
                    Set up the contact numbers used on your website footer, contact forms, and WhatsApp send links.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 pt-1">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-sans font-black text-[#544F49] tracking-wider block">
                      Shop Phone / WhatsApp Number
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs font-sans px-3.5 py-2.5 bg-[#FAF8F5] border border-gray-200 focus:border-[#AF9467] text-[#2D2A26] rounded-sm focus:outline-hidden font-mono"
                      placeholder="e.g. +1 (800) 555-4420"
                    />
                    <p className="text-[9px] text-[#8C8377] font-sans">Used to receive direct booking / enquiry messages via WhatsApp and Instagram.</p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-sans font-black text-[#544F49] tracking-wider block">
                      Custom Concierge Email
                    </label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full text-xs font-sans px-3.5 py-2.5 bg-[#FAF8F5] border border-gray-200 focus:border-[#AF9467] text-[#2D2A26] rounded-sm focus:outline-hidden font-mono"
                      placeholder="e.g. concierge@specialhampers.com"
                    />
                    <p className="text-[9px] text-[#8C8377] font-sans">Receives all premium invoice inquiries and custom requests from customers.</p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleSaveAllChanges}
                    className="w-full py-2.5 bg-[#AF9467] hover:bg-[#2D2A26] text-white text-[10px] font-sans font-bold uppercase tracking-widest rounded transition-all duration-200 flex items-center justify-center space-x-1"
                  >
                    <Check className="h-4 w-4" />
                    <span>Save Contact Details Only</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MAIN CATEGORIES */}
          {adminTab === 'categories' && (
            <div className="space-y-4">
              <div className="bg-[#FAF8F5] p-3 rounded border border-gray-200 text-left">
                <p className="text-[11px] text-[#544F49] font-bold uppercase tracking-wider mb-2">🌸 Step 1: Select Category Card to edit</p>
                <div className="flex flex-wrap gap-1.5">
                  {serviceItems.map((item, idx) => {
                    const isSelected = idx === activeCategoryIndex;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveCategoryIndex(idx)}
                        className={`px-3.5 py-1.5 text-[10px] font-sans font-bold uppercase tracking-wider rounded transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#AF9467] text-white shadow-xs'
                            : 'bg-white text-[#544F49] border border-gray-200 hover:border-[#AF9467]'
                        }`}
                      >
                        {item.title.split(' ').slice(1).join(' ') || item.title}
                      </button>
                    );
                  })}
                </div>
              </div>

              {activeItem && (
                <div className="bg-white p-5 rounded border border-gray-200 shadow-xs text-left space-y-4">
                  <div className="border-b border-gray-100 pb-2">
                    <h3 className="text-xs font-sans uppercase font-bold text-[#2D2A26]">🌸 Card Details - {activeItem.title}</h3>
                    <p className="text-[9px] text-[#8C8377] mt-0.5">Edit category headers, descriptive details, specs, and image reference links.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-sans font-black text-[#544F49] tracking-wider block">Collection Name</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleFieldChange('title', e.target.value)}
                        className="w-full text-xs font-sans px-3 py-2 bg-[#FAF8F5] border border-gray-200 focus:border-[#AF9467] text-[#2D2A26] rounded focus:outline-hidden"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-sans font-black text-[#544F49] tracking-wider block">Subtitle Tagline</label>
                      <input
                        type="text"
                        value={formData.subtitle}
                        onChange={(e) => handleFieldChange('subtitle', e.target.value)}
                        className="w-full text-xs font-sans px-3 py-2 bg-[#FAF8F5] border border-gray-200 focus:border-[#AF9467] text-[#2D2A26] rounded focus:outline-hidden"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[10px] uppercase font-sans font-black text-[#544F49] tracking-wider block">Exquisite Callout Quote</label>
                      <input
                        type="text"
                        value={formData.accentTitle}
                        onChange={(e) => handleFieldChange('accentTitle', e.target.value)}
                        className="w-full text-xs font-serif italic px-3 py-2 bg-[#FAF8F5] border border-gray-200 focus:border-[#AF9467] text-[#AF9467] rounded focus:outline-hidden"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[10px] uppercase font-sans font-black text-[#544F49] tracking-wider block">Main Card Photo Link (URL)</label>
                      <input
                        type="text"
                        value={formData.mainImage}
                        onChange={(e) => handleFieldChange('mainImage', e.target.value)}
                        className="w-full text-xs font-mono px-3 py-2 bg-[#FAF8F5] border border-gray-200 focus:border-[#AF9467] text-[#2D2A26] rounded focus:outline-hidden"
                        placeholder="https://images.unsplash.com/photo-..."
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[9px] uppercase font-sans font-black text-gray-400 tracking-wider block">Category Image Preview:</span>
                    <div className="aspect-video w-full rounded relative overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center">
                      {formData.mainImage ? (
                        <img src={formData.mainImage} alt="Category preview" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-gray-400 text-xs">No image specified yet</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-sans font-black text-[#544F49] tracking-wider block">Short Overview Pitch</label>
                    <textarea
                      rows={2}
                      value={formData.description}
                      onChange={(e) => handleFieldChange('description', e.target.value)}
                      className="w-full text-xs font-sans px-3 py-2 bg-[#FAF8F5] border border-gray-200 focus:border-[#AF9467] text-[#544F49] rounded focus:outline-hidden resize-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-sans font-black text-[#544F49] tracking-wider block">Detailed Craft Narrative Description</label>
                    <textarea
                      rows={3}
                      value={formData.longCopy}
                      onChange={(e) => handleFieldChange('longCopy', e.target.value)}
                      className="w-full text-xs font-sans px-3 py-2 bg-[#FAF8F5] border border-gray-200 focus:border-[#AF9467] text-[#2D2A26] rounded focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-sans font-black text-[#544F49] tracking-wider block">Atelier Specifications (one item per line)</label>
                    <textarea
                      rows={3}
                      value={formData.features}
                      onChange={(e) => handleFieldChange('features', e.target.value)}
                      className="w-full text-xs font-mono px-3 py-2 bg-[#FAF8F5] border border-gray-200 focus:border-[#AF9467] text-[#2D2A26] rounded focus:outline-hidden"
                      placeholder="e.g. 100% fine organza wrap"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleSaveCollectionChanges}
                      className="w-full py-2.5 bg-[#AF9467] hover:bg-[#2D2A26] text-white text-[10px] font-sans font-bold uppercase tracking-widest rounded transition-all duration-200 flex items-center justify-center space-x-1"
                    >
                      <Check className="h-4 w-4" />
                      <span>Save Category Changes only</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PRODUCT CATALOG */}
          {adminTab === 'catalogue' && (
            <div className="space-y-4">
              <div className="bg-[#FAF8F5] p-3 rounded border border-gray-200 text-left flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <p className="text-[11px] text-[#544F49] font-bold uppercase tracking-wider">🛍️ Step 1: Select Catalogue Product to edit</p>
                  <p className="text-[9px] text-[#8C8377] font-sans">Or add a new custom specimen layout to the sliding catalog carousel.</p>
                </div>
                <button
                  type="button"
                  onClick={handleAddNewCatalogueItem}
                  className="px-3 py-1.5 bg-[#AF9467] hover:bg-[#2D2A26] text-white text-[9px] uppercase font-sans tracking-wider font-bold rounded flex items-center space-x-1.5 cursor-pointer shrink-0 transition-colors"
                >
                  <Plus className="h-3 w-3" />
                  <span>Add New Product</span>
                </button>
              </div>

              {catalogueItems && catalogueItems.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-1.5 p-2 bg-white border border-gray-200 rounded">
                    {catalogueItems.map((item, idx) => {
                      const isSelected = idx === activeCatalogueIndex;
                      return (
                        <div key={item.id} className="relative group/tag flex items-center">
                          <button
                            type="button"
                            onClick={() => setActiveCatalogueIndex(idx)}
                            className={`px-3 py-1.5 text-[9px] sm:text-[10px] font-sans font-bold uppercase tracking-wider rounded transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#2D2A26] text-white shadow-xs'
                                : 'bg-[#FAF8F5] hover:bg-gray-100 text-[#544F49] border border-gray-200'
                            }`}
                          >
                            {item.title}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteCatalogueItem(idx)}
                            className="absolute -top-1.5 -right-1.5 p-0.5 bg-red-600 hover:bg-red-700 text-white rounded-full opacity-0 group-hover/tag:opacity-100 transition-opacity z-10 cursor-pointer"
                            title="Remove Product"
                          >
                            <Trash2 className="h-2.5 w-2.5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {activeCatItem && (
                    <div className="bg-white p-5 rounded border border-gray-200 shadow-xs text-left space-y-4">
                      <div className="border-b border-gray-100 pb-2 flex justify-between items-center bg-[#FAF8F5] -mx-5 -mt-5 p-4 rounded-t border-b border-gray-200">
                        <h4 className="text-xs font-sans uppercase font-bold text-[#2D2A26]">🛍️ Edit Product: {activeCatItem.title}</h4>
                        <span className="text-[9px] bg-[#DECCB2] text-[#2D2A26] px-2 py-0.5 tracking-wider uppercase font-bold rounded">Catalog Item</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-sans font-black text-[#544F49] tracking-wider block">Product Name / Title</label>
                          <input
                            type="text"
                            value={catFormData.title}
                            onChange={(e) => handleCatFieldChange('title', e.target.value)}
                            className="w-full text-xs font-sans px-3 py-2 bg-[#FAF8F5] border border-gray-200 focus:border-[#AF9467] text-[#2D2A26] rounded focus:outline-hidden"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-sans font-black text-[#544F49] tracking-wider block">Product Category Tag</label>
                          <input
                            type="text"
                            value={catFormData.tag}
                            onChange={(e) => handleCatFieldChange('tag', e.target.value)}
                            className="w-full text-xs font-sans px-3 py-2 bg-[#FAF8F5] border border-gray-200 focus:border-[#AF9467] text-[#2D2A26] rounded focus:outline-hidden"
                            placeholder="e.g. Ring Platters"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-sans font-black text-[#544F49] tracking-wider block">Product Subheading</label>
                          <input
                            type="text"
                            value={catFormData.subtitle}
                            onChange={(e) => handleCatFieldChange('subtitle', e.target.value)}
                            className="w-full text-xs font-sans px-3 py-2 bg-[#FAF8F5] border border-gray-200 focus:border-[#AF9467] text-[#2D2A26] rounded focus:outline-hidden"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-sans font-black text-[#544F49] tracking-wider block">Size / Dimensions</label>
                          <input
                            type="text"
                            value={catFormData.dimensions}
                            onChange={(e) => handleCatFieldChange('dimensions', e.target.value)}
                            className="w-full text-xs font-sans px-3 py-2 bg-[#FAF8F5] border border-gray-200 focus:border-[#AF9467] text-[#2D2A26] rounded focus:outline-hidden"
                          />
                        </div>

                        <div className="space-y-1 sm:col-span-2">
                          <label className="text-[10px] uppercase font-sans font-black text-[#544F49] tracking-wider block">Materials Composition</label>
                          <input
                            type="text"
                            value={catFormData.medium}
                            onChange={(e) => handleCatFieldChange('medium', e.target.value)}
                            className="w-full text-xs font-sans px-3 py-2 bg-[#FAF8F5] border border-gray-200 focus:border-[#AF9467] text-[#2D2A26] rounded focus:outline-hidden"
                            placeholder="e.g. Silk, Velvet, Brass Stamps"
                          />
                        </div>

                        <div className="space-y-1 sm:col-span-2">
                          <label className="text-[10px] uppercase font-sans font-black text-[#544F49] tracking-wider block">Product Image Link (URL)</label>
                          <input
                            type="text"
                            value={catFormData.image}
                            onChange={(e) => handleCatFieldChange('image', e.target.value)}
                            className="w-full text-xs font-mono px-3 py-2 bg-[#FAF8F5] border border-gray-200 focus:border-[#AF9467] text-[#2D2A26] rounded focus:outline-hidden"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-sans font-black text-[#544F49] tracking-wider block">Product Description Details</label>
                        <textarea
                          rows={2}
                          value={catFormData.description}
                          onChange={(e) => handleCatFieldChange('description', e.target.value)}
                          className="w-full text-xs font-sans px-3 py-2 bg-[#FAF8F5] border border-gray-200 focus:border-[#AF9467] text-[#2D2A26] rounded focus:outline-hidden resize-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <span className="text-[9px] uppercase font-sans font-black text-gray-400 tracking-wider block">Image Preview:</span>
                        <div className="aspect-video w-full rounded overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center">
                          {catFormData.image ? (
                            <img src={catFormData.image} alt="Product spec" className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-gray-400 text-xs">No image specified</span>
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleSaveCatalogueChanges}
                        className="w-full py-2.5 bg-[#AF9467] hover:bg-[#2D2A26] text-white text-[10px] font-sans font-bold uppercase tracking-widest rounded transition-all cursor-pointer flex items-center justify-center space-x-1"
                      >
                        <Check className="h-4 w-4" />
                        <span>Save this Product Specimen</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-400 text-xs text-left">No catalogue items currently found.</p>
              )}
            </div>
          )}

          {/* TAB 4: BEHIND STORIES */}
          {adminTab === 'stories' && (
            <div className="space-y-4">
              <div className="bg-[#FAF8F5] p-3 rounded border border-gray-200 text-left flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <p className="text-[11px] text-[#544F49] font-bold uppercase tracking-wider">📝 Step 1: Select Story to edit</p>
                  <p className="text-[9px] text-[#8C8377] font-sans">Edit behind backstage updates, photography and narration details.</p>
                </div>
                <button
                  type="button"
                  onClick={handleAddNewStoryItem}
                  className="px-3 py-1.5 bg-[#AF9467]/10 hover:bg-[#AF9467]/20 text-[#AF9467] text-[9px] uppercase font-sans tracking-wider font-bold rounded flex items-center space-x-1.5 cursor-pointer shrink-0 transition-colors"
                >
                  <Plus className="h-3 w-3" />
                  <span>Add New Story</span>
                </button>
              </div>

              {stories && stories.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 py-1 bg-[#FAF8F5]/50 p-2 rounded border border-gray-100">
                    {stories.map((str, idx) => {
                      const isSelected = idx === activeStoryIndex;
                      return (
                        <div key={str.id} className="relative group/tag">
                          <button
                            type="button"
                            onClick={() => setActiveStoryIndex(idx)}
                            className={`px-3 py-1.5 text-[10px] font-sans font-bold uppercase tracking-wider rounded-sm border transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#AF9467] text-white border-[#AF9467] shadow-xs'
                                : 'bg-white text-[#544F49] border-gray-200 hover:border-[#AF9467]'
                            }`}
                          >
                            {str.title || `Story #${idx + 1}`}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteStoryItem(idx)}
                            className="absolute -top-1.5 -right-1.5 p-0.5 bg-red-600 hover:bg-red-700 text-white rounded-full opacity-0 group-hover/tag:opacity-100 transition-opacity z-10 cursor-pointer"
                            title="Erase Story"
                          >
                            <Trash2 className="h-2 w-2" />
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {activeStoryItem && (
                    <div className="bg-white p-5 rounded border border-gray-200 shadow-xs text-left space-y-4">
                      
                      <div className="border-b border-gray-100 pb-2 bg-[#FAF8F5] -mx-5 -mt-5 p-4 rounded-t border-b border-gray-200">
                        <h4 className="text-xs font-sans uppercase font-bold text-[#2D2A26]">📝 Edit Story: {activeStoryItem.title || `Story #${activeStoryIndex + 1}`}</h4>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-sans tracking-widest font-bold text-[#544F49]">
                            Story Title
                          </label>
                          <input
                            type="text"
                            value={storyFormData.title}
                            onChange={(e) => handleStoryFieldChange('title', e.target.value)}
                            className="w-full text-xs font-sans px-3 py-2 bg-[#FAF8F5] border border-gray-200 focus:border-[#AF9467] text-[#2D2A26] rounded focus:outline-hidden"
                            placeholder="e.g. Handmade Silk Fraying"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-sans tracking-widest font-bold text-[#544F49]">
                            Story Image URL
                          </label>
                          <input
                            type="text"
                            value={storyFormData.storyImage}
                            onChange={(e) => handleStoryFieldChange('storyImage', e.target.value)}
                            className="w-full text-xs font-mono px-3 py-2 bg-[#FAF8F5] border border-gray-200 focus:border-[#AF9467] text-[#2D2A26] rounded focus:outline-hidden"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-sans tracking-widest font-bold text-[#544F49]">
                          Behind-the-Scenes Narrative Text
                        </label>
                        <textarea
                          rows={3}
                          value={storyFormData.text}
                          onChange={(e) => handleStoryFieldChange('text', e.target.value)}
                          className="w-full text-xs font-sans px-3 py-2 bg-[#FAF8F5] border border-gray-200 focus:border-[#AF9467] text-[#2D2A26] rounded focus:outline-hidden resize-none"
                          placeholder="Provide descriptive background information..."
                        />
                      </div>

                      <div className="space-y-1">
                        <span className="text-[9px] uppercase font-sans tracking-widest font-bold text-[#8C8377] block">Story Image Preview:</span>
                        <div className="aspect-video w-full rounded relative overflow-hidden bg-gray-100 border border-gray-200">
                          {storyFormData.storyImage ? (
                            <img
                              src={storyFormData.storyImage}
                              alt="Story Preview"
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-[10px] text-gray-400">
                              No image path entered
                            </div>
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleSaveStoryChanges}
                        className="w-full py-2.5 bg-[#AF9467] hover:bg-[#2D2A26] text-white text-[10px] font-sans font-bold uppercase tracking-widest rounded transition-all cursor-pointer flex items-center justify-center space-x-1"
                      >
                        <Check className="h-4 w-4" />
                        <span>Save this Story Specimen</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-400 text-xs text-left">No backstage stories found.</p>
              )}
            </div>
          )}

        </div>

        {/* Master Bottom Control Deck */}
        <div className="bg-white border-t border-[#EADFC9]/40 px-6 py-4 flex flex-col sm:flex-row gap-3 justify-between items-center shrink-0">
          <button
            onClick={handleResetToOriginal}
            className="w-full sm:w-auto px-4 py-2.5 border border-[#AF9467] text-[#AF9467] hover:bg-[#AF9467]/5 text-[10px] font-sans font-bold uppercase tracking-widest rounded-sm transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <RefreshCw className="h-3 w-3" />
            <span>Reset to Studio Defaults</span>
          </button>
          
          <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleClose}
              className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-[10px] font-sans font-bold uppercase tracking-widest rounded-sm transition-colors text-center cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveAllChanges}
              className="px-5 py-2.5 bg-[#2D2A26] hover:bg-[#AF9467] text-white text-[10px] font-sans font-bold uppercase tracking-widest rounded-sm transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <Save className="h-4 w-4" />
              <span>Apply & Publish Website</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
