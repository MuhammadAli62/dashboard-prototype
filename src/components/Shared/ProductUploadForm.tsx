import { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebaseConfig'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/hooks/use-toast'
import { Card } from '../ui/card'

export function ProductUploadForm() {
  const [product, setProduct] = useState({
    name: '',
    sku: '',
    price: '',
    shortDescription: '',
    longDescription: '',
    CDWPrice: '',
    InsightPrice: '',
    FCNPrice: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProduct(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'products'), {
        ...product,
        price: parseFloat(product.price)
      })
      toast({
        title: "Product uploaded",
        description: "The product has been successfully added to the database.",
      })
      setProduct({
        name: '',
        sku: '',
        price: '',
        shortDescription: '',
        longDescription: '',
        CDWPrice: '',
        InsightPrice: '',
        FCNPrice: '',
      })
    } catch (error) {
      console.error("Error adding document: ", error)
      toast({
        title: "Error",
        description: "There was an error uploading the product. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className=" bg-[#090F2A] p-4 md:p-6 lg:p-8 rounded-lg">
      <Card className="mx-auto max-w-3xl space-y-8 bg-[#13142b] p-6 text-white shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="sku">SKU</Label>
            <Input
              id="sku"
              name="sku"
              value={product.sku}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              value={product.price}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="shortDescription">Short Description</Label>
            <Textarea
              id="shortDescription"
              name="shortDescription"
              value={product.shortDescription}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="longDescription">Long Description</Label>
            <Textarea
              id="longDescription"
              name="longDescription"
              value={product.longDescription}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="CDWPrice">CDW Price</Label>
            <Input
              id="CDWPrice"
              name="CDWPrice"
              value={product.CDWPrice}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="InsightPrice">Insight Price</Label>
            <Input
              id="InsightPrice"
              name="InsightPrice"
              value={product.InsightPrice}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="FCNPrice">FCN Price</Label>
            <Input
              id="FCNPrice"
              name="FCNPrice"
              value={product.FCNPrice}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit">Upload Product</Button>
        </form>
      </Card>
    </div>
  )
}

