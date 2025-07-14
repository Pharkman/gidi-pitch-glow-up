import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PageHeader from '@/components/PageHeader';
import Logo from '@/components/Logo';
import { Users, MessageSquare, CreditCard, BarChart3, FileText, User, Target, Brain, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import * as React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Sidebar } from '@/components/ui/sidebar';

const sidebarItems = [
  { name: 'Dashboard', icon: BarChart3, route: '/dashboard', available: true },
  { name: 'Pitch Deck Generator', icon: FileText, route: '/pitch-decks', available: true },
  { name: 'Resume Builder', icon: User, route: '/resume-builder', available: true },
  { name: 'Financial Forecast', icon: BarChart3, route: '', available: false },
  { name: 'Market Estimator', icon: Target, route: '', available: false },
  { name: 'YC Assistant', icon: Users, route: '', available: false },
  { name: 'AI Coach', icon: Brain, route: '', available: false },
];

const sampleMembers = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Owner' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Admin' },
  { id: 3, name: 'Samuel Lee', email: 'samuel.lee@example.com', role: 'Member' },
  { id: 4, name: 'Aisha Bello', email: 'aisha.bello@example.com', role: 'Member' },
];

export default function TeamMembersPage() {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '' });
  const [members, setMembers] = useState(sampleMembers);
  const [editingId, setEditingId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({ id: null, firstName: '', lastName: '', email: '', role: 'Member' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleInvite = (e) => {
    e.preventDefault();
    setMembers([
      ...members,
      {
        id: members.length + 1,
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        role: 'Member',
      },
    ]);
    setShowInviteModal(false);
    setForm({ firstName: '', lastName: '', email: '' });
    setTimeout(() => setShowSuccessModal(true), 200); // Show success modal after closing invite
  };

  const handleDelete = (id) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  const handleEdit = (member) => {
    const [firstName, ...lastNameParts] = member.name.split(' ');
    setEditForm({
      id: member.id,
      firstName: firstName || '',
      lastName: lastNameParts.join(' ') || '',
      email: member.email,
      role: member.role,
    });
    setShowEditModal(true);
  };
  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };
  const handleEditSave = (e) => {
    e.preventDefault();
    setMembers(members.map(m => m.id === editForm.id ? {
      ...m,
      name: `${editForm.firstName} ${editForm.lastName}`.trim(),
      email: editForm.email,
      role: editForm.role,
    } : m));
    setShowEditModal(false);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar
        footer={
          <div className="p-6 border-t space-y-2">
            <Button variant="ghost" className="w-full justify-start" onClick={() => alert('Support coming soon!')}>
              <MessageSquare className="mr-3 h-4 w-4" /> Support
            </Button>
            <Button variant="ghost" className="w-full justify-start relative">
              <CreditCard className="mr-3 h-4 w-4" /> Subscription
              <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-0.5 rounded-full">Coming Soon</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/team-members')}>
              <Users className="mr-3 h-4 w-4" /> Team Members
            </Button>
          </div>
        }
      >
        <nav className="space-y-2 px-4 pb-6">
          {sidebarItems.map((item) => (
            <Button
              key={item.name}
              variant={window.location.pathname === item.route ? 'default' : 'ghost'}
              className={`w-full justify-start ${!item.available ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!item.available}
              onClick={() => item.route && navigate(item.route)}
            >
              <item.icon className="mr-3 h-4 w-4" />
              {item.name}
              {!item.available && (
                <span className="ml-auto text-xs text-muted-foreground">Soon</span>
              )}
            </Button>
          ))}
        </nav>
      </Sidebar>
      <main className="main-wrapper flex-1">
        <PageHeader heading="Team Member Management" subheading="Manage your team, invite new members, and assign roles." />
        <div className="w-full">
          <Button onClick={() => setShowInviteModal(true)} className="mb-6">Invite Team Member</Button>
          <div className="shadow-sm w-full">
            <h2 className="text-lg font-semibold">Team Members</h2>
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/4">Name</TableHead>
                  <TableHead className="w-1/3">Email</TableHead>
                  <TableHead className="w-1/6">Role</TableHead>
                  <TableHead className="w-12 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>{member.name}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.role}</TableCell>
                    <TableCell className="text-right">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                        </PopoverTrigger>
                        <PopoverContent align="end" className="w-40 p-2">
                          <Button variant="ghost" className="w-full justify-start" onClick={() => handleEdit(member)}>
                            Edit
                          </Button>
                          {member.role !== 'Admin' && (
                            <Button variant="ghost" className="w-full justify-start text-red-600" onClick={() => handleDelete(member.id)}>
                              Delete
                            </Button>
                          )}
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        {/* Invite and Edit modals here */}
        <Dialog open={showInviteModal} onOpenChange={setShowInviteModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleInvite} className="space-y-4 mt-4">
              <Input
                name="email"
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
                required
              />
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowInviteModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">Send Invite</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
        <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Team Member</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditSave} className="space-y-4 mt-4">
              <div className="flex gap-2">
                <Input
                  name="firstName"
                  placeholder="First Name"
                  value={editForm.firstName}
                  onChange={handleEditChange}
                  required
                />
                <Input
                  name="lastName"
                  placeholder="Last Name"
                  value={editForm.lastName}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <Input
                name="email"
                type="email"
                placeholder="Email"
                value={editForm.email}
                onChange={handleEditChange}
                required
              />
              <select
                name="role"
                value={editForm.role}
                onChange={handleEditChange}
                className="w-full border rounded p-2"
              >
                <option value="Owner">Owner</option>
                <option value="Admin">Admin</option>
                <option value="Member">Member</option>
              </select>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowEditModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
} 