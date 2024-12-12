import { useState, useEffect } from 'react'
import { db } from '../../firebase/firebaseConfig'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useToast } from '@/hooks/use-toast'

interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
}

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const productsData: Product[] = []
      querySnapshot.forEach((doc) => {
        productsData.push({ id: doc.id, ...doc.data() } as Product)
      })
      setProducts(productsData)
      setLoading(false)
    }, (error) => {
      console.error("Error fetching products:", error)
      toast({
        title: "Error",
        description: "Failed to fetch products. Please try again.",
        variant: "destructive",
      })
      setLoading(false)
    })

    return () => unsubscribe()
  }, [toast])

  if (loading) {
    return <div>Loading products...</div>
  }

  return (
    <Table>
      <TableCaption>A list of your products.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Image</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.description}</TableCell>
            <TableCell>{product.price.toFixed(2)}</TableCell>
            <TableCell>
              <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

