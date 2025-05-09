
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Bot, MessageCircle, Send, User, UserX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: "admin" | "user" | "ai";
  timestamp: Date;
  username?: string;
}

interface ChatUser {
  id: string;
  username: string;
  lastMessage: string;
  lastActive: Date;
  unread: number;
}

export function AdminChatPanel({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! How can I help you today?",
      sender: "admin",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [aiMode, setAiMode] = useState(false);
  const [activeUsers, setActiveUsers] = useState<ChatUser[]>([
    {
      id: "user1",
      username: "John Smith",
      lastMessage: "I need help with my resume",
      lastActive: new Date(),
      unread: 2,
    },
    {
      id: "user2",
      username: "Sarah Johnson",
      lastMessage: "Can you review my application?",
      lastActive: new Date(Date.now() - 15 * 60000),
      unread: 0,
    }
  ]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const { toast } = useToast();

  // Effect to simulate incoming messages when AI mode is on
  useEffect(() => {
    if (aiMode && selectedUser) {
      const interval = setInterval(() => {
        const randomUserMessage = {
          id: Date.now().toString(),
          content: "Hi, I have a question about my application status.",
          sender: "user" as const,
          timestamp: new Date(),
          username: activeUsers.find(u => u.id === selectedUser)?.username
        };
        
        setMessages(prev => [...prev, randomUserMessage]);
        
        // AI response after a short delay
        setTimeout(() => {
          const aiResponse = {
            id: (Date.now() + 1).toString(),
            content: "I'm an automated response. Your application is currently being reviewed by our team. You should hear back within 3-5 business days.",
            sender: "ai" as const,
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, aiResponse]);
        }, 2000);
      }, 15000); // Every 15 seconds simulate a new conversation when in AI mode
      
      return () => clearInterval(interval);
    }
  }, [aiMode, selectedUser, activeUsers]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Add user message
    const adminMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "admin",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, adminMessage]);
    setNewMessage("");
    
    // If AI mode is on, simulate automated response
    if (aiMode) {
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: "This is an automated AI response. I've processed your message and will assist the customer accordingly.",
          sender: "ai",
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const toggleAiMode = (enabled: boolean) => {
    setAiMode(enabled);
    toast({
      title: enabled ? "AI Chat Mode Enabled" : "AI Chat Mode Disabled",
      description: enabled 
        ? "Automated responses will be sent to customers" 
        : "You are now in manual response mode",
    });
  };

  const selectUser = (userId: string) => {
    setSelectedUser(userId);
    // Update unread count
    setActiveUsers(users => 
      users.map(user => 
        user.id === userId ? { ...user, unread: 0 } : user
      )
    );
    
    // Load user-specific chat history (simulated)
    const userSpecificMessages = [
      {
        id: "user-1",
        content: "Hello, I need assistance with my job application",
        sender: "user" as const,
        timestamp: new Date(Date.now() - 120000),
        username: activeUsers.find(u => u.id === userId)?.username
      },
      {
        id: "admin-1",
        content: "Hi there! I'd be happy to help. What specifically do you need help with?",
        sender: "admin" as const,
        timestamp: new Date(Date.now() - 60000)
      }
    ];
    
    setMessages(userSpecificMessages);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[320px] sm:w-[380px] p-0 flex flex-col">
        <SheetHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle>Support Chat</SheetTitle>
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-4 w-4" />
              <Switch 
                checked={aiMode} 
                onCheckedChange={toggleAiMode} 
                id="ai-mode" 
              />
              <Bot className="h-4 w-4" />
            </div>
          </div>
          
          {aiMode && (
            <Alert className="mt-2 py-2">
              <AlertDescription className="text-xs">
                AI Chat Mode is ON. Automated responses will be sent to customers.
              </AlertDescription>
            </Alert>
          )}
        </SheetHeader>
        
        <div className="flex flex-1 overflow-hidden">
          {/* User list sidebar */}
          <div className="w-1/3 border-r overflow-y-auto">
            <div className="p-2">
              <h3 className="font-medium text-sm mb-2">Active Users</h3>
              {activeUsers.map(user => (
                <div 
                  key={user.id}
                  onClick={() => selectUser(user.id)}
                  className={`p-2 rounded-md cursor-pointer mb-1 ${selectedUser === user.id ? 'bg-muted' : 'hover:bg-accent'}`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                      {user.username.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="truncate flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium">{user.username}</span>
                        {user.unread > 0 && (
                          <Badge variant="destructive" className="ml-1 text-xs h-5 min-w-5 flex items-center justify-center">
                            {user.unread}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{user.lastMessage}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Chat area */}
          <div className="w-2/3 flex flex-col">
            {selectedUser ? (
              <>
                <div className="p-2 border-b flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {activeUsers.find(u => u.id === selectedUser)?.username || "Customer"}
                  </span>
                </div>
                
                <ScrollArea className="flex-1 p-3">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.sender === "admin" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[90%] rounded-lg p-3 ${
                            message.sender === "admin"
                              ? "bg-primary text-primary-foreground"
                              : message.sender === "ai"
                              ? "bg-secondary text-secondary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          {message.sender === "user" && message.username && (
                            <p className="text-xs font-medium mb-1">{message.username}</p>
                          )}
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                <div className="border-t p-2">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button size="icon" onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center p-4">
                <div className="text-center text-muted-foreground">
                  <UserX className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Select a user to start chatting</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
