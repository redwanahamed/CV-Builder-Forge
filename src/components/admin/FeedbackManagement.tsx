
import { useState } from "react";
import { Search, CheckCircle2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data - replace with real data from your API
const feedbacks = [
  {
    id: 1,
    userId: 121,
    userEmail: "john.smith@example.com",
    userName: "John Smith",
    content: "The Modern template looks great, but it would be nice if we could customize the font colors.",
    rating: 4,
    date: "2024-04-10",
    status: "open"
  },
  {
    id: 2,
    userId: 134,
    userEmail: "emily.johnson@example.com",
    userName: "Emily Johnson",
    content: "I'm having trouble saving my changes. The save button doesn't seem to be working properly.",
    rating: 2,
    date: "2024-04-08",
    status: "resolved"
  },
  {
    id: 3,
    userId: 142,
    userEmail: "michael.brown@example.com",
    userName: "Michael Brown",
    content: "The PDF download feature is amazing! Very easy to use and the quality is excellent.",
    rating: 5,
    date: "2024-04-05",
    status: "open"
  },
  {
    id: 4,
    userId: 153,
    userEmail: "sarah.davis@example.com",
    userName: "Sarah Davis",
    content: "Would love to see more creative templates for design-oriented professionals.",
    rating: 3,
    date: "2024-04-01",
    status: "open"
  },
];

export const FeedbackManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null);
  
  const filteredFeedbacks = feedbacks.filter((feedback) => {
    const matchesSearch = 
      feedback.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === "all" || 
      feedback.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const markAsResolved = (id: number) => {
    // Implement mark as resolved functionality
    console.log(`Mark feedback ID ${id} as resolved`);
  };

  const replyToFeedback = (id: number, reply: string) => {
    // Implement reply functionality
    console.log(`Reply to feedback ID ${id}: ${reply}`);
  };

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "text-yellow-400" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1 flex gap-4">
          <div className="relative flex-1">
            <Input
              placeholder="Search feedback..."
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
              <SelectItem value="all">All Feedback</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredFeedbacks.map((feedback) => (
          <Card key={feedback.id} className={`
            ${feedback.status === 'resolved' 
              ? 'border-green-200 dark:border-green-900' 
              : 'border-amber-200 dark:border-amber-900'}
          `}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{feedback.userName}</CardTitle>
                  <CardDescription>{feedback.userEmail}</CardDescription>
                </div>
                <div className="flex flex-col items-end">
                  <StarRating rating={feedback.rating} />
                  <span className="text-xs text-muted-foreground mt-1">{feedback.date}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{feedback.content}</p>
            </CardContent>
            <CardFooter className="border-t pt-3 flex justify-between items-center">
              <div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  feedback.status === 'resolved' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
                }`}>
                  {feedback.status === 'resolved' ? 'Resolved' : 'Open'}
                </span>
              </div>
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => setSelectedFeedback(feedback)}
                    >
                      <MessageSquare className="h-3.5 w-3.5" />
                      <span>Reply</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Reply to Feedback</DialogTitle>
                      <DialogDescription>
                        Send a response to {feedback.userName}'s feedback.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="border rounded-md p-3 bg-muted/20 mb-4">
                      <p className="text-sm">{feedback.content}</p>
                      <div className="flex items-center justify-between mt-2">
                        <StarRating rating={feedback.rating} />
                        <span className="text-xs text-muted-foreground">{feedback.date}</span>
                      </div>
                    </div>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="reply">Your Reply</Label>
                        <Textarea
                          id="reply"
                          placeholder="Type your response here..."
                          rows={4}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button onClick={() => replyToFeedback(feedback.id, "")}>
                        Send Reply
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                {feedback.status === "open" && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => markAsResolved(feedback.id)}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Resolve</span>
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
        
        {filteredFeedbacks.length === 0 && (
          <div className="col-span-1 lg:col-span-2 flex items-center justify-center h-40 border rounded-md">
            <p className="text-muted-foreground">No feedback found matching your search</p>
          </div>
        )}
      </div>
    </div>
  );
};
