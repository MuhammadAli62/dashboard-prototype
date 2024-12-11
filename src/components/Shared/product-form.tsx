"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CloudIcon } from 'lucide-react'

export default function ProductForm() {
  const [files, setFiles] = useState<FileList | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files)
    }
  }

  return (
    <div className=" bg-[#090F2A] p-4 md:p-6 lg:p-8 rounded-lg">
      <Card className="mx-auto max-w-3xl space-y-8 bg-[#13142b] p-6 text-white shadow-2xl">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-lg text-white">
            Product Title
          </Label> 
          <Input
            id="title"
            placeholder="write title here...."
            className="border-[#2e2f45] bg-[#1a1b33] text-white placeholder:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-lg text-white">
            Product Description
          </Label>
          <Textarea
            id="description"
            placeholder="write a description here.."
            className="min-h-[150px] border-[#2e2f45] bg-[#1a1b33] text-white placeholder:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-lg text-white">Display images</Label>
          <div className="relative flex min-h-[200px] cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-[#2e2f45] bg-[#1a1b33] transition-all hover:border-blue-500">
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
              accept="image/*"
            />
            <div className="flex flex-col items-center justify-center space-y-3 text-center">
              <CloudIcon className="h-12 w-12 text-blue-500" />
              <div className="text-gray-400">
                {files && files.length > 0
                  ? `Selected ${files.length} file${files.length === 1 ? "" : "s"}`
                  : "Drop your images here, or click to browse"}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

