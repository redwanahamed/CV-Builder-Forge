
import { useState, useEffect, useRef } from "react";
import { LayoutGrid, Image, Type, LineChart, Plus, UploadCloud, CropIcon, RotateCw, RotateCcw, MoveHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { TemplateEditDialogTabsProps } from "./types";
import { Alert } from "@/components/ui/alert";
import { fabric } from 'fabric';
import { toast } from "sonner";

export const TemplateEditDialogTabs = ({ 
  template, 
  nameValue, 
  descriptionValue, 
  onNameChange, 
  onDescriptionChange 
}: TemplateEditDialogTabsProps) => {
  const [activeTab, setActiveTab] = useState("layout");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);
  const [selectedTool, setSelectedTool] = useState<string>("select");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const chartData = [
    { name: 'Skills', value: 80 },
    { name: 'Experience', value: 65 },
    { name: 'Education', value: 90 },
  ];

  // Initialize canvas when component mounts
  useEffect(() => {
    if (activeTab === "canvas" && canvasRef.current && !fabricCanvas) {
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: 800,
        height: 600,
        backgroundColor: "#ffffff"
      });
      
      setFabricCanvas(canvas);
      
      return () => {
        canvas.dispose();
      };
    }
  }, [activeTab, fabricCanvas]);

  const handleIconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !fabricCanvas) return;
    
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (!event.target || !event.target.result) return;
      
      fabric.Image.fromURL(event.target.result.toString(), (img) => {
        img.scaleToWidth(100);
        fabricCanvas.add(img);
        fabricCanvas.renderAll();
        toast.success("Icon added to canvas");
      });
    };
    reader.readAsDataURL(file);
  };

  const addText = () => {
    if (!fabricCanvas) return;
    
    const text = new fabric.IText('Edit text', {
      left: 100,
      top: 100,
      fontFamily: 'Arial',
      fill: '#000000',
      fontSize: 20
    });
    
    fabricCanvas.add(text);
    fabricCanvas.setActiveObject(text);
    fabricCanvas.renderAll();
  };

  const addShape = (type: string) => {
    if (!fabricCanvas) return;
    
    if (type === 'rect') {
      const rect = new fabric.Rect({
        left: 100,
        top: 100,
        width: 100,
        height: 50,
        fill: '#3b82f6',
        stroke: '#2563eb',
        strokeWidth: 1
      });
      fabricCanvas.add(rect);
    } else if (type === 'circle') {
      const circle = new fabric.Circle({
        left: 100,
        top: 100,
        radius: 50,
        fill: '#10b981',
        stroke: '#059669',
        strokeWidth: 1
      });
      fabricCanvas.add(circle);
    }
    
    fabricCanvas.renderAll();
  };

  const deleteSelected = () => {
    if (!fabricCanvas) return;
    
    const activeObject = fabricCanvas.getActiveObject();
    if (activeObject) {
      fabricCanvas.remove(activeObject);
      fabricCanvas.renderAll();
      toast.success("Item deleted");
    } else {
      toast.error("No item selected");
    }
  };

  const rotateObject = (direction: 'cw' | 'ccw') => {
    if (!fabricCanvas) return;
    
    const activeObject = fabricCanvas.getActiveObject();
    if (!activeObject) {
      toast.error("No item selected");
      return;
    }
    
    const angle = direction === 'cw' ? 90 : -90;
    activeObject.rotate((activeObject.angle || 0) + angle);
    fabricCanvas.renderAll();
  };

  const moveObjectToFront = () => {
    if (!fabricCanvas) return;
    
    const activeObject = fabricCanvas.getActiveObject();
    if (activeObject) {
      activeObject.bringToFront();
      fabricCanvas.renderAll();
    } else {
      toast.error("No item selected");
    }
  };

  const moveObjectToBack = () => {
    if (!fabricCanvas) return;
    
    const activeObject = fabricCanvas.getActiveObject();
    if (activeObject) {
      activeObject.sendToBack();
      fabricCanvas.renderAll();
    } else {
      toast.error("No item selected");
    }
  };

  return (
    <Tabs defaultValue="layout" className="w-full" onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="layout">Layout</TabsTrigger>
        <TabsTrigger value="elements">Elements</TabsTrigger>
        <TabsTrigger value="canvas">Canvas</TabsTrigger>
        <TabsTrigger value="charts">Charts</TabsTrigger>
        <TabsTrigger value="preview">Preview</TabsTrigger>
      </TabsList>
      
      <TabsContent value="layout" className="space-y-4">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>Template Name</Label>
            <Input 
              value={nameValue} 
              onChange={(e) => onNameChange(e.target.value)} 
            />
          </div>
          <div className="grid gap-2">
            <Label>Description</Label>
            <Textarea 
              value={descriptionValue} 
              onChange={(e) => onDescriptionChange(e.target.value)} 
            />
          </div>
          <div className="grid gap-2">
            <Label>Layout Structure</Label>
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <LayoutGrid className="h-6 w-6 mb-1" />
                Single Column
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <LayoutGrid className="h-6 w-6 mb-1" />
                Two Columns
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <LayoutGrid className="h-6 w-6 mb-1" />
                Three Columns
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="elements" className="space-y-4">
        <div className="grid gap-4">
          <Label>Add Elements</Label>
          <div className="grid grid-cols-3 gap-2">
            <Button variant="outline" className="h-16 flex items-center gap-2">
              <Type className="h-4 w-4" />
              Text Block
            </Button>
            <Button variant="outline" className="h-16 flex items-center gap-2">
              <Image className="h-4 w-4" />
              Image
            </Button>
            <Button variant="outline" className="h-16 flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              Chart
            </Button>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="canvas" className="space-y-4">
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Design Canvas</h3>
            <div className="flex gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleIconUpload}
                className="hidden"
                accept="image/*"
              />
              <Button 
                variant="outline" 
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2"
              >
                <UploadCloud className="h-4 w-4" />
                Upload Icon
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 border-b pb-4">
            <Button 
              variant={selectedTool === "select" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedTool("select")}
            >
              Select
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={addText}
            >
              <Type className="h-4 w-4 mr-1" /> Text
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => addShape('rect')}
            >
              Rectangle
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => addShape('circle')}
            >
              Circle
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={deleteSelected}
            >
              Delete
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => rotateObject('cw')}
            >
              <RotateCw className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => rotateObject('ccw')}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={moveObjectToFront}
            >
              Bring to Front
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={moveObjectToBack}
            >
              Send to Back
            </Button>
          </div>
          
          <div className="border rounded-lg p-2 bg-white overflow-hidden">
            <canvas ref={canvasRef} className="w-full border border-dashed" />
          </div>
          
          <Alert>
            <p className="text-sm text-muted-foreground">
              Tip: Click and drag to move elements. Use the buttons above to add new elements or modify selected ones.
            </p>
          </Alert>
        </div>
      </TabsContent>
      
      <TabsContent value="charts" className="space-y-4">
        <div className="grid gap-4">
          <Label>Chart Preview</Label>
          <div className="border rounded-lg p-4 bg-background">
            <ChartContainer config={{}} className="h-[300px]">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ChartContainer>
          </div>
          <Button className="w-fit">
            <Plus className="h-4 w-4 mr-2" />
            Add Chart
          </Button>
        </div>
      </TabsContent>
      
      <TabsContent value="preview" className="space-y-4">
        <div className="border rounded-lg p-4">
          <div className="aspect-[210/297] w-full bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-2xl font-bold mb-4">{nameValue}</h1>
            <p className="text-muted-foreground">{descriptionValue}</p>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};
