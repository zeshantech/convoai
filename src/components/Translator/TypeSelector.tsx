import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { File, Globe, ImageIcon, Languages } from "lucide-react";
import TranslatorMainBox from "./TranslatorMainBox";
import ImageTranslatorMain from "./ImageTranslatorMain";
import DocumentTranslatorMain from "./DocumentTranslatorMain";
import WebTranslatorMain from "./WebTranslatorMain";

export default function TypeSelector() {
  return (
    <Tabs>
      <TabsList defaultValue={"text"} className="flex">
        <TabsTrigger value="text" className="flex flex-1 items-center space-x-1">
          <Languages className="h-4 w-4" /> <span>Text</span>
        </TabsTrigger>
        <TabsTrigger value="images" className="flex flex-1 items-center space-x-1">
          <ImageIcon className="h-4 w-4" /> <span>Images</span>
        </TabsTrigger>
        <TabsTrigger value="documents" className="flex flex-1 items-center space-x-1">
          <File className="h-4 w-4" /> <span>Documents</span>
        </TabsTrigger>
        <TabsTrigger value="websites" className="flex flex-1 items-center space-x-1">
          <Globe className="h-4 w-4" /> <span>Websites</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="text">
        <TranslatorMainBox />
      </TabsContent>
      <TabsContent value="images">
        <ImageTranslatorMain />
      </TabsContent>
      <TabsContent value="documents">
        <DocumentTranslatorMain />
      </TabsContent>
      <TabsContent value="websites">
        <WebTranslatorMain />
      </TabsContent>
    </Tabs>
  );
}
