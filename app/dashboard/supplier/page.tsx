'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '../../../lib/api/auth';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function SupplierDashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [warehouse, setWarehouse] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [productName, setProductName] = useState('');
  const [productStock, setProductStock] = useState(0);
  const [productPrice, setProductPrice] = useState(0);
  const [warehouseName, setWarehouseName] = useState('');
  const [warehouseLocation, setWarehouseLocation] = useState('');
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [orderQuantity, setOrderQuantity] = useState(0);

  useEffect(() => {
    if (!loading && user?.role === 6) { // Assuming 6 is Supplier role
      fetchWarehouse();
      fetchProducts();
    }
  }, [loading, user]);

  const createWarehouse = async () => {
    try {
      await authApi.createWarehouse({ name: warehouseName, location: warehouseLocation });
      setOpenCreateDialog(false);
      setWarehouseName('');
      setWarehouseLocation('');
      fetchWarehouse();
      toast.success('Warehouse created successfully!');
    } catch (error) {
      toast.error('Failed to create warehouse!');
    }
  };

  const updateWarehouse = async () => {
    try {
      await authApi.updateWarehouse({ name: warehouseName, location: warehouseLocation });
      setWarehouseName('');
      setWarehouseLocation('');
      fetchWarehouse();
      toast.success('Warehouse updated successfully!');
    } catch (error) {
      toast.error('Failed to update warehouse!');
    }
  };

  const deleteWarehouse = async () => {
    try {
      await authApi.deleteWarehouse();
      setWarehouse(null);
      toast.success('Warehouse deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete warehouse!');
    }
  };

  const fetchWarehouse = async () => {
    try {
      const response = await authApi.getWarehouse();
      setWarehouse(response.data);
    } catch (error) {
      toast.error('Failed to fetch warehouse!');
    }
  };

  const fetchProducts = async () => {
    try {
      // const response = await authApi.getShopProducts(warehouse?.shopId || user.shops?.[0]?.id || 0); 
      // const response = await authApi.getShopProducts(warehouse?.shopId || 0); // Adjust based on shopId or warehouseId
      const response = await authApi.getWarehouseProducts(); // New endpoint for warehouse products
      setProducts(response.data || []);
    } catch (error) {
      toast.error('Failed to fetch products!');
    }
  };

  const addProduct = async () => {
    try {
      await authApi.createWarehouseProduct({
        name: productName,
        description: '', // Optional, can be enhanced
        price: productPrice,
        stock: productStock,
        // shopId: warehouse?.shopId || user.shops?.[0]?.id || 0,
        warehouseId: warehouse?.shopId || 0,
      });
      setProductName('');
      setProductStock(0);
      setProductPrice(0);
      fetchProducts();
      toast.success('Product added successfully!');
    } catch (error) {
      toast.error('Failed to add product!');
    }
  };

  const fulfillOrder = async (productId: number, quantity: number) => {
    try {
      await authApi.createWarehouseOrder({ productId, quantity });
      fetchProducts();
      toast.success('Order fulfilled successfully!');
    } catch (error) {
      toast.error('Failed to fulfill order!');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user || user.role !== 6) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Supplier Dashboard</h1>
          <Button onClick={logout} variant="destructive">Logout</Button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Warehouse</h2>
          {warehouse ? (
            <div>
              <p>Name: {warehouse.name}</p>
              <p>Location: {warehouse.location}</p>
              <div className="mt-4 space-x-2">
                <Input
                  value={warehouseName}
                  onChange={(e) => setWarehouseName(e.target.value)}
                  placeholder="New Name"
                  className="mr-2"
                />
                <Input
                  value={warehouseLocation}
                  onChange={(e) => setWarehouseLocation(e.target.value)}
                  placeholder="New Location"
                  className="mr-2"
                />
                <Button onClick={updateWarehouse}>Update</Button>
                <Button onClick={deleteWarehouse} variant="destructive">Delete</Button>
              </div>
            </div>
          ) : (
            <Dialog open={openCreateDialog} onOpenChange={setOpenCreateDialog}>
              <DialogTrigger asChild>
                <Button>Create Warehouse</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Create Warehouse</DialogTitle></DialogHeader>
                <div className="space-y-4">
                  <div><Input value={warehouseName} onChange={(e) => setWarehouseName(e.target.value)} placeholder="Name" /></div>
                  <div><Input value={warehouseLocation} onChange={(e) => setWarehouseLocation(e.target.value)} placeholder="Location" /></div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpenCreateDialog(false)}>Cancel</Button>
                  <Button onClick={createWarehouse}>Create</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Manage Products</h2>
          <div className="mb-4 space-x-2">
            <Input
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="mr-2"
            />
            <Input
              type="number"
              placeholder="Price"
              value={productPrice}
              onChange={(e) => setProductPrice(parseInt(e.target.value) || 0)}
              className="mr-2"
            />
            <Input
              type="number"
              placeholder="Stock"
              value={productStock}
              onChange={(e) => setProductStock(parseInt(e.target.value) || 0)}
              className="mr-2"
            />
            <Button onClick={addProduct} disabled={!warehouse}>Add Product</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((product) => (
              <div key={product.id} className="p-4 border rounded-md">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p>Price: ${product.price}</p>
                <p>Stock: {product.stock}</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Fulfill Order</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader><DialogTitle>Fulfill Order for {product.name}</DialogTitle></DialogHeader>
                    <div className="space-y-4">
                      <Input
                        type="number"
                        placeholder="Quantity"
                        value={orderQuantity}
                        onChange={(e) => setOrderQuantity(parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setSelectedProductId(null)}>Cancel</Button>
                      <Button onClick={() => fulfillOrder(product.id, orderQuantity)}>Fulfill</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}