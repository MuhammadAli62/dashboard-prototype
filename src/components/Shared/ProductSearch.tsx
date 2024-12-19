import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSearchProduct } from "../../context/searchContext";


export function ProductSearch() {
  const [sku, setSku] = useState<string>("");
  const { handleSearch } = useSearchProduct();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(sku);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 text-white">
      <div>
        <Label htmlFor="search-sku" className="text-white">
          Search by SKU
        </Label>
        <Input
          id="search-sku"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Search</Button>
    </form>
  );
}

