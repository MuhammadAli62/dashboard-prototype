import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductUploadForm } from '@/components/Shared/ProductUploadForm'
import { ProductList } from '@/components/Shared/ProductList'

export function AdminPanel() {

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload Product</TabsTrigger>
          <TabsTrigger value="list">Product List</TabsTrigger>
        </TabsList>
        <TabsContent value="upload">
          <ProductUploadForm />
        </TabsContent>
        <TabsContent value="list">
          <ProductList />
        </TabsContent>
      </Tabs>
    </div>
  )
}

