import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import proimage from "../../assets/product1.webp"

interface Product {
  id: string
  name: string
  sku: string
  price: number
  shortDescription: string
  longDescription: string
  supplierName: string
}

interface ProductListProps {
  products: Product[]
}

export function ProductList({ products }: ProductListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <Card key={product.id} className="w-full max-w-sm overflow-hidden">
          <div className="relative">
            <img src={proimage} alt={product.name} className="w-full h-96 object-cover" />
          </div>
          <CardHeader>
            <CardTitle className="text-lg">{product.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">{product.supplierName}</p>
            <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
            <div className="space-y-2">
              <p><strong>Short Description:</strong> {product.shortDescription}</p>
              <p><strong>Long Description:</strong> {product.longDescription}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Add to Cart</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

