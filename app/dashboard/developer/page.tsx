// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { authApi } from '../../../lib/api/auth';
// import { useAuth } from '../../hooks/useAuth';
// import { toast } from 'react-toastify';

// export default function DeveloperDashboard() {
//   const { user, loading, logout } = useAuth();
//   const router = useRouter();
//   const [requestId, setRequestId] = useState('');
//   const [roleName, setRoleName] = useState('');

//   if (loading) return <div>Loading...</div>;
//   if (!user || user.role !== 1) {
//     router.push('/login');
//     return null;
//   }

//   const handleApprove = async () => {
//     try {
//       await authApi.approveRole(parseInt(requestId));
//       toast.success('Role request approved!');
//     } catch (error) {
//       toast.error('Failed to approve request!');
//     }
//   };

//   const handleReject = async () => {
//     try {
//       await authApi.rejectRole(parseInt(requestId));
//       toast.success('Role request rejected!');
//     } catch (error) {
//       toast.error('Failed to reject request!');
//     }
//   };

//   const handleCreateRole = async () => {
//     try {
//       await authApi.createRole({ name: roleName });
//       toast.success('Role created successfully!');
//       setRoleName('');
//     } catch (error) {
//       toast.error('Failed to create role!');
//     }
//   };

//   return (
//     <div className="min-h-screen p-8 bg-gray-50">
//       <div className="max-w-4xl mx-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold text-gray-800">Developer Dashboard</h1>
//           <button
//             onClick={logout}
//             className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//           >
//             Logout
//           </button>
//         </div>
//         <p className="text-lg text-gray-600 mb-8">Welcome, {user.username}! Manage the platform here.</p>
        
//         <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//           <h2 className="text-xl font-semibold mb-4">Manage Role Requests</h2>
//           <div className="flex space-x-4">
//             <input
//               value={requestId}
//               onChange={(e) => setRequestId(e.target.value)}
//               placeholder="Request ID"
//               className="flex-1 p-2 border rounded-md"
//             />
//             <button
//               onClick={handleApprove}
//               className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
//             >
//               Approve
//             </button>
//             <button
//               onClick={handleReject}
//               className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//             >
//               Reject
//             </button>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold mb-4">Create New Role</h2>
//           <div className="flex space-x-4">
//             <input
//               value={roleName}
//               onChange={(e) => setRoleName(e.target.value)}
//               placeholder="New Role Name"
//               className="flex-1 p-2 border rounded-md"
//             />
//             <button
//               onClick={handleCreateRole}
//               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//             >
//               Create Role
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '../../../lib/api/auth';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function DeveloperDashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [roleRequests, setRoleRequests] = useState<any[]>([]);
  const [roleName, setRoleName] = useState('');
  const [newUser, setNewUser] = useState({ username: '', password: '', roleId: 0 });
  const [openApproveDialog, setOpenApproveDialog] = useState(false);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [openCreateUserDialog, setOpenCreateUserDialog] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null);

  useEffect(() => {
    if (!loading && user?.role === 1) {
      fetchRoleRequests();
    }
  }, [loading, user]);

  const fetchRoleRequests = async () => {
    try {
      const response = await authApi.getRoleRequests();
      setRoleRequests(response.data);
    } catch (error) {
      toast.error('Failed to fetch role requests!');
    }
  };

  const handleApprove = async () => {
    if (!selectedRequestId) return;
    try {
      await authApi.approveRole(selectedRequestId);
      toast.success('Role request approved!');
      setOpenApproveDialog(false);
      fetchRoleRequests();
    } catch (error) {
      toast.error('Failed to approve request!');
    }
  };

  const handleReject = async () => {
    if (!selectedRequestId) return;
    try {
      await authApi.rejectRole(selectedRequestId);
      toast.success('Role request rejected!');
      setOpenRejectDialog(false);
      fetchRoleRequests();
    } catch (error) {
      toast.error('Failed to reject request!');
    }
  };

  const handleCreateRole = async () => {
    try {
      await authApi.createRole({ name: roleName });
      toast.success('Role created successfully!');
      setRoleName('');
    } catch (error) {
      toast.error('Failed to create role!');
    }
  };

  const handleCreateUser = async () => {
    try {
      await authApi.createUser(newUser);
      toast.success('User created successfully!');
      setOpenCreateUserDialog(false);
      setNewUser({ username: '', password: '', roleId: 0 });
    } catch (error) {
      toast.error('Failed to create user!');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user || user.role !== 1) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Developer Dashboard</h1>
          <Button onClick={logout} variant="destructive">
            Logout
          </Button>
        </div>
        <p className="text-lg text-gray-600 mb-8">Welcome, {user.username}! Manage the platform here.</p>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Manage Role Requests</h2>
          <div className="space-y-4">
            {roleRequests.map((request) => (
              <div key={request.id} className="p-4 border rounded-md">
                <p>User: {request.user.username}</p>
                <p>Requested Role: {request.requestedRole}</p>
                <p>Status: {request.status}</p>
                {request.status === 'PENDING' && (
                  <div className="mt-2 space-x-2">
                    <Dialog open={openApproveDialog} onOpenChange={setOpenApproveDialog}>
                      <DialogTrigger asChild>
                        <Button
                          variant="default"
                          onClick={() => setSelectedRequestId(request.id)}
                        >
                          Approve
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Confirm Approval</DialogTitle>
                        </DialogHeader>
                        <p>Are you sure you want to approve this role request?</p>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setOpenApproveDialog(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleApprove}>Confirm</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Dialog open={openRejectDialog} onOpenChange={setOpenRejectDialog}>
                      <DialogTrigger asChild>
                        <Button
                          variant="destructive"
                          onClick={() => setSelectedRequestId(request.id)}
                        >
                          Reject
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Confirm Rejection</DialogTitle>
                        </DialogHeader>
                        <p>Are you sure you want to reject this role request?</p>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setOpenRejectDialog(false)}>
                            Cancel
                          </Button>
                          <Button variant="destructive" onClick={handleReject}>
                            Confirm
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Create New Role</h2>
          <div className="flex space-x-4">
            <Input
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              placeholder="New Role Name"
              className="flex-1"
            />
            <Button onClick={handleCreateRole}>Create Role</Button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Create New Admin User</h2>
          <Dialog open={openCreateUserDialog} onOpenChange={setOpenCreateUserDialog}>
            <DialogTrigger asChild>
              <Button>Create Admin User</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Admin User</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Username</Label>
                  <Input
                    value={newUser.username}
                    onChange={(e) =>
                      setNewUser({ ...newUser, username: e.target.value })
                    }
                    placeholder="Username"
                  />
                </div>
                <div>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    value={newUser.password}
                    onChange={(e) =>
                      setNewUser({ ...newUser, password: e.target.value })
                    }
                    placeholder="Password"
                  />
                </div>
                <div>
                  <Label>Role ID (e.g., 2 for Platform Admin)</Label>
                  <Input
                    type="number"
                    value={newUser.roleId}
                    onChange={(e) =>
                      setNewUser({ ...newUser, roleId: parseInt(e.target.value) })
                    }
                    placeholder="Role ID"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenCreateUserDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateUser}>Create</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}