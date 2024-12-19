import { Button } from "@/components/ui/button"
import proimage from "../../assets/product1.avif"
import { Minus, Plus } from 'lucide-react'
import { useContext } from "react"
import ProductQuantityContext from "../../context/QuantityContext"

// Define the Product interface
interface Product {
  id: string
  name: string
  sku: string
  price: number
  shortDescription: string
  longDescription: string
}

// Define props for the ProductList component
interface ProductListProps {
  products: Product[]
}

// Define the shape of the ProductQuantityContext
interface ProductQuantityContextType {
  Quantity: number
  handleIncrement: () => void
  handleDecrement: () => void
}

export function ProductList({ products }: ProductListProps) {
  // Use type assertion for the context
  const { Quantity, handleIncrement, handleDecrement } = useContext(ProductQuantityContext) as ProductQuantityContextType

  return (
    <div className="flex w-full justify-center">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex flex-col md:flex-row justify-start gap-5 w-full text-black bg-white shadow rounded p-4"
        >
          {/* Product Image */}
          <div className="relative flex flex-col gap-5">
            <img
              src={proimage}
              alt={product.name}
              className="w-full md:w-auto h-auto md:max-w-sm md:h-96 object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-4 justify-center">
            <h2 className="text-xl md:text-4xl font-bold">{product.name}</h2>
            <p className="text-sm">
              <strong>Short Description:</strong> {product.shortDescription}
            </p>
            <p className="text-xl md:text-2xl font-bold">MSRP: ${product.price.toFixed(2)}</p>

            {/* Quantity Controls */}
            <span className="text-md flex flex-row gap-4 items-center">
              Quantity:
              <Button onClick={handleDecrement}>
                <Minus />
              </Button>
              {Quantity}
              <Button onClick={handleIncrement}>
                <Plus />
              </Button>
            </span>

            <p className="text-sm">
              <strong>Long Description:</strong> {product.longDescription}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

