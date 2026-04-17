// types.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  userId?: number;
  userName?: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'admin' | 'user';
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role?: 'admin' | 'user';
}

export interface CatalogProps {
  products: Product[];
  onAddProduct: () => void;
  currentUser?: User | null;  // Добавьте эту строку
}

export interface ProductCardProps {
  product: Product;
  onDelete?: (id: number) => void;
  onUpdate?: (product: Product) => void;
  currentUser?: User | null;
}

export interface ProductListProps {
  products: Product[];
  onDelete?: (id: number) => void;
  onUpdate?: (product: Product) => void;
  currentUser?: User | null;
}

export interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Omit<Product, 'id'>) => void;
}