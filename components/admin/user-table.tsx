import { UserAccount } from "@/types/user";
import { CheckCircle, Edit2, Trash2, XCircle } from "lucide-react";

interface UserTableProps {
  users: UserAccount[];
  onEdit: (user: UserAccount) => void;
  onDeactivate: (userId: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDeactivate }) => {
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'PROVIDER_ADMIN': return 'bg-purple-100 text-purple-700';
      case 'CONTRACT_COORDINATOR': return 'bg-blue-100 text-blue-700';
      case 'SUPPLIER_REP': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'PROVIDER_ADMIN': return 'Provider Admin';
      case 'CONTRACT_COORDINATOR': return 'Contract Coordinator';
      case 'SUPPLIER_REP': return 'Supplier Representative';
      default: return role;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Name</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Email</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Role</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Status</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Last Login</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                    {user.name.charAt(0)}
                  </div>
                  <span className="font-medium text-gray-900">{user.name}</span>
                </div>
              </td>
              <td className="py-3 px-4 text-sm text-gray-600">{user.email}</td>
              <td className="py-3 px-4">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getRoleBadgeColor(user.role)}`}>
                  {getRoleLabel(user.role)}
                </span>
              </td>
              <td className="py-3 px-4">
                {user.status === 'active' ? (
                  <span className="flex items-center text-sm text-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Active
                  </span>
                ) : (
                  <span className="flex items-center text-sm text-gray-500">
                    <XCircle className="w-4 h-4 mr-1" />
                    Inactive
                  </span>
                )}
              </td>
              <td className="py-3 px-4 text-sm text-gray-600">{user.lastLogin}</td>
              <td className="py-3 px-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(user)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeactivate(user.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Deactivate"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable