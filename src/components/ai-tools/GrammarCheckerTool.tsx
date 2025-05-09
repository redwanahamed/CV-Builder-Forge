
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export function GrammarCheckerTool() {
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState<{original: string, suggestion: string, reason: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheck = async () => {
    if (text.trim().length < 10) {
      toast.error("Please enter at least 10 characters");
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock grammar checking with some common mistakes
      const commonMistakes = [
        {pattern: /its\s+a/gi, suggestion: "it's a", reason: "Contraction of 'it is'"},
        {pattern: /their\s+is/gi, suggestion: "there is", reason: "Correct form for 'there is'"},
        {pattern: /your\s+welcome/gi, suggestion: "you're welcome", reason: "Contraction of 'you are'"},
        {pattern: /i\s+think\s+that/gi, suggestion: "I think", reason: "Redundant 'that'"},
        {pattern: /\s+,/g, suggestion: ",", reason: "No space before comma"},
        {pattern: /\s+\./g, suggestion: ".", reason: "No space before period"},
        {pattern: /alot/gi, suggestion: "a lot", reason: "'A lot' is two words"},
      ];
      
      let results: {original: string, suggestion: string, reason: string}[] = [];
      
      // Find mistakes in the text
      commonMistakes.forEach(({ pattern, suggestion, reason }) => {
        const matches = text.match(pattern);
        if (matches) {
          matches.forEach(match => {
            results.push({
              original: match,
              suggestion,
              reason
            });
          });
        }
      });
      
      // If no mistakes found, add some random suggestions to demonstrate the tool
      if (results.length === 0 && text.length > 30) {
        const words = text.split(' ');
        if (words.length > 5) {
          const randomIndex = Math.floor(Math.random() * (words.length - 4)) + 2;
          results.push({
            original: `${words[randomIndex-1]} ${words[randomIndex]}`,
            suggestion: `${words[randomIndex-1]}, ${words[randomIndex]}`,
            reason: "Consider adding a comma for better readability"
          });
        }
        
        // Add a suggestion about sentence length if text has long sentences
        if (text.length > 100 && !text.includes('.')) {
          results.push({
            original: text.substring(0, 40) + "...",
            suggestion: "Break into smaller sentences",
            reason: "Long sentences can be difficult to read"
          });
        }
      }
      
      setSuggestions(results);
      
      if (results.length === 0) {
        toast.success("No grammar issues found!");
      } else {
        toast.success(`Found ${results.length} improvement suggestion${results.length > 1 ? 's' : ''}!`);
      }
    } catch (error) {
      toast.error("Error checking grammar. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="text">Enter Text to Check</Label>
        <Textarea 
          id="text" 
          placeholder="Enter text to check for grammar and style suggestions..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
        />
      </div>
      
      <Button 
        onClick={handleCheck} 
        disabled={isLoading || text.trim().length < 10} 
        className="w-full"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analyzing...
          </>
        ) : (
          'Check Grammar & Style'
        )}
      </Button>

      {suggestions.length > 0 && (
        <div className="mt-6 space-y-4">
          <Label>Suggestions</Label>
          <div className="space-y-3">
            {suggestions.map((item, idx) => (
              <div key={idx} className="border p-3 rounded-md bg-muted/20">
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="font-medium">Original:</span>
                  <span className="text-red-500 line-through">{item.original}</span>
                </div>
                <div className="flex flex-wrap gap-2 text-sm mt-1">
                  <span className="font-medium">Suggestion:</span>
                  <span className="text-green-500">{item.suggestion}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {item.reason}
                </div>
              </div>
            ))}
          </div>
          
          <Button 
            variant="outline"
            onClick={() => setSuggestions([])}
            className="w-full"
          >
            Clear Suggestions
          </Button>
        </div>
      )}
    </div>
  );
}
