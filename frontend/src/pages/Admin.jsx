import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FaSignOutAlt,
  FaUndo,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
  FaUser,
  FaEye,
  FaLink,
  FaBell,
  FaEnvelope,
  FaToggleOn,
  FaToggleOff,
  FaTools,
  FaExternalLinkAlt,
} from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';
import { generateId, resolveAssetUrl } from '../data/defaultPortfolio';
import {
  getContacts,
  deleteContact,
  getNotifications,
  createNotification,
  toggleNotification,
  toggleNotificationBlast,
  deleteNotification,
  toggleMaintenanceMode,
  toggleGlobalBlast,
  getMaintenanceStatus,
  getGlobalBlastStatus,
} from '../services/api';

const TABS = ['Projects', 'Certifications', 'Skills', 'Education', 'Experience', 'Achievements'];
const TAB_KEYS = {
  Projects: 'projects',
  Certifications: 'certifications',
  Skills: 'skills',
  Education: 'education',
  Experience: 'experience',
  Achievements: 'achievements',
};

const MAX_FILE_SIZE = 1.5 * 1024 * 1024;

const emptyForms = {
  projects: {
    title: '',
    description: '',
    techStack: '',
    githubUrl: '',
    liveDemoUrl: '',
    cardLetter: '',
    featured: false,
    category: 'development',
    imageUrl: '',
    assistaPath: '',
    imageData: '',
  },
  certifications: {
    name: '',
    issuerOrg: '',
    date: '',
    badgeEmoji: '🏅',
    themeColor: '#6366f1',
    skills: '',
    certificateLinkUrl: '',
    fileData: '',
  },
  skills: {
    name: '',
    level: 90,
    category: 'frontend',
    imageUrl: '',
    imageData: '',
    assistaPath: '',
  },
  education: {
    title: '',
    org: '',
    timePeriod: '',
    location: '',
    badge: '',
    description: '',
  },
  experience: {
    title: '',
    org: '',
    timePeriod: '',
    location: '',
    badge: '',
    description: '',
  },
  achievements: {
    type: 'highlight',
    title: '',
    subtitle: '',
    desc: '',
    label: '',
    value: '',
    suffix: '',
    isFloat: false,
    imageUrl: '',
    assistaPath: '',
    imageData: '',
  },
};

const inputClass =
  'w-full px-3 py-2 rounded-lg bg-bg-primary border border-borderColor-base text-textColor-primary focus:outline-none focus:border-accent-primary';

export const Admin = () => {
  const navigate = useNavigate();
  const { data, updateData, resetPortfolio, visitorCount, maintenanceMode, setMaintenanceMode, globalBlast, setGlobalBlast } = usePortfolio();
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const [activeTab, setActiveTab] = useState('Projects');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForms.projects);
  const [aboutForm, setAboutForm] = useState(data.about);
  const [settingsForm, setSettingsForm] = useState(data.settings ?? {});
  const [newCatName, setNewCatName] = useState('');
  const [newProjCatName, setNewProjCatName] = useState('');

  // Contact messages state
  const [contacts, setContacts] = useState([]);
  const [contactsLoading, setContactsLoading] = useState(true);

  // Notifications state
  const [notifications, setNotifications] = useState([]);
  const [notifLoading, setNotifLoading] = useState(true);
  const [notifForm, setNotifForm] = useState({ title: '', message: '' });
  const [maintenanceLoading, setMaintenanceLoading] = useState(false);
  const [globalBlastLoading, setGlobalBlastLoading] = useState(false);

  // Sync maintenance + global blast from backend on admin load
  useEffect(() => {
    const syncGlobalConfig = async () => {
      if (!sessionStorage.getItem('admin_token')) return;
      try {
        const [maintenanceData, blastData] = await Promise.all([
          getMaintenanceStatus(),
          getGlobalBlastStatus(),
        ]);
        setMaintenanceMode(maintenanceData.maintenanceMode ?? false);
        setGlobalBlast(blastData.globalBlast ?? false);
      } catch (err) {
        console.warn('Failed to sync global config:', err.message);
      }
    };
    syncGlobalConfig();
  }, [setMaintenanceMode, setGlobalBlast]);

  // Fetch contacts and notifications on mount
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [contactsData, notifsData] = await Promise.all([
          getContacts(),
          getNotifications(),
        ]);
        setContacts(contactsData);
        setNotifications(notifsData);
      } catch (err) {
        console.warn('Failed to fetch admin data:', err.message);
      } finally {
        setContactsLoading(false);
        setNotifLoading(false);
      }
    };
    if (sessionStorage.getItem('admin_token')) {
      fetchAdminData();
    }
  }, []);

  // ─── Skill Categories ───────────────────────────────
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    const catId = newCatName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const exists = (data.skillCategories ?? []).some((c) => c.id === catId);
    if (exists) {
      alert('A category with this name or ID already exists.');
      return;
    }
    const newCat = { id: catId, name: newCatName.trim() };
    updateData((prev) => ({
      ...prev,
      skillCategories: [...(prev.skillCategories ?? []), newCat],
    }));
    setNewCatName('');
  };

  const handleRemoveCategory = (catId) => {
    if (!window.confirm('Are you sure you want to remove this category? Skills associated with it will remain.')) return;
    updateData((prev) => ({
      ...prev,
      skillCategories: (prev.skillCategories ?? []).filter((c) => c.id !== catId),
    }));
  };

  // ─── Project Categories ─────────────────────────────
  const handleAddProjectCategory = (e) => {
    e.preventDefault();
    if (!newProjCatName.trim()) return;
    const catId = newProjCatName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const exists = (data.projectCategories ?? []).some((c) => c.id === catId);
    if (exists) {
      alert('A project category with this name already exists.');
      return;
    }
    const newCat = { id: catId, name: newProjCatName.trim() };
    updateData((prev) => ({
      ...prev,
      projectCategories: [...(prev.projectCategories ?? []), newCat],
    }));
    setNewProjCatName('');
  };

  const handleRemoveProjectCategory = (catId) => {
    if (!window.confirm('Remove this project category? Projects with this category will keep their current category value.')) return;
    updateData((prev) => ({
      ...prev,
      projectCategories: (prev.projectCategories ?? []).filter((c) => c.id !== catId),
    }));
  };

  // ─── Contact Messages ───────────────────────────────
  const handleDeleteContact = async (id) => {
    if (!window.confirm('Delete this contact message?')) return;
    try {
      await deleteContact(id);
      setContacts((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      alert('Failed to delete contact: ' + err.message);
    }
  };

  // ─── Notifications ──────────────────────────────────
  const handleCreateNotification = async (e) => {
    e.preventDefault();
    if (!notifForm.title.trim() || !notifForm.message.trim()) return;
    try {
      const newNotif = await createNotification(notifForm);
      setNotifications((prev) => [newNotif, ...prev]);
      setNotifForm({ title: '', message: '' });
    } catch (err) {
      alert('Failed to create notification: ' + err.message);
    }
  };

  const handleToggleNotification = async (id, currentActive) => {
    try {
      const updated = await toggleNotification(id, !currentActive);
      // If toggling on, server deactivates all others
      if (!currentActive) {
        setNotifications((prev) =>
          prev.map((n) => (n._id === id ? updated : { ...n, isActive: false }))
        );
      } else {
        setNotifications((prev) =>
          prev.map((n) => (n._id === id ? updated : n))
        );
      }
    } catch (err) {
      alert('Failed to toggle notification: ' + err.message);
    }
  };

  const handleDeleteNotification = async (id) => {
    if (!window.confirm('Delete this notification?')) return;
    try {
      await deleteNotification(id);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      alert('Failed to delete notification: ' + err.message);
    }
  };

  const handleToggleBlast = async (id, currentBlast) => {
    try {
      const updated = await toggleNotificationBlast(id, !currentBlast);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? updated : n))
      );
    } catch (err) {
      alert('Failed to toggle blast: ' + err.message);
    }
  };

  const handleToggleMaintenance = async () => {
    setMaintenanceLoading(true);
    try {
      const nextMode = !maintenanceMode;
      const result = await toggleMaintenanceMode(nextMode);
      setMaintenanceMode(result.maintenanceMode);
    } catch (err) {
      alert('Failed to toggle maintenance mode: ' + err.message);
    } finally {
      setMaintenanceLoading(false);
    }
  };

  const handleToggleGlobalBlast = async () => {
    setGlobalBlastLoading(true);
    try {
      const nextBlast = !globalBlast;
      const result = await toggleGlobalBlast(nextBlast);
      setGlobalBlast(result.globalBlast);
    } catch (err) {
      alert('Failed to toggle global blast: ' + err.message);
    } finally {
      setGlobalBlastLoading(false);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') !== 'true') {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- keep admin forms in sync with portfolio data
    setAboutForm(data.about);
    setSettingsForm(data.settings ?? {});
  }, [data.about, data.settings]);

  const tabKey = TAB_KEYS[activeTab];

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    sessionStorage.removeItem('admin_token');
    navigate('/');
  };

  const handleReset = () => {
    if (window.confirm('Reset all portfolio data to defaults? This cannot be undone.')) {
      resetPortfolio();
      alert('Portfolio reset to defaults.');
    }
  };

  const readFileAsDataUri = (file, callback) => {
    if (file.size > MAX_FILE_SIZE) {
      alert('File must be under 1.5MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => callback(ev.target.result);
    reader.readAsDataURL(file);
  };

  const openAddModal = () => {
    setEditingId(null);
    if (activeTab === 'Achievements') {
      setForm({ ...emptyForms.achievements, type: 'highlight' });
    } else if (tabKey === 'skills') {
      const defaultCat = data.skillCategories?.[0]?.id ?? 'frontend';
      setForm({ ...emptyForms.skills, category: defaultCat });
    } else if (tabKey === 'projects') {
      const defaultCat = data.projectCategories?.[0]?.id ?? 'development';
      setForm({ ...emptyForms.projects, category: defaultCat });
    } else {
      setForm({ ...emptyForms[tabKey] });
    }
    setModalOpen(true);
  };

  const openEditModal = (item, type) => {
    setEditingId(item.id);
    if (activeTab === 'Achievements') {
      if (type === 'stat') {
        setForm({
          type: 'stat',
          label: item.label ?? '',
          value: item.value ?? '',
          suffix: item.suffix ?? '',
          isFloat: item.isFloat ?? false,
          title: '',
          subtitle: '',
          desc: '',
          imageUrl: '',
          assistaPath: '',
          imageData: '',
        });
      } else {
        setForm({
          type: 'highlight',
          title: item.title ?? '',
          subtitle: item.subtitle ?? '',
          desc: item.desc ?? '',
          imageUrl: item.imageUrl ?? '',
          assistaPath: item.assistaPath ?? '',
          imageData: item.imageData ?? '',
          label: '',
          value: '',
          suffix: '',
          isFloat: false,
        });
      }
    } else if (tabKey === 'projects') {
      setForm({
        title: item.title ?? '',
        description: item.description ?? '',
        techStack: (item.techStack ?? []).join(', '),
        githubUrl: item.githubUrl ?? '',
        liveDemoUrl: item.liveDemoUrl ?? '',
        cardLetter: item.cardLetter ?? '',
        featured: item.featured ?? false,
        category: item.category ?? 'development',
        imageUrl: item.imageUrl ?? '',
        assistaPath: item.assistaPath ?? '',
        imageData: item.imageData ?? '',
      });
    } else if (tabKey === 'certifications') {
      setForm({
        name: item.name ?? '',
        issuerOrg: item.issuerOrg ?? '',
        date: item.date ?? '',
        badgeEmoji: item.badgeEmoji ?? '🏅',
        themeColor: item.themeColor ?? '#6366f1',
        skills: (item.skills ?? []).join(', '),
        certificateLinkUrl: item.certificateLinkUrl ?? '',
        fileData: item.fileData ?? '',
      });
    } else if (tabKey === 'skills') {
      setForm({
        name: item.name ?? '',
        level: item.level ?? 90,
        category: item.category ?? 'frontend',
        imageUrl: item.imageUrl ?? '',
        imageData: item.imageData ?? '',
        assistaPath: item.assistaPath ?? '',
      });
    } else {
      setForm({
        title: item.title ?? '',
        org: item.org ?? '',
        timePeriod: item.timePeriod ?? '',
        location: item.location ?? '',
        badge: item.badge ?? '',
        description: item.description ?? '',
      });
    }
    setModalOpen(true);
  };

  const handleDelete = (id, type) => {
    if (!window.confirm('Delete this item?')) return;
    if (activeTab === 'Achievements') {
      updateData((prev) => ({
        ...prev,
        achievements: {
          ...prev.achievements,
          [type === 'stat' ? 'stats' : 'highlights']: prev.achievements[type === 'stat' ? 'stats' : 'highlights'].filter(
            (i) => i.id !== id
          ),
        },
      }));
    } else {
      updateData((prev) => ({
        ...prev,
        [tabKey]: prev[tabKey].filter((item) => item.id !== id),
      }));
    }
  };

  const saveProfileSettings = () => {
    updateData((prev) => ({
      ...prev,
      about: aboutForm,
      settings: settingsForm,
    }));
    alert('Profile & link settings saved.');
  };

  const handleSave = () => {
    if (activeTab === 'Achievements') {
      if (form.type === 'stat') {
        const item = {
          id: editingId ?? generateId('stat'),
          label: form.label,
          value: form.value,
          suffix: form.suffix,
          isFloat: form.isFloat,
        };
        updateData((prev) => {
          const stats = prev.achievements?.stats ?? [];
          const next = editingId
            ? stats.map((i) => (i.id === editingId ? { ...i, ...item } : i))
            : [...stats, item];
          return { ...prev, achievements: { ...prev.achievements, stats: next } };
        });
      } else {
        const item = {
          id: editingId ?? generateId('hl'),
          title: form.title,
          subtitle: form.subtitle,
          desc: form.desc,
          imageUrl: form.imageUrl,
          assistaPath: form.assistaPath,
          imageData: form.imageData,
        };
        updateData((prev) => {
          const highlights = prev.achievements?.highlights ?? [];
          const next = editingId
            ? highlights.map((i) => (i.id === editingId ? { ...i, ...item } : i))
            : [...highlights, item];
          return { ...prev, achievements: { ...prev.achievements, highlights: next } };
        });
      }
    } else if (tabKey === 'projects') {
      const item = {
        id: editingId ?? generateId('proj'),
        title: form.title,
        description: form.description,
        techStack: form.techStack.split(',').map((s) => s.trim()).filter(Boolean),
        githubUrl: form.githubUrl,
        liveDemoUrl: form.liveDemoUrl,
        cardLetter: form.cardLetter || form.title.slice(0, 2).toUpperCase(),
        featured: form.featured,
        category: form.category || 'development',
        imageUrl: form.imageUrl,
        assistaPath: form.assistaPath,
        imageData: form.imageData,
      };
      updateData((prev) => {
        const list = prev.projects;
        const next = editingId
          ? list.map((i) => (i.id === editingId ? { ...i, ...item } : i))
          : [...list, item];
        return { ...prev, projects: next };
      });
    } else if (tabKey === 'certifications') {
      const item = {
        id: editingId ?? generateId('cert'),
        name: form.name,
        issuerOrg: form.issuerOrg,
        date: form.date,
        badgeEmoji: form.badgeEmoji,
        themeColor: form.themeColor,
        skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean),
        certificateLinkUrl: form.certificateLinkUrl,
        fileData: form.fileData,
      };
      updateData((prev) => {
        const list = prev.certifications;
        const next = editingId
          ? list.map((i) => (i.id === editingId ? { ...i, ...item } : i))
          : [...list, item];
        return { ...prev, certifications: next };
      });
    } else if (tabKey === 'skills') {
      const item = {
        id: editingId ?? generateId('skill'),
        name: form.name,
        level: parseInt(form.level, 10) || 0,
        category: form.category,
        imageUrl: form.imageUrl,
        imageData: form.imageData,
        assistaPath: form.assistaPath,
      };
      updateData((prev) => {
        const list = prev.skills ?? [];
        const next = editingId
          ? list.map((i) => (i.id === editingId ? { ...i, ...item } : i))
          : [...list, item];
        return { ...prev, skills: next };
      });
    } else {
      const item = {
        id: editingId ?? generateId(tabKey === 'education' ? 'edu' : 'exp'),
        title: form.title,
        org: form.org,
        timePeriod: form.timePeriod,
        location: form.location,
        badge: form.badge,
        description: form.description,
      };
      updateData((prev) => {
        const list = prev[tabKey];
        const next = editingId
          ? list.map((i) => (i.id === editingId ? { ...i, ...item } : i))
          : [...list, item];
        return { ...prev, [tabKey]: next };
      });
    }
    setModalOpen(false);
  };

  const aboutImage =
    aboutForm.imageData || aboutForm.imageUrl || settingsForm.photoAssistaPath;

  const renderAchievementContent = () => {
    const stats = data.achievements?.stats ?? [];
    const highlights = data.achievements?.highlights ?? [];
    return (
      <div className="space-y-8">
        <div>
          <h3 className="font-heading font-bold mb-3 text-textColor-primary">Stats</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.map((item) => (
              <div key={item.id} className="p-4 rounded-xl border border-borderColor-base bg-bg-primary/50">
                <p className="font-bold text-textColor-primary">
                  {item.value}{item.suffix}
                </p>
                <p className="text-sm text-textColor-secondary">{item.label}</p>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => openEditModal(item, 'stat')} className="text-sm flex items-center gap-1 cursor-pointer hover:text-accent-primary">
                    <FaEdit /> Edit
                  </button>
                  <button onClick={() => handleDelete(item.id, 'stat')} className="text-sm flex items-center gap-1 text-red-500 cursor-pointer">
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-heading font-bold mb-3 text-textColor-primary">Highlights (with images)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {highlights.map((item) => (
              <div key={item.id} className="p-4 rounded-xl border border-borderColor-base bg-bg-primary/50 flex gap-3">
                {(item.imageData || item.imageUrl || item.assistaPath) && (
                  <img
                    src={item.imageData || item.imageUrl || item.assistaPath}
                    alt=""
                    className="w-16 h-16 rounded-lg object-cover shrink-0"
                  />
                )}
                <div className="flex-1">
                  <h4 className="font-bold text-textColor-primary text-sm">{item.title}</h4>
                  <p className="text-xs text-textColor-muted">{item.subtitle}</p>
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => openEditModal(item, 'highlight')} className="text-sm flex items-center gap-1 cursor-pointer hover:text-accent-primary">
                      <FaEdit /> Edit
                    </button>
                    <button onClick={() => handleDelete(item.id, 'highlight')} className="text-sm flex items-center gap-1 text-red-500 cursor-pointer">
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderCardList = () => {
    if (activeTab === 'Achievements') return renderAchievementContent();
    if (activeTab === 'Skills') {
      const items = data.skills ?? [];
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => {
            const skillImg = resolveAssetUrl(item.imageData, item.imageUrl, item.assistaPath);
            return (
              <div key={item.id} className="p-4 rounded-xl border border-borderColor-base bg-bg-primary/50 flex gap-4 hover:border-borderColor-hover transition-colors duration-300">
                <div className="w-16 h-16 rounded-lg bg-bg-secondary border border-borderColor-base overflow-hidden flex items-center justify-center flex-shrink-0">
                  {skillImg ? (
                    <img src={skillImg} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs text-textColor-muted font-bold uppercase">{item.name.slice(0, 2)}</span>
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-textColor-primary flex items-center justify-between text-sm">
                      <span>{item.name}</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-accent-primary/10 border border-accent-primary/20 text-accent-primary uppercase tracking-wider">{item.category}</span>
                    </h3>
                    <p className="text-xs text-textColor-secondary mt-1">Proficiency: {item.level}%</p>
                  </div>
                  <div className="flex gap-2 pt-2 mt-2 border-t border-borderColor-base/20">
                    <button onClick={() => openEditModal(item)} className="text-xs flex items-center gap-1 cursor-pointer hover:text-accent-primary">
                      <FaEdit /> Edit
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="text-xs flex items-center gap-1 text-red-500 cursor-pointer">
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          {items.length === 0 && (
            <p className="text-textColor-muted col-span-full text-center py-8">No skills yet.</p>
          )}
        </div>
      );
    }
    const items = data[tabKey] ?? [];
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.id} className="p-4 rounded-xl border border-borderColor-base bg-bg-primary/50 flex flex-col gap-3">
            {tabKey === 'projects' && (item.imageData || item.imageUrl || item.assistaPath) && (
              <img
                src={item.imageData || item.imageUrl || item.assistaPath}
                alt=""
                className="w-full h-24 object-cover rounded-lg"
              />
            )}
            {tabKey === 'projects' && (
              <>
                <h3 className="font-bold text-textColor-primary">{item.title}</h3>
                <div className="flex gap-2">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-accent-primary/10 border border-accent-primary/20 text-accent-primary uppercase tracking-wider">{item.category}</span>
                  {item.featured && <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 uppercase tracking-wider">Featured</span>}
                </div>
                <p className="text-sm text-textColor-secondary line-clamp-2">{item.description}</p>
              </>
            )}
            {tabKey === 'certifications' && (
              <>
                <h3 className="font-bold text-textColor-primary">{item.name}</h3>
                <p className="text-sm text-textColor-secondary">{item.issuerOrg}</p>
              </>
            )}
            {(tabKey === 'education' || tabKey === 'experience') && (
              <>
                <h3 className="font-bold text-textColor-primary">{item.title}</h3>
                <p className="text-sm text-textColor-secondary">{item.org}</p>
              </>
            )}
            <div className="flex gap-2 mt-auto">
              <button onClick={() => openEditModal(item)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-borderColor-base text-sm cursor-pointer hover:border-accent-primary">
                <FaEdit /> Edit
              </button>
              <button onClick={() => handleDelete(item.id)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-red-500/30 text-red-500 text-sm cursor-pointer">
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-textColor-muted col-span-full text-center py-8">No items yet.</p>
        )}
      </div>
    );
  };

  const renderModalFields = () => {
    if (activeTab === 'Achievements') {
      return (
        <>
          {!editingId && (
            <div>
              <label className="block text-sm font-semibold text-textColor-secondary mb-1">Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className={inputClass}
              >
                <option value="highlight">Highlight Card</option>
                <option value="stat">Stat Counter</option>
              </select>
            </div>
          )}
          {form.type === 'stat' ? (
            <>
              {[['Label', 'label'], ['Value', 'value'], ['Suffix', 'suffix']].map(([label, key]) => (
                <div key={key}>
                  <label className="block text-sm font-semibold text-textColor-secondary mb-1">{label}</label>
                  <input value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className={inputClass} />
                </div>
              ))}
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.isFloat} onChange={(e) => setForm({ ...form, isFloat: e.target.checked })} />
                <span className="text-sm text-textColor-primary">Decimal value</span>
              </label>
            </>
          ) : (
            <>
              {[['Title', 'title'], ['Subtitle', 'subtitle']].map(([label, key]) => (
                <div key={key}>
                  <label className="block text-sm font-semibold text-textColor-secondary mb-1">{label}</label>
                  <input value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className={inputClass} />
                </div>
              ))}
              <div>
                <label className="block text-sm font-semibold text-textColor-secondary mb-1">Description</label>
                <textarea value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} rows={3} className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-textColor-secondary mb-1">Image URL</label>
                <input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value, imageData: '' })} placeholder="https://..." className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-textColor-secondary mb-1">Assista folder path</label>
                <input value={form.assistaPath} onChange={(e) => setForm({ ...form, assistaPath: e.target.value })} placeholder="/assista/achievement1.jpg" className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-textColor-secondary mb-1">Upload image (max 1.5MB)</label>
                <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && readFileAsDataUri(e.target.files[0], (d) => setForm({ ...form, imageData: d, imageUrl: '' }))} className="w-full text-sm" />
              </div>
            </>
          )}
        </>
      );
    }

    if (tabKey === 'projects') {
      const projCategories = data.projectCategories ?? [
        { id: 'development', name: 'Development' },
        { id: 'networking', name: 'Networking' },
      ];
      return (
        <>
          {[['Title', 'title'], ['Description', 'description', 'textarea'], ['Tech Stack', 'techStack'], ['GitHub URL', 'githubUrl'], ['Live Demo URL', 'liveDemoUrl'], ['Card Letter', 'cardLetter'], ['Image URL', 'imageUrl'], ['Assista Path', 'assistaPath']].map(
            ([label, key, type]) =>
              type === 'textarea' ? (
                <div key={key}>
                  <label className="block text-sm font-semibold text-textColor-secondary mb-1">{label}</label>
                  <textarea value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} rows={3} className={inputClass} />
                </div>
              ) : (
                <div key={key}>
                  <label className="block text-sm font-semibold text-textColor-secondary mb-1">{label}</label>
                  <input
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value, ...(key === 'imageUrl' ? { imageData: '' } : {}) })}
                    placeholder={key === 'assistaPath' ? '/assista/project1.jpg' : ''}
                    className={inputClass}
                  />
                </div>
              )
          )}
          <div>
            <label className="block text-sm font-semibold text-textColor-secondary mb-1">Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputClass}>
              {projCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-textColor-secondary mb-1">Upload image</label>
            <input ref={imageInputRef} type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && readFileAsDataUri(e.target.files[0], (d) => setForm({ ...form, imageData: d, imageUrl: '' }))} className="w-full text-sm" />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
            <span className="text-sm text-textColor-primary">Featured</span>
          </label>
        </>
      );
    }

    if (tabKey === 'certifications') {
      return (
        <>
          {[['Name', 'name'], ['Issuer Org', 'issuerOrg'], ['Date', 'date'], ['Badge Emoji', 'badgeEmoji'], ['Theme Color', 'themeColor'], ['Skills', 'skills'], ['Certificate Link URL', 'certificateLinkUrl']].map(
            ([label, key]) => (
              <div key={key}>
                <label className="block text-sm font-semibold text-textColor-secondary mb-1">{label}</label>
                <input value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className={inputClass} />
              </div>
            )
          )}
          <div>
            <label className="block text-sm font-semibold text-textColor-secondary mb-1">Certificate file (max 1.5MB)</label>
            <input ref={fileInputRef} type="file" accept="image/*,.pdf" onChange={(e) => e.target.files?.[0] && readFileAsDataUri(e.target.files[0], (d) => setForm({ ...form, fileData: d }))} className="w-full text-sm" />
          </div>
        </>
      );
    }

    if (tabKey === 'skills') {
      const categories = data.skillCategories ?? [];
      return (
        <>
          <div>
            <label className="block text-sm font-semibold text-textColor-secondary mb-1">Skill/Course Name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="e.g. React.js, Django Mastery" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-textColor-secondary mb-1">Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputClass}>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-textColor-secondary mb-1">Proficiency Level ({form.level}%)</label>
            <input type="range" min="0" max="100" value={form.level} onChange={(e) => setForm({ ...form, level: parseInt(e.target.value, 10) })} className="w-full cursor-pointer accent-accent-primary" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-textColor-secondary mb-1">Image URL</label>
            <input value={form.imageUrl ?? ''} onChange={(e) => setForm({ ...form, imageUrl: e.target.value, imageData: '' })} placeholder="https://..." className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-textColor-secondary mb-1">Assista folder path</label>
            <input value={form.assistaPath ?? ''} onChange={(e) => setForm({ ...form, assistaPath: e.target.value })} placeholder="/assista/skill1.jpg" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-textColor-secondary mb-1">Upload image (max 1.5MB)</label>
            <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && readFileAsDataUri(e.target.files[0], (d) => setForm({ ...form, imageData: d, imageUrl: '' }))} className="w-full text-sm" />
          </div>
        </>
      );
    }

    return (
      <>
        {[['Title/Role', 'title'], ['Org', 'org'], ['Time Period', 'timePeriod'], ['Location', 'location'], ['Badge', 'badge']].map(([label, key]) => (
          <div key={key}>
            <label className="block text-sm font-semibold text-textColor-secondary mb-1">{label}</label>
            <input value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className={inputClass} />
          </div>
        ))}
        <div>
          <label className="block text-sm font-semibold text-textColor-secondary mb-1">Description</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} className={inputClass} />
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-bg-primary text-textColor-primary font-body">
      <header className="border-b border-borderColor-base bg-bg-secondary/50 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-xl font-bold">Portfolio Admin</h1>
            <Link to="/" className="text-xs text-accent-primary hover:underline">View public site</Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-sm text-textColor-secondary">
              <FaEye className="text-accent-primary" />
              {visitorCount} visits
            </span>
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-borderColor-base text-textColor-secondary hover:text-red-500 cursor-pointer">
              <FaSignOutAlt /> Log Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Global Configuration */}
        <section className="glass-panel rounded-2xl p-6 border border-borderColor-base">
          <h2 className="font-heading text-lg font-bold mb-2">Global Configuration</h2>
          <p className="text-xs text-textColor-muted mb-4">
            Site-wide controls for maintenance mode, celebration blast, and data reset.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleToggleMaintenance}
              disabled={maintenanceLoading}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-all disabled:opacity-60 ${
                maintenanceMode
                  ? 'bg-amber-500/20 text-amber-500 border border-amber-500/40 hover:bg-amber-500/30'
                  : 'bg-bg-secondary border border-borderColor-base text-textColor-secondary hover:border-amber-500'
              }`}
            >
              {maintenanceMode ? <FaToggleOn className="text-base" /> : <FaToggleOff className="text-base" />}
              <FaTools />
              {maintenanceLoading ? 'Updating...' : maintenanceMode ? 'Maintenance ON' : 'Maintenance OFF'}
            </button>

            <Link
              to="/maintenance"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-borderColor-base text-textColor-secondary text-sm font-semibold hover:border-accent-primary hover:text-accent-primary transition-all"
            >
              <FaExternalLinkAlt /> Preview Maintenance Page
            </Link>

            <button
              onClick={handleToggleGlobalBlast}
              disabled={globalBlastLoading}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-all disabled:opacity-60 ${
                globalBlast
                  ? 'bg-amber-500/20 text-amber-500 border border-amber-500/40 hover:bg-amber-500/30'
                  : 'bg-bg-secondary border border-borderColor-base text-textColor-secondary hover:border-amber-500'
              }`}
              title="Toggle site-wide celebration blast animation for all visitors"
            >
              <span className="text-sm">🎉</span>
              {globalBlastLoading
                ? 'Updating...'
                : globalBlast
                  ? 'Global Blast ON'
                  : 'Global Blast OFF'}
            </button>

            <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-500/40 text-red-500 text-sm font-semibold cursor-pointer">
              <FaUndo /> Reset Defaults
            </button>
          </div>
          {maintenanceMode && (
            <p className="text-xs text-amber-500 mt-3 font-semibold">
              Maintenance mode is active — public visitors see the maintenance page. Admin and login remain accessible.
            </p>
          )}
          {globalBlast && (
            <p className="text-xs text-amber-500 mt-3 font-semibold">
              Global blast is active — visitors will see the celebration animation on the homepage.
            </p>
          )}
        </section>

        {/* Profile Section */}
        <section className="glass-panel rounded-2xl p-6 border border-borderColor-base">
          <h2 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">
            <FaUser className="text-accent-primary" /> Profile, Photo & Resume Links
          </h2>
          <p className="text-xs text-textColor-muted mb-4">
            Place files in <code className="text-accent-primary">public/assista/</code> folder, then use paths like <code className="text-accent-primary">/assista/resume.pdf</code> or <code className="text-accent-primary">/assista/photo.jpg</code>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-textColor-secondary mb-1">Photo URL</label>
                <input value={aboutForm.imageUrl ?? ''} onChange={(e) => setAboutForm({ ...aboutForm, imageUrl: e.target.value, imageData: '' })} className={inputClass} placeholder="https://..." />
              </div>
              <div>
                <label className="block text-sm font-semibold text-textColor-secondary mb-1">Assista photo path</label>
                <input value={settingsForm.photoAssistaPath ?? ''} onChange={(e) => setSettingsForm({ ...settingsForm, photoAssistaPath: e.target.value })} className={inputClass} placeholder="/assista/photo.jpg" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-textColor-secondary mb-1">Upload photo</label>
                <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && readFileAsDataUri(e.target.files[0], (d) => setAboutForm({ ...aboutForm, imageData: d, imageUrl: '' }))} className="w-full text-sm" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-textColor-secondary mb-1 flex items-center gap-1">
                  <FaLink /> Resume link
                </label>
                <input value={settingsForm.resumeUrl ?? ''} onChange={(e) => setSettingsForm({ ...settingsForm, resumeUrl: e.target.value })} className={inputClass} placeholder="/assista/resume.pdf" />
              </div>
              <button onClick={saveProfileSettings} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-primary text-white text-sm font-semibold cursor-pointer">
                <FaSave /> Save Profile Settings
              </button>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-40 h-40 rounded-2xl overflow-hidden border-2 border-accent-primary/30 bg-bg-secondary flex items-center justify-center">
                {aboutImage ? (
                  <img src={aboutImage} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="font-heading text-4xl font-bold gradient-text">RB</span>
                )}
              </div>
              {settingsForm.resumeUrl && (
                <a href={settingsForm.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-accent-primary hover:underline">
                  Preview resume link
                </a>
              )}
            </div>
          </div>
        </section>

        {/* ─── Notifications Section ─────────────────── */}
        <section className="glass-panel rounded-2xl p-6 border border-borderColor-base">
          <h2 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">
            <FaBell className="text-accent-secondary" /> Notifications
          </h2>
          <p className="text-xs text-textColor-muted mb-4">
            Post notifications to display on the homepage. Toggle <strong>ON</strong> to make it live. Only one can be active at a time.
          </p>

          {/* Create Notification Form */}
          <form onSubmit={handleCreateNotification} className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            <input
              value={notifForm.title}
              onChange={(e) => setNotifForm({ ...notifForm, title: e.target.value })}
              placeholder="Notification Title"
              required
              className={inputClass}
            />
            <input
              value={notifForm.message}
              onChange={(e) => setNotifForm({ ...notifForm, message: e.target.value })}
              placeholder="Notification Message"
              required
              className={inputClass}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-accent-secondary text-white text-sm font-semibold rounded-lg hover:bg-accent-secondary/85 cursor-pointer flex items-center justify-center gap-2"
            >
              <FaPlus /> Post Notification
            </button>
          </form>

          {/* Notification List */}
          {notifLoading ? (
            <p className="text-textColor-muted text-sm text-center py-4">Loading notifications...</p>
          ) : notifications.length === 0 ? (
            <p className="text-textColor-muted text-sm text-center py-4">No notifications yet.</p>
          ) : (
            <div className="space-y-3">
              {notifications.map((notif) => (
                <div
                  key={notif._id}
                  className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center gap-3 transition-all ${
                    notif.isActive
                      ? 'border-emerald-500/50 bg-emerald-500/5'
                      : 'border-borderColor-base bg-bg-primary/50'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-textColor-primary text-sm truncate">{notif.title}</h4>
                      {notif.isActive && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-500 uppercase tracking-wider shrink-0">LIVE</span>
                      )}
                    </div>
                    <p className="text-xs text-textColor-secondary truncate">{notif.message}</p>
                    <p className="text-[10px] text-textColor-muted mt-1">
                      {new Date(notif.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 flex-wrap">
                    <button
                      onClick={() => handleToggleNotification(notif._id, notif.isActive)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                        notif.isActive
                          ? 'bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30'
                          : 'bg-bg-secondary border border-borderColor-base text-textColor-secondary hover:border-accent-primary'
                      }`}
                    >
                      {notif.isActive ? <FaToggleOn className="text-base" /> : <FaToggleOff className="text-base" />}
                      {notif.isActive ? 'LIVE' : 'OFF'}
                    </button>
                    <button
                      onClick={() => handleToggleBlast(notif._id, notif.isBlast)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                        notif.isBlast
                          ? 'bg-amber-500/20 text-amber-500 hover:bg-amber-500/30 border border-amber-500/40'
                          : 'bg-bg-secondary border border-borderColor-base text-textColor-secondary hover:border-amber-500'
                      }`}
                      title="Toggle celebration blast animation for visitors"
                    >
                      <span className="text-sm">🎉</span>
                      {notif.isBlast ? 'Blast ON' : 'Blast'}
                    </button>
                    <button
                      onClick={() => handleDeleteNotification(notif._id)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-red-500/30 text-red-500 text-xs cursor-pointer hover:bg-red-500/10 transition-all"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ─── Contact Messages Section ──────────────── */}
        <section className="glass-panel rounded-2xl p-6 border border-borderColor-base">
          <h2 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">
            <FaEnvelope className="text-accent-primary" /> Contact Messages
          </h2>

          {contactsLoading ? (
            <p className="text-textColor-muted text-sm text-center py-4">Loading messages...</p>
          ) : contacts.length === 0 ? (
            <p className="text-textColor-muted text-sm text-center py-4">No contact messages yet.</p>
          ) : (
            <div className="space-y-3">
              {contacts.map((contact) => (
                <div
                  key={contact._id}
                  className="p-4 rounded-xl border border-borderColor-base bg-bg-primary/50 flex flex-col sm:flex-row gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="w-8 h-8 rounded-full bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-accent-primary text-xs font-bold shrink-0">
                        {contact.name?.charAt(0).toUpperCase()}
                      </span>
                      <div>
                        <h4 className="font-bold text-textColor-primary text-sm">{contact.name}</h4>
                        <p className="text-xs text-accent-primary">{contact.email}</p>
                      </div>
                    </div>
                    <p className="text-sm text-textColor-secondary mt-2 pl-11">{contact.message}</p>
                    <p className="text-[10px] text-textColor-muted mt-2 pl-11">
                      {new Date(contact.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-start shrink-0">
                    <button
                      onClick={() => handleDeleteContact(contact._id)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-red-500/30 text-red-500 text-xs cursor-pointer"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ─── Content Editor Tabs ───────────────────── */}
        <section className="glass-panel rounded-2xl p-6 border border-borderColor-base">
          <div className="flex flex-wrap gap-2 mb-6">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer ${
                  activeTab === tab ? 'bg-accent-primary text-white' : 'border border-borderColor-base text-textColor-secondary hover:border-accent-primary'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Project Categories Manager */}
          {activeTab === 'Projects' && (
            <div className="mb-6 p-4 rounded-xl border border-borderColor-base bg-bg-primary/30 space-y-4">
              <h3 className="font-heading text-sm font-bold text-textColor-primary">
                Manage Project Categories
              </h3>
              <form onSubmit={handleAddProjectCategory} className="flex flex-wrap gap-3 items-end">
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-xs font-semibold text-textColor-secondary mb-1">New Category Name</label>
                  <input
                    type="text"
                    value={newProjCatName}
                    onChange={(e) => setNewProjCatName(e.target.value)}
                    placeholder="e.g. AI & Machine Learning"
                    className={inputClass}
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-accent-primary text-white text-sm font-semibold rounded-lg hover:bg-accent-primary/85 cursor-pointer h-10"
                >
                  Add Category
                </button>
              </form>
              <div className="flex flex-wrap gap-2 pt-2">
                {(data.projectCategories ?? [
                  { id: 'development', name: 'Development' },
                  { id: 'networking', name: 'Networking' },
                ]).map((cat) => (
                  <span
                    key={cat.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-bg-secondary border border-borderColor-base rounded-full text-xs font-semibold text-textColor-primary"
                  >
                    {cat.name}
                    <button
                      type="button"
                      onClick={() => handleRemoveProjectCategory(cat.id)}
                      className="text-textColor-muted hover:text-red-500 cursor-pointer text-sm font-bold ml-1"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Skill Categories Manager */}
          {activeTab === 'Skills' && (
            <div className="mb-6 p-4 rounded-xl border border-borderColor-base bg-bg-primary/30 space-y-4">
              <h3 className="font-heading text-sm font-bold text-textColor-primary">
                Manage Skill Categories
              </h3>
              <form onSubmit={handleAddCategory} className="flex flex-wrap gap-3 items-end">
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-xs font-semibold text-textColor-secondary mb-1">New Category Name</label>
                  <input
                    type="text"
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    placeholder="e.g. AI & Machine Learning"
                    className={inputClass}
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-accent-primary text-white text-sm font-semibold rounded-lg hover:bg-accent-primary/85 cursor-pointer h-10"
                >
                  Add Category
                </button>
              </form>
              <div className="flex flex-wrap gap-2 pt-2">
                {(data.skillCategories ?? []).map((cat) => (
                  <span
                    key={cat.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-bg-secondary border border-borderColor-base rounded-full text-xs font-semibold text-textColor-primary"
                  >
                    {cat.name}
                    <button
                      type="button"
                      onClick={() => handleRemoveCategory(cat.id)}
                      className="text-textColor-muted hover:text-red-500 cursor-pointer text-sm font-bold ml-1"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
            <h2 className="font-heading text-lg font-bold">{activeTab}</h2>
            <button onClick={openAddModal} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-secondary text-white text-sm font-semibold cursor-pointer">
              <FaPlus /> Add New Card
            </button>
          </div>
          {renderCardList()}
        </section>
      </main>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto glass-panel rounded-2xl p-6 border border-borderColor-base">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-heading text-lg font-bold">{editingId ? 'Edit' : 'Add'} Item</h3>
              <button onClick={() => setModalOpen(false)} className="cursor-pointer text-textColor-muted"><FaTimes /></button>
            </div>
            <div className="space-y-4">{renderModalFields()}</div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleSave} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-accent-primary text-white font-semibold cursor-pointer">
                <FaSave /> Save
              </button>
              <button onClick={() => setModalOpen(false)} className="px-4 py-2.5 rounded-lg border border-borderColor-base cursor-pointer">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
