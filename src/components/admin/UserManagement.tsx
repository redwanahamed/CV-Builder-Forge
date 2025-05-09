
import { useState } from "react";
import { Search, UserMinus, UserCheck, Activity, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data - replace with real data from your API
const users = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    registrationDate: "2024-01-15",
    status: "active",
    uploads: 5,
    downloads: 12,
  },
  {
    id: 2,
    name: "Emily Johnson",
    email: "emily.johnson@example.com",
    registrationDate: "2024-02-20",
    status: "active",
    uploads: 3,
    downloads: 8,
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    registrationDate: "2024-03-05",
    status: "inactive",
    uploads: 0,
    downloads: 2,
  },
  {
    id: 4,
    name: "Sarah Davis",
    email: "sarah.davis@example.com",
    registrationDate: "2024-03-18",
    status: "active",
    uploads: 7,
    downloads: 15,
  },
  {
    id: 5,
    name: "Robert Wilson",
    email: "robert.wilson@example.com",
    registrationDate: "2024-04-02",
    status: "active",
    uploads: 2,
    downloads: 5,
  },
];

// Mock activity logs - replace with real data from your API
const activityLogs = [
  { 
    id: 1, 
    userId: 1, 
    type: "upload", 
    description: "Uploaded resume.pdf", 
    date: "2024-04-15 14:32" 
  },
  { 
    id: 2, 
    userId: 1, 
    type: "download", 
    description: "Downloaded Modern template CV", 
    date: "2024-04-15 14:35" 
  },
  { 
    id: 3, 
    userId: 1, 
    type: "edit", 
    description: "Edited personal information", 
    date: "2024-04-15 15:10" 
  },
  { 
    id: 4, 
    userId: 1, 
    type: "download", 
    description: "Downloaded Professional template CV", 
    date: "2024-04-16 10:22" 
  },
];

export const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  
  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === "all" || 
      user.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const getUserLogs = (userId: number) => {
    return activityLogs.filter(log => log.userId === userId);
  };

  const toggleUserStatus = (userId: number) => {
    // Implement status toggle functionality
    console.log(`Toggle status for user ID: ${userId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1 flex gap-4">
          <div className="relative flex-1">
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Registration Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Uploads</TableHead>
              <TableHead>Downloads</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.registrationDate}</TableCell>
                <TableCell>
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.status === "active" 
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" 
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                  }`}>
                    {user.status}
                  </div>
                </TableCell>
                <TableCell>{user.uploads}</TableCell>
                <TableCell>{user.downloads}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => setSelectedUser(user)}
                        >
                          <Activity className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[550px]">
                        <DialogHeader>
                          <DialogTitle>User Activity - {user.name}</DialogTitle>
                          <DialogDescription>
                            Recent activity logs for this user
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                          {getUserLogs(user.id).map((log) => (
                            <div 
                              key={log.id} 
                              className="flex items-start gap-4 p-4 rounded-lg border"
                            >
                              <div className={`p-2 rounded-full ${
                                log.type === "upload" 
                                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                                  : log.type === "download" 
                                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                    : "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
                              }`}>
                                {log.type === "upload" && (
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                  </svg>
                                )}
                                {log.type === "download" && (
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                  </svg>
                                )}
                                {log.type === "edit" && (
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                )}
                              </div>
                              <div className="flex-1">
                                <p className="font-medium">{log.description}</p>
                                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                                  <CalendarDays className="h-3 w-3 mr-1" />
                                  <span>{log.date}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                          {getUserLogs(user.id).length === 0 && (
                            <p className="text-center text-muted-foreground py-4">
                              No activity logs found for this user
                            </p>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => toggleUserStatus(user.id)}
                    >
                      {user.status === "active" ? (
                        <UserMinus className="h-4 w-4 text-destructive" />
                      ) : (
                        <UserCheck className="h-4 w-4 text-green-600" />
                      )}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            
            {filteredUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No users found matching your search
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
