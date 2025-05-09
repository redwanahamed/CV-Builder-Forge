
import { Input } from "@/components/ui/input";
import { TemplateSearchProps } from "./types";

export const TemplateSearch = ({ searchTerm, onSearchChange }: TemplateSearchProps) => {
  return (
    <div className="relative w-64">
      <Input
        placeholder="Search templates..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10"
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  );
};
