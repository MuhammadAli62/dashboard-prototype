import { useState, createContext, ReactNode } from "react"

interface ProductQuantityContextType {
  Quantity: number
  handleIncrement: () => void
  handleDecrement: () => void
}

interface QuantityContextProps {
  children: ReactNode
}

const ProductQuantityContext = createContext<ProductQuantityContextType | undefined>(undefined)

export const ProductQuantityContextProvider = ({ children }: QuantityContextProps) => {
  const [Quantity, setQuantity] = useState<number>(1)

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1)
  }

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(1, prev - 1))
  }

  return (
    <ProductQuantityContext.Provider value={{ Quantity, handleIncrement, handleDecrement }}>
      {children}
    </ProductQuantityContext.Provider>
  )
}

export default ProductQuantityContext
