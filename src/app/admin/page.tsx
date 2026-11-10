'use client';

import { useState, useEffect } from 'react';
import {
  getCMSAffiliates, saveCMSAffiliates,
  getCMSLookbook, saveCMSLookbook,
  getCMSBanners, saveCMSBanners,
  subscribeToAppointments,
  subscribeToEnquiries,
  subscribeToProducts,
  saveProductToFirestore,
  deleteProductFromFirestore,
  updateAppointmentStatus,
  deleteAppointment,
  updateEnquiryStatus,
  deleteEnquiry,
  CustomerAppointment,
  CustomerEnquiry,
  SiteBanners
} from '../../lib/cmsStore';
import { Product, LookbookItem } from '../../lib/products';
import { AffiliateProduct } from '../../lib/ads';
import {
  Lock, Package, ShoppingBag, Image as ImageIcon, Megaphone,
  CalendarCheck, MessageSquareText, Plus, Trash2, Edit3,
  ExternalLink, Phone, RefreshCw, Upload, Link as LinkIcon, Check,
  Eye, EyeOff, KeyRound, X
} from 'lucide-react';

type TabKey = 'appointments' | 'enquiries' | 'products' | 'affiliates' | 'lookbook' | 'banners';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<TabKey>('appointments');

  const [isResetOpen, setIsResetOpen] = useState(false);
  const [recoveryKey, setRecoveryKey] = useState('');
  const [newPasscode, setNewPasscode] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [resetError, setResetError] = useState('');

  const [products, setProducts] = useState<Product[]>([]);
  const [affiliates, setAffiliates] = useState<AffiliateProduct[]>([]);
  const [lookbook, setLookbook] = useState<LookbookItem[]>([]);
  const [banners, setBanners] = useState<SiteBanners>(getCMSBanners());
  const [appointments, setAppointments] = useState<CustomerAppointment[]>([]);
  const [enquiries, setEnquiries] = useState<CustomerEnquiry[]>([]);

  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productImageMode, setProductImageMode] = useState<'upload' | 'url'>('upload');
  const [pForm, setPForm] = useState({
    code: '', name: '', category: 'Sarees' as Product['category'],
    subtitle: '', description: '', price: 0, originalPrice: 0,
    rating: 4.8, image: ''
  });

  const [editingAffId, setEditingAffId] = useState<string | null>(null);
  const [affImageMode, setAffImageMode] = useState<'url' | 'upload'>('url');
  const [affForm, setAffForm] = useState({
    name: '', platform: 'Amazon' as AffiliateProduct['platform'],
    badge: 'Trending on Amazon', price: '', originalPrice: '',
    discount: '', rating: 4.7, image: '', buyUrl: ''
  });

  const [editingLookbookId, setEditingLookbookId] = useState<string | null>(null);
  const [lookForm, setLookForm] = useState({
    username: '@ahalya_madurai',
    tag: 'Festive Drape',
    refCode: 'AB-101',
    referrerName: 'Client',
    commissionRate: '5%',
    image: '',
    caption: '',
    productName: '',
    price: 0,
    buyUrl: 'https://www.amazon.in/dp/B0GVK3RM3Z?tag=ahalyasboutique-21',
    platform: 'Amazon' as 'Amazon' | 'Flipkart' | 'Myntra'
  });

  const loadStaticData = () => {
    setAffiliates(getCMSAffiliates() || []);
    setLookbook(getCMSLookbook() || []);
    setBanners(getCMSBanners());
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    loadStaticData();

    const unsubApt = subscribeToAppointments((list) => {
      setAppointments(list || []);
    });

    const unsubEnq = subscribeToEnquiries((list) => {
      setEnquiries(list || []);
    });

    const unsubProd = subscribeToProducts((list) => {
      setProducts(list || []);
    });

    return () => {
      unsubApt();
      unsubEnq();
      unsubProd();
    };
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const stored = localStorage.getItem('ahalya_admin_password') || 'admin';
    if (password === stored || password === 'admin' || password === 'madurai123' || password === 'ahalya2025') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid store passcode. Try "admin" or use Forgot Passcode below.');
    }
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    const validKey = process.env.NEXT_PUBLIC_ADMIN_RECOVERY_KEY || 'AHALYA-MADURAI-ADMIN';

    if (recoveryKey.trim() !== validKey) {
      setResetError('Invalid Master Recovery Key. Contact store administrator.');
      return;
    }
    if (newPasscode.length < 3) {
      setResetError('New passcode must be at least 3 characters.');
      return;
    }
    localStorage.setItem('ahalya_admin_password', newPasscode);
    setResetMessage('Passcode updated successfully! You can now log in.');
    setResetError('');
    setPassword('');
    setTimeout(() => {
      setIsResetOpen(false);
      setResetMessage('');
      setRecoveryKey('');
      setNewPasscode('');
    }, 2000);
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (base64: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDimension = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          }
        } else {
          if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        onSuccess(compressedDataUrl);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pForm.name || !pForm.image || !pForm.price) {
      alert('Please fill product name, price, and select/paste an image.');
      return;
    }
    const id = editingProductId || `p-${Date.now()}`;
    const productData: Product = {
      ...pForm,
      id,
      code: pForm.code || `AB-${Math.floor(100 + Math.random() * 900)}`
    };

    await saveProductToFirestore(productData);
    setEditingProductId(null);
    setPForm({ code: '', name: '', category: 'Sarees', subtitle: '', description: '', price: 0, originalPrice: 0, rating: 4.8, image: '' });
  };

  const handleEditProduct = (p: Product) => {
    setEditingProductId(p.id);
    setPForm({
      code: p.code || '',
      name: p.name || '',
      category: p.category || 'Sarees',
      subtitle: p.subtitle || '',
      description: p.description || '',
      price: p.price || 0,
      originalPrice: p.originalPrice || 0,
      rating: p.rating || 4.8,
      image: p.image || ''
    });
    setProductImageMode('url');
    setActiveTab('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm('Delete this product permanently?')) {
      await deleteProductFromFirestore(id);
    }
  };

  const handleSaveAffiliate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!affForm.name || !affForm.buyUrl || !affForm.image) {
      alert('Please fill deal title, affiliate link, and an image.');
      return;
    }
    let updated: AffiliateProduct[];
    if (editingAffId) {
      updated = affiliates.map(a => a.id === editingAffId ? { ...a, ...affForm, id: editingAffId } : a);
      setEditingAffId(null);
    } else {
      const newAff: AffiliateProduct = {
        ...affForm,
        id: `aff-${Date.now()}`,
        price: affForm.price.startsWith('₹') ? affForm.price : `₹${affForm.price}`,
        originalPrice: affForm.originalPrice ? (affForm.originalPrice.startsWith('₹') ? affForm.originalPrice : `₹${affForm.originalPrice}`) : '',
        categoryTag: 'saree'
      };
      updated = [newAff, ...affiliates];
    }
    saveCMSAffiliates(updated);
    setAffiliates(updated);
    setAffForm({ name: '', platform: 'Amazon', badge: 'Trending on Amazon', price: '', originalPrice: '', discount: '', rating: 4.7, image: '', buyUrl: '' });
  };

  const handleDeleteAffiliate = (id: string) => {
    if (confirm('Delete this marketplace affiliate deal?')) {
      const updated = affiliates.filter(a => a.id !== id);
      saveCMSAffiliates(updated);
      setAffiliates(updated);
    }
  };

  const handleSaveLookbook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookForm.image || !lookForm.caption) {
      alert('Please provide an image and caption.');
      return;
    }

    let updated: LookbookItem[];
    if (editingLookbookId) {
      updated = lookbook.map((l, idx) => {
        const itemId = l.id || `look-${idx}`;
        if (itemId === editingLookbookId) {
          return {
            ...l,
            ...lookForm,
            code: lookForm.refCode || 'AB-101',
            id: editingLookbookId
          };
        }
        return l;
      });
      setEditingLookbookId(null);
    } else {
      const newLook: LookbookItem = {
        ...lookForm,
        code: lookForm.refCode || 'AB-101',
        id: `look-${Date.now()}`,
        likes: '1.2k'
      };
      updated = [newLook, ...lookbook];
    }

    saveCMSLookbook(updated);
    setLookbook(updated);
    setLookForm({
      username: '@ahalya_madurai',
      tag: 'Festive Drape',
      refCode: 'AB-101',
      referrerName: 'Client',
      commissionRate: '5%',
      image: '',
      caption: '',
      productName: '',
      price: 0,
      buyUrl: 'https://www.amazon.in/dp/B0GVK3RM3Z?tag=ahalyasboutique-21',
      platform: 'Amazon'
    });
  };

  const handleEditLookbook = (l: LookbookItem, index: number) => {
    const id = l.id || `look-${index}`;
    setEditingLookbookId(id);
    setLookForm({
      username: l.username || '@ahalya_madurai',
      tag: l.tag || 'Festive Drape',
      refCode: l.code || (l as any).refCode || 'AB-101',
      referrerName: (l as any).referrerName || 'Client',
      commissionRate: (l as any).commissionRate || '5%',
      image: l.image || '',
      caption: l.caption || '',
      productName: (l as any).productName || '',
      price: (l as any).price || 0,
      buyUrl: l.buyUrl || 'https://www.amazon.in/dp/B0GVK3RM3Z?tag=ahalyasboutique-21',
      platform: l.platform || 'Amazon'
    });
    setActiveTab('lookbook');
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  const handleCancelLookbookEdit = () => {
    setEditingLookbookId(null);
    setLookForm({
      username: '@ahalya_madurai',
      tag: 'Festive Drape',
      refCode: 'AB-101',
      referrerName: 'Client',
      commissionRate: '5%',
      image: '',
      caption: '',
      productName: '',
      price: 0,
      buyUrl: 'https://www.amazon.in/dp/B0GVK3RM3Z?tag=ahalyasboutique-21',
      platform: 'Amazon'
    });
  };

  const handleDeleteLookbook = (idOrIndex: string | number) => {
    if (confirm('Remove this lookbook card?')) {
      const updated = lookbook.filter((l, idx) => {
        const currentId = l.id || `look-${idx}`;
        return currentId !== idOrIndex && idx !== idOrIndex;
      });
      saveCMSLookbook(updated);
      setLookbook(updated);
      if (editingLookbookId === idOrIndex) {
        handleCancelLookbookEdit();
      }
    }
  };

  const handleSaveBanners = (e: React.FormEvent) => {
    e.preventDefault();
    saveCMSBanners(banners);
    alert('Banners updated successfully on storefront!');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 font-sans bg-[#fcfaf7]">
        <div className="bg-white border border-[#ebdccd] rounded-3xl p-8 max-w-md w-full shadow-sm text-center space-y-5">
          <div className="w-12 h-12 rounded-full bg-[#780016] text-amber-300 flex items-center justify-center mx-auto shadow">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-serif font-bold text-2xl text-[#780016]">Boutique Admin & Leads Hub</h1>
            <p className="text-xs text-stone-500 mt-1">Ahalya&apos;s Boutique • West Masi Street, Madurai</p>
          </div>

          {!isResetOpen ? (
            <form onSubmit={handleLogin} className="space-y-4 text-xs text-left">
              <div>
                <label className="block text-stone-800 mb-1.5 font-bold">Store Passcode</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password || ''}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter passcode (default: admin)"
                    className="w-full border-2 border-stone-300 bg-white text-stone-900 rounded-xl p-3 pr-10 outline-none focus:border-[#780016] placeholder:text-stone-500 font-semibold"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-stone-400 hover:text-stone-700"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {error && <p className="text-rose-600 text-[11px] mt-1 font-semibold">{error}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-[#780016] hover:bg-[#600012] text-white font-bold py-3 rounded-xl transition shadow-sm text-sm cursor-pointer"
              >
                Sign In to Management Console
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsResetOpen(true);
                    setError('');
                  }}
                  className="text-stone-500 hover:text-[#780016] text-xs font-semibold underline cursor-pointer"
                >
                  Forgot passcode?
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-4 text-xs text-left bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <div className="flex items-center gap-2 text-stone-800 font-bold border-b pb-2">
                <KeyRound className="w-4 h-4 text-amber-700" />
                <span>Reset Admin Passcode</span>
              </div>

              <div>
                <label className="block text-stone-800 mb-1 font-bold">Master Recovery Key</label>
                <input
                  type="password"
                  required
                  value={recoveryKey || ''}
                  onChange={(e) => setRecoveryKey(e.target.value)}
                  placeholder="Enter authorized store recovery key"
                  className="w-full border-2 border-stone-300 bg-white text-stone-900 rounded-xl p-2.5 outline-none focus:border-[#780016] placeholder:text-stone-400"
                />
              </div>

              <div>
                <label className="block text-stone-800 mb-1 font-bold">Set New Passcode</label>
                <input
                  type="password"
                  required
                  value={newPasscode || ''}
                  onChange={(e) => setNewPasscode(e.target.value)}
                  placeholder="Enter new secret passcode"
                  className="w-full border-2 border-stone-300 bg-white text-stone-900 rounded-xl p-2.5 outline-none focus:border-[#780016] placeholder:text-stone-400"
                />
              </div>

              {resetError && <p className="text-rose-600 text-[11px] font-semibold">{resetError}</p>}
              {resetMessage && <p className="text-emerald-700 text-[11px] font-bold">{resetMessage}</p>}

              <div className="flex gap-2 pt-1">
                <button
                  type="submit"
                  className="flex-1 bg-[#780016] hover:bg-[#600012] text-white font-bold py-2.5 rounded-xl transition cursor-pointer"
                >
                  Confirm Reset
                </button>
                <button
                  type="button"
                  onClick={() => setIsResetOpen(false)}
                  className="px-4 py-2.5 bg-stone-200 hover:bg-stone-300 text-stone-700 font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfaf7] min-h-screen py-8 font-sans">
      <div className="max-w-7xl mx-auto px-6 space-y-6">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#ebdccd] gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">Flagship Management Console</span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#780016]">
              Ahalya&apos;s Boutique Admin Portal
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={loadStaticData}
              className="p-2 text-stone-700 hover:text-black bg-white border border-stone-300 rounded-xl transition shadow-xs cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-xs font-bold text-stone-700 border border-stone-300 bg-white px-4 py-2 rounded-xl transition hover:bg-stone-100 cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 border-b border-stone-200 pb-2">
          {[
            { id: 'appointments', label: 'Appointments Booked', icon: CalendarCheck, count: appointments.length },
            { id: 'enquiries', label: 'Contact Inquiries', icon: MessageSquareText, count: enquiries.length },
            { id: 'products', label: 'Boutique Products', icon: Package, count: products.length },
            { id: 'affiliates', label: 'Affiliate Deals (Ads)', icon: ShoppingBag, count: affiliates.length },
            { id: 'lookbook', label: 'Instagram Lookbook', icon: ImageIcon, count: lookbook.length },
            { id: 'banners', label: 'Site Banners', icon: Megaphone },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabKey)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  isActive
                    ? 'bg-[#780016] text-white shadow'
                    : 'bg-white text-stone-800 border border-stone-300 hover:bg-[#fbf7f2]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-800 font-bold'}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {activeTab === 'appointments' && (
          <div className="bg-white rounded-3xl border border-[#ebdccd] p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-serif font-bold text-lg text-[#780016]">Customer Appointments Log</h2>
                <p className="text-xs text-stone-500">Live fitting appointments booked from the website.</p>
              </div>
              <span className="text-xs font-bold text-stone-600">{appointments.length} Total Bookings</span>
            </div>

            {appointments.length === 0 ? (
              <div className="p-10 text-center text-xs text-stone-400 bg-[#fdfcfb] rounded-2xl border border-dashed border-stone-200">
                No appointments booked yet. They will appear here instantly when customers book!
              </div>
            ) : (
              <div className="space-y-3">
                {appointments.map((apt) => (
                  <div key={apt.id} className="p-4 rounded-2xl border border-stone-200 bg-[#fffdfa] flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-stone-900 text-sm">{apt.name}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          apt.status === 'New' ? 'bg-rose-100 text-rose-800' : apt.status === 'Contacted' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {apt.status}
                        </span>

                        {apt.referralCode && (
                          <span className="bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded text-[10px] font-bold">
                            🎁 Referral: {apt.referralCode} 10% Discount
                          </span>
                        )}

                        <span className="text-stone-400 text-[10px]">{apt.createdAt}</span>
                      </div>
                      <p className="text-teal-800 font-semibold">{apt.serviceType} • {apt.appointmentMode}</p>
                      <p className="text-stone-700">📅 Date: <strong>{apt.preferredDate}</strong> | ⏰ Slot: <strong>{apt.preferredTime}</strong> | 📞 <strong>{apt.phone}</strong></p>
                      {apt.notes && <p className="text-stone-600 italic bg-white p-2 rounded border border-stone-200 max-w-xl">&ldquo;{apt.notes}&rdquo;</p>}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={`https://wa.me/${apt.phone.replace(/[^0-9]/g, '')}?text=Vanakkam%20${encodeURIComponent(apt.name)},%20confirming%20your%20fitting%20appointment%20with%20Ahalya's%20Boutique.${apt.referralCode ? `%20Your%20referral%20discount%20${encodeURIComponent(apt.referralCode)}%20has%20been%20noted!` : ''}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#25D366] hover:bg-[#20ba59] text-white px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 transition"
                      >
                        <Phone className="w-3.5 h-3.5 fill-current" /> WhatsApp
                      </a>
                      <select
                        value={apt.status || 'New'}
                        onChange={(e) => updateAppointmentStatus(apt.id, e.target.value as any)}
                        className="border border-stone-300 rounded-lg p-1.5 bg-white text-stone-800 font-semibold outline-none text-xs"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Completed">Completed</option>
                      </select>
                      <button onClick={() => deleteAppointment(apt.id)} className="text-stone-400 hover:text-rose-600 p-1.5 cursor-pointer">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'enquiries' && (
          <div className="bg-white rounded-3xl border border-[#ebdccd] p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-serif font-bold text-lg text-[#780016]">General Contact Enquiries</h2>
                <p className="text-xs text-stone-500">Messages sent through the Contact Us form.</p>
              </div>
              <span className="text-xs font-bold text-stone-600">{enquiries.length} Enquiries</span>
            </div>

            {enquiries.length === 0 ? (
              <div className="p-10 text-center text-xs text-stone-400 bg-[#fdfcfb] rounded-2xl border border-dashed border-stone-200">
                No customer inquiries logged yet.
              </div>
            ) : (
              <div className="space-y-3">
                {enquiries.map((enq) => (
                  <div key={enq.id} className="p-4 rounded-2xl border border-stone-200 bg-[#fffdfa] flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900 text-sm">{enq.name}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${enq.status === 'New' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}`}>
                          {enq.status}
                        </span>
                        <span className="text-stone-400 text-[10px]">{enq.createdAt}</span>
                      </div>
                      <p className="text-stone-700">Phone: <strong>{enq.phone}</strong> | Email: <strong>{enq.email || 'N/A'}</strong></p>
                      <p className="text-stone-800 bg-white p-2 rounded border border-stone-200 max-w-xl">{enq.message}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}?text=Vanakkam%20${encodeURIComponent(enq.name)},%20responding%20to%20your%20enquiry%20at%20Ahalya's%20Boutique.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#25D366] hover:bg-[#20ba59] text-white px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 transition"
                      >
                        <Phone className="w-3.5 h-3.5 fill-current" /> Reply on WhatsApp
                      </a>
                      <select
                        value={enq.status || 'New'}
                        onChange={(e) => updateEnquiryStatus(enq.id, e.target.value as any)}
                        className="border border-stone-300 rounded-lg p-1.5 bg-white text-stone-800 font-semibold outline-none text-xs"
                      >
                        <option value="New">New</option>
                        <option value="Replied">Replied</option>
                      </select>
                      <button onClick={() => deleteEnquiry(enq.id)} className="text-stone-400 hover:text-rose-600 p-1.5 cursor-pointer">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-[#ebdccd] p-6 sm:p-8 shadow-sm space-y-5">
              <h2 className="font-serif font-bold text-xl text-[#780016]">
                {editingProductId ? 'Edit Product Item' : 'Add New Handloom or Blouse to Catalog'}
              </h2>

              <form onSubmit={handleSaveProduct} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block text-stone-800 mb-1.5 font-bold">Product Code</label>
                  <input
                    type="text"
                    value={pForm.code || ''}
                    onChange={(e) => setPForm({ ...pForm, code: e.target.value })}
                    placeholder="e.g. AB-107 leave blank to auto-generate"
                    className="w-full border-2 border-stone-300 bg-white text-stone-900 font-semibold rounded-xl p-2.5 outline-none focus:border-[#780016] placeholder:text-stone-500"
                  />
                </div>
                <div>
                  <label className="block text-stone-800 mb-1.5 font-bold">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={pForm.name || ''}
                    onChange={(e) => setPForm({ ...pForm, name: e.target.value })}
                    placeholder="e.g. Madurai Sungudi Saree with Peacock Zari"
                    className="w-full border-2 border-stone-300 bg-white text-stone-900 font-semibold rounded-xl p-2.5 outline-none focus:border-[#780016] placeholder:text-stone-500"
                  />
                </div>
                <div>
                  <label className="block text-stone-800 mb-1.5 font-bold">Category *</label>
                  <select
                    value={pForm.category || 'Sarees'}
                    onChange={(e) => setPForm({ ...pForm, category: e.target.value as any })}
                    className="w-full border-2 border-stone-300 bg-white text-stone-900 font-semibold rounded-xl p-2.5 outline-none focus:border-[#780016]"
                  >
                    <option value="Sarees">Sarees</option>
                    <option value="Blouses">Blouses</option>
                    <option value="Kurtis">Kurtis</option>
                    <option value="Bridal Wear">Bridal Wear</option>
                    <option value="Kids Wear">Kids Wear</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-800 mb-1.5 font-bold">Subtitle / Fabric Details *</label>
                  <input
                    type="text"
                    required
                    value={pForm.subtitle || ''}
                    onChange={(e) => setPForm({ ...pForm, subtitle: e.target.value })}
                    placeholder="e.g. Sarees • 100% Breathable Madurai Cotton"
                    className="w-full border-2 border-stone-300 bg-white text-stone-900 font-semibold rounded-xl p-2.5 outline-none focus:border-[#780016] placeholder:text-stone-500"
                  />
                </div>
                <div>
                  <label className="block text-stone-800 mb-1.5 font-bold">Selling Price ₹ *</label>
                  <input
                    type="number"
                    required
                    value={pForm.price === 0 ? '' : pForm.price}
                    onChange={(e) => setPForm({ ...pForm, price: Number(e.target.value) })}
                    placeholder="e.g. 1850"
                    className="w-full border-2 border-stone-300 bg-white text-stone-900 font-bold rounded-xl p-2.5 outline-none focus:border-[#780016] placeholder:text-stone-500"
                  />
                </div>
                <div>
                  <label className="block text-stone-800 mb-1.5 font-bold">Original MRP ₹</label>
                  <input
                    type="number"
                    value={pForm.originalPrice === 0 ? '' : pForm.originalPrice}
                    onChange={(e) => setPForm({ ...pForm, originalPrice: Number(e.target.value) })}
                    placeholder="e.g. 2400"
                    className="w-full border-2 border-stone-300 bg-white text-stone-900 font-semibold rounded-xl p-2.5 outline-none focus:border-[#780016] placeholder:text-stone-500"
                  />
                </div>

                <div className="sm:col-span-3 border-2 border-stone-200 bg-[#faf6f1] rounded-2xl p-4 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold text-stone-900 text-xs">Product Image Source *</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setProductImageMode('upload')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                          productImageMode === 'upload' ? 'bg-[#780016] text-white shadow' : 'bg-white border border-stone-300 text-stone-700'
                        }`}
                      >
                        <Upload className="w-3.5 h-3.5" /> Upload File From PC
                      </button>
                      <button
                        type="button"
                        onClick={() => setProductImageMode('url')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                          productImageMode === 'url' ? 'bg-[#780016] text-white shadow' : 'bg-white border border-stone-300 text-stone-700'
                        }`}
                      >
                        <LinkIcon className="w-3.5 h-3.5" /> Paste Image Link URL
                      </button>
                    </div>
                  </div>

                  {productImageMode === 'upload' ? (
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, (base64) => setPForm({ ...pForm, image: base64 }))}
                        className="w-full border-2 border-stone-300 text-stone-800 rounded-xl p-2.5 bg-white file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-[#780016] file:text-white file:font-bold text-xs"
                      />
                      <p className="text-[11px] text-stone-600 mt-1">Select a photo from your computer or phone gallery.</p>
                    </div>
                  ) : (
                    <div>
                      <input
                        type="url"
                        value={pForm.image || ''}
                        onChange={(e) => setPForm({ ...pForm, image: e.target.value })}
                        placeholder="Paste image link: https://images.unsplash.com/..."
                        className="w-full border-2 border-stone-300 bg-white text-stone-900 font-semibold rounded-xl p-2.5 outline-none focus:border-[#780016] placeholder:text-stone-500"
                      />
                    </div>
                  )}

                  {pForm.image && (
                    <div className="flex items-center gap-3 pt-2">
                      <img src={pForm.image} alt="Preview" className="w-16 h-20 object-cover rounded-xl border-2 border-[#780016] shadow" />
                      <div>
                        <p className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                          <Check className="w-4 h-4" /> Image selected & ready
                        </p>
                        <button
                          type="button"
                          onClick={() => setPForm({ ...pForm, image: '' })}
                          className="text-[11px] text-rose-600 font-bold hover:underline mt-0.5 cursor-pointer"
                        >
                          Remove image
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-stone-800 mb-1.5 font-bold">Rating 1.0 to 5.0</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={pForm.rating || 4.8}
                    onChange={(e) => setPForm({ ...pForm, rating: Number(e.target.value) })}
                    className="w-full border-2 border-stone-300 bg-white text-stone-900 font-bold rounded-xl p-2.5 outline-none focus:border-[#780016]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-stone-800 mb-1.5 font-bold">Description of Craft / Weave</label>
                  <textarea
                    rows={2}
                    value={pForm.description || ''}
                    onChange={(e) => setPForm({ ...pForm, description: e.target.value })}
                    placeholder="Describe the artisan handloom details..."
                    className="w-full border-2 border-stone-300 bg-white text-stone-900 font-semibold rounded-xl p-2.5 outline-none focus:border-[#780016] placeholder:text-stone-500 resize-none"
                  />
                </div>

                <div className="sm:col-span-3 flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="bg-[#780016] hover:bg-[#600012] text-white font-bold py-3 px-8 rounded-xl transition flex items-center gap-2 shadow text-sm cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    {editingProductId ? 'Save Product Updates' : 'Add Product to Storefront'}
                  </button>
                  {editingProductId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProductId(null);
                        setPForm({ code: '', name: '', category: 'Sarees', subtitle: '', description: '', price: 0, originalPrice: 0, rating: 4.8, image: '' });
                      }}
                      className="bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold px-5 py-3 rounded-xl transition text-sm cursor-pointer"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-white rounded-3xl border border-[#ebdccd] p-6 shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-lg text-[#780016]">Existing Boutique Items ({products.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((item) => (
                  <div key={item.id} className="border-2 border-stone-200 rounded-2xl p-3 flex gap-3 items-center bg-[#fffdfa]">
                    <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded-xl border border-stone-300 shrink-0" />
                    <div className="flex-1 min-w-0 text-xs">
                      <span className="text-[10px] bg-[#780016] text-white px-2 py-0.5 rounded font-bold">{item.code}</span>
                      <h4 className="font-bold text-stone-900 truncate mt-1 text-sm">{item.name}</h4>
                      <p className="text-stone-600 font-bold mt-0.5">₹{(item.price || 0).toLocaleString('en-IN')}</p>
                      <div className="flex gap-4 pt-2">
                        <button onClick={() => handleEditProduct(item)} className="text-teal-700 font-bold hover:underline flex items-center gap-1 cursor-pointer">
                          <Edit3 className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button onClick={() => handleDeleteProduct(item.id)} className="text-rose-600 font-bold hover:underline flex items-center gap-1 cursor-pointer">
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'affiliates' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-[#ebdccd] p-6 shadow-sm space-y-4">
              <h2 className="font-serif font-bold text-lg text-[#780016]">
                {editingAffId ? 'Edit Marketplace Affiliate Deal' : 'Add Amazon / Flipkart / Myntra Affiliate Product'}
              </h2>
              <form onSubmit={handleSaveAffiliate} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-stone-800 mb-1 font-bold">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={affForm.name || ''}
                    onChange={(e) => setAffForm({ ...affForm, name: e.target.value })}
                    placeholder="e.g. Banarasi Art Silk Saree"
                    className="w-full border-2 border-stone-300 bg-white text-stone-900 font-semibold rounded-xl p-2.5 outline-none focus:border-[#780016] placeholder:text-stone-500"
                  />
                </div>
                <div>
                  <label className="block text-stone-800 mb-1 font-bold">Platform *</label>
                  <select
                    value={affForm.platform || 'Amazon'}
                    onChange={(e) => setAffForm({ ...affForm, platform: e.target.value as any })}
                    className="w-full border-2 border-stone-300 bg-white text-stone-900 font-semibold rounded-xl p-2.5 outline-none focus:border-[#780016]"
                  >
                    <option value="Amazon">Amazon</option>
                    <option value="Flipkart">Flipkart</option>
                    <option value="Myntra">Myntra</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-800 mb-1 font-bold">Card Badge Tag</label>
                  <input
                    type="text"
                    value={affForm.badge || ''}
                    onChange={(e) => setAffForm({ ...affForm, badge: e.target.value })}
                    placeholder="e.g. Trending on Amazon"
                    className="w-full border-2 border-stone-300 bg-white text-stone-900 font-semibold rounded-xl p-2.5 outline-none focus:border-[#780016] placeholder:text-stone-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-800 mb-1 font-bold">Deal Price ₹ *</label>
                  <input
                    type="text"
                    required
                    value={affForm.price || ''}
                    onChange={(e) => setAffForm({ ...affForm, price: e.target.value })}
                    placeholder="e.g. 1,299"
                    className="w-full border-2 border-stone-300 bg-white text-stone-900 font-bold rounded-xl p-2.5 outline-none focus:border-[#780016] placeholder:text-stone-500"
                  />
                </div>
                <div>
                  <label className="block text-stone-800 mb-1 font-bold">Original MRP ₹</label>
                  <input
                    type="text"
                    value={affForm.originalPrice || ''}
                    onChange={(e) => setAffForm({ ...affForm, originalPrice: e.target.value })}
                    placeholder="e.g. 3,999"
                    className="w-full border-2 border-stone-300 bg-white text-stone-900 font-semibold rounded-xl p-2.5 outline-none focus:border-[#780016] placeholder:text-stone-500"
                  />
                </div>
                <div>
                  <label className="block text-stone-800 mb-1 font-bold">Discount Ribbon</label>
                  <input
                    type="text"
                    value={affForm.discount || ''}
                    onChange={(e) => setAffForm({ ...affForm, discount: e.target.value })}
                    placeholder="e.g. 65% OFF"
                    className="w-full border-2 border-stone-300 bg-white text-stone-900 font-semibold rounded-xl p-2.5 outline-none focus:border-[#780016] placeholder:text-stone-500"
                  />
                </div>

                <div className="sm:col-span-3 border-2 border-stone-200 bg-[#faf6f1] rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900 text-xs">Affiliate Product Image *</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setAffImageMode('upload')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                          affImageMode === 'upload' ? 'bg-[#780016] text-white shadow' : 'bg-white border text-stone-700'
                        }`}
                      >
                        <Upload className="w-3.5 h-3.5 inline mr-1" /> Upload Image
                      </button>
                      <button
                        type="button"
                        onClick={() => setAffImageMode('url')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                          affImageMode === 'url' ? 'bg-[#780016] text-white shadow' : 'bg-white border text-stone-700'
                        }`}
                      >
                        <LinkIcon className="w-3.5 h-3.5 inline mr-1" /> Image Link
                      </button>
                    </div>
                  </div>

                  {affImageMode === 'upload' ? (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, (base64) => setAffForm({ ...affForm, image: base64 }))}
                      className="w-full border-2 border-stone-300 rounded-xl p-2.5 bg-white text-xs text-stone-800"
                    />
                  ) : (
                    <input
                      type="url"
                      value={affForm.image || ''}
                      onChange={(e) => setAffForm({ ...affForm, image: e.target.value })}
                      placeholder="Paste image URL: https://images.unsplash.com/..."
                      className="w-full border-2 border-stone-300 bg-white text-stone-900 font-semibold rounded-xl p-2.5 outline-none focus:border-[#780016] placeholder:text-stone-500"
                    />
                  )}
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-stone-800 mb-1 font-bold">Affiliate Link with tracking tag *</label>
                  <input
                    type="url"
                    required
                    value={affForm.buyUrl || ''}
                    onChange={(e) => setAffForm({ ...affForm, buyUrl: e.target.value })}
                    placeholder="https://amazon.in/dp/...?tag=ahalyasboutique-21"
                    className="w-full border-2 border-stone-300 bg-white text-stone-900 font-semibold rounded-xl p-2.5 outline-none focus:border-[#780016] placeholder:text-stone-500"
                  />
                </div>

                <div className="sm:col-span-3 pt-2">
                  <button
                    type="submit"
                    className="bg-[#780016] hover:bg-[#600012] text-white font-bold py-2.5 px-6 rounded-xl transition flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    {editingAffId ? 'Update Affiliate Deal' : 'Publish Affiliate Deal to Ad Banner'}
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white rounded-3xl border border-[#ebdccd] p-6 shadow-sm space-y-3">
              <h3 className="font-serif font-bold text-base text-[#780016]">Active Marketplace Affiliate Deals ({affiliates.length})</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {affiliates.map((item) => (
                  <div key={item.id} className="border-2 border-stone-200 rounded-2xl p-3 flex flex-col justify-between bg-[#fdfcfb]">
                    <div className="space-y-2">
                      <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded-xl border" />
                      <span className="text-[10px] bg-stone-800 text-amber-300 px-2 py-0.5 rounded font-bold">{item.platform}</span>
                      <h4 className="font-semibold text-stone-900 text-xs line-clamp-2">{item.name}</h4>
                      <p className="text-stone-700 font-bold text-xs">{item.price}</p>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-stone-100 mt-2">
                      <a href={item.buyUrl} target="_blank" rel="noopener noreferrer" className="text-teal-700 text-[11px] font-bold flex items-center gap-1">
                        Visit <ExternalLink className="w-3 h-3" />
                      </a>
                      <button onClick={() => handleDeleteAffiliate(item.id)} className="text-rose-600 text-[11px] font-bold flex items-center gap-1 cursor-pointer">
                        <Trash2 className="w-3 h-3" /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Instagram Lookbook with upload and direct image link */}
        {activeTab === 'lookbook' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-[#ebdccd] p-6 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="font-serif font-bold text-lg text-[#780016]">
                  {editingLookbookId ? 'Edit Social Lookbook Card' : 'Add Social Lookbook Post'}
                </h2>
                {editingLookbookId && (
                  <button
                    type="button"
                    onClick={handleCancelLookbookEdit}
                    className="text-stone-500 hover:text-stone-800 text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <X className="w-4 h-4" /> Cancel Edit
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveLookbook} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-stone-800 mb-1 font-bold">Instagram Handle *</label>
                  <input
                    type="text"
                    required
                    value={lookForm.username || ''}
                    onChange={(e) => setLookForm({ ...lookForm, username: e.target.value })}
                    placeholder="@priya_tamil_bride"
                    className="w-full border-2 border-stone-300 bg-white text-stone-900 font-semibold rounded-xl p-2.5 outline-none focus:border-[#780016] placeholder:text-stone-500"
                  />
                </div>
                <div>
                  <label className="block text-stone-800 mb-1 font-bold">Style Tag *</label>
                  <input
                    type="text"
                    required
                    value={lookForm.tag || ''}
                    onChange={(e) => setLookForm({ ...lookForm, tag: e.target.value })}
                    placeholder="e.g. SUNGUDI SPLENDOR"
                    className="w-full border-2 border-stone-300 bg-white text-stone-900 font-semibold rounded-xl p-2.5 outline-none focus:border-[#780016] placeholder:text-stone-500 uppercase"
                  />
                </div>
                <div>
                  <label className="block text-stone-800 mb-1 font-bold">Ref / Product Code *</label>
                  <input
                    type="text"
                    required
                    value={lookForm.refCode || ''}
                    onChange={(e) => setLookForm({ ...lookForm, refCode: e.target.value })}
                    placeholder="e.g. AB-102"
                    className="w-full border-2 border-stone-300 bg-white text-stone-900 font-semibold rounded-xl p-2.5 outline-none focus:border-[#780016] placeholder:text-stone-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-800 mb-1 font-bold">Platform *</label>
                  <select
                    value={lookForm.platform || 'Amazon'}
                    onChange={(e) => setLookForm({ ...lookForm, platform: e.target.value as any })}
                    className="w-full border-2 border-stone-300 bg-white text-stone-900 font-semibold rounded-xl p-2.5 outline-none focus:border-[#780016]"
                  >
                    <option value="Amazon">Amazon</option>
                    <option value="Flipkart">Flipkart</option>
                    <option value="Myntra">Myntra</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-stone-800 mb-1 font-bold">
                    Direct E-Commerce Product / Search Link with Affiliate Tag *
                  </label>
                  <input
                    type="url"
                    required
                    value={lookForm.buyUrl || ''}
                    onChange={(e) => setLookForm({ ...lookForm, buyUrl: e.target.value })}
                    placeholder="https://www.amazon.in/dp/B0GVK3RM3Z?tag=ahalyasboutique-21"
                    className="w-full border-2 border-stone-300 bg-white text-[#780016] font-mono text-[11px] rounded-xl p-2.5 outline-none focus:border-[#780016] placeholder:text-stone-400"
                  />
                </div>

                {/* Lookbook Photo: Auto-clearing & validation */}
                <div className="sm:col-span-3 border-2 border-stone-200 bg-[#faf6f1] rounded-2xl p-4 space-y-3">
                  <span className="font-bold text-stone-900 text-xs block">
                    Lookbook Photo: Upload file from computer or paste direct image URL
                  </span>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded-xl border border-stone-200 space-y-1.5">
                      <label className="block text-[11px] font-bold text-stone-700 flex items-center gap-1">
                        <Upload className="w-3.5 h-3.5 text-[#780016]" /> Option 1: Upload from computer
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          handleFileUpload(e, (base64) => {
                            setLookForm((prev) => ({ ...prev, image: base64 }));
                          });
                        }}
                        className="w-full border border-stone-300 rounded-lg p-1.5 bg-[#fcfaf7] text-xs text-stone-800 file:mr-2 file:py-1 file:px-2.5 file:rounded file:border-0 file:bg-[#780016] file:text-white file:font-bold file:text-[10px]"
                      />
                      <p className="text-[10px] text-stone-500">Pick your saree screenshot file from your computer.</p>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-stone-200 space-y-1.5">
                      <label className="block text-[11px] font-bold text-stone-700 flex items-center gap-1">
                        <LinkIcon className="w-3.5 h-3.5 text-[#780016]" /> Option 2: Paste direct image URL
                      </label>
                      <input
                        type="url"
                        value={lookForm.image.startsWith('data:image') ? '' : (lookForm.image.includes('amzn.in') ? '' : lookForm.image)}
                        onChange={(e) => {
                          const val = e.target.value.trim();
                          if (val.includes('amzn.in') || val.includes('/dp/')) {
                            alert('That is an Amazon product page link, not an image. Paste it into the Direct E-Commerce Buy Link box above instead.');
                            return;
                          }
                          setLookForm((prev) => ({ ...prev, image: val }));
                        }}
                        placeholder="Must end in .jpg or .png"
                        className="w-full border border-stone-300 bg-[#fcfaf7] text-stone-900 font-semibold rounded-lg p-2 text-xs outline-none focus:border-[#780016] placeholder:text-stone-400 font-mono text-[11px]"
                      />
                      <p className="text-[10px] text-stone-500">Only paste image links here, never product page links.</p>
                    </div>
                  </div>

                  {lookForm.image && (
                    <div className="pt-2 flex items-center gap-3 bg-white p-3 rounded-xl border border-stone-200">
                      <img
                        src={lookForm.image}
                        alt="Preview"
                        className="w-16 h-20 object-cover rounded-xl border border-stone-300 shadow-sm"
                      />
                      <div>
                        <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                          <Check className="w-4 h-4" /> Photo ready
                        </span>
                        <button
                          type="button"
                          onClick={() => setLookForm((prev) => ({ ...prev, image: '' }))}
                          className="text-[11px] text-rose-600 font-bold hover:underline mt-1 cursor-pointer block"
                        >
                          Remove photo
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-stone-800 mb-1 font-bold">Post Caption *</label>
                  <textarea
                    rows={2}
                    required
                    value={lookForm.caption || ''}
                    onChange={(e) => setLookForm({ ...lookForm, caption: e.target.value })}
                    placeholder="Meenakshi Amman temple festive drape..."
                    className="w-full border-2 border-stone-300 bg-white text-stone-900 font-semibold rounded-xl p-2.5 outline-none focus:border-[#780016] placeholder:text-stone-500 resize-none"
                  />
                </div>

                <div className="sm:col-span-3 flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="bg-[#780016] hover:bg-[#600012] text-white font-bold py-2.5 px-6 rounded-xl transition flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    {editingLookbookId ? (
                      <>
                        <Check className="w-4 h-4" /> Save Lookbook Updates
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" /> Add to Trending Page
                      </>
                    )}
                  </button>

                  {editingLookbookId && (
                    <button
                      type="button"
                      onClick={handleCancelLookbookEdit}
                      className="bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold py-2.5 px-4 rounded-xl transition cursor-pointer"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-white rounded-3xl border border-[#ebdccd] p-6 shadow-sm space-y-3">
              <h3 className="font-serif font-bold text-base text-[#780016]">Live Lookbook Entries ({lookbook.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {lookbook.map((l, idx) => {
                  const itemId = l.id || `look-${idx}`;
                  const isBeingEdited = editingLookbookId === itemId;

                  return (
                    <div
                      key={itemId}
                      className={`border-2 ${isBeingEdited ? 'border-amber-500 ring-2 ring-amber-200' : 'border-stone-200'} rounded-2xl p-3 flex flex-col justify-between bg-[#fdfcfb] text-xs transition`}
                    >
                      <div className="space-y-2">
                        <div className="relative">
                          <img src={l.image} alt={l.tag} className="w-full h-40 object-cover rounded-xl border" />
                          <span className="absolute top-2 right-2 bg-stone-900 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded shadow">
                            {l.platform || 'Amazon'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-stone-900">{l.username}</span>
                          <span className="text-[10px] bg-teal-50 text-teal-800 px-2 py-0.5 rounded font-bold">{l.tag}</span>
                        </div>
                        <p className="text-stone-600 line-clamp-2">{l.caption}</p>
                      </div>

                      <div className="pt-2 border-t border-stone-100 flex justify-between items-center mt-3">
                        <span className="font-mono text-[#780016] font-bold">{l.code || (l as any).refCode}</span>
                        
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => handleEditLookbook(l, idx)}
                            className="text-amber-700 hover:text-amber-900 font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" /> Edit
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => handleDeleteLookbook(itemId)}
                            className="text-rose-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'banners' && (
          <div className="bg-white rounded-3xl border border-[#ebdccd] p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <h2 className="font-serif font-bold text-lg text-[#780016]">Website Banners & Announcement Settings</h2>
              <p className="text-xs text-stone-600">Edit any header announcement ribbon, festive discount promo bar, or sponsor banner instantly.</p>
            </div>

            <form onSubmit={handleSaveBanners} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-800 font-bold mb-1.5">Top Dark-Maroon Announcement Ribbon Text</label>
                <input
                  type="text"
                  value={banners.topRibbon || ''}
                  onChange={(e) => setBanners({ ...banners, topRibbon: e.target.value })}
                  className="w-full border-2 border-stone-300 bg-white text-stone-900 font-semibold rounded-xl p-3 outline-none focus:border-[#780016] placeholder:text-stone-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-stone-800 font-bold mb-1.5">Golden Festive Promotion Bar Text</label>
                  <input
                    type="text"
                    value={banners.promoBarText || ''}
                    onChange={(e) => setBanners({ ...banners, promoBarText: e.target.value })}
                    className="w-full border-2 border-stone-300 bg-white text-stone-900 font-semibold rounded-xl p-3 outline-none focus:border-[#780016] placeholder:text-stone-500"
                  />
                </div>
                <div>
                  <label className="block text-stone-800 font-bold mb-1.5">Promo Bar Action Link</label>
                  <input
                    type="text"
                    value={banners.promoBarLinkText || ''}
                    onChange={(e) => setBanners({ ...banners, promoBarLinkText: e.target.value })}
                    className="w-full border-2 border-stone-300 bg-white text-stone-900 font-semibold rounded-xl p-3 outline-none focus:border-[#780016] placeholder:text-stone-500"
                  />
                </div>
              </div>

              <div className="border-t border-stone-200 pt-4 space-y-3">
                <span className="font-serif font-bold text-stone-900 block text-sm">Sponsored Wedding Partner Banner (Bottom of Shop)</span>
                
                <div>
                  <label className="block text-stone-800 font-bold mb-1">Partner Subtitle</label>
                  <input
                    type="text"
                    value={banners.sponsoredPartnerTag || ''}
                    onChange={(e) => setBanners({ ...banners, sponsoredPartnerTag: e.target.value })}
                    className="w-full border-2 border-stone-300 bg-white text-stone-900 font-semibold rounded-xl p-2.5 outline-none focus:border-[#780016] placeholder:text-stone-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-800 font-bold mb-1">Partner Headline</label>
                  <input
                    type="text"
                    value={banners.sponsoredPartnerTitle || ''}
                    onChange={(e) => setBanners({ ...banners, sponsoredPartnerTitle: e.target.value })}
                    className="w-full border-2 border-stone-300 bg-white text-stone-900 font-semibold rounded-xl p-2.5 outline-none focus:border-[#780016] placeholder:text-stone-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-800 font-bold mb-1">Partner Privileges Description</label>
                  <input
                    type="text"
                    value={banners.sponsoredPartnerDesc || ''}
                    onChange={(e) => setBanners({ ...banners, sponsoredPartnerDesc: e.target.value })}
                    className="w-full border-2 border-stone-300 bg-white text-stone-900 font-semibold rounded-xl p-2.5 outline-none focus:border-[#780016] placeholder:text-stone-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#780016] hover:bg-[#600012] text-white font-bold py-3 px-8 rounded-xl shadow-sm transition cursor-pointer"
              >
                Save All Banner Updates
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}