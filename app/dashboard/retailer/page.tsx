// 'use client';

// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { authApi } from '../../../lib/api/auth';
// import { useAuth } from '../../hooks/useAuth';
// import { toast } from 'react-toastify';
// import { useRouter } from 'next/navigation';

// const createShopSchema = z.object({
//     name: z.string().min(1, 'Shop name is required'),
//     description: z.string().optional(),
// });

// type CreateShopFormData = z.infer<typeof createShopSchema>;

// export default function RetailerDashboard() {
//     const { user, loading, logout } = useAuth();
//     const router = useRouter();
//     const { register, handleSubmit, formState: { errors } } = useForm<CreateShopFormData>({
//         resolver: zodResolver(createShopSchema),
//     });

//     if (loading) return <div>Loading...</div>;
//     if (!user || user.role !== 4) {
//         router.push('/login');
//         return null;
//     }

//     const onSubmit = async (data: CreateShopFormData) => {
//         try {
//             await authApi.createShop(data);
//             toast.success('Shop created successfully!');
//         } catch (error) {
//             toast.error('Failed to create shop!');
//         }
//     };

//     return (
//         <div className="min-h-screen p-8 bg-gray-50">
//             <div className="max-w-4xl mx-auto">
//                 <div className="flex justify-between items-center mb-6">
//                     <h1 className="text-3xl font-bold text-gray-800">Retailer Dashboard</h1>
//                     <button
//                         onClick={logout}
//                         className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//                     >
//                         Logout
//                     </button>
//                 </div>
//                 <div className="bg-white p-6 rounded-lg shadow-md">
//                     <h2 className="text-xl font-semibold mb-4">Create a New Shop</h2>
//                     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">Shop Name</label>
//                             <input
//                                 {...register('name')}
//                                 className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring focus:ring-blue-200"
//                             />
//                             {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">Description (optional)</label>
//                             <textarea
//                                 {...register('description')}
//                                 className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring focus:ring-blue-200"
//                             />
//                             {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
//                         </div>
//                         <button
//                             type="submit"
//                             className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700 transition duration-200"
//                         >
//                             Create Shop
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { authApi } from '../../../lib/api/auth';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const createShopSchema = z.object({
  name: z.string().min(1, 'Shop name is required'),
  description: z.string().optional(),
});

const createProductSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be positive'),
  stock: z.number().min(0, 'Stock must be positive'),
});

type CreateShopFormData = z.infer<typeof createShopSchema>;
type CreateProductFormData = z.infer<typeof createProductSchema>;

export default function RetailerDashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const shopForm = useForm<CreateShopFormData>({
    resolver: zodResolver(createShopSchema),
    defaultValues: { name: '', description: '' },
  });
  const productForm = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
    defaultValues: { name: '', description: '', price: 0, stock: 0 },
  });
  const [shops, setShops] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedShopId, setSelectedShopId] = useState<number | null>(null);
  const [editProduct, setEditProduct] = useState<any>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  useEffect(() => {
    if (!loading && user?.role === 4) {
      fetchShops();
    }
  }, [loading, user]);

  useEffect(() => {
    if (selectedShopId) {
      fetchProducts(selectedShopId);
    }
  }, [selectedShopId]);

  const fetchShops = async () => {
    try {
      const response = await authApi.getUserShops();
      setShops(response.data);
      if (response.data.length > 0) {
        setSelectedShopId(response.data[0].id);
      }
    } catch (error) {
      toast.error('Failed to fetch shops!');
    }
  };

  const fetchProducts = async (shopId: number) => {
    try {
      const response = await authApi.getShopProducts(shopId);
      setProducts(response.data);
    } catch (error) {
      toast.error('Failed to fetch products!');
    }
  };

  const onShopSubmit = async (data: CreateShopFormData) => {
    try {
      await authApi.createShop(data);
      toast.success('Shop created successfully!');
      shopForm.reset();
      fetchShops();
    } catch (error) {
      toast.error('Failed to create shop!');
    }
  };

  const onProductSubmit = async (data: CreateProductFormData) => {
    if (!selectedShopId) {
      toast.error('Please select a shop!');
      return;
    }
    try {
      if (editProduct) {
        await authApi.updateProduct(editProduct.id, { ...data, shopId: selectedShopId });
        toast.success('Product updated successfully!');
        setEditProduct(null);
        setOpenEditDialog(false);
      } else {
        await authApi.createProduct({ ...data, shopId: selectedShopId });
        toast.success('Product created successfully!');
      }
      productForm.reset();
      fetchProducts(selectedShopId);
    } catch (error) {
      toast.error('Failed to manage product!');
    }
  };

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;
    try {
      await authApi.deleteProduct(productToDelete);
      toast.success('Product deleted successfully!');
      setOpenDeleteDialog(false);
      fetchProducts(selectedShopId!);
    } catch (error) {
      toast.error('Failed to delete product!');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user || user.role !== 4) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Retailer Dashboard</h1>
          <Button onClick={logout} variant="destructive">
            Logout
          </Button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Create a New Shop</h2>
          <Form {...shopForm}>
            <form onSubmit={shopForm.handleSubmit(onShopSubmit)} className="space-y-4">
              <FormField
                control={shopForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shop Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={shopForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (optional)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Create Shop</Button>
            </form>
          </Form>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Manage Products</h2>
          <div className="mb-4">
            <Label>Select Shop</Label>
            <select
              value={selectedShopId || ''}
              onChange={(e) => setSelectedShopId(parseInt(e.target.value))}
              className="w-full p-2 border rounded-md"
            >
              {shops.map((shop) => (
                <option key={shop.id} value={shop.id}>
                  {shop.name}
                </option>
              ))}
            </select>
          </div>
          <Form {...productForm}>
            <form onSubmit={productForm.handleSubmit(onProductSubmit)} className="space-y-4">
              <FormField
                control={productForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={productForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (optional)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={productForm.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={productForm.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">{editProduct ? 'Update Product' : 'Create Product'}</Button>
            </form>
          </Form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {products.map((product) => (
              <div key={product.id} className="p-4 border rounded-md">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-gray-800">${product.price}</p>
                <p className="text-gray-600">Stock: {product.stock}</p>
                <div className="mt-2 space-x-2">
                  <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setEditProduct(product);
                          productForm.reset({
                            name: product.name,
                            description: product.description || '',
                            price: product.price,
                            stock: product.stock,
                          });
                        }}
                      >
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Product</DialogTitle>
                      </DialogHeader>
                      <Form {...productForm}>
                        <form onSubmit={productForm.handleSubmit(onProductSubmit)} className="space-y-4">
                          <FormField
                            control={productForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Product Name</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={productForm.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Description (optional)</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={productForm.control}
                            name="price"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={productForm.control}
                            name="stock"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Stock</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setOpenEditDialog(false)}>
                              Cancel
                            </Button>
                            <Button type="submit">Update</Button>
                          </DialogFooter>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                  <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
                    <DialogTrigger asChild>
                      <Button
                        variant="destructive"
                        onClick={() => setProductToDelete(product.id)}
                      >
                        Delete
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                      </DialogHeader>
                      <p>Are you sure you want to delete this product?</p>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setOpenDeleteDialog(false)}>
                          Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteProduct}>
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}