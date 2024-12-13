import { useState } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/firebaseConfig'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/hooks/use-toast'

interface Product {
  id: string
  name: string
  sku: string
  price: number
  shortDescription: string
  longDescription: string
  supplierName: string
}

interface ProductSearchProps {
  onProductsFound: (products: Product[]) => void
}

export function ProductSearch({ onProductsFound }: ProductSearchProps) {
  const [sku, setSku] = useState('')

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const q = query(collection(db, 'products'), where('sku', '==', sku))
      const querySnapshot = await getDocs(q)
      const products: Product[] = []
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() } as Product)
      })
      onProductsFound(products)
      if (products.length === 0) {
        toast({
          title: "No products found",
          description: "No products with the given SKU were found.",
        })
      }
    } catch (error) {
      console.error("Error searching for products: ", error)
      toast({
        title: "Error",
        description: "There was an error searching for products. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSearch} className="space-y-4 text-white">
      <div>
        <Label htmlFor="search-sku" className='text-white'>Search by SKU</Label>
        <Input
          id="search-sku"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Search</Button>
    </form>
  )
}

