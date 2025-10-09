import React, { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';
import CustomAlert from '../../components/modals/CustomerAlert';
import { update_data } from '../../services/putMethod';
import { useUser } from '../../hooks/protectHooks';
import { useAuth } from '../../contexts/UserContext';

const AdminProfile = () => {
  const { user, setUser} = useAuth();

  const [profile, setProfile] = useState({
    id: '',
    full_name: '',
    email: '',
    role: '',
    status: '',
  });

  const [passwords, setPasswords] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });

  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  useEffect(() => {
    try {
      setProfile({
        full_name: user.full_name || '',
        email: user.email || '',
        role: user.role || '',
        status: user.status || '',
      });
    } catch (e) {
      console.error('Invalid admin JSON', e);
    }
  }, []);

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    const payload = {
      id: user?._id,
      email: profile?.email,
      full_name: profile?.full_name,
    };

    try {
      const response = await update_data('/update-account', payload);
      console.log('response', response);

      if (response) {
        const updateAdminInfo = {
          ...user,
          full_name: response.admin?.full_name,
          email: response.admin?.email,
        };

        setUser(updateAdminInfo);
        setShowEditProfile(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePasswordUpdate = async () => {
    if (!passwords.new_password || !passwords.current_password || !passwords.confirm_password) {
      return CustomAlert('error', 'Please fill in all password fields');
    }

    if (passwords.new_password !== passwords.confirm_password) {
      return CustomAlert('error', 'New Password does not match Confirm Password');
    }

    const payload = {
      id: admin?._id,
      email: profile?.email,
      full_name: profile?.full_name,
      password: passwords?.new_password,
      currentPassword: passwords?.current_password,
    };

    try {
      const response = await update_data('/update-account', payload);
      if (response) {
        setPasswords({
          current_password: '',
          new_password: '',
          confirm_password: '',
        });
        setShowPasswordForm(false);
        CustomAlert('success', 'Password updated successfully');
      }
    } catch (err) {
      console.error(err);
      CustomAlert('error', err?.response?.data?.message || 'Failed to update password');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white shadow-md rounded-2xl p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-orange-600">Admin Profile</h2>
          <div className="flex gap-2">
            <Button variant="outlined" color="warning" onClick={() => setShowEditProfile(!showEditProfile)}>
              {showEditProfile ? 'Cancel Edit' : 'Edit Profile'}
            </Button>
            <Button variant="outlined" color="warning" onClick={() => setShowPasswordForm(!showPasswordForm)}>
              {showPasswordForm ? 'Cancel Password' : 'Change Password'}
            </Button>
          </div>
        </div>

        {/* Profile Display */}
        {!showEditProfile ? (
          <div className="space-y-2 text-gray-700">
            <p><strong>Full Name:</strong> {profile.full_name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p className={`${profile.role === 'Super Admin' ? 'text-orange-500' : 'text-yellow-400'}`}>
              <strong className="text-gray-700">Role:</strong> {profile.role}
            </p>
            <p className="text-green-400">
              <strong className="text-gray-700">Status:</strong> {profile.status}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              label="Full Name"
              name="full_name"
              fullWidth
              value={profile.full_name}
              onChange={handleProfileChange}
            />
            <TextField
              label="Email"
              name="email"
              fullWidth
              value={profile.email}
              onChange={handleProfileChange}
            />
            <div className="md:col-span-2 text-right mt-2">
              <Button
                variant="contained"
                color="warning"
                disabled={!profile.full_name || !profile.email}
                onClick={handleProfileUpdate}
              >
                Save Changes
              </Button>
            </div>
          </div>
        )}

        {/* Password Form */}
        {showPasswordForm && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Change Password</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField
                label="Current Password"
                name="current_password"
                type="password"
                fullWidth
                value={passwords.current_password}
                onChange={handlePasswordChange}
              />
              <TextField
                label="New Password"
                name="new_password"
                type="password"
                fullWidth
                value={passwords.new_password}
                onChange={handlePasswordChange}
              />
              <TextField
                label="Confirm New Password"
                name="confirm_password"
                type="password"
                fullWidth
                value={passwords.confirm_password}
                onChange={handlePasswordChange}
              />
              <div className="md:col-span-2 text-right mt-2">
                <Button
                  variant="contained"
                  color="warning"
                  onClick={handlePasswordUpdate}
                >
                  Update Password
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
