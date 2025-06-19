import React, { useState } from 'react'; // useEffect removed as it's no longer needed for theme
import NavigationMenu from '@/components/layout/NavigationMenu';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"; // Conceptual
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch'; // Kept for Email Notifications, but Dark Mode switch is removed
import { UserCircle, Edit3 } from 'lucide-react';

const ProfilePage: React.FC = () => {
  console.log('ProfilePage loaded');
  
  const [userName, setUserName] = useState('Alex Taylor');
  const [userEmail, setUserEmail] = useState('alex.taylor@example.com');
  const [avatarUrl, setAvatarUrl] = useState('https://github.com/shadcn.png');
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // DarkMode state and useEffect have been removed. The theme is now static (black).
  const [emailNotifications, setEmailNotifications] = useState(true);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile updated:', { userName, userEmail, avatarUrl });
    alert('Profile update simulated. Check console.');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert("New passwords don't match!");
      return;
    }
    if (!newPassword) {
        alert("New password cannot be empty!");
        return;
    }
    console.log('Password change requested for email:', userEmail);
    alert('Password change simulated. Check console.');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      <NavigationMenu className="w-64" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header appName="Profile" /> {/* Changed appName */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6">
          <div className="container mx-auto max-w-3xl space-y-8">
            {/* Profile Information Card */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details and avatar.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={avatarUrl} alt={userName} />
                      <AvatarFallback><UserCircle className="h-12 w-12 text-muted-foreground" /></AvatarFallback>
                    </Avatar>
                    <Button type="button" variant="outline" size="sm">
                        <Edit3 className="mr-2 h-4 w-4" /> Change Avatar
                    </Button>
                  </div>
                  <div>
                    <label htmlFor="userName" className="block text-sm font-medium text-foreground">Full Name</label>
                    <Input id="userName" type="text" value={userName} onChange={e => setUserName(e.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <label htmlFor="userEmail" className="block text-sm font-medium text-foreground">Email Address</label>
                    <Input id="userEmail" type="email" value={userEmail} onChange={e => setUserEmail(e.target.value)} className="mt-1" />
                  </div>
                   <div>
                    <label htmlFor="avatarUrl" className="block text-sm font-medium text-foreground\">Avatar URL</label>
                    <Input id="avatarUrl" type="text" value={avatarUrl} onChange={e => setAvatarUrl(e.target.value)} className="mt-1" placeholder="https://example.com/avatar.png"/>
                  </div>
                  <Button type="submit">Save Profile</Button>
                </form>
              </CardContent>
            </Card>

            {/* Account Security Card */}
            <Card>
              <CardHeader>
                <CardTitle>Account Security</CardTitle>
                <CardDescription>Change your password.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleChangePassword} className="space-y-6">
                  <div>
                    <label htmlFor="currentPassword"className="block text-sm font-medium text-foreground">Current Password</label>
                    <Input id="currentPassword" type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <label htmlFor="newPassword"className="block text-sm font-medium text-foreground">New Password</label>
                    <Input id="newPassword" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <label htmlFor="confirmNewPassword"className="block text-sm font-medium text-foreground">Confirm New Password</label>
                    <Input id="confirmNewPassword" type="password" value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} className="mt-1" />
                  </div>
                  <Button type="submit">Change Password</Button>
                </form>
              </CardContent>
            </Card>

            {/* Application Preferences Card */}
            <Card>
              <CardHeader>
                <CardTitle>Application Preferences</CardTitle>
                <CardDescription>Customize your app experience.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Dark Mode Switch has been removed */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-foreground\">Email Notifications</h4>
                    <p className="text-xs text-muted-foreground">Receive updates and alerts via email.</p>
                  </div>
                  <Switch id="emailNotificationsSwitch" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>
                {/* Add more preferences as needed */}
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default ProfilePage;